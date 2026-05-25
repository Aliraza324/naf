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
    <div className="min-h-screen bg-neutral-950 p-4 text-white sm:p-6 lg:p-8 font-sans">

      {/* Page Header */}
      <div className="mb-6 flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
        <div>
          <h1 className="mb-1 text-xl font-bold text-white sm:text-2xl">Order Details</h1>
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-sm font-mono text-neutral-400">#DL-90234</span>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-blue-700 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-widest text-blue-400">
              <span className="h-1.5 w-1.5 rounded-full bg-blue-400" />
              PENDING
            </span>
          </div>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <button className="flex items-center gap-2 rounded-lg border border-neutral-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-neutral-800">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
            Export Invoice
          </button>
          <button className="rounded-lg bg-red-600 px-5 py-2 text-sm font-bold text-white transition-colors hover:bg-red-700">
            Reorder
          </button>
        </div>
      </div>

      {/* Body Grid */}
      <div className="grid gap-5 xl:grid-cols-[280px_1fr]">

        {/* LEFT COLUMN */}
        <div className="flex flex-col gap-5">

          {/* Order Info Card */}
          <div className="flex flex-col gap-5 rounded-2xl border border-neutral-800 bg-neutral-900 p-5">
            <div>
              <p className="mb-1 text-[10px] uppercase tracking-widest text-neutral-500">Order Date</p>
              <p className="font-semibold text-white">October 24, 2023</p>
            </div>
            <div className="border-t border-neutral-800" />
            <div>
              <p className="mb-1 text-[10px] uppercase tracking-widest text-neutral-500">Total Amount</p>
              <p className="text-2xl font-bold text-red-500">$128.00</p>
            </div>
            <div className="border-t border-neutral-800" />
            <div>
              <p className="mb-1 text-[10px] uppercase tracking-widest text-neutral-500">Estimated Arrival</p>
              <p className="font-semibold text-white">Oct 28 – Oct 30</p>
            </div>
          </div>

          {/* Journey Status Card */}
          <div className="rounded-2xl border border-neutral-800 bg-neutral-900 p-5">
            <p className="mb-5 text-[10px] uppercase tracking-widest text-neutral-500">Journey Status</p>
            <div className="flex flex-col gap-0">
              {journeySteps.map((step, i) => (
                <div key={i} className="flex gap-3">
                  {/* Icon + line */}
                  <div className="flex flex-col items-center">
                    <div className={`z-10 flex h-6 w-6 shrink-0 items-center justify-center rounded-full ${
                      step.done
                        ? 'bg-red-600'
                        : 'bg-neutral-700'
                    }`}>
                      {step.done ? (
                        <svg className="h-3 w-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                      ) : (
                        <div className="h-2 w-2 rounded-full bg-neutral-500" />
                      )}
                    </div>
                    {i < journeySteps.length - 1 && (
                      <div className={`my-1 w-px flex-1 ${step.done ? 'bg-red-800' : 'bg-neutral-800'}`} style={{ minHeight: '24px' }} />
                    )}
                  </div>

                  {/* Content */}
                  <div className="pb-5">
                    <p className={`text-sm font-semibold ${step.done ? 'text-white' : 'text-neutral-500'}`}>{step.label}</p>
                    <p className={`mt-0.5 text-xs ${step.done ? 'text-neutral-400' : 'text-neutral-600'}`}>{step.sub}</p>
                    {step.extra && (
                      <div className="mt-2 rounded-lg border border-neutral-700 bg-neutral-800 px-3 py-2 text-xs text-neutral-300">
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
              <div key={i} className={`flex flex-col gap-3 px-6 py-4 sm:flex-row sm:items-center sm:gap-4 ${i < items.length - 1 ? 'border-b border-neutral-800' : ''}`}>
                <div className="h-14 w-14 shrink-0 overflow-hidden rounded-xl bg-neutral-800">
                  <img src={item.img} alt={item.name} className="h-full w-full object-cover" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-semibold text-white">{item.name}</p>
                  <p className={`mt-0.5 text-xs ${item.colorClass}`}>Color: {item.color}</p>
                </div>
                <div className="sm:text-right">
                  <p className="mb-1 text-xs text-neutral-400">{item.qty}</p>
                  <p className="font-bold text-white">{item.price}</p>
                </div>
              </div>
            ))}

            {/* Totals — Red Banner */}
            <div className="bg-red-600 px-6 py-5">
              <div className="mb-2 flex flex-wrap items-center justify-between gap-3 text-sm">
                <span className="text-red-100">Subtotal</span>
                <span className="font-semibold text-white">$128.00</span>
              </div>
              <div className="mb-5 flex flex-wrap items-center justify-between gap-3 text-sm">
                <span className="text-red-100">Shipping</span>
                <span className="text-xs font-bold uppercase tracking-widest text-white">Complimentary</span>
              </div>
              <div className="flex flex-wrap items-center justify-between gap-3 border-t border-red-500/50 pt-4">
                <span className="text-base font-bold text-white">Grand Total</span>
                <span className="text-2xl font-black text-white sm:text-3xl">$128.00</span>
              </div>
            </div>
          </div>

          {/* Bottom Row — Shipping + Payment */}
          <div className="grid gap-5 md:grid-cols-2">

            {/* Shipping Destination */}
            <div className="rounded-2xl border border-neutral-800 bg-neutral-900 p-5">
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
            <div className="rounded-2xl border border-neutral-800 bg-neutral-900 p-5">
              <p className="mb-4 text-[10px] font-bold uppercase tracking-widest text-red-500">Payment & Billing</p>
              <div className="mb-4 flex items-center gap-3 rounded-xl border border-neutral-700 bg-neutral-800 px-4 py-3">
                <div className="flex h-6 w-8 shrink-0 items-center justify-center rounded bg-blue-600">
                  <span className="text-[9px] font-black tracking-tight text-white">VISA</span>
                </div>
                <div>
                  <p className="text-sm font-semibold text-white">Visa Ending in 8842</p>
                  <p className="text-xs text-neutral-400">Expires 04/26</p>
                </div>
              </div>
              <div>
                <p className="mb-1 text-[10px] uppercase tracking-widest text-neutral-500">Billing Address</p>
                <p className="text-sm text-neutral-300">Same as shipping address</p>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  )
}