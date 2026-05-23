import { motion } from 'framer-motion'
import logo from '../../assets/images/logo.svg'

const scannerBars = Array.from({ length: 4 })

const PageLoader = () => {
  return (
    <motion.div
      className='fixed inset-0 z-[9998] grid place-items-center overflow-hidden bg-page text-white'
      initial={{ opacity: 1 }}
      exit={{
        opacity: 0,
        transition: { duration: 0.45, ease: 'easeInOut' },
      }}
      role='status'
      aria-label='Loading NAF Supply'
    >
      <div className='absolute inset-0 bg-[radial-gradient(circle_at_50%_35%,rgba(232,12,12,0.16),transparent_24rem)]' />
      <div className='absolute inset-x-0 top-1/2 h-px bg-primary/35 shadow-[0_0_34px_rgba(232,12,12,0.42)]' />

      <motion.div
        className='relative flex w-[min(86vw,360px)] flex-col items-center'
        initial={{ opacity: 0, y: 16, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className='relative grid size-28 place-items-center sm:size-32'>
          <motion.div
            className='absolute inset-0 border border-primary/45'
            animate={{ rotate: 360 }}
            transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
          />
          <motion.div
            className='absolute inset-3 border border-white/10'
            animate={{ rotate: -360 }}
            transition={{ duration: 5.5, repeat: Infinity, ease: 'linear' }}
          />
          <motion.span
            className='absolute -left-2 top-1/2 h-3 w-3 bg-primary shadow-[0_0_18px_rgba(232,12,12,0.8)]'
            animate={{ opacity: [0.35, 1, 0.35] }}
            transition={{ duration: 1.1, repeat: Infinity, ease: 'easeInOut' }}
          />
          <div className='relative grid size-[76px] place-items-center rounded-[6px] bg-[#0b0b0a] ring-1 ring-white/10 sm:size-[86px]'>
            <img src={logo} alt='' className='h-14 w-auto object-contain sm:h-16' />
          </div>
        </div>

        <div className='mt-8 text-center'>
          <p className='font-display text-[2.15rem] font-black uppercase italic leading-none tracking-[0.04em] text-white sm:text-[2.55rem]'>
            NAF Supply
          </p>
          <p className='mt-3 text-[10px] font-black uppercase tracking-[0.34em] text-primary'>
            Tactical Loadout Initializing
          </p>
        </div>

        <div className='mt-8 grid w-full gap-2'>
          <div className='h-1.5 overflow-hidden rounded-full bg-white/10'>
            <motion.div
              className='h-full rounded-full bg-primary shadow-[0_0_18px_rgba(232,12,12,0.6)]'
              initial={{ x: '-100%' }}
              animate={{ x: '100%' }}
              transition={{ duration: 1.15, repeat: Infinity, ease: 'easeInOut' }}
            />
          </div>
          <div className='grid grid-cols-4 gap-2'>
            {scannerBars.map((_, index) => (
              <motion.span
                key={index}
                className='h-1 rounded-full bg-white/15'
                animate={{ backgroundColor: ['rgba(255,255,255,0.15)', '#e60103', 'rgba(255,255,255,0.15)'] }}
                transition={{
                  duration: 1,
                  repeat: Infinity,
                  delay: index * 0.14,
                  ease: 'easeInOut',
                }}
              />
            ))}
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}

export default PageLoader
