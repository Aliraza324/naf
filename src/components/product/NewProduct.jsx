import { Link } from 'react-router-dom'
import { AlertCircle, CheckCircle2 } from 'lucide-react'
import { mostSaleProducts } from '../../data/mostSaleProducts'

const newProducts = mostSaleProducts.slice(0, 4)

const NewProduct = () => {
  return (
    <section className='bg-page px-4 py-12 text-white sm:py-16 lg:px-6'>
      <div className='mx-auto max-w-[1180px]'>
        <h2 className='font-display text-[clamp(2rem,4vw,2.9rem)] font-black uppercase italic leading-none tracking-[0.01em] text-white'>
          New Products
        </h2>

        <div className='mt-10 grid gap-5 sm:grid-cols-2 xl:grid-cols-4'>
          {newProducts.map((product) => {
            const isLowStock = product.status === 'LOW STOCK'

            return (
              <article
                key={product.id}
                className='group flex min-h-[395px] flex-col overflow-hidden rounded-[12px] border border-primary/20 bg-[#090908] transition duration-300 hover:-translate-y-1 hover:border-primary/70 hover:shadow-[0_0_30px_rgba(230,1,3,0.14)]'
              >
                <div className='relative grid aspect-[1.35] min-h-[210px] place-items-center bg-black px-6 py-7'>
                  {product.badge && (
                    <span className='absolute right-0 top-0 bg-primary px-3 py-2 text-[10px] font-black uppercase leading-none tracking-[0.02em] text-white'>
                      {product.badge}
                    </span>
                  )}

                  <img
                    src={product.image}
                    alt={product.title}
                    loading='lazy'
                    decoding='async'
                    className='h-full max-h-[165px] w-full object-contain transition duration-500 group-hover:scale-105'
                  />
                </div>

                <div className='flex flex-1 flex-col px-5 pb-5 pt-5'>
                  <p className='text-[10px] font-black uppercase leading-none tracking-[0.18em] text-primary'>
                    {product.category}
                  </p>

                  <h3 className='mt-3 min-h-[50px] text-[clamp(0.6rem,1.2vw,0.9rem)] font-black  text-white transition duration-300 group-hover:text-primary'>
                    {product.title}
                  </h3>

                  <div className='mt-auto flex items-end justify-between gap-4 pt-7'>
                    <div className='min-w-0'>
                      <p className='text-base font-black leading-none text-white/85'>
                        {product.price}
                      </p>

                      <p
                        className={`mt-3 flex items-center gap-1.5 text-[10px] font-black uppercase leading-none tracking-[0.12em] ${
                          isLowStock ? 'text-primary' : 'text-[#27d86c]'
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
                      to={`/products/${product.slug}`}
                      className='brand-red-gradient inline-flex h-10 shrink-0 items-center justify-center rounded-[6px] px-5 text-[11px] font-black uppercase tracking-[0.08em] text-white shadow-[0_6px_18px_rgba(230,1,3,0.25)] transition hover:bg-primary-hover active:translate-y-0.5'
                    >
                      View More
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

export default NewProduct
