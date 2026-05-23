import { useCallback, useEffect, useState } from 'react'
import { CircleAlert, CheckCircle, X, XCircle } from 'lucide-react'
import { AnimatePresence, motion } from 'framer-motion'
import { toastAnimation } from '../../animations/animations'

const TOAST_EVENT = 'NAF-toast'

const Toast = {
  success: (message, duration = 3000) => {
    window.dispatchEvent(
      new CustomEvent(TOAST_EVENT, {
        detail: { message, statusCode: 'success', autoRemoveTime: duration },
      }),
    )
  },
  error: (message, duration = 3000) => {
    window.dispatchEvent(
      new CustomEvent(TOAST_EVENT, {
        detail: { message, statusCode: 'error', autoRemoveTime: duration },
      }),
    )
  },
  warning: (message, duration = 3000) => {
    window.dispatchEvent(
      new CustomEvent(TOAST_EVENT, {
        detail: { message, statusCode: 'no-response', autoRemoveTime: duration },
      }),
    )
  },
}

export default Toast

const getToastConfig = (status) => {
  switch (status) {
    case 'success':
      return {
        accentBar: 'bg-[#63d471]',
        border: 'border-[#63d471]/45',
        icon: <CheckCircle size={19} className='text-[#63d471]' />,
      }
    case 'no-response':
      return {
        accentBar: 'bg-primary',
        border: 'border-primary/55',
        icon: <XCircle size={19} className='text-primary' />,
      }
    case 'error':
      return {
        accentBar: 'bg-primary',
        border: 'border-primary/45',
        icon: <CircleAlert size={19} className='text-primary' />,
      }
    default:
      return {
        accentBar: 'bg-[#63d471]',
        border: 'border-[#63d471]/45',
        icon: <CheckCircle size={19} className='text-[#63d471]' />,
      }
  }
}

export function ToastProvider() {
  const [data, setData] = useState(null)
  const handleClose = useCallback(() => setData(null), [])

  useEffect(() => {
    const handler = (event) => {
      setData(event.detail)
    }

    window.addEventListener(TOAST_EVENT, handler)
    return () => window.removeEventListener(TOAST_EVENT, handler)
  }, [])

  const config = data ? getToastConfig(data.statusCode) : null

  return (
    <div className='fixed right-4 top-4 z-[9999] max-w-[calc(100vw-2rem)]'>
      <AnimatePresence>
        {data && (
          <motion.div
            key={data.message}
            variants={toastAnimation}
            initial='initial'
            animate='animate'
            exit='exit'
            className={`dropdown-bg relative min-h-[58px] w-fit min-w-[260px] max-w-[420px] overflow-hidden rounded-[8px] border ${config.border} px-4 py-3 text-white shadow-[0_18px_34px_rgba(0,0,0,0.45)] ring-1 ring-white/8`}
          >
            <div className={`absolute left-0 top-0 h-full w-1 ${config.accentBar}`} />

            <button
              type='button'
              onClick={handleClose}
              className='absolute right-2 top-2 z-10 grid size-7 place-items-center text-white/55 transition hover:text-white'
              aria-label='Close toast'
            >
              <X size={16} strokeWidth={2.4} />
            </button>

            <div className='flex min-w-0 items-center gap-3 pr-8'>
              <div className='grid size-9 shrink-0 place-items-center rounded-[6px] bg-white/6'>
                {config.icon}
              </div>
              <p className='min-w-0 flex-1 text-sm font-bold leading-snug text-white/90'>
                {data.message}
              </p>
            </div>

            <AutoClose duration={data.autoRemoveTime} onClose={handleClose} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

function AutoClose({ duration, onClose }) {
  useEffect(() => {
    if (duration > 0) {
      const timer = setTimeout(onClose, duration)
      return () => clearTimeout(timer)
    }

    return undefined
  }, [duration, onClose])

  return null
}
