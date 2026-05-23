import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Eye, EyeOff, Lock } from 'lucide-react'
import { motion } from 'framer-motion'
import authImg from '../../assets/images/auth.png'
import logo from '../../assets/images/logo.svg'

const CreateNewPassword = () => {
  const navigate = useNavigate()
  const [passwords, setPasswords] = useState({
    password: '',
    confirmPassword: '',
  })
  const [visible, setVisible] = useState({
    password: false,
    confirmPassword: false,
  })
  const [error, setError] = useState('')

  const handleChange = (event) => {
    const { name, value } = event.target
    setPasswords((current) => ({ ...current, [name]: value }))
    if (error) setError('')
  }

  const handleSubmit = (event) => {
    event.preventDefault()

    if (passwords.password.length < 6) {
      setError('Password must be at least 6 characters.')
      return
    }

    if (passwords.password !== passwords.confirmPassword) {
      setError('Passwords do not match.')
      return
    }

    navigate('/login')
  }

  const renderPasswordInput = ({ name, placeholder }) => {
    const isVisible = visible[name]

    return (
      <div className='relative'>
        <Lock className='absolute left-4 top-1/2 size-4 -translate-y-1/2 text-white/70' />
        <input
          type={isVisible ? 'text' : 'password'}
          name={name}
          value={passwords[name]}
          onChange={handleChange}
          placeholder={placeholder}
          className='h-11 w-full rounded-[6px] border border-white/8 bg-[#252527] pl-10 pr-11 text-xs font-medium text-white outline-none transition placeholder:text-white/45 focus:border-primary/80'
        />
        <button
          type='button'
          onClick={() =>
            setVisible((current) => ({
              ...current,
              [name]: !current[name],
            }))
          }
          aria-label={isVisible ? 'Hide password' : 'Show password'}
          className='absolute right-4 top-1/2 -translate-y-1/2 text-white/45 transition hover:text-white'
        >
          {isVisible ? <EyeOff size={17} /> : <Eye size={17} />}
        </button>
      </div>
    )
  }

  return (
    <main className='bg-[#e5e7eb] text-white'>
      <section className='relative mx-auto max-w-7xl overflow-hidden bg-black'>
        <img
          src={authImg}
          alt='Paintball operator'
          className='absolute inset-0 h-full w-full object-cover object-center'
        />
        <div className='absolute inset-0 bg-black/42' />
        <div className='absolute inset-0 bg-gradient-to-t from-black via-black/45 to-black/8' />
        <div className='absolute inset-0 bg-gradient-to-r from-black/35 via-transparent to-black/30' />

        <div className='relative z-10 flex min-h-[calc(100vh-2rem)] items-center justify-center px-4 py-12'>
          <motion.div
            initial={{ opacity: 0, y: 16, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.45 }}
            className='w-full max-w-[460px] rounded-[18px] border border-primary/55 bg-[#070707]/98 px-7 pb-10 pt-9 shadow-[0_4px_0_rgba(230,1,3,0.95),0_0_32px_rgba(0,0,0,0.45)] sm:px-11'
          >
            <div className='text-center'>
              <img src={logo} alt='NAF Power logo' className='mx-auto h-9 w-auto object-contain' />
              <h1 className='mt-6 text-[clamp(1.35rem,3vw,1.65rem)] font-black leading-none text-white'>
                Create New Password
              </h1>
              <p className='mt-3 text-[11px] leading-5 text-white/75'>
                Enter your Confirm password that you want to keep
              </p>
            </div>

            <form onSubmit={handleSubmit} className='mt-8 space-y-5'>
              {renderPasswordInput({ name: 'password', placeholder: 'Password' })}
              {renderPasswordInput({ name: 'confirmPassword', placeholder: 'Confirm Password' })}

              {error && <p className='text-xs font-semibold text-primary'>{error}</p>}

              <button
                type='submit'
                className='mt-7 h-11 w-full rounded-[6px] bg-primary text-xs font-black text-white shadow-[0_10px_24px_rgba(230,1,3,0.22)] transition hover:bg-primary-hover active:translate-y-0.5'
              >
                Continue
              </button>
            </form>

            <Link
              to='/login'
              className='mx-auto mt-6 block w-fit text-[10px] font-black uppercase tracking-[0.14em] text-white/35 transition hover:text-primary'
            >
              Back To Login
            </Link>
          </motion.div>
        </div>
      </section>
    </main>
  )
}

export default CreateNewPassword
