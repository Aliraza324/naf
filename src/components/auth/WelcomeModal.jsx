import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { X, Package, Shield, Handshake, Truck, Crown, ShoppingCart } from 'lucide-react'
import {
  hideWelcomeModal,
  selectShowWelcomeModal,
  selectIsAuthenticated,
} from '../../features/auth/authSlice'
import welcomImg from '../../assets/images/welcome model.png'
import { motion, AnimatePresence } from 'framer-motion'

const features = [
  {
    icon: Package,
    label: 'BULK PRICING',
    description: 'MAXIMUM SAVINGS',
  },
  {
    icon: Shield,
    label: 'PREMIUM QUALITY',
    description: 'BUILT TO PERFORM',
  },
  {
    icon: Handshake,
    label: 'DEALER FOCUSED',
    description: 'YOUR SUCCESS, OUR MISSION',
  },
]

const benefits = [
  { icon: Truck, label: 'FAST SHIPPING' },
  { icon: Crown, label: 'TRUSTED BRANDS' },
  { icon: ShoppingCart, label: 'DEALER PORTAL ACCESS' },
]

const WelcomeModal = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const showWelcomeModal = useSelector(selectShowWelcomeModal)
  const isAuthenticated = useSelector(selectIsAuthenticated)

  // Hide modal if user is authenticated3333333333
  useEffect(() => {
    if (isAuthenticated && showWelcomeModal) {
      dispatch(hideWelcomeModal())
    }
  }, [isAuthenticated, showWelcomeModal, dispatch])

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
          className='fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm'
          onClick={handleClose}
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 20 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className='relative w-full max-w-6xl overflow-hidden rounded-2xl shadow-2xl'
            onClick={(e) => e.stopPropagation()}
          >
            {/* Background Image */}
            <div
              className='absolute inset-0'
              style={{
                backgroundImage: `url(${welcomImg})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }}
            />

            {/* Overlay Gradient */}
            <div className='absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-black/60' />

            {/* Content */}
            <div className='relative z-10 px-8 py-12 sm:px-12 sm:py-16 lg:px-16 lg:py-20'>
              {/* Close Button */}
              <motion.button
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleClose}
                className='absolute top-4 right-4 sm:top-6 sm:right-6 z-20 p-2 rounded-full bg-primary hover:bg-primary-hover transition-colors duration-200 text-white'
                aria-label='Close modal'
              >
                <X className='w-5 h-5 sm:w-6 sm:h-6' />
              </motion.button>

              {/* Main Content */}
              <div className='max-w-3xl'>
                {/* Heading */}
                <motion.h1
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  className='font-display text-4xl sm:text-5xl lg:text-6xl font-black uppercase leading-tight text-white mb-2'
                >
                  <span className='block'>GEAR UP.</span>
                  <span className='block text-primary'>LOAD UP.</span>
                  <span className='block'>DOMINATE.</span>
                </motion.h1>

                {/* Subheading */}
                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className='text-xs sm:text-sm font-black uppercase tracking-widest text-white/70 mb-8 flex items-center gap-2'
                >
                  <span className='w-12 h-px bg-primary' />
                  PREMIUM PAINTBALL GEAR. BULK PRICES. DEALER ADVANTAGE
                </motion.p>

                {/* Features Grid */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className='grid grid-cols-1 sm:grid-cols-3 gap-6 mb-12'
                >
                  {features.map((feature, index) => {
                    const Icon = feature.icon
                    return (
                      <div
                        key={index}
                        className='flex items-start gap-4 group'
                      >
                        <div className='flex-shrink-0'>
                          <div className='flex items-center justify-center h-12 w-12 rounded-lg bg-primary/20 border border-primary/50 group-hover:bg-primary/30 transition-colors'>
                            <Icon className='h-6 w-6 text-primary' strokeWidth={1.5} />
                          </div>
                        </div>
                        <div>
                          <p className='text-xs font-black uppercase tracking-widest text-primary mb-1'>
                            {feature.label}
                          </p>
                          <p className='text-xs text-white/70 leading-snug'>
                            {feature.description}
                          </p>
                        </div>
                      </div>
                    )
                  })}
                </motion.div>

                {/* Benefits Bar */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className='flex flex-col sm:flex-row items-center gap-4 sm:gap-6 py-6 border-t border-b border-primary/20 mb-8'
                >
                  {benefits.map((benefit, index) => {
                    const Icon = benefit.icon
                    return (
                      <div
                        key={index}
                        className='flex items-center gap-2 text-white'
                      >
                        <Icon className='h-4 w-4 text-primary flex-shrink-0' strokeWidth={2} />
                        <span className='text-xs sm:text-sm font-black uppercase tracking-wide'>
                          {benefit.label}
                        </span>
                        {index < benefits.length - 1 && (
                          <span className='hidden sm:block text-primary/40 ml-2'>|</span>
                        )}
                      </div>
                    )
                  })}
                </motion.div>

                {/* CTA Button */}
                <motion.button
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.5 }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleLoginClick}
                  className='w-full sm:w-auto px-8 sm:px-12 py-3 sm:py-4 bg-primary hover:bg-primary-hover text-white font-black uppercase text-sm sm:text-base tracking-wider rounded-lg shadow-lg hover:shadow-xl transition-all duration-200'
                >
                  Enter The Powerhouse
                </motion.button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default WelcomeModal
