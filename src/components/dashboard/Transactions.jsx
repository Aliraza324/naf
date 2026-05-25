import React, { useState, useEffect, useRef } from 'react'

const spendingData = [
  { month: 'Jan', value: 8000 },
  { month: 'Feb', value: 11000 },
  { month: 'Mar', value: 28000 },
  { month: 'Apr', value: 22000 },
  { month: 'May', value: 26000 },
  { month: 'Jun', value: 30000 },
  { month: 'Jul', value: 38000 },
  { month: 'Aug', value: 42000 },
  { month: 'Sep', value: 46000 },
  { month: 'Oct', value: 48000 },
]

const categories = [
  { name: 'Tactical Gloves', amount: '$18,450', color: 'bg-red-500', emoji: '🧤', pct: 100 },
  { name: 'Paintballs',      amount: '$12,200', color: 'bg-blue-500', emoji: '🔵', pct: 66 },
  { name: 'Protective Gear', amount: '$9,850',  color: 'bg-yellow-400', emoji: '🪖', pct: 53 },
  { name: 'Jerseys',         amount: '$7,720',  color: 'bg-purple-500', emoji: '👕', pct: 42 },
]

function SpendingChart() {
  const svgRef = useRef(null)
  const W = 520, H = 220
  const padL = 44, padR = 16, padT = 12, padB = 32
  const chartW = W - padL - padR
  const chartH = H - padT - padB

  const maxVal = 50000
  const yTicks = [0, 10000, 20000, 30000, 40000, 50000]

  const px = (i) => padL + (i / (spendingData.length - 1)) * chartW
  const py = (v) => padT + chartH - (v / maxVal) * chartH

  const linePath = spendingData
    .map((d, i) => `${i === 0 ? 'M' : 'L'}${px(i)},${py(d.value)}`)
    .join(' ')

  const areaPath =
    `M${px(0)},${py(spendingData[0].value)} ` +
    spendingData.slice(1).map((d, i) => `L${px(i + 1)},${py(d.value)}`).join(' ') +
    ` L${px(spendingData.length - 1)},${padT + chartH} L${px(0)},${padT + chartH} Z`

  return (
    <svg ref={svgRef} viewBox={`0 0 ${W} ${H}`} className="w-full h-full" style={{ overflow: 'visible' }}>
      <defs>
        <linearGradient id="areaGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#ef4444" stopOpacity="0.35" />
          <stop offset="100%" stopColor="#ef4444" stopOpacity="0.01" />
        </linearGradient>
        <filter id="glow">
          <feGaussianBlur stdDeviation="2.5" result="blur" />
          <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
      </defs>

      {/* Y-axis grid lines + labels */}
      {yTicks.map(tick => {
        const y = py(tick)
        return (
          <g key={tick}>
            <line x1={padL} y1={y} x2={W - padR} y2={y} stroke="#262626" strokeWidth="1" />
            <text x={padL - 6} y={y + 4} textAnchor="end" fontSize="9" fill="#525252">
              {tick === 0 ? '$0' : `$${tick / 1000}0k`}
            </text>
          </g>
        )
      })}

      {/* Area fill */}
      <path d={areaPath} fill="url(#areaGrad)" />

      {/* Line */}
      <path d={linePath} fill="none" stroke="#ef4444" strokeWidth="2.5" strokeLinejoin="round" strokeLinecap="round" filter="url(#glow)" />

      {/* Dots on data points */}
      {spendingData.map((d, i) => (
        <circle key={i} cx={px(i)} cy={py(d.value)} r="3" fill="#ef4444" stroke="#0a0a0a" strokeWidth="1.5" />
      ))}

      {/* X-axis labels */}
      {spendingData.map((d, i) => (
        <text key={i} x={px(i)} y={H - 4} textAnchor="middle" fontSize="9" fill="#525252">{d.month}</text>
      ))}
    </svg>
  )
}

