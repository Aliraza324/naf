import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { X } from 'lucide-react'
import {
  hideWelcomeModal,
  selectIsAuthenticated,
  selectShowWelcomeModal,
} from '../../features/auth/authSlice'
import welcomImg from '../../assets/images/welcomImg.png'
import { motion, AnimatePresence } from 'framer-motion'

const WelcomeModal = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const showWelcomeModal = useSelector(selectShowWelcomeModal)
  const isAuthenticated = useSelector(selectIsAuthenticated)

  const handleClose = () => {
    dispatch(hideWelcomeModal())
  }

  const handleLoginClick = () => {
    dispatch(hideWelcomeModal())
    navigate('/login')
  }

  return (
    <AnimatePresence>
      {showWelcomeModal && !isAuthenticated && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className='fixed inset-0 z-[9999] flex items-center justify-center bg-black/80 px-3 py-4 backdrop-blur-sm sm:px-5'
          onClick={handleClose}
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 20 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className='relative aspect-[1362/678] w-full max-w-[1040px] overflow-hidden rounded-[26px] bg-black shadow-2xl'
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={welcomImg}
              alt='NAF Power dealer welcome'
              className='h-full w-full object-cover'
            />

            <motion.button
              whileHover={{ scale: 1.08, rotate: 90 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleClose}
              className='absolute right-3 top-3 z-20 grid size-9 place-items-center rounded-full text-white transition-colors duration-200 hover:bg-white/10 sm:right-5 sm:top-5'
              aria-label='Close modal'
            >
              <X className='size-5 sm:size-6' />
            </motion.button>

            <motion.button
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              onClick={handleLoginClick}
              className='absolute bottom-[6%] right-[4%] z-20 min-h-10 rounded-[8px] bg-primary px-6 text-xs font-black uppercase tracking-[0.18em] text-white shadow-[0_10px_30px_rgba(232,12,12,0.35)] transition-colors duration-200 hover:bg-primary-hover sm:min-h-14 sm:px-12 sm:text-lg'
            >
              Login Now
            </motion.button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default WelcomeModal
