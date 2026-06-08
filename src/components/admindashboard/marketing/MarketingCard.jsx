import React from 'react'
import { Megaphone, PackageOpen, PieChart, Plus, ShoppingCart, Users } from 'lucide-react'
import { Doughnut, Line } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  ArcElement,
  CategoryScale,
  Filler,
  LinearScale,
  LineElement,
  PointElement,
  Tooltip,
} from 'chart.js'

ChartJS.register(ArcElement, CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Filler)

const stats = [
  { label: 'Total Campaigns', value: '124',    change: '+12%',  trend: 'up',   icon: Megaphone    },
  { label: 'Total Reach',     value: '42,890', change: '+8.4%', trend: 'up',   icon: Users        },
  { label: 'Avg. Open Rate',  value: '24.6%',  change: '-2.1%', trend: 'down', icon: PackageOpen  },
  { label: 'Conversions',     value: '3,194',  change: '+5.2%', trend: 'up',   icon: ShoppingCart },
]

const engagementChartData = {
  labels: ['00:00', '04:00', '08:00', '12:00', '16:00', '20:00', '24:00'],
  datasets: [{
    label: 'Engagement',
    data: [20, 35, 25, 58, 45, 80, 65],
    fill: true,
    borderColor: '#ff1010',
    backgroundColor: 'rgba(239,68,68,0.18)',
    borderWidth: 3,
    tension: 0.42,
    pointRadius: 4,
    pointHoverRadius: 6,
    pointBackgroundColor: '#ff1010',
    pointBorderColor: '#111111',
    pointBorderWidth: 2,
  }],
}

const engagementChartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  interaction: { mode: 'index', intersect: false },
  plugins: {
    legend: { display: false },
    tooltip: {
      backgroundColor: '#111111',
      borderColor: 'rgba(255,255,255,0.12)',
      borderWidth: 1,
      titleColor: '#ffffff',
      bodyColor: '#d4d4d4',
      displayColors: false,
      padding: 12,
    },
  },
  scales: {
    y: {
      min: 0, max: 85,
      ticks: { stepSize: 20, color: '#64748b', font: { size: 10 } },
      grid: { color: 'rgba(255,255,255,0.06)', drawBorder: false },
      border: { display: false },
    },
    x: {
      ticks: { color: '#64748b', font: { size: 10 } },
      grid: { color: 'rgba(255,255,255,0.05)', drawBorder: false },
      border: { display: false },
    },
  },
}

const reachChartData = {
  labels: ['New Products', 'Low Stock', 'Promos', 'System'],
  datasets: [{
    data: [45, 25, 18, 12],
    backgroundColor: ['#ff1010', '#a90000', '#351010', '#4a1717'],
    borderColor: '#111111',
    borderWidth: 0,
    hoverBorderWidth: 0,
    hoverOffset: 6,
  }],
}

const reachChartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  cutout: '60%',
  plugins: {
    legend: { display: false },
    tooltip: {
      backgroundColor: '#111111',
      borderColor: 'rgba(255,255,255,0.12)',
      borderWidth: 1,
      titleColor: '#ffffff',
      bodyColor: '#d4d4d4',
      padding: 12,
      callbacks: { label: (ctx) => `${ctx.label}: ${ctx.parsed}%` },
    },
  },
}

const reachLegend = [
  { label: 'New Products', color: 'bg-[#ff1010]' },
  { label: 'Low Stock',    color: 'bg-[#a90000]' },
  { label: 'Promos',       color: 'bg-[#351010]' },
  { label: 'System',       color: 'bg-[#4a1717]' },
]

