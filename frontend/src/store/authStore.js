import axios from "axios";
import { create } from "zustand";

const API_URL = "http://localhost:5000/api/auth";
axios.defaults.withCredentials = true;
export const useAuthStore = create((set) => ({
    user: null,
    isAuthenticated: false,
    error: null,
    isLoading: false,
    isCheckingAuth: true,
    message: null,

    signup: async(email, password, name) => {

        set({isLoading: true, error: null});

        try{
            const response = await axios.post(`${API_URL}/signup`,{email, password, name})
            set({user: response.data.user, isAuthenticated: true, isLoading: false});
        }catch(error){
            set({error:error.response.data.message || "Error signing up", isLoading:false});
            throw error;
        }
    },

    signin: async(email, password) => {

        set({isLoading: true, error: null});

        try{
            const response = await axios.post(`${API_URL}/login`,{email, password})
            set({user: response.data.user, isAuthenticated:true, isLoading:false, error: null});
        }catch(error){
            set({error:error.response?.data?.message || "Error signing in", isLoading:false});
            throw error;
        }
    },

    logout: async() => {

        set({isLoading: true, error: null});

        try{
            const response = await axios.post(`${API_URL}/logout`)
            set({user: response.data.user, isAuthenticated:false, isLoading:false, error: null});
        }catch(error){
            set({error:error.response?.data?.message || "Error signing out", isLoading:false});
            throw error;
        }
    },

    verifyEmail: async (code) => {

        set({ isLoading: true, error: null});

        try{
            const response = await axios.post(`${API_URL}/verify-email`,{code})
            set({user: response.data.user, isAuthenticated:true, isLoading:false});
            return response.data; 
        }catch(error){
            set({error:error.response.data.message || "Error verifying email", isLoading:false});
            throw error;
        }
    },

    checkAuth: async () => {
        await new Promise((resolve) => setTimeout(resolve, 1000));
        set({ isCheckingAuth: true, error: null });
        try{
            const response = await axios.get(`${API_URL}/check-auth`);
            set({ user: response.data.user, isAuthenticated: true, isCheckingAuth: false})
        }catch(error){
            set({ isCheckingAuth: false, error: null, isAuthenticated: false });
        }
    },

    forgotPassword: async(email) => {
        set({isLoading: true, error: null, message: null});
        try{
            const response = await axios.post(`${API_URL}/forgot-password-request`,{email})
            set({message: response.data.message, isLoading: false});
        }catch(error){
            set({error: error.response?.data?.message || "Error sending reset password email", isLoading: false});
            throw error;
        }
    },
    
    resetPassword: async(token, password) => {
        set({isLoading: true, error: null});
        try{
            const response = await axios.post(`${API_URL}/reset-password/${token}`,{password})
            set({message: response.data.message, isLoading: false});
        }catch(error){
            set({error: error.response?.data?.message || "Enter resetting password", isLoading: false});
            throw error;
        }
    },
}))