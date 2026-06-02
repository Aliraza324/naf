import React from 'react'
import { FiDownload } from 'react-icons/fi'
import { HiOutlineSparkles } from 'react-icons/hi'
import { AiOutlineDollar } from 'react-icons/ai'
import { BiRefresh } from 'react-icons/bi'
import { Clock, DollarSign, Zap } from 'lucide-react'

const stats = [
  {
    title: 'Total Revenue',
    value: '$1,284,500',
    note: '+12.5% vs last month',
    color: 'text-emerald-400',
    badge: <DollarSign className="h-5 w-5 text-red-500" />,
  },
  {
    title: 'Orders',
    value: '42',
    note: '$45,200 EARN',
    color: 'text-amber-400',
    badge: <Clock  className="h-5 w-5 text-amber-400" />,
  },
  {
    title: 'Revised Payments',
    value: '7',
    note: '$3,850 Last 1 hours',
    color: 'text-blue-400',
    badge: <DollarSign className="h-5 w-5 text-blue-400" />,
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
          <button className="flex items-center gap-2 rounded-md bg-neutral-800 px-3 py-2 text-sm text-white hover:bg-neutral-700">
            <FiDownload />
            Export
          </button>
        </div>

        <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((s, idx) => (
            <div key={idx} className="rounded-xl border border-neutral-800 bg-[#0f1117] p-5">
              <div className="flex items-start justify-between">
                <div>
                  <div className="text-xs uppercase tracking-wider text-neutral-400">{s.title}</div>
                  <div className="mt-3 text-xl font-bold">{s.value}</div>
                  <div className={`mt-2 text-sm ${s.color}`}>{s.note}</div>
                </div>
                <div className="ml-4 flex h-9 w-9 items-center justify-center rounded-md bg-neutral-900">
                  {s.badge}
                </div>
              </div>

              {s.progress && (
                <div className="mt-2">
                  <div className="h-2 w-full rounded-full bg-neutral-800">
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