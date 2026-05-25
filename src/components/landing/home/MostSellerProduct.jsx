import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { CheckCircle2, AlertCircle, Heart } from 'lucide-react'
import { useDispatch, useSelector } from 'react-redux'
import { toggleWishlist, selectWishlistItems } from '../../../features/wishlist/wishlistSlice'
import { mostSaleProducts } from '../../../data/mostSaleProducts'
import { fadeInUp, staggerContainer } from '../../../animations/animations'
import toast from '../../../utils/toast'

const MostSellerProduct = () => {
  const [hoveredId, setHoveredId] = useState(null)
  const dispatch = useDispatch()
  const wishlistItems = useSelector(selectWishlistItems)

  const isInWishlist = (product) => wishlistItems.some((p) => p.id === product.id)

  return (
    <section className='bg-page px-4 py-14 sm:py-16 lg:px-6 border-t border-white/5'>
      <div className='mx-auto max-w-[1180px]'>
        {/* Section Header */}
        <motion.div
          variants={fadeInUp}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, amount: 0.3 }}
          className='mb-8 flex items-center justify-between gap-4'
        >
          <h2 className='font-display text-[clamp(1.8rem,3vw,2.25rem)] font-black uppercase italic leading-none tracking-[0.01em] text-text-strong'>
            Most Sale Products
          </h2>
        </motion.div>

        {/* Product Grid */}
        <motion.div
          variants={staggerContainer(0.06, 0.05)}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, amount: 0.1 }}
          className='grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'
        >
          {mostSaleProducts.map((product) => {
            const isHovered = hoveredId === product.id
            const isLowStock = product.status === 'LOW STOCK'

            return (
              <motion.article
                variants={fadeInUp}
                key={product.id}
                onMouseEnter={() => setHoveredId(product.id)}
                onMouseLeave={() => setHoveredId(null)}
                className={`group relative flex flex-col rounded-[9px] border bg-surface p-3 transition-all duration-300 cursor-pointer ${
                  isHovered
                    ? 'border-primary shadow-[0_0_34px_rgba(232,12,12,0.14)] translate-y-[-4px]'
                    : 'border-white/7'
                }`}
              >
                {/* Image Container */}
                <div className='relative w-full aspect-[1.28] rounded-[6px] bg-page-soft/90 border border-white/5 overflow-hidden flex items-center justify-center p-4 transition-colors duration-300 group-hover:bg-page-soft/50'>
                  <button
                    type='button'
                    aria-label='Toggle wishlist'
                    onClick={(e) => {
                      e.stopPropagation()
                      const alreadyInWishlist = isInWishlist(product)
                      dispatch(toggleWishlist(product))
                      toast.success(
                        alreadyInWishlist
                          ? 'Product removed from wishlist'
                          : 'Product added to wishlist',
                      )
                    }}
                    className='absolute left-3 top-3 z-20 grid size-8 place-items-center rounded-full bg-black/50 text-white transition hover:text-primary'
                  >
                    <Heart size={16} className={`${isInWishlist(product) ? 'text-primary' : ''}`} />
                  </button>
                  {product.badge && (
                    <span className='absolute right-0 top-2.5 bg-primary px-2.5 py-1.5 text-[8px] font-black uppercase leading-none tracking-[0.08em] text-white rounded-l-sm z-10 shadow-md'>
                      {product.badge}
                    </span>
                  )}
                  
                  <img
                    src={product.image}
                    alt={product.title}
                    loading='lazy'
                    decoding='async'
                    className='h-full w-full object-contain transition-transform duration-500 ease-out group-hover:scale-108'
                  />
                </div>

                {/* Content details */}
                <div className='mt-4 flex flex-col flex-grow'>
                  <span className='text-[9px] font-bold text-primary tracking-[0.08em] uppercase mb-1.5 block'>
                    {product.category}
                  </span>
                  
                  <h3 className='text-[13px] font-black text-text-strong leading-snug tracking-[0.01em] line-clamp-2 min-h-9 group-hover:text-primary transition-colors duration-300'>
                    {product.title}
                  </h3>

                  {/* Bottom Row: Price & Status + View More CTA */}
                  <div className='flex items-center justify-between border-t border-white/6 pt-3 mt-4'>
                    <div className='flex flex-col'>
                      <span className='text-sm font-black text-text-strong tracking-wide leading-none'>
                        {product.price}
                      </span>
                      
                      {/* Stock Status Indicator */}
                      <span
                        className={`flex items-center gap-1 text-[9px] font-bold uppercase tracking-[0.04em] mt-1.5 ${
                          isLowStock ? 'text-primary' : 'text-[#00ff38]'
                        }`}
                      >
                        {isLowStock ? (
                          <>
                            <AlertCircle size={10} className='stroke-[3]' />
                            Low Stock
                          </>
                        ) : (
                          <>
                            <CheckCircle2 size={10} className='stroke-[3]' />
                            In Stock
                          </>
                        )}
                      </span>
                    </div>

                    {/* View More Button */}
                    <Link
                      to={`/product-details/${product.slug}`}
                      className='brand-red-gradient inline-flex h-8 items-center justify-center bg-primary px-4 text-[9px] font-black uppercase tracking-[0.08em] text-white shadow-[0_2.5px_0_var(--color-primary-pressed)] hover:bg-primary-hover active:translate-y-[2.5px] active:shadow-none transition-all rounded-[3px] group-hover:shadow-[0_2.5px_10px_rgba(232,12,12,0.3)]'
                    >
                      View Details
                    </Link>
                  </div>
                </div>
              </motion.article>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}

export default MostSellerProduct
