import { ChevronRight } from 'lucide-react'
import heroImage from '../../../assets/images/heroimg.png'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { fadeInUp, scaleIn, staggerContainer } from '../../../animations/animations'

const Hero = () => {
  return (
    <section className='relative isolate min-h-[300px] overflow-hidden bg-page sm:min-h-[440px] lg:min-h-[484px]'>
      <div className='absolute inset-y-0 right-0 -z-10 w-full md:w-[64%]'>
        <motion.img
          variants={scaleIn}
          initial="initial"
          animate="animate"
          src={heroImage}
          alt='Paintball tactical gear'
          loading='lazy'
          decoding='async'
          className='h-full w-full object-cover object-center md:object-right'
        />
        <div className='absolute inset-0 bg-gradient-to-r from-page via-page/45 to-page/10 md:from-page md:via-page/15 md:to-transparent' />
        <div className='absolute inset-0 bg-black/20' />
      </div>

      <div className='mx-auto flex min-h-[400px] max-w-[1180px] items-center px-4 py-4 sm:min-h-[440px] sm:py-5 lg:min-h-[400px] lg:px-6'>
        <motion.div 
          variants={staggerContainer(0.08, 0.15)}
          initial="initial"
          animate="animate"
          className='w-full max-w-[620px] py-4 sm:py-5 lg:max-w-[660px]'
        >
          <motion.div 
            variants={fadeInUp} 
            className='mb-4 flex items-center gap-4 text-primary sm:mb-5'
          >
            <span className='h-[2px] w-10 bg-primary sm:w-12' />
            <p className='hero-eyebrow relative font-black uppercase'>
              Wholesale paintball gear supply
              <span className='absolute -right-5 top-0 hidden h-4 w-3 border-r border-t border-primary sm:block' />
            </p>
          </motion.div>

          <motion.h1 
            variants={fadeInUp} 
            className='hero-title max-w-[620px] font-display uppercase text-text-strong'
          >
            <span>Built For </span>
            <span className='text-primary'>Champions.</span>
            <span className='block'>Delivered For</span>
            <span className='block text-primary'>Dealers.</span>
          </motion.h1>

          <motion.p 
            variants={fadeInUp} 
            className='hero-copy mt-5 max-w-[560px] font-medium text-text-copy'
          >
            Premium paintballs, tactical gear, and protective equipment
            <br />
            at bulk prices.{' '}
            <span className='text-primary'>Trusted by dealers.</span>
            <strong className='text-white'> Chosen by pros.</strong>
          </motion.p>

          <motion.div variants={fadeInUp} className='mt-6'>
            <Link
              to='#order'
              className='brand-red-gradient hero-cta inline-flex h-11 items-center gap-2.5 bg-primary px-6 font-display uppercase text-text-strong shadow-[0_4px_0_var(--color-primary-pressed)] transition hover:bg-primary-hover active:translate-y-1 active:shadow-none sm:h-12 sm:px-7'
            >
              Order Now
              <span className='flex items-center gap-0' aria-hidden='true'>
                <ChevronRight size={18} strokeWidth={3} />
                <ChevronRight size={18} strokeWidth={3} />
              </span>
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

export default Hero
