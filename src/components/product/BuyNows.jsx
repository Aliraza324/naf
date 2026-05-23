import { useState } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { Check, ChevronDown, Lock, Shield, Truck, Plane } from 'lucide-react'
import PaymentMethod from './PaymentMethod'
import { selectCartItems, selectCartSubtotal } from '../../features/cart/cartSlice'

const Input = ({ label, className = '', ...props }) => (
  <div className={`flex flex-col gap-2 ${className}`}>
    <label className='text-[11px] font-semibold uppercase text-white/50'>{label}</label>
    <input
      className='h-[50px] w-full rounded-[6px] border border-white/10 bg-[#0a0a0a] px-4 text-sm text-white outline-none transition placeholder:text-white/30 focus:border-primary focus:ring-1 focus:ring-primary/20'
      {...props}
    />
  </div>
)

const Select = ({ label, options, className = '', ...props }) => (
  <div className={`flex flex-col gap-2 ${className}`}>
    <label className='text-[11px] font-semibold uppercase text-white/50'>{label}</label>
    <div className='relative'>
      <select
        className='h-[50px] w-full appearance-none rounded-[6px] border border-white/10 bg-[#0a0a0a] px-4 text-sm text-white outline-none transition focus:border-primary focus:ring-1 focus:ring-primary/20'
        {...props}
      >
        {options.map((opt) => (
          <option key={opt} value={opt}>
            {opt}
          </option>
        ))}
      </select>
      <ChevronDown
        size={16}
        className='absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-white/50'
      />
    </div>
  </div>
)

const taxRate = 0.08

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
          productName: item.productName,
          productImage: item.productImage,
          packagePrice: item.packagePrice ?? item.unitPrice,
          volumeTier: item.volumeTier,
          colors: new Set(),
          sizes: new Set(),
          quantity: 0,
        }
      }

      groups[groupKey].colors.add(item.color)
      groups[groupKey].sizes.add(item.size)
      groups[groupKey].quantity += item.quantity
      return groups
    }, {}),
  ).map((group) => ({
    ...group,
    colors: [...group.colors].filter(Boolean).join(', '),
    sizes: [...group.sizes].filter(Boolean).join(', '),
  }))

