import bcryptjs from 'bcryptjs';
import crypto from "crypto";

import { User } from "../models/user.model.js";
import { generateTokenAndSetCookie } from "../utils/generateTokenAndSetCookie.js";
import { sendPasswordResetEmail, sendResetSuccessEmail, sendVerificationEmail, sendWelcomeEmail } from "../mailtrap/emails.js";

export const signup = async (req, res) => {
    const {email, password, name} = req.body;

    try{

        if(!email || !password || !name){
            throw new Error('All fields are required');
        }

        const userAlreadyExists = await User.findOne({email});
        if(userAlreadyExists){
            return res.status(400).json({success: false, message: 'User already exists'});
        }

        const hashpassword = await bcryptjs.hash(password, 10);
        const verificationToken = Math.floor(100000 + Math.random() * 900000).toString();

        const user = new User({
            email,
            password: hashpassword,
            name,
            verificationToken,
            verificationTokenExpiresAt: Date.now() + 24 * 60 * 60 * 1000, //24 hours
        })

        await user.save();

        // jwt
        generateTokenAndSetCookie(res, user._id);

        await sendVerificationEmail(user.email, verificationToken);

        res.status(201).json({
            success: true,
            message: "User created successfully!",
            user: {
                ...user._doc,
                password: undefined
            }
        })

    }catch(error){
        res.status(400).json({success: false, message: error.message});
    }
}

export const verifyEmail = async (req, res) => {
    // 1 2 3 4 5 6
    const {code} = req.body;
    try{

        const user = await User.findOne({
            verificationToken: code,
            verificationTokenExpiresAt: { $gt: Date.now()}
        })

        if(!user){
            return res.status(400).json({ success: false, message: "Invalid or expired verification code"})
        }

        user.isVerified = true;
        user.verificationToken = undefined;
        user.verificationTokenExpiresAt = undefined;
        await user.save()

        console.log("Yes");

        await sendWelcomeEmail(user.email, user.name);

        res.status(200).json({
            success: true,
            message: "Email verified successfully!",
            user: {
                ...user._doc,
                password: undefined
            }
        })

    }catch(error){
        console.log(`Error verifying email: ${error.message}`);
        res.status(500).json({success: false, message: "Server error"});
    }
}

export const login = async (req, res) => {
    const {email, password} = req.body;

    try{
        const user = await User.findOne({email});
        if(!user){
            return res.status(400).json({success: false, message: 'Invalid credentials'});
        }

        if(!user.isVerified){
            return res.status(400).json({success: false, message: 'Email not verified'});
        }
        
        const isPasswordValid = await bcryptjs.compare(password, user.password);
        if(!isPasswordValid){
            return res.status(400).json({success: false, message: 'Invalid credentials'});
        }

        generateTokenAndSetCookie(res, user._id);

        user.lastLogin = new Date();
        await user.save();

        res.status(200).json({
            success: true,
            message: "Logged in successfully!",
            user: {
                ...user._doc,
                password: undefined
            }
        })

    }catch(error){
        console.log("Error in login ",error.message);
        return res.status(400).json({success: false, message: error.message});
    }
}

export const forgotPasswordRequest = async (req, res) => {
    const {email} = req.body;

    try{
        const user = await User.findOne({email});
        if(!user){
            return res.status(400).json({success: false, message: 'User not found!'});
        }

        // Generate reset token
        const resetPasswordToken = crypto.randomBytes(20).toString("hex");
        const resetPasswordTokenExpiresAt = Date.now() + 1 * 60 * 60 * 1000 // 1 hour

        user.resetPasswordToken = resetPasswordToken;
        user.resetPasswordTokenExpiresAt = resetPasswordTokenExpiresAt;

        await user.save();

        await sendPasswordResetEmail(user.email, `${process.env.CLIENT_URL}/reset-password/${resetPasswordToken}`);

        return res.status(200).json({success: true, message: 'Password reset link is sent to your email!'});

    }catch(error){
        console.log("Error in login ",error.message);
        return res.status(400).json({success: false, message: error.message});
    }
}

export const resetPassword = async (req, res) => {
    
    
    try{
        const {token} = req.params;
        const {password} = req.body;

        const user = await User.findOne({
            resetPasswordToken: token,
            resetPasswordTokenExpiresAt: { $gt: Date.now()}
        })

        if(!user){
            return res.status(400).json({ success: false, message: "Invalid or expired reset token"});
        }

        // update password
        const hashedPassword = await bcryptjs.hash(password, 10);
        
        user.password = hashedPassword;
        user.resetPasswordToken = undefined;
        user.resetPasswordTokenExpiresAt = undefined;
        await user.save()

        await sendResetSuccessEmail(user.email, `${process.env.CLIENT_URL}/login}`);

        res.status(200).json({success: true, message: "Password reset successfully!"})

    }catch(error){
        console.log(`Error reset password: ${error.message}`);
        res.status(400).json({success: false, message: error.message});
    }
}


export const logout = async (req, res) => {
    res.clearCookie('token');
    res.status(200).json({success: true, message: "logout successfully!"});
}


export const checkAuth = async (req, res) => {
    try{
        const user = await User.findById(req.userId).select("-password");
        if(!user){
            return res.status(400).json({success: false, message: "User not found!"});
        }

        res.status(200).json({success: true, user});
    }catch(error){
        console.log("Error in checking auth ",error);
        res.status(400).json({success: false, message: error.message});
    }
}