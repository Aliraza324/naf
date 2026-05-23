import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, ChevronUp, Shield, Trash2 } from 'lucide-react'
import smokeImage from '../../assets/images/smoke.png'

const cartItems = [
  { id: 'cart-1', title: 'Grenades & Smoke Products', price: '$120' },
  { id: 'cart-2', title: 'Grenades & Smoke Products', price: '$120' },
]

const packRows = [
  {
    color: 'Red Smog',
    swatch: 'bg-primary',
    packs: ['4', '5', '10', '1'],
  },
  {
    color: 'Yellow Somg',
    swatch: 'bg-[#ffc928]',
    packs: ['0', '0', '5', '0'],
  },
  {
    color: 'White Smog',
    swatch: 'bg-white',
    packs: ['0', '0', '0', '0'],
  },
]

const PackMatrix = ({ itemId }) => {
  const [selectedPacksByColor, setSelectedPacksByColor] = useState({})

  const togglePack = (color, packId) => {
    setSelectedPacksByColor((currentPacks) => ({
      ...currentPacks,
      [color]: currentPacks[color] === packId ? null : packId,
    }))
  }

  return (
    <div className='w-full overflow-x-auto rounded-[9px] border border-white/8 bg-black'>
      <div className='min-w-[520px]'>
        <div className='grid grid-cols-[1.2fr_repeat(4,0.9fr)] bg-[#1d1d20] px-4 py-3 text-[8px] font-black uppercase tracking-[0.08em] text-white/50'>
          <span>Color / Packs</span>
          <span className='text-center'>Pack ( 10 pic )</span>
          <span className='text-center'>Pack ( 20 pic )</span>
          <span className='text-center'>Pack ( 40 pic )</span>
          <span className='text-center'>Pack ( 80 pic )</span>
        </div>

        {packRows.map((row) => (
          <div
            key={row.color}
            className='grid grid-cols-[1.2fr_repeat(4,0.9fr)] items-center gap-3 border-t border-white/6 px-4 py-3 text-[10px]'
          >
            <div className='flex min-w-0 items-center gap-3'>
              <span className={`size-3 shrink-0 rounded-full ${row.swatch}`} />
              <span className='truncate font-bold text-white/80'>{row.color}</span>
            </div>

            {row.packs.map((pack, index) => {
              const packId = `${itemId}-${row.color}-${index}`
              const isAvailable = pack !== '0'
              const isSelected = selectedPacksByColor[row.color] === packId

              return (
                <button
                  key={packId}
                  type='button'
                  disabled={!isAvailable}
                  onClick={() => togglePack(row.color, packId)}
                  className={`rounded-[4px] border px-3 py-2 text-center font-semibold transition ${isSelected
                    ? 'border-primary bg-[#1a0909] text-white'
                    : 'border-transparent bg-white/10 text-white/45'
                    } ${isAvailable
                      ? 'cursor-pointer hover:border-primary/70 hover:text-white'
                      : 'cursor-not-allowed opacity-60'
                    }`}
                >
                  {pack}
                </button>
              )
            })}
          </div>
        ))}
      </div>
    </div>
  )
}

const CartItem = ({ item }) => (
  <article className='grid gap-5 border border-white/10 bg-[#111112] p-4 sm:grid-cols-[128px_1fr_auto] lg:p-5'>
    <div className='grid aspect-square place-items-center bg-[#1a1a1b] p-4'>
      <img src={smokeImage} alt='' className='h-full w-full object-contain' />
    </div>

    <div className='min-w-0'>
      <div className='flex items-start justify-between gap-4'>
        <div className='min-w-0'>
          <h2 className='font-display text-[clamp(1.25rem,3vw,1.7rem)] font-black uppercase leading-tight text-white'>
            {item.title}
          </h2>
          <p className='mt-2 text-sm text-white/50'>Color: red&nbsp; Black | pack (10 pic )</p>
        </div>
        <p className='shrink-0 text-2xl font-black text-primary'>{item.price}</p>
      </div>

      <div className='mt-5'>
        <PackMatrix itemId={item.id} />
      </div>
    </div>

    <button
      type='button'
      aria-label='Remove item'
      className='self-start justify-self-end text-white/45 transition hover:text-primary sm:pt-20'
    >
      <Trash2 size={20} />
    </button>
  </article>
)

