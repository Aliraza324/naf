import React from 'react'

const Sparkline = ({ points, trending }) => (
  <svg viewBox="0 0 90 44" className="w-20 h-11 shrink-0" fill="none">
    <polyline
      points={points}
      stroke="#e53935"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
    />
  </svg>
)

const ArrowUp = () => (
  <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
    <path d="M6 9V3M6 3L3 6M6 3l3 3" stroke="#e53935" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)

const ArrowDown = () => (
  <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
    <path d="M6 3v6M6 9l-3-3M6 9l3-3" stroke="#e53935" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)

const cards = [
  {
    label: 'Total Orders Today',
    value: 300,
    pct: '29.7%',
    trending: 'up',
    points: '0,34 15,30 28,36 40,24 55,20 68,14 80,18 90,10',
  },
  {
    label: 'Order Completed',
    value: 200,
    pct: '30.2%',
    trending: 'up',
    points: '0,38 12,34 25,38 38,28 50,22 62,16 75,20 90,12',
  },
  {
    label: 'Pending Orders',
    value: 75,
    pct: '15.2%',
    trending: 'up',
    points: '0,20 14,28 28,18 40,30 55,22 68,28 80,20 90,26',
  },
  {
    label: 'Cancel Orders',
    value: 25,
    pct: '10.2%',
    trending: 'down',
    points: '0,10 14,14 28,10 40,18 55,24 68,28 80,32 90,38',
  },
]

const StatCard = ({ label, value, pct, trending, points }) => (
  <div className="bg-[#1a1a1a] rounded-2xl p-[18px] flex flex-col gap-2.5 min-w-0">
    <p className="text-gray-500 text-sm">{label}</p>
    <div className="flex items-end justify-between gap-2">
      <div className="flex flex-col gap-1.5">
        <span className="text-white text-3xl font-bold leading-none">{value}</span>
        <span className="flex items-center gap-1 text-red-500 text-xs">
          {trending === 'up' ? <ArrowUp /> : <ArrowDown />}
          {pct}
        </span>
      </div>
      <Sparkline points={points} />
    </div>
  </div>
)

const OrderCard = () => {
  return (
    <div className="p-4 font-sans mx-auto w-full max-w-7xl">
      {/* Header */}
      <div className="flex items-center justify-between mb-5">
        <h1 className="text-white text-2xl font-bold">Orders</h1>
        <button className="flex items-center gap-2 bg-[#1e1e1e] border border-[#333] text-gray-400 text-sm px-4 py-2 rounded-lg hover:bg-[#2a2a2a] transition-colors">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
            <polyline points="7 10 12 15 17 10" />
            <line x1="12" y1="15" x2="12" y2="3" />
          </svg>
          Export
        </button>
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-3.5">
        {cards.map((card) => (
          <StatCard key={card.label} {...card} />
        ))}
      </div>
    </div>
  )
}

export default OrderCard