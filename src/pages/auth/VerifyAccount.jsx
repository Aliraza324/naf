import { useMemo, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import authImg from '../../assets/images/auth.png'
import logo from '../../assets/images/logo.svg'

const CODE_LENGTH = 6

const VerifyAccount = () => {
  const navigate = useNavigate()
  const inputRefs = useRef([])
  const [code, setCode] = useState(['4', '2', '9', '0', '0', '0'])
  const [message, setMessage] = useState('')

  const isComplete = useMemo(() => code.every(Boolean), [code])

  const handleCodeChange = (index, value) => {
    const digit = value.replace(/\D/g, '').slice(-1)
    const nextCode = [...code]
    nextCode[index] = digit
    setCode(nextCode)
    setMessage('')

    if (digit && index < CODE_LENGTH - 1) {
      inputRefs.current[index + 1]?.focus()
    }
  }

  const handleKeyDown = (index, event) => {
    if (event.key === 'Backspace' && !code[index] && index > 0) {
      inputRefs.current[index - 1]?.focus()
    }
  }

  const handleSubmit = (event) => {
    event.preventDefault()

    if (!isComplete) {
      setMessage('Enter the complete 6-digit code.')
      return
    }

    navigate('/create-new-password')
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
              <h1 className='mt-6 text-[clamp(1.35rem,3vw,1.65rem)] font-black leading-none text-white'>
                Verify Your Account
              </h1>
              <p className='mt-3 text-[11px] leading-5 text-white/75'>
                Enter the 6-digit code sent to your email
              </p>
            </div>

            <form onSubmit={handleSubmit} className='mt-8'>
              <div className='flex justify-center gap-2.5'>
                {code.map((digit, index) => (
                  <input
                    key={index}
                    ref={(element) => {
                      inputRefs.current[index] = element
                    }}
                    type='text'
                    inputMode='numeric'
                    maxLength={1}
                    value={digit}
                    onChange={(event) => handleCodeChange(index, event.target.value)}
                    onKeyDown={(event) => handleKeyDown(index, event)}
                    className={`size-11 rounded-[6px] border bg-[#2b2d31] text-center text-xl font-black text-white outline-none transition focus:border-primary ${
                      index === 3 ? 'border-primary' : 'border-white/70'
                    }`}
                  />
                ))}
              </div>

              <div className='mt-4 flex items-center justify-between gap-4 text-[11px]'>
                <span className='text-white/80'>Didn&apos;t receive the code?</span>
                <button
                  type='button'
                  className='font-semibold text-primary transition hover:text-primary-hover'
                >
                  Resend in 00:24
                </button>
              </div>

              {message && <p className='mt-4 text-xs font-semibold text-primary'>{message}</p>}

              <button
                type='submit'
                className='mt-12 h-11 w-full rounded-[6px] bg-primary text-xs font-black text-white shadow-[0_10px_24px_rgba(232,12,12,0.22)] transition hover:bg-primary-hover active:translate-y-0.5'
              >
                Verify
              </button>
            </form>
          </motion.div>
        </div>
      </section>
    </main>
  )
}

export default VerifyAccount
