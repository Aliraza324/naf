import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

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
    <div className="min-h-screen bg-neutral-950 text-white p-8 font-sans">
      {/* Header */}
      <div className="flex items-start justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-white mb-1">Order History</h1>
          <p className="text-neutral-400 text-sm max-w-xs leading-relaxed">
            Review and manage your curated physical collections and digital guides designed for your intentional living.
          </p>
        </div>
        <button className="flex items-center gap-2 border border-neutral-600 text-white text-sm font-medium px-4 py-2 rounded-lg hover:bg-neutral-800 transition-colors">
          <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
          </svg>
          Export report
        </button>
      </div>

      {/* Tabs + Stats Row */}
      <div className="flex items-center justify-between mb-5">
        {/* Tabs */}
        <div className="flex items-center bg-neutral-900 border border-neutral-800 rounded-full p-1 gap-1">
          {tabs.map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all ${activeTab === tab
                  ? 'bg-red-600 text-white shadow'
                  : 'text-neutral-400 hover:text-white'
                }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Stats */}
        <div className="flex items-center gap-8">
          <div className="text-right">
            <p className="text-[10px] tracking-widest text-neutral-500 uppercase mb-0.5">Total Spend</p>
            <p className="text-xl font-bold text-white">$1,240.50</p>
          </div>
          <div className="text-right">
            <p className="text-[10px] tracking-widest text-neutral-500 uppercase mb-0.5">Active Orders</p>
            <p className="text-xl font-bold text-red-500">02</p>
          </div>
        </div>
      </div>

      {/* Orders Table */}
      <div className="bg-neutral-900 border border-neutral-800 rounded-xl overflow-hidden mb-6">
        {/* Table Header */}
        <div className="grid grid-cols-[1.5fr_2fr_1.5fr_1fr_2fr] px-6 py-3 border-b border-neutral-800">
          {['Order ID', 'Date', 'Status', 'Total', 'Actions'].map(h => (
            <p key={h} className="text-[10px] font-bold tracking-widest text-neutral-500 uppercase">{h}</p>
          ))}
        </div>

        {/* Rows */}
        {filtered.map((order, i) => (
          <div
            key={i}
            className="grid grid-cols-[1.5fr_2fr_1.5fr_1fr_2fr] px-6 py-4 border-b border-neutral-800 last:border-0 hover:bg-neutral-800/40 transition-colors items-center"
          >
            <p className="text-white font-mono font-semibold text-sm">{order.id}</p>
            <p className="text-neutral-300 text-sm">{order.date}</p>
            <div>
              <span className={`inline-flex items-center gap-1.5 border rounded-full px-3 py-0.5 text-xs font-bold tracking-widest ${order.status === 'DELIVERED' ? 'border-green-700 text-green-400' :
                  order.status === 'PENDING' ? 'border-blue-700 text-blue-400' :
                    'border-red-700 text-red-400'
                }`}>
                <span className={`w-1.5 h-1.5 rounded-full ${order.dotColor}`} />
                {order.status}
              </span>
            </div>
            <p className={`font-bold text-sm ${order.strikethrough ? 'line-through text-neutral-500' : 'text-white'}`}>
              {order.total}
            </p>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => handleViewDetails(order.id)}
                className="border border-neutral-600 text-neutral-300 text-xs font-medium px-3 py-1.5 rounded-lg hover:bg-neutral-700 transition-colors whitespace-nowrap"
              >
                View Details
              </button>
              <button className="bg-red-600 hover:bg-red-700 text-white text-xs font-bold tracking-wide px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1 whitespace-nowrap">
                <span>→</span> REORDER
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Promo Banner */}
      <div className="relative bg-red-600 rounded-2xl p-8 overflow-hidden">
        {/* Decorative large number */}
        <div className="absolute right-8 top-1/2 -translate-y-1/2 text-[160px] font-black text-red-500/40 leading-none select-none pointer-events-none">
          %
        </div>
        <div className="relative z-10 max-w-lg">
          <p className="text-[10px] font-bold tracking-widest text-red-200 uppercase mb-3">Member Exclusive</p>
          <h2 className="text-3xl font-bold text-white leading-tight mb-5">
            Upgrade your sanctuary. Get 15% off your next reflection guide.
          </h2>
          <button className="bg-white text-red-600 text-xs font-bold tracking-widest uppercase px-6 py-3 rounded-full hover:bg-red-50 transition-colors">
            Claim Discount
          </button>
        </div>
      </div>
    </div>
  )
}