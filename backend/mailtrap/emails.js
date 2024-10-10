import { PASSWORD_RESET_REQUEST_TEMPLATE, PASSWORD_RESET_SUCCESS_TEMPLATE, VERIFICATION_EMAIL_TEMPLATE } from "./emailTemplates.js"
import { mailtrapClient, sender } from "./mailtrap.config.js"

export const sendVerificationEmail = async (email, verificationToken) => {
    const recepient = [{email}]

    try{
        const response = await mailtrapClient.send({
            from: sender,
            to: recepient,
            subject: "Verify your email",
            html: VERIFICATION_EMAIL_TEMPLATE.replace("{verificationCode}", verificationToken),
            category: "Email Verification"
        })

        console.log("Email sent successfully!", response);
    }catch(error){
        console.error(`Error sending email verification ${error}`);
        throw new Error(`Error sending email verification: ${error}`);
    }
}


export const sendWelcomeEmail = async (email, name) => {
    const recepient = [{email}]
    
    console.log("Verifying");
    
    try{
        const response = await mailtrapClient.send({
            from: sender,
            to: recepient,
            template_uuid: "e3c975ab-2cb5-4982-bb6b-78f474a813fc",
            template_variables: {
                company_info_name: "TechExpress",
                name: name,
                
            }
        })

        console.log("Email sent successfully!", response);
    }catch(error){
        console.error(`Error sending welcome email ${error}`);
        throw new Error(`Error sending welcome email: ${error}`);
    }
}


export const sendPasswordResetEmail = async (email, resetURL) => {
    const recepient = [{email}]

    try{
        const response = await mailtrapClient.send({
            from: sender,
            to: recepient,
            subject: "Reset Your Password",
            html: PASSWORD_RESET_REQUEST_TEMPLATE.replace("{resetURL}", resetURL),
            category: "Password Reset"
        })

        console.log("Password reset email sent successfully!", response);
    }catch(error){
        console.error(`Error sending password reset email ${error}`);
        throw new Error(`Error sending password reset email ${error}`);
    }
}

export const sendResetSuccessEmail = async (email, resetURL) => {
    const recepient = [{email}]

    try{
        const response = await mailtrapClient.send({
            from: sender,
            to: recepient,
            subject: "Password Reset Successfully!",
            html: PASSWORD_RESET_SUCCESS_TEMPLATE.replace("{loginURL}", resetURL),
            category: "Password Reset"
        })

        console.log("Password reset successfully!", response);
    }catch(error){
        console.error(`Error password reset ${error}`);
        throw new Error(`Error password reset ${error}`);
    }
}

