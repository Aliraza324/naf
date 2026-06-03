import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  ArrowRight,
  BriefcaseBusiness,
  Eye,
  EyeOff,
  Heart,
  Lock,
  Mail,
  ShieldCheck,
} from 'lucide-react'
import { loginRequest, loginSuccess, loginFailure, selectAuthLoading, selectAuthError } from '../../features/auth/authSlice'
import toast from '../../utils/toast'
import authImg from '../../assets/images/auth.png'
import logo from '../../assets/images/logo.svg'

const accessFeatures = [
  { label: 'Quality', value: 'Elite Quality', icon: Heart },
  { label: 'Process', value: 'Fast Access', icon: ArrowRight },
  { label: 'Delivery', value: 'Fast', icon: BriefcaseBusiness },
]

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

  const handleInputChange = (event) => {
    const { name, value, type, checked } = event.target
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

  const handleSubmit = async (event) => {
    event.preventDefault()

    if (!validateForm()) {
      setSuccessMessage('')
      return
    }

    const adminCredentials = {
      email: 'naf@gmail.com',
      password: 'naf1234',
    }
    const userCredentials = {
      email: 'user@gmail.com',
      password: 'user1234',
    }

    let redirectPath = null
    let loggedInUser = null

    if (
      formData.email === adminCredentials.email &&
      formData.password === adminCredentials.password
    ) {
      redirectPath = '/admin'
      loggedInUser = {
        id: '1',
        email: formData.email,
        name: formData.email.split('@')[0],
        role: 'admin',
      }
    } else if (
      formData.email === userCredentials.email &&
      formData.password === userCredentials.password
    ) {
      redirectPath = '/dashboard'
      loggedInUser = {
        id: '2',
        email: formData.email,
        name: formData.email.split('@')[0],
        role: 'user',
      }
    }

    if (!redirectPath || !loggedInUser) {
      dispatch(loginFailure('Invalid email or password'))
      toast.error('Invalid email or password')
      setSuccessMessage('')
      return
    }

    dispatch(loginRequest())
    dispatch(loginSuccess(loggedInUser))
    toast.success(`Logged in as ${loggedInUser.role === 'admin' ? 'admin' : 'user'} successfully!`)
    setSuccessMessage(`Login successful! Redirecting to ${loggedInUser.role === 'admin' ? 'admin' : 'user'} dashboard...`)
    setValidationErrors({})

    setTimeout(() => {
      navigate(redirectPath, { replace: true })
    }, 800)
  }

  return (
    <main className='bg-black text-white'>
      <div className='flex min-h-screen w-full overflow-hidden bg-black'>
        <section className='relative hidden flex-1 overflow-hidden lg:flex'>
          <img
            src={authImg}
            alt='Paintball operator'
            className='absolute inset-0 h-full w-full object-cover object-center'
          />
        

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45 }}
            className='relative z-10 flex min-h-screen w-full flex-col justify-center px-12 py-12 xl:px-16'
          >
            <p className='mb-6 flex items-center gap-4 text-[10px] font-black uppercase tracking-[0.38em] text-primary'>
              <span className='h-px w-12 bg-primary' />
              Deployment Status: Ready
            </p>

            <h1 className='font-display text-[clamp(3.4rem,5.1vw,5.2rem)] font-black uppercase leading-[1.04] text-white'>
              Access The
              <span className='block text-primary'>NAF</span>
              <span className='block'>Powerhouse</span>
            </h1>

            <p className='mt-7 max-w-[520px] text-base leading-7 text-white/70'>
              Access your elite dealer portal and manage tactical inventory,
              orders, deployments, and exclusive member pricing.
            </p>

            <div className='mt-12 grid max-w-[560px] grid-cols-3 gap-5'>
              {accessFeatures.map((feature) => {
                const Icon = feature.icon

                return (
                  <div
                    key={feature.label}
                    className='flex min-h-[62px] items-center gap-3 rounded-[7px] border border-primary/20 bg-black/45 px-4 backdrop-blur-sm'
                  >
                    <span className='grid size-8 shrink-0 place-items-center rounded-full bg-primary/10 text-primary'>
                      <Icon size={15} strokeWidth={2.5} />
                    </span>
                    <div>
                      <p className='text-[8px] font-black uppercase tracking-[0.18em] text-primary'>
                        {feature.label}
                      </p>
                      <p className='mt-1 text-xs font-black text-white'>{feature.value}</p>
                    </div>
                  </div>
                )
              })}
            </div>
          </motion.div>
        </section>

        <section className='flex min-h-screen w-full items-center justify-center bg-[#070707] px-4 py-8 sm:px-6 lg:w-[42%] lg:min-w-[450px]'>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.1 }}
            className='w-full max-w-[350px]'
          >
            <div className='mb-7 text-center'>
              <img src={logo} alt='NAF Power logo' className='mx-auto h-9 w-auto object-contain' />
              <h2 className='mt-6 text-xl font-black leading-none text-white'>
                Elite Dealer Login
              </h2>
              <p className='mt-2 text-xs text-white/35'>Authentication required to proceed</p>
            </div>

            <div className='rounded-[18px] border border-primary/55 bg-[#070707]/98 px-7 pb-10 pt-9 shadow-[0_4px_0_rgba(232,12,12,0.95),0_0_32px_rgba(0,0,0,0.45)] sm:px-11'>
              <form onSubmit={handleSubmit} className='space-y-5'>
                <div>
                  <label
                    htmlFor='email'
                    className='mb-2.5 block text-[9px] font-black uppercase tracking-[0.28em] text-primary'
                  >
                    Credential Identifier
                  </label>
                  <div className='relative'>
                    <Mail className='absolute left-4 top-1/2 size-3.5 -translate-y-1/2 text-white/28' />
                    <input
                      type='email'
                      id='email'
                      name='email'
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder='OPERATOR EMAIL'
                      className={`h-11 w-full rounded-[6px] border bg-[#111113] pl-10 pr-4 text-xs font-semibold uppercase text-white outline-none transition placeholder:text-white/22 ${
                        validationErrors.email
                          ? 'border-primary focus:border-primary'
                          : 'border-white/10 focus:border-primary/80'
                      }`}
                    />
                  </div>
                  {validationErrors.email && (
                    <p className='mt-2 text-xs text-primary'>{validationErrors.email}</p>
                  )}
                </div>

                <div>
                  <div className='mb-2.5 flex items-center justify-between gap-4'>
                    <label
                      htmlFor='password'
                      className='text-[9px] font-black uppercase tracking-[0.28em] text-primary'
                    >
                      Encryption Key
                    </label>
                    <button
                      type='button'
                      onClick={() => navigate('/forgot-password')}
                      className='text-[8px] font-black uppercase tracking-[0.16em] text-white/35 transition hover:text-primary'
                    >
                      Forgot?
                    </button>
                  </div>
                  <div className='relative'>
                    <Lock className='absolute left-4 top-1/2 size-3.5 -translate-y-1/2 text-white/28' />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      id='password'
                      name='password'
                      value={formData.password}
                      onChange={handleInputChange}
                      placeholder='************'
                      className={`h-11 w-full rounded-[6px] border bg-[#111113] pl-10 pr-11 text-xs font-semibold text-white outline-none transition placeholder:text-white/22 ${
                        validationErrors.password
                          ? 'border-primary focus:border-primary'
                          : 'border-white/10 focus:border-primary/80'
                      }`}
                    />
                    <button
                      type='button'
                      onClick={() => setShowPassword(!showPassword)}
                      className='absolute right-4 top-1/2 -translate-y-1/2 text-white/28 transition hover:text-white'
                      aria-label={showPassword ? 'Hide password' : 'Show password'}
                    >
                      {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
                    </button>
                  </div>
                  {validationErrors.password && (
                    <p className='mt-2 text-xs text-primary'>{validationErrors.password}</p>
                  )}
                </div>

                <div className='flex items-center gap-3'>
                  <input
                    type='checkbox'
                    id='rememberMe'
                    name='rememberMe'
                    checked={formData.rememberMe}
                    onChange={handleInputChange}
                    className='size-4 cursor-pointer appearance-none rounded-[2px] border border-white/35 bg-transparent checked:border-primary checked:bg-primary'
                  />
                  <label htmlFor='rememberMe' className='cursor-pointer text-[11px] text-white/45'>
                    Maintain persistent session
                  </label>
                </div>

                {error && (
                  <div className='rounded-[6px] border border-primary/40 bg-primary/10 p-3 text-xs text-primary'>
                    {error}
                  </div>
                )}

                {successMessage && (
                  <div className='rounded-[6px] border border-[#20db65]/40 bg-[#20db65]/10 p-3 text-xs text-[#20db65]'>
                    {successMessage}
                  </div>
                )}

                <button
                  type='submit'
                  disabled={loading}
                  className='h-11 w-full rounded-[6px] bg-primary text-xs font-black text-white shadow-[0_0_22px_rgba(232,12,12,0.38)] transition hover:bg-primary-hover disabled:cursor-not-allowed disabled:opacity-55'
                >
                  {loading ? 'Authenticating...' : 'Login To NAF'}
                </button>

               
              </form>
            </div>

            <p className='mt-7 flex items-center justify-center gap-3 text-center text-[8px] font-black uppercase tracking-[0.22em] text-white/28'>
              <ShieldCheck size={13} className='shrink-0 text-primary' />
              Protected By Elite Tactical Security Protocols
            </p>
          </motion.div>
        </section>
      </div>
    </main>
  )
}

export default Login
