import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Eye, EyeOff, Lock } from 'lucide-react'
import { loginSuccess, selectAuthLoading, selectAuthError } from '../../features/auth/authSlice'
import authImg from '../../assets/images/auth.png'
import logo from '../../assets/images/logo.svg'

const Login = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const loading = useSelector(selectAuthLoading)
  const error = useSelector(selectAuthError)

  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false,
  })
  const [showPassword, setShowPassword] = useState(false)
  const [validationErrors, setValidationErrors] = useState({})
  const [successMessage, setSuccessMessage] = useState('')

  const validateForm = () => {
    const errors = {}

    if (!formData.email.trim()) {
      errors.email = 'Email is required'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = 'Invalid email format'
    }

    if (!formData.password) {
      errors.password = 'Password is required'
    } else if (formData.password.length < 6) {
      errors.password = 'Password must be at least 6 characters'
    }

    setValidationErrors(errors)
    return Object.keys(errors).length === 0
  }

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }))
    if (validationErrors[name]) {
      setValidationErrors((prev) => ({
        ...prev,
        [name]: '',
      }))
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!validateForm()) {
      setSuccessMessage('')
      return
    }

    try {
      const mockUser = {
        id: '1',
        email: formData.email,
        name: formData.email.split('@')[0],
      }

      dispatch(loginSuccess(mockUser))
      setSuccessMessage('Login successful! Redirecting...')
      setValidationErrors({})

      setTimeout(() => {
        navigate('/')
      }, 1500)
    } catch (err) {
      setSuccessMessage('')
    }
  }

  return (
    <div className="h-screen bg-black text-white flex">
      {/* Left Side - Background Image */}
      <div
        className="hidden lg:block lg:w-1/2 h-full bg-cover bg-center relative"
        style={{
          backgroundImage: `url(${authImg})`,
        }}
      >
        <div className="absolute inset-0 bg-black/40" />
      </div>

      {/* Right Side - Login Form */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full lg:w-1/2 h-full flex flex-col items-center justify-center p-6 sm:p-8 lg:p-12"
      >
        <div className="w-full max-w-md">
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="flex justify-center mb-6"
          >
            <img src={logo} alt="NAF Logo" className="h-10 w-auto" />
          </motion.div>

          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-center mb-8"
          >
            <h1 className="text-2xl font-bold mb-1">Elite Dealer Login</h1>
            <p className="text-gray-400 text-sm">Authentication required to proceed</p>
          </motion.div>

          {/* Form Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="border-2 border-red-600 rounded-2xl p-6 bg-black/50 backdrop-blur-sm"
          >
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Credential Identifier Section */}
              <div>
                <label className="text-xs font-black text-red-600 mb-2 block tracking-wider">
                  CREDENTIAL IDENTIFIER
                </label>
                <div className="relative">
                  <div className="absolute left-3 top-3 w-5 h-5 text-gray-500">
                    <svg className="w-full h-full" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                      />
                    </svg>
                  </div>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="OPERATOR EMAIL"
                    className={`w-full pl-9 pr-3 py-2 bg-gray-900 border rounded text-white placeholder-gray-600 text-sm focus:outline-none transition-all ${
                      validationErrors.email
                        ? 'border-red-500 focus:border-red-600'
                        : 'border-gray-700 focus:border-red-600'
                    }`}
                  />
                </div>
                {validationErrors.email && (
                  <p className="text-red-500 text-xs mt-1">{validationErrors.email}</p>
                )}
              </div>

              {/* Encryption Key Section */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-xs font-black text-red-600 tracking-wider">ENCRYPTION KEY</label>
                  <button
                    type="button"
                    onClick={() => navigate('/forgot-password')}
                    className="text-xs text-gray-400 hover:text-red-600 transition-colors"
                  >
                    FORGOT?
                  </button>
                </div>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 w-5 h-5 text-gray-500" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    placeholder="••••••••"
                    className={`w-full pl-9 pr-9 py-2 bg-gray-900 border rounded text-white placeholder-gray-600 text-sm focus:outline-none transition-all ${
                      validationErrors.password
                        ? 'border-red-500 focus:border-red-600'
                        : 'border-gray-700 focus:border-red-600'
                    }`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-3 text-gray-500 hover:text-gray-300 transition-colors"
                  >
                    {showPassword ? (
                      <EyeOff className="w-5 h-5" />
                    ) : (
                      <Eye className="w-5 h-5" />
                    )}
                  </button>
                </div>
                {validationErrors.password && (
                  <p className="text-red-500 text-xs mt-1">{validationErrors.password}</p>
                )}
              </div>

              {/* Checkbox */}
              <div className="flex items-center gap-2 pt-1">
                <input
                  type="checkbox"
                  id="rememberMe"
                  name="rememberMe"
                  checked={formData.rememberMe}
                  onChange={handleInputChange}
                  className="w-4 h-4 accent-red-600 cursor-pointer"
                />
                <label htmlFor="rememberMe" className="text-sm text-gray-400 cursor-pointer">
                  Maintain persistent session
                </label>
              </div>

              {/* Error Message */}
              {error && (
                <div className="p-2 bg-red-900/20 border border-red-600 rounded text-red-400 text-xs">
                  {error}
                </div>
              )}

              {/* Success Message */}
              {successMessage && (
                <div className="p-2 bg-green-900/20 border border-green-600 rounded text-green-400 text-xs">
                  {successMessage}
                </div>
              )}

              {/* Login Button */}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                disabled={loading}
                className="w-full py-2.5 bg-red-600 hover:bg-red-700 text-white font-bold rounded transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-sm"
              >
                {loading ? 'AUTHENTICATING...' : 'Login To NAF'}
              </motion.button>

              {/* Initialize New Account */}
              <motion.button
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                type="button"
                onClick={() => navigate('/register')}
                className="w-full py-2.5 bg-gray-900 hover:bg-gray-800 text-white rounded transition-colors text-sm border border-gray-800"
              >
                Initialize New Account
              </motion.button>

              {/* Divider */}
              <div className="my-4 flex items-center gap-3">
                <div className="flex-1 h-px bg-gray-700" />
                <span className="text-xs text-gray-600 tracking-widest">ALTERNATE UPLINKS</span>
                <div className="flex-1 h-px bg-gray-700" />
              </div>

              {/* Google Login */}
              <motion.button
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                type="button"
                className="w-full py-2.5 border border-gray-700 rounded text-white hover:bg-gray-900 transition-colors flex items-center justify-center gap-2 text-sm"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path
                    fill="currentColor"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="currentColor"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="currentColor"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  />
                  <path
                    fill="currentColor"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  />
                </svg>
              </motion.button>
            </form>
          </motion.div>

          {/* Security Footer */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="text-center mt-6"
          >
            <p className="text-xs text-gray-600 tracking-widest">
              ⚔ PROTECTED BY ELITE TACTICAL SECURITY PROTOCOLS
            </p>
          </motion.div>
        </div>
      </motion.div>
    </div>
  )
}

export default Login
