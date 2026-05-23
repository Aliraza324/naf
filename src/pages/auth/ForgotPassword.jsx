import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Mail, ShieldCheck } from 'lucide-react'
import { motion } from 'framer-motion'
import authImg from '../../assets/images/auth.png'
import logo from '../../assets/images/logo.svg'

const ForgotPassword = () => {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [error, setError] = useState('')
  const [message, setMessage] = useState('')

  const handleSubmit = (event) => {
    event.preventDefault()

    if (!email.trim()) {
      setError('Email is required')
      setMessage('')
      return
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError('Invalid email format')
      setMessage('')
      return
    }

    setError('')
    setMessage('Reset code sent. Check your email.')
    setTimeout(() => {
      navigate('/verify-account')
    }, 700)
  }

  return (
    <main className='bg-black text-white'>
      <section className='relative w-full min-h-screen overflow-hidden bg-black'>
        <img
          src={authImg}
          alt='Paintball operator'
          className='absolute inset-0 h-full w-full object-cover object-center'
        />
        <div className='absolute inset-0 bg-black/42' />
        <div className='absolute inset-0 bg-gradient-to-t from-black via-black/45 to-black/8' />
        <div className='absolute inset-0 bg-gradient-to-r from-black/35 via-transparent to-black/30' />

        <div className='relative z-10 flex min-h-screen items-center justify-center px-4 py-12'>
          <motion.div
            initial={{ opacity: 0, y: 16, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.45 }}
            className='w-full max-w-[460px] rounded-[18px] border border-primary/55 bg-[#070707]/98 px-7 pb-10 pt-9 shadow-[0_4px_0_rgba(232,12,12,0.95),0_0_32px_rgba(0,0,0,0.45)] sm:px-11'
          >
            <div className='text-center'>
              <img src={logo} alt='NAF Power logo' className='mx-auto h-9 w-auto object-contain' />
              <h1 className='mt-7 text-[clamp(1.45rem,3vw,1.85rem)] font-black leading-none text-white'>
                Forgot Password
              </h1>
              <p className='mx-auto mt-3 max-w-[250px] text-xs leading-5 text-white/75'>
                Enter your registered email. We will send you a reset code.
              </p>
            </div>

            <form onSubmit={handleSubmit} className='mt-9'>
              <div className='relative'>
                <Mail className='absolute left-4 top-1/2 size-4 -translate-y-1/2 text-white/70' />
                <input
                  type='email'
                  value={email}
                  onChange={(event) => {
                    setEmail(event.target.value)
                    if (error) setError('')
                    if (message) setMessage('')
                  }}
                  placeholder='Email'
                  className={`h-11 w-full rounded-[6px] border bg-[#252527] pl-11 pr-4 text-xs font-medium text-white outline-none transition placeholder:text-white/55 ${
                    error ? 'border-primary' : 'border-white/8 focus:border-primary/80'
                  }`}
                />
              </div>

              {error && <p className='mt-3 text-xs font-semibold text-primary'>{error}</p>}
              {message && <p className='mt-3 text-xs font-semibold text-[#20db65]'>{message}</p>}

              <button
                type='submit'
                className='mt-11 h-11 w-full rounded-[6px] bg-primary text-xs font-black text-white shadow-[0_10px_24px_rgba(232,12,12,0.22)] transition hover:bg-primary-hover active:translate-y-0.5'
              >
                Reset Password
              </button>
            </form>

            <Link
              to='/login'
              className='mx-auto mt-6 flex w-fit items-center gap-2 text-[10px] font-black uppercase tracking-[0.14em] text-white/35 transition hover:text-primary'
            >
              <ShieldCheck size={13} className='text-primary' />
              Back To Login
            </Link>
          </motion.div>
        </div>
      </section>
    </main>
  )
}

export default ForgotPassword
