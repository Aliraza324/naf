import { Link } from 'react-router-dom'
import { AlertCircle, CheckCircle2 } from 'lucide-react'
import { mostSaleProducts } from '../../data/mostSaleProducts'

const relatedProducts = mostSaleProducts.slice(0, 4)

const RelatedProduct = () => {
  return (
    <section className='bg-page px-4 py-14 text-white sm:py-16 lg:px-6'>
      <div className='mx-auto max-w-[1180px]'>
        <h2 className='font-display text-[clamp(1.8rem,3vw,2.35rem)] font-black uppercase italic leading-none text-white'>
          Related Products
        </h2>

        <div className='mt-10 grid gap-6 sm:grid-cols-2 xl:grid-cols-4'>
          {relatedProducts.map((product) => {
            const isLowStock = product.status === 'LOW STOCK'

            return (
              <article
                key={product.id}
                className='group flex min-h-[350px] flex-col overflow-hidden rounded-[10px] border border-primary/20 bg-[#0b0b0a] transition duration-300 hover:-translate-y-1 hover:border-primary/70 hover:shadow-[0_0_28px_rgba(230,1,3,0.12)]'
              >
                <div className='relative grid h-[195px] place-items-center bg-black px-7 py-6'>
                  {product.badge && (
                    <span className='absolute right-0 top-0 bg-primary px-4 py-2 text-[9px] font-black uppercase leading-none text-white'>
                      {product.badge}
                    </span>
                  )}

                  <img
                    src={product.image}
                    alt={product.title}
                    loading='lazy'
                    decoding='async'
                    className='h-full max-h-[155px] w-full object-contain transition duration-500 group-hover:scale-105'
                  />
                </div>

                <div className='flex flex-1 flex-col px-5 pb-5 pt-5'>
                  <p className='text-[10px] font-black uppercase leading-none tracking-[0.14em] text-primary'>
                    {product.category}
                  </p>

                  <h3 className='mt-3 min-h-[48px] text-[17px] font-black leading-tight text-white'>
                    {product.title}
                  </h3>

                  <div className='mt-auto flex items-end justify-between gap-4 pt-6'>
                    <div className='min-w-0'>
                      <p className='text-base font-black leading-none text-white/85'>
                        {product.price}
                      </p>

                      <p
                        className={`mt-3 flex items-center gap-1.5 text-[10px] font-black uppercase leading-none tracking-[0.1em] ${
                          isLowStock ? 'text-primary' : 'text-[#20db65]'
                        }`}
                      >
                        {isLowStock ? (
                          <AlertCircle size={12} className='shrink-0 stroke-[3]' />
                        ) : (
                          <CheckCircle2 size={12} className='shrink-0 stroke-[3]' />
                        )}
                        {product.status}
                      </p>
                    </div>

                    <Link
                      to={`/product-details/${product.slug}`}
                      className='brand-red-gradient inline-flex h-10 shrink-0 items-center justify-center rounded-[6px] px-5 text-[10px] font-black uppercase tracking-[0.08em] text-white shadow-[0_7px_18px_rgba(230,1,3,0.25)] transition active:translate-y-0.5'
                    >
                      View Details
                    </Link>
                  </div>
                </div>
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default RelatedProduct