const BuyNows = () => {
  const [shippingMethod, setShippingMethod] = useState('standard')
  const [sameBilling, setSameBilling] = useState(true)
  const cartItems = useSelector(selectCartItems)
  const subtotal = useSelector(selectCartSubtotal)
  const groupedItems = groupCartItems(cartItems)
  const shipping = shippingMethod === 'standard' ? 9.99 : 24.99
  const activeShipping = cartItems.length > 0 ? shipping : 0
  const tax = subtotal * taxRate
  const total = subtotal + activeShipping + tax

  return (
    <main className='bg-page min-h-screen px-4 py-8 lg:p-12 text-white flex justify-center'>
      <div className='w-full max-w-6xl grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-8'>
        
        {/* LEFT COLUMN: FORMS */}
        <div className='flex flex-col gap-8'>
          
          {/* STEP 1: Customer Information */}
          <section className='bg-[#131313] rounded-[12px] p-6 lg:p-8 border border-white/5'>
            <header className='flex justify-between items-center mb-6'>
              <div className='flex items-center gap-4'>
                <span className='bg-primary/20 text-primary font-black text-xs px-2.5 py-1 rounded-[4px]'>01</span>
                <h2 className='text-lg font-bold'>Customer Information</h2>
              </div>
              <span className='text-[11px] text-white/50'>
                Already have an account? <Link to='/login' className='text-primary hover:underline ml-1'>Log in</Link>
              </span>
            </header>
            <form className='grid gap-5'>
              <div className='grid grid-cols-1 sm:grid-cols-2 gap-5'>
                <Input label='First Name' placeholder='John' />
                <Input label='Last Name' placeholder='Doe' />
              </div>
              <Input label='Company (Optional)' placeholder='Tactical Solutions Inc.' />
              <Input label='Email Address' placeholder='john.doe@example.com' type='email' />
              <Input label='Phone Number' placeholder='+1 (555) 000-0000' type='tel' />
            </form>
          </section>

          {/* STEP 2: Shipping Address */}
          <section className='bg-[#131313] rounded-[12px] p-6 lg:p-8 border border-white/5'>
            <header className='flex items-center gap-4 mb-6'>
              <span className='bg-primary/20 text-primary font-black text-xs px-2.5 py-1 rounded-[4px]'>02</span>
              <h2 className='text-lg font-bold'>Shipping Address</h2>
            </header>
            <form className='grid gap-5'>
              <Select label='Country / Region' options={['United States', 'Canada', 'United Kingdom']} defaultValue='United States' />
              <Input label='Street Address' placeholder='123 Alpha Base Rd' />
              <Input label='Apt, Suite, Unit (Optional)' placeholder='Bldg 4, Unit 2B' />
              <div className='grid grid-cols-1 sm:grid-cols-2 gap-5'>
                <Input label='City' placeholder='Los Angeles' />
                <Select label='State / Province' options={['California', 'New York', 'Texas']} defaultValue='California' />
              </div>
              <Input label='ZIP / Postal Code' placeholder='90001' />
              
              <label className='flex items-center gap-3 mt-2 cursor-pointer select-none group'>
                <div 
                   className={`size-4 flex items-center justify-center rounded-[3px] border transition ${sameBilling ? 'bg-[#0070f3] border-[#0070f3]' : 'bg-transparent border-white/30 group-hover:border-white/50'}`}
                >
                   {sameBilling && <Check size={12} strokeWidth={4} className='text-white' />}
                </div>
                {/* Hidden input to make it accessible */}
                <input 
                   type='checkbox' 
                   className='sr-only' 
                   checked={sameBilling} 
                   onChange={(e) => setSameBilling(e.target.checked)} 
                />
                <span className='text-xs text-white/60'>Billing address is same as shipping</span>
              </label>
            </form>
          </section>

          {/* STEP 3: Shipping Method */}
          <section className='bg-[#131313] rounded-[12px] p-6 lg:p-8 border border-white/5'>
            <header className='flex items-center gap-4 mb-6'>
              <span className='bg-primary/20 text-primary font-black text-xs px-2.5 py-1 rounded-[4px]'>03</span>
              <h2 className='text-lg font-bold'>Shipping Method</h2>
            </header>
            <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
              <button 
                type='button'
                onClick={() => setShippingMethod('standard')}
                className={`p-5 rounded-[8px] border text-left transition ${shippingMethod === 'standard' ? 'border-[#ffb020] bg-[#ffb020]/[0.02]' : 'border-white/10 hover:border-white/30 bg-[#0a0a0a]'}`}
              >
                <div className='flex justify-between items-center mb-1'>
                  <div className='flex gap-3 items-center text-sm font-bold text-white'>
                    <Truck size={16} className={shippingMethod === 'standard' ? 'text-white' : 'text-white/50'} /> Standard Ground
                  </div>
                  <span className='text-sm font-bold text-white'>$9.99</span>
                </div>
                <div className='text-xs text-white/50 ml-7'>3-5 Business Days</div>
              </button>

              <button 
                type='button'
                onClick={() => setShippingMethod('express')}
                className={`p-5 rounded-[8px] border text-left transition ${shippingMethod === 'express' ? 'border-[#ffb020] bg-[#ffb020]/[0.02]' : 'border-white/10 hover:border-white/30 bg-[#0a0a0a]'}`}
              >
                <div className='flex justify-between items-center mb-1'>
                  <div className='flex gap-3 items-center text-sm font-bold text-white'>
                    <Plane size={16} className={shippingMethod === 'express' ? 'text-white' : 'text-white/50'} /> Express Air
                  </div>
                  <span className='text-sm font-bold text-white'>$24.99</span>
                </div>
                <div className='text-xs text-white/50 ml-7'>1-2 Business Days</div>
              </button>
            </div>
          </section>

          {/* STEP 4: Payment Method */}
          <PaymentMethod />

        </div>

        {/* RIGHT COLUMN: ORDER SUMMARY */}
        <aside className='self-start lg:sticky lg:top-8'>
          <div className='bg-[#131313] rounded-[12px] p-6 lg:p-7 border border-white/5'>
            <h2 className='text-[11px] font-black uppercase tracking-[0.2em] text-white/50 mb-7'>Order Summary</h2>
            
            <div className='mb-8 grid gap-4'>
              {groupedItems.length > 0 ? (
                groupedItems.map((item) => (
                  <div key={item.key} className='flex gap-4 items-center'>
                    <div className='size-[72px] bg-[#1a1a1b] rounded-[6px] border border-white/5 p-2 relative flex-shrink-0'>
                      <span className='absolute -top-2.5 -right-2.5 bg-primary text-white text-[10px] font-bold size-[22px] rounded-full flex items-center justify-center shadow-md'>
                        {item.quantity}
                      </span>
                      <img src={item.productImage} alt={item.productName} className='w-full h-full object-contain' />
                    </div>
                    <div className='min-w-0'>
                      <h3 className='text-sm font-bold text-white truncate'>{item.productName}</h3>
                      <p className='text-[10px] font-medium text-white/40 mt-1 uppercase tracking-wider'>
                        {item.colors} | {item.sizes} | {item.volumeTier}
                      </p>
                      <p className='text-sm font-bold text-white mt-2'>{formatCurrency(item.packagePrice)}</p>
                    </div>
                  </div>
                ))
              ) : (
                <p className='text-sm text-white/50'>Your cart is empty.</p>
              )}
            </div>
            
            {/* Discount Code */}
            <div className='mb-7 border-b border-white/5 pb-7'>
              <label className='text-[10px] font-black uppercase tracking-[0.2em] text-white/50 mb-3 block'>Discount Code</label>
              <div className='flex gap-2'>
                <input 
                  className='h-[42px] flex-1 bg-black border border-white/10 rounded-[6px] px-4 text-xs font-semibold uppercase text-white outline-none placeholder:text-white/30 focus:border-primary focus:ring-1 focus:ring-primary/20 transition' 
                  placeholder='ENTER CODE' 
                />
                <button 
                  type='button'
                  className='h-[42px] px-6 bg-white/5 border border-white/10 rounded-[6px] text-xs font-bold uppercase transition hover:bg-white/10 hover:border-white/20'
                >
                  Apply
                </button>
              </div>
            </div>
            
            {/* Totals */}
            <div className='space-y-4 text-xs font-medium'>
              <div className='flex justify-between text-white/60'>
                <span>Subtotal</span>
                <span className='text-white'>{formatCurrency(subtotal)}</span>
              </div>
              <div className='flex justify-between text-white/60'>
                <span>Shipping ({shippingMethod === 'standard' ? 'Standard' : 'Express'})</span>
                <span className='text-white'>{formatCurrency(activeShipping)}</span>
              </div>
              <div className='flex justify-between text-white/60'>
                <span>Tax (Calculated)</span>
                <span className='text-white'>{formatCurrency(tax)}</span>
              </div>
            </div>
            
            <div className='flex justify-between items-center mt-7 pt-7 border-t border-white/5'>
              <span className='font-bold text-lg'>Total</span>
              <span className='text-primary font-black text-3xl'>{formatCurrency(total)}</span>
            </div>
            
            <button 
              type='button'
              className='w-full mt-8 h-14 brand-red-gradient text-white rounded-[6px] font-black text-sm tracking-[0.05em] uppercase hover:opacity-90 transition shadow-[0_10px_28px_rgba(230,1,3,0.25)] flex items-center justify-center gap-2.5'
            >
              <Lock size={16} strokeWidth={2.5} /> COMPLETE SECURE ORDER
            </button>
            
            <div className='flex justify-center items-center gap-2 mt-5 text-[10px] font-medium text-white/40'>
              <Shield size={14} /> SSL Encrypted Checkout
            </div>
          </div>
        </aside>
      </div>
    </main>
  )
}

export default BuyNows
