import { Navigate, Route, Routes } from "react-router-dom"
import FloatingShape from "./components/FloatingShape"
import SignUp from "./pages/auth/SignUp"
import SignIn from "./pages/auth/SignIn"
import EmailVerification from "./pages/auth/EmailVerification"
import { Toaster } from "react-hot-toast"
import { useAuthStore } from "./store/authStore"
import { useEffect } from "react"
import LoadingSpinner from "./components/LoadingSpinner"
import ForgotPassword from "./pages/auth/ForgotPassword"
import ResetPassword from "./pages/auth/ResetPassword"
import NotFound from "./pages/NotFound"
import Dashboard from "./pages/Dashboard"
import Profile from "./pages/front/Profile"

// Protect routes that requires authentication
const ProtectedRoute = ({children}) => {
  const {isAuthenticated, user} = useAuthStore();

  if(!isAuthenticated){
    return <Navigate to='/signin' replace />
  }

  if(user && !user.isVerified){
    return <Navigate to='/email-verify' replace />
  }

  return children;
}
// Redirect authenticated users to the home
const RedirectAuthenticatedUser = ({children})=> {
  const {isAuthenticated, user} = useAuthStore();

  if(isAuthenticated && user.isVerified){
    return <Navigate to='/' replace />
  }

  return children;
}

function App() {

  const {isCheckingAuth, checkAuth} = useAuthStore();

  useEffect(() => {
    checkAuth();
  },[checkAuth]);

  if (isCheckingAuth) return <LoadingSpinner />

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-green-900 to-emerald-900 flex items-center justify-center relative overflow-hidden">

      <FloatingShape color="bg-green-500" size="w-64 h-64" top="-5%" left="10%" delay={0} />
      <FloatingShape color="bg-emerald-500" size="w-48 h-48" top="70%" left="80%" delay={5} />
      <FloatingShape color="bg-lime-500" size="w-32 h-32" top="40%" left="-10%" delay={2} />

      <Routes>
          <Route path="/" element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          } />
          <Route path="/signup" element={
            <RedirectAuthenticatedUser>
              <SignUp />
            </RedirectAuthenticatedUser>
          } />
          <Route path="/signin" element={
            <RedirectAuthenticatedUser>
              <SignIn />
            </RedirectAuthenticatedUser>
          } />
          <Route path="/email-verify" element={<EmailVerification />} />
          <Route path="/forgot-password" element={
            <RedirectAuthenticatedUser>
              <ForgotPassword />
            </RedirectAuthenticatedUser>
          } />
          <Route path="/reset-password/:token" element={
            <RedirectAuthenticatedUser>
              <ResetPassword />
            </RedirectAuthenticatedUser>
          } />
          <Route path="/profile" element={
            <Profile />
          } />
          {/* Catch all routes */}
          <Route path="*" element={ <NotFound /> } />
      </Routes>
      <Toaster />
    </div>
  )
}

export default App
