import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { ArrowRight, ChevronUp, Minus, Plus, Shield, Trash2 } from 'lucide-react'
import {
  decreaseCartItemQuantity,
  increaseCartItemQuantity,
  removeCartItem,
  selectCartItems,
  selectCartSubtotal,
} from '../../features/cart/cartSlice'

const shippingCost = 15
const taxRate = 0.08

const formatCurrency = (value) =>
  new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(value)

const CartItem = ({ item }) => {
  const dispatch = useDispatch()
  const selectedOptions = [
    item.color && `Color: ${item.color}`,
    item.size && `Size: ${item.size}`,
    item.volumeTier && `Volume Tier: ${item.volumeTier}`,
    item.variants?.pack && `Option: ${item.variants.pack}`,
  ].filter(Boolean)

  return (
    <article className='grid gap-5 border border-white/10 bg-[#111112] p-4 sm:grid-cols-[128px_1fr_auto] lg:p-5'>
      <div className='grid aspect-square place-items-center bg-[#1a1a1b] p-4'>
        <img src={item.productImage} alt={item.productName} className='h-full w-full object-contain' />
      </div>

      <div className='min-w-0'>
        <div className='flex items-start justify-between gap-4'>
          <div className='min-w-0'>
            <h2 className='font-display text-[clamp(1.15rem,3vw,1.55rem)] font-black uppercase leading-tight text-white'>
              {item.productName}
            </h2>
            <p className='mt-2 text-sm text-white/50'>{selectedOptions.join(' | ')}</p>
            <p className='mt-2 text-xs font-semibold uppercase tracking-[0.12em] text-white/35'>
              Unit Price: {formatCurrency(item.unitPrice)}
            </p>
          </div>
          <p className='shrink-0 text-2xl font-black text-primary'>{formatCurrency(item.totalPrice)}</p>
        </div>

        <div className='mt-5 flex w-fit items-center overflow-hidden rounded-[6px] border border-white/10 bg-black'>
          <button
            type='button'
            aria-label={`Decrease ${item.productName} quantity`}
            onClick={() => dispatch(decreaseCartItemQuantity(item.key))}
            className='grid size-10 place-items-center text-white/65 transition hover:bg-white/8 hover:text-primary'
          >
            <Minus size={16} />
          </button>
          <span className='grid h-10 min-w-12 place-items-center border-x border-white/10 px-4 text-sm font-black text-white'>
            {item.quantity}
          </span>
          <button
            type='button'
            aria-label={`Increase ${item.productName} quantity`}
            onClick={() => dispatch(increaseCartItemQuantity(item.key))}
            className='grid size-10 place-items-center text-white/65 transition hover:bg-white/8 hover:text-primary'
          >
            <Plus size={16} />
          </button>
        </div>
      </div>

      <button
        type='button'
        aria-label={`Remove ${item.productName}`}
        onClick={() => dispatch(removeCartItem(item.key))}
        className='self-start justify-self-end text-white/45 transition hover:text-primary sm:pt-20'
      >
        <Trash2 size={20} />
      </button>
    </article>
  )
}

const AddCart = () => {
  const cartItems = useSelector(selectCartItems)
  const subtotal = useSelector(selectCartSubtotal)
  const tax = subtotal * taxRate
  const shipping = cartItems.length > 0 ? shippingCost : 0
  const total = subtotal + shipping + tax

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
            {cartItems.length > 0 ? (
              cartItems.map((item) => (
                <CartItem key={item.key} item={item} />
              ))
            ) : (
              <div className='border border-white/10 bg-[#111112] px-5 py-12 text-center'>
                <h2 className='text-xl font-black uppercase text-white'>Your cart is empty</h2>
                <p className='mx-auto mt-3 max-w-md text-sm leading-6 text-white/50'>
                  Add products from the inventory to build your order.
                </p>
                <Link
                  to='/products/grenades-smoke'
                  className='brand-red-gradient mt-6 inline-flex h-12 items-center justify-center rounded-[6px] px-7 text-xs font-black uppercase tracking-[0.12em] text-white'
                >
                  Browse Products
                </Link>
              </div>
            )}
          </div>

          <aside className='h-fit border border-white/10 bg-[#111112] p-4 lg:sticky lg:top-28'>
            <h2 className='text-xl font-black text-white'>Order Summary</h2>
            <div className='mt-6 border-t border-white/8 pt-6'>
              {[
                ['Subtotal', formatCurrency(subtotal)],
                ['Shipping (Standard)', formatCurrency(shipping)],
                ['Tax (Estimated)', formatCurrency(tax)],
              ].map(([label, value]) => (
                <div key={label} className='mb-5 flex items-center justify-between gap-4 text-sm'>
                  <span className='text-white/45'>{label}</span>
                  <span className='font-semibold text-white'>{value}</span>
                </div>
              ))}
            </div>

            <div className='mt-2 flex items-center justify-between border-t border-white/8 pt-5'>
              <span className='text-base font-black uppercase text-white'>Total</span>
              <span className='text-[clamp(1.8rem,4vw,2rem)] font-black text-primary'>
                {formatCurrency(total)}
              </span>
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

            <Link
              to='/checkout'
              className={`brand-red-gradient mt-8 inline-flex h-14 w-full items-center justify-center gap-3 text-base font-black text-white shadow-[0_10px_28px_rgba(230,1,3,0.25)] ${
                cartItems.length === 0 ? 'pointer-events-none opacity-45' : ''
              }`}
            >
              Proceed To Checkout
              <ArrowRight size={24} strokeWidth={3} />
            </Link>

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