export default function MarketingDashboard() {
  return (
    <section className="min-h-screen w-full bg-black px-4 py-6 text-white sm:px-6 lg:px-8">
      <div className="mx-auto max-w-[1220px]">

        {/* ── Header ── */}
        <div className="flex flex-col gap-4 border-l-4 border-red-600 pl-4 sm:flex-row sm:items-center sm:justify-between sm:pl-5">
          <div>
            <h1 className="text-2xl font-black tracking-tight sm:text-3xl">
              Marketing Campaigns
            </h1>
            <p className="mt-2 max-w-xl text-sm leading-relaxed text-neutral-500">
              Manage and track your global dealer outreach and engagement programs.
            </p>
          </div>

          <button className="inline-flex h-11 w-full items-center justify-center gap-2 rounded-lg bg-red-600 px-6 text-[11px] font-black uppercase tracking-widest text-white shadow-[0_0_30px_rgba(239,68,68,0.45)] transition-colors hover:bg-red-700 sm:w-auto">
            <Plus className="h-4 w-4" />
            Create New Campaign
          </button>
        </div>

        {/* ── Stat Cards ── */}
        <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {stats.map(({ label, value, change, trend, icon: Icon }) => {
            const isUp = trend === 'up'
            return (
              <article
                key={label}
                className="rounded-[10px] border border-white/5 bg-[#131313] p-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.03)]"
              >
                <div className="flex items-start justify-between gap-3">
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-red-500/15 text-red-500">
                    <Icon className="h-5 w-5" />
                  </span>
                  <span className={`rounded-full border px-2 py-1 text-[10px] font-black ${
                    isUp
                      ? 'border-emerald-500/20 bg-emerald-500/10 text-emerald-400'
                      : 'border-red-500/20 bg-red-500/10 text-red-400'
                  }`}>
                    {change}
                  </span>
                </div>
                <p className="mt-5 text-[11px] font-black uppercase tracking-[0.14em] text-neutral-500">
                  {label}
                </p>
                <h2 className="mt-2 text-[28px] font-black leading-none">
                  {value}
                </h2>
              </article>
            )
          })}
        </div>

        {/* ── Charts Row ── */}
        <div className="mt-8 grid grid-cols-1 gap-6 xl:grid-cols-[1fr_400px]">

          {/* Engagement Performance */}
          <article className="rounded-[10px] border border-white/[0.06] bg-[#111111] p-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.03)] sm:p-7">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <h2 className="text-sm font-black uppercase tracking-[0.08em] sm:text-base">
                Engagement Performance
              </h2>
              <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-neutral-500">
                <span className="h-2 w-2 rounded-full bg-red-600 shadow-[0_0_10px_rgba(239,68,68,0.9)]" />
                Live Data
              </div>
            </div>
            <div className="mt-6 h-[240px] sm:h-[300px]">
              <Line data={engagementChartData} options={engagementChartOptions} />
            </div>
          </article>

          {/* Reach By Type */}
          <article className="flex flex-col rounded-[10px] border border-white/[0.06] bg-[#111111] p-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.03)] sm:p-7">
            <h2 className="flex items-center gap-3 text-xl font-black uppercase tracking-[0.08em] sm:text-2xl">
              <PieChart className="h-6 w-6 fill-red-500 text-red-500" />
              Reach By Type
            </h2>

            <div className="mt-6 border-t border-white/[0.07] pt-5">
              <div className="flex flex-wrap items-start gap-6">
                {/* Doughnut */}
                <div className="h-[200px] w-[200px] shrink-0 sm:h-[220px] sm:w-[220px]">
                  <Doughnut data={reachChartData} options={reachChartOptions} />
                </div>

                {/* Legend */}
                <div className="flex flex-col gap-4 pt-1">
                  {reachLegend.map(({ label, color }) => (
                    <div key={label} className="flex items-center gap-4 text-sm text-slate-400">
                      <span className={`h-5 w-5 shrink-0 ${color}`} />
                      {label}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Audience Cap */}
            <div className="mt-auto pt-8">
              <div className="flex items-center justify-between text-sm sm:text-base">
                <span className="text-slate-400">Total Audience Cap</span>
                <span className="font-black">120k Units</span>
              </div>
              <div className="mt-4 h-2 overflow-hidden rounded-full bg-white/5">
                <div className="h-full w-[72%] rounded-full bg-[#1f1f1f]" />
              </div>
            </div>
          </article>

        </div>
      </div>
    </section>
  )
}