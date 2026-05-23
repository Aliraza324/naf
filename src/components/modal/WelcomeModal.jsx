import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { X } from 'lucide-react'
import { hideWelcomeModal, selectShowWelcomeModal } from '../../features/auth/authSlice'
import welcomImg from '../../assets/images/welcomImg.png'
import { motion, AnimatePresence } from 'framer-motion'

const WelcomeModal = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const showWelcomeModal = useSelector(selectShowWelcomeModal)

  const handleClose = () => {
    dispatch(hideWelcomeModal())
  }

  const handleLoginClick = () => {
    dispatch(hideWelcomeModal())
    navigate('/login')
  }

  return (
    <AnimatePresence>
      {showWelcomeModal && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4"
          onClick={handleClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="relative w-full max-w-2xl h-96 rounded-lg overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
            style={{
              backgroundImage: `url(${welcomImg})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          >
            {/* Close Button - Top Right */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleClose}
              className="absolute top-4 right-4 z-10 p-2 rounded-full bg-black bg-opacity-50 hover:bg-opacity-70 transition-all duration-200"
              aria-label="Close modal"
            >
              <X className="w-6 h-6 text-white" />
            </motion.button>

            {/* Login Button - Bottom Right */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleLoginClick}
              className="absolute bottom-6 right-6 px-8 py-3 bg-red-600 hover:bg-red-700 text-white font-bold rounded-full transition-all duration-200 shadow-lg"
            >
              LOGIN NOW
            </motion.button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default WelcomeModal
