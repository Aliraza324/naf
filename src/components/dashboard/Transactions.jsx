import React, { useState, useEffect, useRef } from 'react'
import { Line } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
} from 'chart.js'

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Filler, Tooltip)

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
  { name: 'Tactical Gloves', amount: '$18,450', color: '#ef4444', pct: 100 },
  { name: 'Paintballs', amount: '$12,200', color: '#3b82f6', pct: 66 },
  { name: 'Protective Gear', amount: '$9,850', color: '#facc15', pct: 53 },
  { name: 'Jerseys', amount: '$7,720', color: '#a855f7', pct: 42 },
]

const catEmojis = ['🧤', '🔵', '🪖', '👕']

function SpendingChart() {
  const chartRef = useRef(null)

  const data = {
    labels: spendingData.map(d => d.month),
    datasets: [
      {
        label: 'Spending',
        data: spendingData.map(d => d.value),
        borderColor: '#ef4444',
        borderWidth: 2.5,
        pointBackgroundColor: '#ef4444',
        pointBorderColor: '#0a0a0a',
        pointBorderWidth: 2,
        pointRadius: 4,
        fill: true,
        backgroundColor: (ctx) => {
          const chart = ctx.chart
          const { ctx: c, chartArea } = chart
          if (!chartArea) return 'transparent'
          const grad = c.createLinearGradient(0, chartArea.top, 0, chartArea.bottom)
          grad.addColorStop(0, 'rgba(239,68,68,0.28)')
          grad.addColorStop(1, 'rgba(239,68,68,0.01)')
          return grad
        },
        tension: 0.4,
      },
    ],
  }

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: {
        backgroundColor: '#1a1a1a',
        borderColor: '#333',
        borderWidth: 1,
        titleColor: '#a3a3a3',
        bodyColor: '#fff',
        callbacks: {
          label: (ctx) => ' $' + ctx.parsed.y.toLocaleString(),
        },
      },
    },
    scales: {
      x: {
        ticks: { color: '#525252', font: { size: 11 } },
        grid: { color: '#1f1f1f' },
        border: { display: false },
      },
      y: {
        min: 0,
        max: 50000,
        ticks: {
          color: '#525252',
          font: { size: 11 },
          callback: (v) => '$' + v / 1000 + 'k',
        },
        grid: { color: '#1f1f1f' },
        border: { display: false },
      },
    },
  }

  return (
    <div style={{ position: 'relative', width: '100%', height: '220px' }}>
      <Line ref={chartRef} data={data} options={options} />
    </div>
  )
}