export default function Transactions() {
  const [animated, setAnimated] = useState(false)
  useEffect(() => { setTimeout(() => setAnimated(true), 100) }, [])

  return (
    <div className="min-h-screen bg-neutral-950 text-white p-8 font-sans">

      {/* Header */}
      <div className="flex items-start justify-between mb-7">
        <div>
          <h1 className="text-2xl font-bold text-white mb-1">Manage Your Payments & Transactions</h1>
          <p className="text-neutral-400 text-sm max-w-md leading-relaxed">
            Secure tactical payment gateway. Monitor balances, process dealer invoices, and track operational spending in real-time.
          </p>
        </div>
        <button className="flex items-center gap-2 border border-neutral-600 text-white text-sm font-medium px-4 py-2 rounded-lg hover:bg-neutral-800 transition-colors shrink-0">
          <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
          </svg>
          Export report
        </button>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-3 gap-4 mb-6">

        {/* Total Spent */}
        <div className={`bg-neutral-900 border border-neutral-800 rounded-2xl p-5 flex items-start justify-between transition-all duration-700 ${animated ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`} style={{ transitionDelay: '0ms' }}>
          <div>
            <p className="text-[10px] tracking-widest text-neutral-500 uppercase mb-2">Total Spent</p>
            <p className="text-3xl font-black text-white mb-2">$124,500</p>
            <div className="flex items-center gap-1.5">
              <span className="text-green-400 text-xs">↑ 12.5%</span>
              <span className="text-neutral-500 text-xs">vs last month</span>
            </div>
          </div>
          <div className="w-10 h-10 bg-red-600/20 border border-red-600/30 rounded-xl flex items-center justify-center">
            <span className="text-red-500 text-lg font-black">$</span>
          </div>
        </div>

        {/* Orders This Month */}
        <div className={`bg-neutral-900 border border-neutral-800 rounded-2xl p-5 flex items-start justify-between transition-all duration-700 ${animated ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`} style={{ transitionDelay: '100ms' }}>
          <div>
            <p className="text-[10px] tracking-widest text-neutral-500 uppercase mb-2">Orders This Month</p>
            <p className="text-3xl font-black text-white mb-2">42</p>
            <div className="flex items-center gap-1.5">
              <span className="text-green-400 text-xs">↑ 12.5%</span>
              <span className="text-neutral-500 text-xs">vs last month</span>
            </div>
          </div>
          <div className="w-10 h-10 bg-neutral-800 border border-neutral-700 rounded-xl flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-neutral-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z" />
            </svg>
          </div>
        </div>

        {/* Last Payment */}
        <div className={`bg-neutral-900 border border-neutral-800 rounded-2xl p-5 flex items-start justify-between transition-all duration-700 ${animated ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`} style={{ transitionDelay: '200ms' }}>
          <div>
            <p className="text-[10px] tracking-widest text-neutral-500 uppercase mb-2">Last Payment</p>
            <p className="text-3xl font-black text-white mb-2">$2343</p>
            <div className="flex items-center gap-1.5">
              <span className="text-green-400 text-xs">↑</span>
              <span className="text-neutral-500 text-xs">2 hour ago</span>
            </div>
          </div>
          <div className="w-10 h-10 bg-neutral-800 border border-neutral-700 rounded-xl flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-neutral-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
            </svg>
          </div>
        </div>
      </div>

      {/* Bottom Row */}
      <div className="grid grid-cols-[1fr_300px] gap-5">

        {/* Spending Overview Chart */}
        <div className={`bg-neutral-900 border border-neutral-800 rounded-2xl p-5 transition-all duration-700 ${animated ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`} style={{ transitionDelay: '300ms' }}>
          <div className="flex items-start justify-between mb-1">
            <div>
              <p className="text-sm font-bold text-white uppercase tracking-wider">Spending Overview</p>
              <p className="text-neutral-500 text-xs mt-0.5">Monthly expenditure analysis (Jan – Apr)</p>
            </div>
            <div className="flex items-center gap-2">
              <button className="border border-neutral-700 text-neutral-300 text-xs font-medium px-3 py-1.5 rounded-lg hover:bg-neutral-800 transition-colors">
                This Year
              </button>
              <button className="text-neutral-500 hover:text-white transition-colors p-1">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z" />
                </svg>
              </button>
            </div>
          </div>
          <div className="h-56 w-full">
            <SpendingChart />
          </div>
        </div>

        {/* Spending by Category */}
        <div className={`bg-neutral-900 border border-neutral-800 rounded-2xl p-5 transition-all duration-700 ${animated ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`} style={{ transitionDelay: '400ms' }}>
          <div className="flex items-center justify-between mb-5">
            <p className="text-sm font-bold text-white uppercase tracking-wider">Spending by Category</p>
            <button className="text-neutral-500 hover:text-white transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </button>
          </div>

          <div className="flex flex-col gap-5">
            {categories.map((cat, i) => (
              <div key={i} className={`transition-all duration-700 ${animated ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-4'}`} style={{ transitionDelay: `${500 + i * 80}ms` }}>
                <div className="flex items-center justify-between mb-1.5">
                  <div className="flex items-center gap-2">
                    <span className="text-base leading-none">{cat.emoji}</span>
                    <span className="text-sm text-white font-medium">{cat.name}</span>
                  </div>
                  <span className="text-sm text-white font-bold">{cat.amount}</span>
                </div>
                <div className="h-1.5 bg-neutral-800 rounded-full overflow-hidden">
                  <div
                    className={`h-full ${cat.color} rounded-full transition-all duration-1000`}
                    style={{ width: animated ? `${cat.pct}%` : '0%', transitionDelay: `${600 + i * 80}ms` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}