const AddCart = () => {
  return (
    <main className='bg-page px-4 py-8 text-white lg:px-6'>
      <div className='mx-auto max-w-6xl'>
        <nav className='flex flex-wrap items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.22em] text-white/50'>
          <Link to='/' className='transition hover:text-white'>Home</Link>
          <span>/</span>
          <Link to='/products/grenades-smoke' className='transition hover:text-white'>Products</Link>
          <span>/</span>
          <span className='text-primary'>Cart</span>
        </nav>

        <header className='mt-7 max-w-[670px]'>
          <h1 className='font-display text-[clamp(2rem,6vw,3.4rem)] font-black uppercase italic leading-none text-white'>
            Your Loadout
          </h1>
          <p className='mt-5 border-l-2 border-primary pl-4 text-base leading-7 text-white/55 sm:text-lg'>
            Review your selected gear before heading to secure checkout. Prepare for deployment.
          </p>
        </header>

        <div className='mt-10 grid gap-8 lg:grid-cols-[1fr_340px] xl:grid-cols-[1fr_360px]'>
          <div className='grid gap-6'>
            {cartItems.map((item) => (
              <CartItem key={item.id} item={item} />
            ))}
          </div>

          <aside className='h-fit border border-white/10 bg-[#111112] p-4 lg:sticky lg:top-28'>
            <h2 className='text-xl font-black text-white'>Order Summary</h2>
            <div className='mt-6 border-t border-white/8 pt-6'>
              {[
                ['Subtotal', '$570.00'],
                ['Shipping (Standard)', '$15.00'],
                ['Tax (Estimated)', '$45.60'],
              ].map(([label, value]) => (
                <div key={label} className='mb-5 flex items-center justify-between gap-4 text-sm'>
                  <span className='text-white/45'>{label}</span>
                  <span className='font-semibold text-white'>{value}</span>
                </div>
              ))}
            </div>

            <div className='mt-2 flex items-center justify-between border-t border-white/8 pt-5'>
              <span className='text-base font-black uppercase text-white'>Total</span>
              <span className='text-[clamp(1.8rem,4vw,2rem)] font-black text-primary'>$630.60</span>
            </div>



            <div className='mt-8'>
              <label
                htmlFor='promo-code'
                className='text-[11px] font-black uppercase tracking-[0.2em] text-white/45'
              >
                Promo Code
              </label>

              <div className='mt-3 flex items-center gap-2'>
                <input
                  id='promo-code'
                  type='text'
                  placeholder='ENTER CODE'
                  className='h-11 w-full border border-white/10 bg-black px-4 text-xs font-semibold uppercase text-white outline-none placeholder:text-white/25 focus:border-red-600'
                />

                <button
                  type='button'
                  className='h-11 min-w-[100px] border border-white/10 bg-white/5 px-5 text-xs font-black uppercase text-white transition hover:border-red-600'
                >
                  Apply
                </button>
              </div>
            </div>



            <button
              type='button'
              className='brand-red-gradient mt-8 inline-flex h-14 w-full items-center justify-center gap-3 text-base font-black text-white shadow-[0_10px_28px_rgba(230,1,3,0.25)]'
            >
              Proceed To Checkout
              <ArrowRight size={24} strokeWidth={3} />
            </button>

            <div className='mt-8 flex items-center justify-center gap-6 text-white/55'>
              <span className='rounded bg-white/70 px-1.5 py-0.5 text-[10px] font-black text-black'>VISA</span>
              <span className='rounded bg-white/70 px-1.5 py-0.5 text-[10px] font-black text-black'>MC</span>
              <Shield size={22} />
            </div>
          </aside>
        </div>
      </div>

      <button
        type='button'
        aria-label='Back to top'
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className='fixed bottom-6 right-5 z-40 grid size-11 place-items-center rounded-[10px] bg-primary text-white shadow-[0_10px_28px_rgba(230,1,3,0.32)]'
      >
        <ChevronUp size={18} />
      </button>
    </main>
  )
}

export default AddCart
