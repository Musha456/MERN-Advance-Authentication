import { useState } from 'react'
import { motion } from 'framer-motion'
import { Loader, Lock, Mail } from 'lucide-react';
import Input from '../../components/Input';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useAuthStore } from '../../store/authStore';
import toast from 'react-hot-toast';

const ResetPassword = () => {
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const {resetPassword, isLoading, error, message} = useAuthStore();

    const {token} = useParams();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrorMessage("");
        if(password !== confirmPassword){
            setErrorMessage("Password do not match!");
            return
        }

       try{
        await resetPassword(token, password);
        toast.success("Password reset successfully, redirecting to login page...");
        setTimeout(() => {
            navigate("/signin");
        },2000);
       }catch(error){
        toast.error(error.message || "Error resetting password");
       }
       
    }

    return (
        <motion.div
        initial={{ opacity: 0, y: 20}}
        animate={{ opacity: 1, y: 0}}
        transition={{ duration: 0.5}}
        className='max-w-md w-full bg-gray-800 bg-opacity-50 backdrop-filter backdrop-blur-xl rounded-2xl shadow-xl overflow-hidden'
        >
            <div className="p-8">

                <h2 className='text-3xl font-bold mb-6 text-center bg-gradient-to-r from-green-400 to-emerald-500 text-transparent bg-clip-text'>
                    Reset Password
                </h2>

                <form onSubmit={handleSubmit}>

                    { errorMessage && <p className='text-red-500 font-semibold text-xs text-center mb-4'>{errorMessage}</p>}
                    { error && <p className='text-red-500 font-semibold text-xs text-center mb-4'>{error}</p>}
                    { message && <p className='text-green-500 font-semibold text-xs text-center mb-4'>{message}</p>}

                    <Input
                        icon={Lock}
                        type='password'
                        placeholder='Password'
                        value={password}
                        onChange = {(e) => setPassword(e.target.value)}
                    />
                    <Input
                        icon={Lock}
                        type='password'
                        placeholder='Confirm Password'
                        value={confirmPassword}
                        onChange = {(e) => setConfirmPassword(e.target.value)}
                    />

                    

                    <motion.button
                        className='w-full py-3 px-4 bg-gradient-to-r from-green-500 to-emerald-600 textx-white font-bold rounded-lg shadow-lg hover:from-green-600 hover:to-emerald-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-gray-900 transition duration-200'
                        whileHover={{ scale: 1.02}}
                        whileTap={{ scale: 0.98}}
                        type='submit'
                        disabled={isLoading}
                    >
                        { isLoading ? "Resetting..." : "Set New Password"}
                    </motion.button>
                </form>
            </div>

        </motion.div>
    )
}

export default ResetPassword