export default function Transactions() {
  const [animated, setAnimated] = useState(false)

  useEffect(() => {
    const t = setTimeout(() => setAnimated(true), 150)
    return () => clearTimeout(t)
  }, [])

  const statCards = [
    {
      label: 'Total Spent',
      value: '$124,500',
      sub: '↑ 12.5% vs last month',
      upColor: '#4ade80',
      iconBg: '#3f0f0f',
      iconBorder: '#7f1d1d',
      icon: <span style={{ color: '#ef4444', fontSize: 17, fontWeight: 700 }}>$</span>,
    },
    {
      label: 'Orders This Month',
      value: '42',
      sub: '↑ 12.5% vs last month',
      upColor: '#4ade80',
      iconBg: '#1a1a1a',
      iconBorder: '#2a2a2a',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="#a3a3a3" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z" />
        </svg>
      ),
    },
    {
      label: 'Last Payment',
      value: '$2,343',
      sub: '↑ 2 hours ago',
      upColor: '#4ade80',
      iconBg: '#1a1a1a',
      iconBorder: '#2a2a2a',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="#a3a3a3" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
        </svg>
      ),
    },
  ]

  return (
    <div style={{ background: '#0a0a0a', padding: '24px', color: '#fff', minHeight: '100vh', fontFamily: 'sans-serif', boxSizing: 'border-box' }}>

      {/* Header */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16, alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 24 }}>
        <div>
          <h1 style={{ fontSize: 18, fontWeight: 500, color: '#fff', margin: '0 0 4px' }}>
            Manage Your Payments & Transactions
          </h1>
          <p style={{ fontSize: 13, color: '#737373', maxWidth: 480, lineHeight: 1.5, margin: 0 }}>
            Secure tactical payment gateway. Monitor balances, process dealer invoices, and track operational spending in real-time.
          </p>
        </div>
        <button style={{ display: 'flex', alignItems: 'center', gap: 6, border: '1px solid #404040', background: 'transparent', color: '#fff', padding: '8px 14px', borderRadius: 8, fontSize: 13, cursor: 'pointer', whiteSpace: 'nowrap' }}>
          <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
          </svg>
          Export report
        </button>
      </div>

      {/* Stat Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 14, marginBottom: 20 }}>
        {statCards.map((card, i) => (
          <div
            key={i}
            style={{
              background: '#111',
              border: '1px solid #1f1f1f',
              borderRadius: 14,
              padding: 18,
              display: 'flex',
              alignItems: 'flex-start',
              justifyContent: 'space-between',
              transition: 'opacity 0.7s, transform 0.7s',
              transitionDelay: `${i * 100}ms`,
              opacity: animated ? 1 : 0,
              transform: animated ? 'translateY(0)' : 'translateY(16px)',
            }}
          >
            <div>
              <p style={{ fontSize: 10, letterSpacing: '0.1em', color: '#525252', textTransform: 'uppercase', marginBottom: 8 }}>{card.label}</p>
              <p style={{ fontSize: 28, fontWeight: 700, color: '#fff', marginBottom: 8 }}>{card.value}</p>
              <p style={{ fontSize: 12, color: '#525252', margin: 0 }}>
                <span style={{ color: card.upColor }}>{card.sub.split(' ')[0]} </span>
                {card.sub.split(' ').slice(1).join(' ')}
              </p>
            </div>
            <div style={{ width: 38, height: 38, borderRadius: 10, background: card.iconBg, border: `1px solid ${card.iconBorder}`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              {card.icon}
            </div>
          </div>
        ))}
      </div>

      {/* Bottom Row */}
      <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0,1fr) 300px', gap: 16 }}
        className="bottom-grid">

        {/* Chart Panel */}
        <div
          style={{
            background: '#111',
            border: '1px solid #1f1f1f',
            borderRadius: 14,
            padding: 18,
            transition: 'opacity 0.7s, transform 0.7s',
            transitionDelay: '300ms',
            opacity: animated ? 1 : 0,
            transform: animated ? 'translateY(0)' : 'translateY(16px)',
          }}
        >
          <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'flex-start', justifyContent: 'space-between', gap: 10, marginBottom: 14 }}>
            <div>
              <p style={{ fontSize: 12, fontWeight: 500, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#fff', margin: 0 }}>Spending Overview</p>
              <p style={{ fontSize: 11, color: '#525252', marginTop: 2, marginBottom: 0 }}>Monthly expenditure analysis (Jan – Oct)</p>
            </div>
            <button style={{ border: '1px solid #333', background: 'transparent', color: '#a3a3a3', padding: '5px 10px', borderRadius: 7, fontSize: 11, cursor: 'pointer' }}>
              This Year
            </button>
          </div>
          <SpendingChart />
        </div>

        {/* Categories Panel */}
        <div
          style={{
            background: '#111',
            border: '1px solid #1f1f1f',
            borderRadius: 14,
            padding: 18,
            transition: 'opacity 0.7s, transform 0.7s',
            transitionDelay: '400ms',
            opacity: animated ? 1 : 0,
            transform: animated ? 'translateY(0)' : 'translateY(16px)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
            <p style={{ fontSize: 12, fontWeight: 500, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#fff', margin: 0 }}>Spending by Category</p>
            <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" fill="none" viewBox="0 0 24 24" stroke="#525252" strokeWidth={2} style={{ cursor: 'pointer' }}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            {categories.map((cat, i) => (
              <div
                key={i}
                style={{
                  transition: 'opacity 0.7s, transform 0.7s',
                  transitionDelay: `${500 + i * 80}ms`,
                  opacity: animated ? 1 : 0,
                  transform: animated ? 'translateX(0)' : 'translateX(16px)',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 6 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, color: '#fff' }}>
                    <span>{catEmojis[i]}</span>
                    {cat.name}
                  </div>
                  <span style={{ fontSize: 13, fontWeight: 600, color: '#fff' }}>{cat.amount}</span>
                </div>
                <div style={{ height: 5, background: '#1f1f1f', borderRadius: 99, overflow: 'hidden' }}>
                  <div
                    style={{
                      height: '100%',
                      background: cat.color,
                      borderRadius: 99,
                      width: animated ? `${cat.pct}%` : '0%',
                      transition: 'width 1s cubic-bezier(.4,0,.2,1)',
                      transitionDelay: `${600 + i * 80}ms`,
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Responsive style for bottom grid */}
      <style>{`
        @media (max-width: 760px) {
          .bottom-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  )
}