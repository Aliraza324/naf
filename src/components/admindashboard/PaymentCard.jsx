import React from 'react'
import { FiDownload } from 'react-icons/fi'
import { Clock, DollarSign, Zap } from 'lucide-react'

const stats = [
  {
    title: 'Total Revenue',
    value: '$1,284,500',
    note: '+12.5% vs last month',
    color: 'text-red-500',
    badge: <DollarSign className="h-5 w-5 text-red-500" />,
  },
  {
    title: 'Orders',
    value: '42',
    note: '$45,200 EARN',
    color: 'text-neutral-400',
    badge: <Clock  className="h-5 w-5 text-red-500" />,
  },
  {
    title: 'Revised Payments',
    value: '7',
    note: '$3,850 Last 1 hours',
    color: 'text-neutral-400',
    badge: <DollarSign className="h-5 w-5 text-red-500" />,
  },
  {
    title: "Today's Volume",
    value: '$24,100',
    note: '65% of daily target',
    color: 'text-red-400',
    badge: <Zap className="h-5 w-5 text-red-500" />,
    progress: 65,
  },
]

export default function PaymentCard(){
  return (
    <section className="py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-extrabold">Payments</h2>
          <button className="flex items-center gap-2 rounded-md border border-white/10 bg-[#141414] px-3 py-2 text-sm text-white transition hover:border-red-600 hover:bg-white/5">
            <FiDownload />
            Export
          </button>
        </div>

        <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((s, idx) => (
            <div key={idx} className="rounded-xl border border-white/5 bg-[#141414] p-5">
              <div className="flex items-start justify-between">
                <div>
                  <div className="text-xs uppercase tracking-wider text-neutral-500">{s.title}</div>
                  <div className="mt-3 text-xl font-bold">{s.value}</div>
                  <div className={`mt-2 text-sm ${s.color}`}>{s.note}</div>
                </div>
                <div className="ml-4 flex h-9 w-9 items-center justify-center rounded-md border border-red-500/15 bg-red-500/10">
                  {s.badge}
                </div>
              </div>

              {s.progress && (
                <div className="mt-2">
                  <div className="h-2 w-full rounded-full bg-white/10">
                    <div className="h-2 rounded-full bg-red-500" style={{ width: `${s.progress}%` }} />
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
