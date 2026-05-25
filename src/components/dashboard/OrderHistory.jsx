import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import one from "../../assets/images/leaf.png"
const tabs = ['All Orders', 'Pending', 'Delivered', 'Cancelled']

const orders = [
  {
    id: '#DL-90234',
    date: 'October 24, 2023',
    status: 'DELIVERED',
    statusColor: 'text-green-400',
    dotColor: 'bg-green-400',
    total: '$128.00',
    strikethrough: false,
  },
  {
    id: '#DL-89912',
    date: 'October 15, 2023',
    status: 'PENDING',
    statusColor: 'text-blue-400',
    dotColor: 'bg-blue-400',
    total: '$342.50',
    strikethrough: false,
  },
  {
    id: '#DL-87651',
    date: 'September 28, 2023',
    status: 'DELIVERED',
    statusColor: 'text-green-400',
    dotColor: 'bg-green-400',
    total: '$89.00',
    strikethrough: false,
  },
  {
    id: '#DL-85412',
    date: 'September 12, 2023',
    status: 'CANCELLED',
    statusColor: 'text-red-400',
    dotColor: 'bg-red-400',
    total: '$210.00',
    strikethrough: true,
  },
]

export default function OrderHistory() {
  const [activeTab, setActiveTab] = useState('All Orders')
  const navigate = useNavigate()

  const filtered = activeTab === 'All Orders'
    ? orders
    : orders.filter(o => o.status === activeTab.toUpperCase())

  const handleViewDetails = (orderId) => {
    navigate('/dashboard/order-details', {
      state: { orderId },
    })
  }

  return (
    <div className="min-h-screen bg-neutral-950 p-4 text-white sm:p-6 lg:p-8 font-sans">
      {/* Header */}
      <div className="mb-6 flex flex-col gap-4 lg:mb-8 lg:flex-row lg:items-start lg:justify-between">
        <div>
          <h1 className="mb-1 text-xl font-bold text-white sm:text-2xl">Order History</h1>
          <p className="max-w-xl text-sm leading-relaxed text-neutral-400">
            Review and manage your curated physical collections and digital guides designed for your intentional living.
          </p>
        </div>
        <button className="flex w-fit items-center gap-2 rounded-lg border border-neutral-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-neutral-800">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
          </svg>
          Export report
        </button>
      </div>

      {/* Tabs + Stats Row */}
      <div className="mb-5 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="w-full overflow-x-auto pb-1 lg:w-auto">
          <div
            className="flex min-w-max flex-nowrap items-center gap-1 rounded-full border border-neutral-800 bg-neutral-900 p-1"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {tabs.map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`rounded-full px-4 py-1.5 text-sm font-medium transition-all ${activeTab === tab
                    ? 'bg-red-600 text-white shadow'
                    : 'text-neutral-400 hover:text-white'
                  }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>
        <div className="flex flex-wrap items-center gap-4 sm:gap-8">
          <div className="text-left sm:text-right">
            <p className="mb-0.5 text-[10px] uppercase tracking-widest text-neutral-500">Total Spend</p>
            <p className="text-lg font-bold text-white sm:text-xl">$1,240.50</p>
          </div>
          <div className="text-left sm:text-right">
            <p className="mb-0.5 text-[10px] uppercase tracking-widest text-neutral-500">Active Orders</p>
            <p className="text-lg font-bold text-red-500 sm:text-xl">02</p>
          </div>
        </div>
      </div>

      {/* Orders Table */}
      <div className="mb-6 overflow-hidden rounded-xl border border-neutral-800 bg-neutral-900">
        <div className="overflow-x-auto">
          <div className="min-w-215">
            <div className="grid grid-cols-[1.5fr_2fr_1.5fr_1fr_2fr] border-b border-neutral-800 px-6 py-3">
              {['Order ID', 'Date', 'Status', 'Total', 'Actions'].map(h => (
                <p key={h} className="text-[10px] font-bold uppercase tracking-widest text-neutral-500">{h}</p>
              ))}
            </div>

            {filtered.map((order, i) => (
              <div
                key={i}
                className="grid grid-cols-[1.5fr_2fr_1.5fr_1fr_2fr] items-center border-b border-neutral-800 px-6 py-4 last:border-0 hover:bg-neutral-800/40"
              >
                <p className="text-sm font-semibold text-white font-mono">{order.id}</p>
                <p className="text-sm text-neutral-300">{order.date}</p>
                <div>
                  <span className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-0.5 text-xs font-bold uppercase tracking-widest ${order.status === 'DELIVERED' ? 'border-green-700 text-green-400' : order.status === 'PENDING' ? 'border-blue-700 text-blue-400' : 'border-red-700 text-red-400'}`}>
                    <span className={`h-1.5 w-1.5 rounded-full ${order.dotColor}`} />
                    {order.status}
                  </span>
                </div>
                <p className={`text-sm font-bold ${order.strikethrough ? 'text-neutral-500 line-through' : 'text-white'}`}>
                  {order.total}
                </p>
                <div className="flex flex-wrap items-center gap-2">
                  <button
                    type="button"
                    onClick={() => handleViewDetails(order.id)}
                    className="rounded-lg border border-neutral-600 px-3 py-1.5 text-xs font-medium text-neutral-300 transition-colors hover:bg-neutral-700"
                  >
                    View Details
                  </button>
                  <button className="flex items-center gap-1 rounded-lg bg-red-600 px-3 py-1.5 text-xs font-bold tracking-wide text-white transition-colors hover:bg-red-700">
                    <span>→</span> REORDER
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Promo Banner */}
      <div className="relative overflow-hidden rounded-2xl bg-[#E60103] p-6 sm:p-8">
        <div className="absolute right-4 top-1/2 -translate-y-1/2 select-none sm:right-8">
          <img
            src={one}
            alt=""
            className="block opacity-80"
            style={{
              filter: 'brightness(0) saturate(100%) invert(16%) sepia(88%) saturate(2232%) hue-rotate(330deg) brightness(90%) contrast(110%)',
            }}
          />
        </div>
        <div className="relative z-10 max-w-lg">
          <p className="mb-3 text-[10px] font-bold uppercase tracking-widest text-white">Member Exclusive</p>
          <h2 className="mb-5 text-2xl font-bold leading-tight text-white sm:text-3xl">
            Upgrade your sanctuary. Get 15% off your next reflection guide.
          </h2>
          <button className="rounded-full bg-white px-6 py-3 text-xs font-bold uppercase tracking-widest text-red-600 transition-colors hover:bg-red-50">
            Claim Discount
          </button>
        </div>
      </div>
    </div>
  )
}