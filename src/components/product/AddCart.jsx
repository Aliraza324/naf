import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { ArrowRight, ChevronUp, Shield, Trash2 } from 'lucide-react'
import {
  removeCartItems,
  selectCartItems,
  selectCartSubtotal,
  updateCartItemQuantity,
} from '../../features/cart/cartSlice'
import toast from '../../utils/toast'

const shippingCost = 15
const taxRate = 0.08

const swatchClasses = {
  'Stealth Black': 'border border-white/40 bg-transparent',
  'Desert Tan': 'bg-[#d9b982]',
  'Olive Drab': 'bg-[#718436]',
  'Red Smog': 'bg-primary',
  'Yellow Somg': 'bg-[#ffc928]',
  'White Smog': 'bg-white',
}

const packColumns = [
  { label: 'Pack ( 10 pic )', size: '10 pic' },
  { label: 'Pack ( 20 pic )', size: '20 pic' },
  { label: 'Pack ( 40 pic )', size: '40 pic' },
  { label: 'Pack ( 80 pic )', size: '80 pic' },
]

const getTierRules = (volumeTier) => {
  if (volumeTier?.startsWith('1 - 10')) return { min: 1, max: 10 }
  if (volumeTier?.startsWith('11 - 50')) return { min: 11, max: 50 }
  if (volumeTier?.startsWith('51+')) return { min: 51, max: null }
  return { min: 1, max: null }
}

const getTierQuantityMessage = (volumeTier) => {
  const { min, max } = getTierRules(volumeTier)

  if (max) {
    return `Selected tier requires ${min} to ${max} pieces.`
  }

  return `Selected tier requires at least ${min} pieces.`
}

const formatCurrency = (value) =>
  new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(value)

const groupCartItems = (items) =>
  Object.values(
    items.reduce((groups, item) => {
      const groupKey = [item.productId, item.volumeTier, item.price].join('|')

      if (!groups[groupKey]) {
        groups[groupKey] = {
          key: groupKey,
          productId: item.productId,
          productName: item.productName,
          productImage: item.productImage,
          price: item.price,
          unitPrice: item.packagePrice ?? item.unitPrice,
          volumeTier: item.volumeTier,
          items: [],
        }
      }

      groups[groupKey].items.push(item)
      return groups
    }, {}),
  )

const CartMatrix = ({ group }) => {
  const dispatch = useDispatch()
  const colors = [...new Set(group.items.map((item) => item.color))]
  const getLineItem = (color, column) =>
    group.items.find(
      (item) =>
        item.color === color &&
        (item.size === column.size || item.variants?.pack === column.label),
    )

  const handleQuantityChange = (item, value) => {
    const numericValue = value.replace(/\D/g, '')
    const quantity = numericValue ? Number(numericValue) : 0

    const nextGroupQuantity = group.items.reduce((total, groupItem) => {
      if (groupItem.key === item.key) return total + quantity
      return total + groupItem.quantity
    }, 0)
    const { min, max } = getTierRules(group.volumeTier)

    if (max && nextGroupQuantity > max) {
      toast.error(getTierQuantityMessage(group.volumeTier))
      return
    }

    if (nextGroupQuantity > 0 && nextGroupQuantity < min) {
      toast.error(getTierQuantityMessage(group.volumeTier))
      return
    }

    dispatch(updateCartItemQuantity({ key: item.key, quantity }))
  }

  return (
    <div className='mt-3 w-full overflow-x-auto rounded-[5px] border border-white/8 bg-black'>
      <div className='min-w-[480px]'>
        <div className='grid grid-cols-[1.2fr_repeat(4,0.9fr)] bg-[#1d1d20] px-3 py-2 text-[7px] font-black uppercase tracking-[0.08em] text-white/50'>
          <span>Color / Packs</span>
          {packColumns.map((column) => (
            <span key={column.label} className='text-center'>{column.label}</span>
          ))}
        </div>

        {colors.map((color) => (
          <div
            key={color}
            className='grid grid-cols-[1.2fr_repeat(4,0.9fr)] items-center gap-3 border-t border-white/6 px-3 py-2 text-[9px]'
          >
            <div className='flex min-w-0 items-center gap-2'>
              <span className={`size-2.5 shrink-0 rounded-full ${swatchClasses[color] || 'bg-white/40'}`} />
              <span className='truncate font-bold text-white/80'>{color}</span>
            </div>

            {packColumns.map((column) => {
              const lineItem = getLineItem(color, column)
              const value = lineItem?.quantity ?? 0

              return (
                <input
                  key={`${color}-${column.label}`}
                  aria-label={`${color} ${column.label} cart quantity`}
                  type='number'
                  inputMode='numeric'
                  min='0'
                  disabled={!lineItem}
                  value={value}
                  onChange={(event) => handleQuantityChange(lineItem, event.target.value)}
                  className={`h-7 w-full rounded-[3px] border bg-white/8 px-2 text-center text-[10px] font-semibold outline-none transition [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none ${
                    value > 0
                      ? 'border-primary text-white focus:border-primary'
                      : 'border-transparent text-white/35'
                  } ${lineItem ? 'hover:border-primary/70' : 'cursor-not-allowed opacity-60'}`}
                />
              )
            })}
          </div>
        ))}
      </div>
    </div>
  )
}

