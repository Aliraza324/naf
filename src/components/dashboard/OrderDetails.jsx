import React from 'react'

const items = [
  {
    name: 'Enola Gaye WP40 Grenades',
    color: 'Red',
    colorClass: 'text-red-500',
    qty: 'Qty: 3 pack (10 pic ), 6 pack (40 pic )',
    price: '$45.00',
    img: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=80&q=80',
  },
  {
    name: 'Enola Gaye WP40 Grenades',
    color: 'Yellow',
    colorClass: 'text-yellow-400',
    qty: 'Qty: 1 pack (10 pic ), 2 pack (20 pic )',
    price: '$38.00',
    img: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=80&q=80',
  },
  {
    name: 'Enola Gaye WP40 Grenades',
    color: 'white',
    colorClass: 'text-neutral-300',
    qty: 'Qty: 1 pack (10 pic ), 2 pack (20 pic )',
    price: '$45.00',
    img: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=80&q=80',
  },
]

const journeySteps = [
  {
    label: 'Order Placed',
    sub: 'Oct 24, 2023 • 10:45 AM',
    done: true,
    extra: null,
  },
  {
    label: 'Processed',
    sub: 'Oct 25, 2023 • 02:15 PM',
    done: true,
    extra: null,
  },
  {
    label: 'Shipped',
    sub: 'Oct 26, 2023 • 09:30 AM',
    done: true,
    active: true,
    extra: 'Courier: DHL Express • Tracking: DL90234X',
  },
  {
    label: 'Out for Delivery',
    sub: 'Pending arrival at local hub',
    done: false,
    extra: null,
  },
]

