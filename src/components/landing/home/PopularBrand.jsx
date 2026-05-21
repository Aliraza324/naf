import { motion } from 'framer-motion'
import { fadeInUp, staggerContainer } from '../../../animations/animations'

import one from '../../../assets/images/one.png'
import two from '../../../assets/images/two.png'
import three from '../../../assets/images/three.png'
import four from '../../../assets/images/four.png'
import five from '../../../assets/images/five.png'
import six from '../../../assets/images/six.png'
import seven from '../../../assets/images/seven.png'
import eight from '../../../assets/images/eight.png'

const brands = [
  { name: 'Brand One',   img: one   },
  { name: 'Brand Two',   img: two   },
  { name: 'Brand Three', img: three },
  { name: 'Brand Four',  img: four  },
  { name: 'Brand Five',  img: five  },
  { name: 'Brand Six',   img: six   },
  { name: 'Brand Seven', img: seven },
  { name: 'Brand Eight', img: eight },
]

const PopularBrand = () => {
  return (
    <section className='bg-page px-4 py-14 sm:py-16 lg:px-6 border-t border-white/5 overflow-hidden'>
      <div className='mx-auto max-w-7xl'>

        {/* Section Header */}
        <motion.div
          variants={staggerContainer(0.08, 0)}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, amount: 0.3 }}
          className='mb-12 text-center'
        >
          <motion.h2
            variants={fadeInUp}
            className='font-display text-[clamp(1.8rem,3vw,2.25rem)] font-black uppercase italic leading-none tracking-[0.01em] text-text-strong'
          >
            Shop Popular Brands
          </motion.h2>
        </motion.div>

        {/* Infinite Scrolling Ticker (Marquee) */}
        <div className='relative w-full overflow-hidden bg-surface/40 py-8 border-y border-white/5 rounded-xl'>

          {/* Gradient Faders for Smooth Left/Right Transitions */}
          <div className='absolute inset-y-0 left-0 w-16 sm:w-28 bg-gradient-to-r from-page to-transparent z-10 pointer-events-none' />
          <div className='absolute inset-y-0 right-0 w-16 sm:w-28 bg-gradient-to-l from-page to-transparent z-10 pointer-events-none' />

          {/* Marquee Tracks */}
          <div className='flex w-full select-none overflow-hidden'>

            {/* Track 1 */}
            <div className='animate-marquee flex items-center gap-16 pr-16'>
              {brands.map((brand) => (
                <div
                  key={brand.name}
                  className='h-12 flex items-center justify-center grayscale opacity-50 hover:grayscale-0 hover:opacity-100 transition-all duration-300 hover:scale-105 cursor-pointer shrink-0'
                  title={brand.name}
                >
                  <img
                    src={brand.img}
                    alt={brand.name}
                    className='h-10 w-auto max-w-[140px] object-contain'
                  />
                </div>
              ))}
            </div>

            {/* Track 2 (Duplicate for Infinite Seamless Loop) */}
            <div className='animate-marquee flex items-center gap-16 pr-16' aria-hidden='true'>
              {brands.map((brand) => (
                <div
                  key={`${brand.name}-dup`}
                  className='h-12 flex items-center justify-center grayscale opacity-50 hover:grayscale-0 hover:opacity-100 transition-all duration-300 hover:scale-105 cursor-pointer shrink-0'
                  title={brand.name}
                >
                  <img
                    src={brand.img}
                    alt={brand.name}
                    className='h-10 w-auto max-w-[140px] object-contain'
                  />
                </div>
              ))}
            </div>

          </div>

        </div>

      </div>
    </section>
  )
}

export default PopularBrand