const CartGroup = ({ group }) => {
  const dispatch = useDispatch()
  const groupTotal = group.unitPrice
  const quantity = group.items.reduce((total, item) => total + item.quantity, 0)

  return (
    <article className='grid gap-4 border border-white/10 bg-[#111112] p-4 sm:grid-cols-[92px_1fr_auto]'>
      <div className='grid aspect-square place-items-center bg-[#1a1a1b] p-3'>
        <img src={group.productImage} alt={group.productName} className='h-full w-full object-contain' />
      </div>

      <div className='min-w-0'>
        <div className='flex items-start justify-between gap-3'>
          <div className='min-w-0'>
            <h2 className='truncate text-base font-black uppercase leading-tight text-white sm:text-lg'>
              {group.productName}
            </h2>
            <p className='mt-1 text-[10px] text-white/45'>
              Qty: {quantity} | {group.volumeTier} | Tier Price: {formatCurrency(group.unitPrice)}
            </p>
          </div>
          <p className='shrink-0 text-xl font-black text-primary'>{formatCurrency(groupTotal)}</p>
        </div>

        <CartMatrix group={group} />
      </div>

      <button
        type='button'
        aria-label={`Remove ${group.productName}`}
        onClick={() => dispatch(removeCartItems(group.items.map((item) => item.key)))}
        className='self-start justify-self-end pt-1 text-white/45 transition hover:text-primary sm:pt-20'
      >
        <Trash2 size={18} />
      </button>
    </article>
  )
}

const AddCart = () => {
  const cartItems = useSelector(selectCartItems)
  const subtotal = useSelector(selectCartSubtotal)
  const groupedItems = groupCartItems(cartItems)
  const tax = subtotal * taxRate
  const shipping = cartItems.length > 0 ? shippingCost : 0
  const total = subtotal + shipping + tax

  return (
    <main className='bg-page px-4 py-8 text-white lg:px-6'>
      <div className='mx-auto max-w-6xl'>
        <div className='grid gap-6 lg:grid-cols-[1fr_300px] xl:grid-cols-[1fr_320px]'>
          <div className='grid content-start gap-5'>
            {groupedItems.length > 0 ? (
              groupedItems.map((group) => (
                <CartGroup key={group.key} group={group} />
              ))
            ) : (
              <div className='border border-white/10 bg-[#111112] px-5 py-12 text-center'>
                <h1 className='text-xl font-black uppercase text-white'>Your cart is empty</h1>
                <p className='mx-auto mt-3 max-w-md text-sm leading-6 text-white/50'>
                  Add products from the inventory to build your order.
                </p>
                <Link
                  to='/'
                  className='brand-red-gradient mt-6 inline-flex h-12 items-center justify-center rounded-[6px] px-7 text-xs font-black uppercase tracking-[0.12em] text-white'
                >
                  Browse Products
                </Link>
              </div>
            )}
          </div>

          <aside className='h-fit border border-white/10 bg-[#111112] p-5 lg:sticky lg:top-28'>
            <h2 className='text-sm font-black text-white'>Order Summary</h2>
            <div className='mt-6 border-t border-white/8 pt-5'>
              {[
                ['Subtotal', formatCurrency(subtotal)],
                ['Shipping (Standard)', formatCurrency(shipping)],
                ['Tax (Estimated)', formatCurrency(tax)],
              ].map(([label, value]) => (
                <div key={label} className='mb-4 flex items-center justify-between gap-4 text-[10px]'>
                  <span className='text-white/45'>{label}</span>
                  <span className='font-semibold text-white'>{value}</span>
                </div>
              ))}
            </div>

            <div className='mt-2 flex items-center justify-between border-t border-white/8 pt-5'>
              <span className='text-xs font-black uppercase text-white'>Total</span>
              <span className='text-2xl font-black text-primary'>{formatCurrency(total)}</span>
            </div>

            <div className='mt-7'>
              <label
                htmlFor='promo-code'
                className='text-[9px] font-black uppercase tracking-[0.2em] text-white/45'
              >
                Promo Code
              </label>

              <div className='mt-3 flex items-center gap-2'>
                <input
                  id='promo-code'
                  type='text'
                  placeholder='ENTER CODE'
                  className='h-10 w-full border border-white/10 bg-black px-3 text-[10px] font-semibold uppercase text-white outline-none placeholder:text-white/25 focus:border-red-600'
                />

                <button
                  type='button'
                  className='h-10 min-w-[78px] border border-white/10 bg-white/5 px-4 text-[10px] font-black uppercase text-white transition hover:border-red-600'
                >
                  Apply
                </button>
              </div>
            </div>

            <Link
              to='/checkout'
              className={`brand-red-gradient mt-6 inline-flex h-14 w-full items-center justify-center gap-3 text-sm font-black text-white shadow-[0_10px_28px_rgba(232,12,12,0.25)] ${
                cartItems.length === 0 ? 'pointer-events-none opacity-45' : ''
              }`}
            >
              Proceed To Checkout
              <ArrowRight size={22} strokeWidth={3} />
            </Link>

            <div className='mt-7 flex items-center justify-center gap-6 text-white/55'>
              <span className='rounded bg-white/70 px-1.5 py-0.5 text-[9px] font-black text-black'>VISA</span>
              <span className='rounded bg-white/70 px-1.5 py-0.5 text-[9px] font-black text-black'>MC</span>
              <Shield size={20} />
            </div>
          </aside>
        </div>
      </div>

   
    </main>
  )
}

export default AddCart
