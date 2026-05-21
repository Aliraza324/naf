import { motion } from 'framer-motion'
import performanceImage from '../../../assets/images/performance.png'
import { fadeInUp, scaleIn, staggerContainer } from '../../../animations/animations'
import Toast from '../../utils/Toast'

const Performance = () => {
    const handleExploreClick = () => {
        Toast.success('Initiating tactical system brief: Velocity Mask System')
    }

    return (
        <section className='bg-page px-4 py-14 sm:py-16 lg:px-6 border-t border-white/5'>
            <div className='mx-auto max-w-7xl'>

                {/* Section Header */}
                <motion.div
                    variants={staggerContainer(0.1, 0)}
                    initial="initial"
                    whileInView="animate"
                    viewport={{ once: true, amount: 0.3 }}
                    className='mb-12 text-center'
                >
                    <motion.h2
                        variants={fadeInUp}
                        className='font-display text-[clamp(2.2rem,4vw,3.25rem)] font-black uppercase italic leading-none tracking-[0.01em] text-text-strong'
                    >
                        Tactical Performance
                    </motion.h2>
                    <motion.p
                        variants={fadeInUp}
                        className='mt-3 text-xs sm:text-sm text-[#9CA3AF] max-w-[620px] mx-auto leading-relaxed'
                    >
                        Engineered for athletes who push the limits. Maximum mobility, ultimate protection.
                    </motion.p>
                </motion.div>

                {/* Feature Hero Card */}
                <motion.div
                    variants={scaleIn}
                    initial="initial"
                    whileInView="animate"
                    viewport={{ once: true, amount: 0.2 }}
                    className='group relative rounded-[20px] bg-[#0b0b0a] overflow-hidden min-h-[460px] md:min-h-[580px] flex items-center shadow-2xl transition-all duration-500'
                >
                    {/* Background Image Layer with Zoom Effect */}
                    <div className='absolute inset-0 overflow-hidden w-full h-full z-0'>
                        <img
                            src={performanceImage}
                            alt='Tactical Velocity Mask System'
                            loading='lazy'
                            decoding='async'
                            className='h-full w-full object-cover object-center md:object-[82%_center] transition-transform duration-700 ease-out group-hover:scale-103'
                        />
                        {/* Rich gradient overlays for premium dark styling and text legibility */}
                        <div className='absolute inset-0 bg-gradient-to-r from-[#050505]/95 via-[#050505]/75 to-transparent md:from-[#050505]/95 md:via-[#050505]/30 md:to-transparent z-10' />
                        <div className='absolute inset-0 bg-gradient-to-t from-[#050505]/80 via-transparent to-transparent z-10' />
                    </div>

                    {/* Card Content Overlay */}
                    <div className='relative z-20 w-full max-w-[680px] px-6 py-10 sm:p-12 md:p-16 flex flex-col items-start'>

                        {/* Tagline / Eyebrow */}
                        <div className='flex items-center gap-3.5 text-primary mb-5 sm:mb-6'>
                            <span className='h-[1.5px] w-5 bg-primary' />
                            <span className='text-[10px] sm:text-xs font-black uppercase tracking-[0.2em] leading-none'>
                                Pro Series
                            </span>
                        </div>

                        {/* Main Stacked Heading */}
                        <h3 className='font-display text-[clamp(2.5rem,5.5vw,4.5rem)] font-extrabold uppercase leading-[0.95] tracking-[0.01em] text-text-strong'>
                            <span className='block'>Velocity</span>
                            <span className='block'>Mask</span>
                            <span className='block text-primary group-hover:text-primary-hover transition-colors duration-300'>System</span>
                        </h3>

                        {/* Description Paragraph */}
                        <p className='mt-6 text-sm sm:text-base text-text-copy/90 font-medium leading-relaxed max-w-[390px]'>
                            Anti-fog thermal lenses combined with acoustic venting for clear communication and ultimate vision clarity.
                        </p>

                        {/* Action Explore Button */}
                        <button
                            onClick={handleExploreClick}
                            type='button'
                            className='mt-8 sm:mt-10 inline-flex h-12 sm:h-14 items-center justify-center bg-white px-8 text-xs font-black uppercase tracking-[0.12em] text-primary transition-all duration-300 rounded-[4px] shadow-lg hover:bg-primary hover:text-white hover:shadow-[0_4px_20px_rgba(230,1,3,0.3)] active:translate-y-[2px]'
                        >
                            Explore System
                        </button>

                    </div>
                </motion.div>

            </div>
        </section>
    )
}

export default Performance