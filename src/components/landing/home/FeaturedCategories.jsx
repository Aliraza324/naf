import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { featuredCategories } from '../../../data/featuredCategories'
import { motion, AnimatePresence } from 'framer-motion'
import { fadeInUp, staggerContainer } from '../../../animations/animations'

const VISIBLE = 5 // Number of categories visible at once on desktop

const FeaturedCategories = () => {
  const [hoveredId, setHoveredId] = useState(null)
  const [startIndex, setStartIndex] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)
  const [direction, setDirection] = useState('right')

  const total = featuredCategories.length

  // Slide function with loop-around (circular carousel) so it always works!
  const slide = (dir) => {
    if (isAnimating) return
    setDirection(dir === 'next' ? 'right' : 'left')
    setIsAnimating(true)

    setTimeout(() => {
      setStartIndex((prev) => {
        if (dir === 'next') {
          return (prev + 1) % total
        } else {
          return (prev - 1 + total) % total
        }
      })
      setIsAnimating(false)
    }, 300)
  }

  // Create circular array of visible items
  const visibleCategories = []
  for (let i = 0; i < VISIBLE; i++) {
    const index = (startIndex + i) % total
    visibleCategories.push(featuredCategories[index])
  }

  const slideAnim = isAnimating
    ? {
        opacity: 0.6,
        transform: direction === 'right' ? 'translateX(-20px)' : 'translateX(20px)',
      }
    : { opacity: 1, transform: 'translateX(0)' }

  return (
    <section className='bg-page px-4 py-14 sm:py-16 lg:px-6'>
      <div className='mx-auto max-w-[1180px]'>
        <motion.div
          variants={fadeInUp}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, amount: 0.3 }}
          className='mb-8 flex items-center justify-between gap-4'
        >
          <h2 className='font-display text-[clamp(1.8rem,3vw,2.25rem)] font-black uppercase italic leading-none tracking-[0.01em] text-text-strong'>
            Featured Categories
          </h2>

          <div className='hidden items-center gap-3 sm:flex'>
            <button
              aria-label='Previous categories'
              onClick={() => slide('prev')}
              className='grid size-10 place-items-center rounded-full border border-white/10 bg-page-soft text-white transition hover:border-primary hover:text-primary cursor-pointer active:scale-95'
            >
              <ChevronLeft size={22} strokeWidth={2.4} />
            </button>
            <button
              aria-label='Next categories'
              onClick={() => slide('next')}
              className='grid size-10 place-items-center rounded-full border border-white/10 bg-page-soft text-white transition hover:border-primary hover:text-primary cursor-pointer active:scale-95'
            >
              <ChevronRight size={22} strokeWidth={2.4} />
            </button>
          </div>
        </motion.div>

        {/* Slider track */}
        <div
          style={{
            ...slideAnim,
            transition: 'opacity 0.3s ease, transform 0.3s cubic-bezier(0.25, 1, 0.5, 1)',
          }}
          className='grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5'
        >
          {visibleCategories.map((category, index) => {
            const isHighlighted = hoveredId === category.id || (hoveredId === null && category.featured)
            return (
              <Link
                key={`${category.id}-${index}`}
                to={`/products/${category.productSlug}`}
                className='group'
              >
                <motion.article
                  variants={fadeInUp}
                  onMouseEnter={() => setHoveredId(category.id)}
                  onMouseLeave={() => setHoveredId(null)}
                  className={`relative rounded-[7px] border bg-surface px-4 pb-5 pt-4 transition-all duration-300 cursor-pointer h-full ${
                    isHighlighted
                      ? 'border-primary shadow-[0_0_34px_rgba(230,1,3,0.12)]'
                      : 'border-white/7'
                  }`}
              >
                <AnimatePresence>
                  {isHighlighted && (
                    <motion.span
                      initial={{ opacity: 0, y: "-100%", x: "-50%" }}
                      animate={{ opacity: 1, y: "-50%", x: "-50%" }}
                      exit={{ opacity: 0, y: "-100%", x: "-50%" }}
                      transition={{ type: "spring", stiffness: 300, damping: 20 }}
                      className='absolute left-1/2 top-0 bg-primary px-4 py-1.5 text-[10px] font-black uppercase leading-none tracking-[0.12em] text-white whitespace-nowrap z-10'
                    >
                      Best Seller
                    </motion.span>
                  )}
                </AnimatePresence>

                <div className='relative mb-5 grid aspect-[1.22] place-items-center overflow-hidden rounded bg-page-soft'>
                  {category.badge && (
                    <span className='absolute left-4 top-4 rounded bg-white/10 px-3 py-1 text-[10px] font-black uppercase tracking-[0.12em] text-text-copy'>
                      {category.badge}
                    </span>
                  )}
                  <img
                    src={category.image}
                    alt={category.name}
                    loading='lazy'
                    decoding='async'
                    className='h-full w-full object-contain p-3'
                  />
                </div>

                <h3
                  className={`font-display text-[1.45rem] font-black uppercase leading-none tracking-[0.02em] transition-colors duration-300 ${
                    isHighlighted ? 'text-primary' : 'text-text-strong'
                  }`}
                >
                  {category.name}
                </h3>

                <p className='mt-2 min-h-9 text-xs leading-5 text-text-subtle'>
                  {category.description}
                </p>

                <dl className='mt-3 grid gap-2'>
                  {category.specs.map((spec) => (
                    <div
                      key={spec.label}
                      className='flex items-center justify-between border-t border-white/6 pt-2.5'
                    >
                      <dt className='text-[11px] font-medium uppercase leading-none text-text-subtle'>
                        {spec.label}
                      </dt>
                      <dd
                        className={`text-xs font-black leading-none ${
                          spec.accent ? 'text-[#00ff38]' : 'text-text-strong'
                        }`}
                      >
                        {spec.value}
                      </dd>
                    </div>
                  ))}
                </dl>
              </motion.article>
            </Link>
            )
          })}
        </div>

        {/* Mobile dot indicators */}
        <div className='mt-6 flex justify-center gap-2 sm:hidden'>
          {Array.from({ length: total }).map((_, i) => (
            <button
              key={i}
              onClick={() => {
                if (!isAnimating) {
                  setDirection(i > startIndex ? 'right' : 'left')
                  setIsAnimating(true)
                  setTimeout(() => {
                    setStartIndex(i)
                    setIsAnimating(false)
                  }, 300)
                }
              }}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                i === startIndex ? 'w-5 bg-primary' : 'w-1.5 bg-white/20'
              }`}
              aria-label={`Go to category ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

export default FeaturedCategories