export default function OrderDetails() {
  return (
    <div className="min-h-screen bg-neutral-950 text-white p-8 font-sans">

      {/* Page Header */}
      <div className="flex items-start justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-white mb-1">Order Details</h1>
          <div className="flex items-center gap-2">
            <span className="text-neutral-400 text-sm font-mono">#DL-90234</span>
            <span className="inline-flex items-center gap-1.5 border border-blue-700 text-blue-400 text-[10px] font-bold tracking-widest uppercase px-2.5 py-0.5 rounded-full">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-400" />
              PENDING
            </span>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 border border-neutral-600 text-white text-sm font-medium px-4 py-2 rounded-lg hover:bg-neutral-800 transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
            Export Invoice
          </button>
          <button className="bg-red-600 hover:bg-red-700 text-white text-sm font-bold px-5 py-2 rounded-lg transition-colors">
            Reorder
          </button>
        </div>
      </div>

      {/* Body Grid */}
      <div className="grid grid-cols-[280px_1fr] gap-5">

        {/* LEFT COLUMN */}
        <div className="flex flex-col gap-5">

          {/* Order Info Card */}
          <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-5 flex flex-col gap-5">
            <div>
              <p className="text-[10px] tracking-widest text-neutral-500 uppercase mb-1">Order Date</p>
              <p className="text-white font-semibold">October 24, 2023</p>
            </div>
            <div className="border-t border-neutral-800" />
            <div>
              <p className="text-[10px] tracking-widest text-neutral-500 uppercase mb-1">Total Amount</p>
              <p className="text-red-500 text-2xl font-bold">$128.00</p>
            </div>
            <div className="border-t border-neutral-800" />
            <div>
              <p className="text-[10px] tracking-widest text-neutral-500 uppercase mb-1">Estimated Arrival</p>
              <p className="text-white font-semibold">Oct 28 – Oct 30</p>
            </div>
          </div>

          {/* Journey Status Card */}
          <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-5">
            <p className="text-[10px] tracking-widest text-neutral-500 uppercase mb-5">Journey Status</p>
            <div className="flex flex-col gap-0">
              {journeySteps.map((step, i) => (
                <div key={i} className="flex gap-3">
                  {/* Icon + line */}
                  <div className="flex flex-col items-center">
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 z-10 ${
                      step.done
                        ? step.active
                          ? 'bg-red-600'
                          : 'bg-red-600'
                        : 'bg-neutral-700'
                    }`}>
                      {step.done ? (
                        <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                      ) : (
                        <div className="w-2 h-2 rounded-full bg-neutral-500" />
                      )}
                    </div>
                    {i < journeySteps.length - 1 && (
                      <div className={`w-px flex-1 my-1 ${step.done ? 'bg-red-800' : 'bg-neutral-800'}`} style={{ minHeight: '24px' }} />
                    )}
                  </div>

                  {/* Content */}
                  <div className="pb-5">
                    <p className={`text-sm font-semibold ${step.done ? 'text-white' : 'text-neutral-500'}`}>{step.label}</p>
                    <p className={`text-xs mt-0.5 ${step.done ? 'text-neutral-400' : 'text-neutral-600'}`}>{step.sub}</p>
                    {step.extra && (
                      <div className="mt-2 bg-neutral-800 border border-neutral-700 rounded-lg px-3 py-2 text-xs text-neutral-300">
                        {step.extra}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN */}
        <div className="flex flex-col gap-5">

          {/* Items Card */}
          <div className="bg-neutral-900 border border-neutral-800 rounded-2xl overflow-hidden">
            <div className="px-6 pt-5 pb-3">
              <p className="text-[10px] tracking-widest text-red-500 uppercase font-bold">Items in Your Collection</p>
            </div>

            {items.map((item, i) => (
              <div key={i} className={`flex items-center gap-4 px-6 py-4 ${i < items.length - 1 ? 'border-b border-neutral-800' : ''}`}>
                <div className="w-14 h-14 bg-neutral-800 rounded-xl overflow-hidden shrink-0">
                  <img src={item.img} alt={item.name} className="w-full h-full object-cover" />
                </div>
                <div className="flex-1">
                  <p className="text-white font-semibold text-sm">{item.name}</p>
                  <p className={`text-xs mt-0.5 ${item.colorClass}`}>Color: {item.color}</p>
                </div>
                <div className="text-right">
                  <p className="text-neutral-400 text-xs mb-1">{item.qty}</p>
                  <p className="text-white font-bold">{item.price}</p>
                </div>
              </div>
            ))}

            {/* Totals — Red Banner */}
            <div className="bg-red-600 px-6 py-5">
              <div className="flex justify-between text-sm mb-2">
                <span className="text-red-100">Subtotal</span>
                <span className="text-white font-semibold">$128.00</span>
              </div>
              <div className="flex justify-between text-sm mb-5">
                <span className="text-red-100">Shipping</span>
                <span className="text-white font-bold tracking-widest text-xs uppercase">Complimentary</span>
              </div>
              <div className="border-t border-red-500/50 pt-4 flex justify-between items-center">
                <span className="text-white font-bold text-base">Grand Total</span>
                <span className="text-white text-3xl font-black">$128.00</span>
              </div>
            </div>
          </div>

          {/* Bottom Row — Shipping + Payment */}
          <div className="grid grid-cols-2 gap-5">

            {/* Shipping Destination */}
            <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-5">
              <p className="text-[10px] tracking-widest text-red-500 uppercase font-bold mb-4">Shipping Destination</p>
              <div className="mb-3">
                <p className="text-[10px] tracking-widest text-neutral-500 uppercase mb-1">Recipient</p>
                <p className="text-white font-semibold">Sarah Jenkins</p>
              </div>
              <div>
                <p className="text-[10px] tracking-widest text-neutral-500 uppercase mb-1">Address</p>
                <p className="text-neutral-300 text-sm leading-relaxed">
                  284 Stillness Way, Apt 4C<br />
                  Copenhagen, 2100<br />
                  Denmark
                </p>
              </div>
            </div>

            {/* Payment & Billing */}
            <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-5">
              <p className="text-[10px] tracking-widest text-red-500 uppercase font-bold mb-4">Payment & Billing</p>
              <div className="bg-neutral-800 border border-neutral-700 rounded-xl px-4 py-3 flex items-center gap-3 mb-4">
                <div className="w-8 h-6 bg-blue-600 rounded flex items-center justify-center shrink-0">
                  <span className="text-white text-[9px] font-black tracking-tight">VISA</span>
                </div>
                <div>
                  <p className="text-white text-sm font-semibold">Visa Ending in 8842</p>
                  <p className="text-neutral-400 text-xs">Expires 04/26</p>
                </div>
              </div>
              <div>
                <p className="text-[10px] tracking-widest text-neutral-500 uppercase mb-1">Billing Address</p>
                <p className="text-neutral-300 text-sm">Same as shipping address</p>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  )
}