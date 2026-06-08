import React from 'react'
import {
  Megaphone,
  PackageOpen,
  PieChart,
  Plus,
  ShoppingCart,
  Users,
} from 'lucide-react'
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
import { Link } from 'react-router-dom'

ChartJS.register(
  ArcElement,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Filler,
)

const stats = [
  {
    label: 'Total Campaigns',
    value: '124',
    change: '+12%',
    trend: 'up',
    icon: Megaphone,
  },
  {
    label: 'Total Reach',
    value: '42,890',
    change: '+8.4%',
    trend: 'up',
    icon: Users,
  },
  {
    label: 'Avg. Open Rate',
    value: '24.6%',
    change: '-2.1%',
    trend: 'down',
    icon: PackageOpen,
  },
  {
    label: 'Conversions',
    value: '3,194',
    change: '+5.2%',
    trend: 'up',
    icon: ShoppingCart,
  },
]

const engagementChartData = {
  labels: ['00:00', '04:00', '08:00', '12:00', '16:00', '20:00', '24:00'],
  datasets: [
    {
      label: 'Engagement',
      data: [20, 35, 25, 58, 45, 80, 65],
      fill: true,
      borderColor: '#ff1010',
      backgroundColor: 'rgba(239, 68, 68, 0.18)',
      borderWidth: 3,
      tension: 0.42,
      pointRadius: 4,
      pointHoverRadius: 6,
      pointBackgroundColor: '#ff1010',
      pointBorderColor: '#111111',
      pointBorderWidth: 2,
    },
  ],
}

const engagementChartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  interaction: {
    mode: 'index',
    intersect: false,
  },
  plugins: {
    legend: {
      display: false,
    },
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
      min: 0,
      max: 85,
      ticks: {
        stepSize: 20,
        color: '#64748b',
        font: { size: 10 },
      },
      grid: {
        color: 'rgba(255,255,255,0.06)',
        drawBorder: false,
      },
      border: {
        display: false,
      },
    },
    x: {
      ticks: {
        color: '#64748b',
        font: { size: 10 },
      },
      grid: {
        color: 'rgba(255,255,255,0.05)',
        drawBorder: false,
      },
      border: {
        display: false,
      },
    },
  },
}

const reachChartData = {
  labels: ['New Products', 'Low Stock', 'Promos', 'System'],
  datasets: [
    {
      data: [45, 25, 18, 12],
      backgroundColor: ['#ff1010', '#a90000', '#351010', '#4a1717'],
      borderColor: '#111111',
      borderWidth: 0,
      hoverBorderWidth: 0,
      hoverOffset: 6,
    },
  ],
}

const reachChartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  cutout: '60%',
  plugins: {
    legend: {
      display: false,
    },
    tooltip: {
      backgroundColor: '#111111',
      borderColor: 'rgba(255,255,255,0.12)',
      borderWidth: 1,
      titleColor: '#ffffff',
      bodyColor: '#d4d4d4',
      padding: 12,
      callbacks: {
        label: (context) => `${context.label}: ${context.parsed}%`,
      },
    },
  },
}

const MarketingCard = () => {
  return (
    <section className="w-full bg-black px-3 py-4 text-white sm:px-5 lg:px-6">
      <div className="mx-auto max-w-[1120px]">
        <div className="flex flex-col gap-4 border-l-4 border-red-600 pl-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-xl font-bold tracking-tight text-white sm:text-2xl">
              Marketing Campaigns
            </h1>
            <p className="mt-1 max-w-2xl text-xs leading-5 text-neutral-500 sm:text-sm">
              Manage and track your global dealer outreach and engagement programs.
            </p>
          </div>

          <Link
            to="/admin/marketing/create-campaign"
            className="inline-flex h-10 w-full items-center justify-center gap-2 rounded-[7px] bg-red-600 px-4 text-[11px] font-black uppercase tracking-[0.08em] text-white shadow-[0_0_24px_rgba(239,68,68,0.38)] transition hover:bg-red-700 sm:w-auto sm:px-5"
          >
            <Plus className="h-3.5 w-3.5" />
            Create New Campaign
          </Link>
        </div>

        <div className="mt-6 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
          {stats.map((item) => {
            const Icon = item.icon
            const isUp = item.trend === 'up'

            return (
              <article
                key={item.label}
                className="rounded-[9px] border border-white/5 bg-[#131313] p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.03)]"
              >
                <div className="flex items-start justify-between gap-4">
                  <span className="grid h-9 w-9 place-items-center rounded-[7px] bg-red-500/15 text-red-500">
                    <Icon className="h-4 w-4" />
                  </span>
                  <span
                    className={`rounded-full border px-2 py-1 text-[10px] font-black ${
                      isUp
                        ? 'border-emerald-500/20 bg-emerald-500/10 text-emerald-400'
                        : 'border-red-500/20 bg-red-500/10 text-red-400'
                    }`}
                  >
                    {item.change}
                  </span>
                </div>

                <p className="mt-4 text-[10px] font-black uppercase tracking-[0.14em] text-[#9CA3AF]">
                  {item.label}
                </p>
                <h2 className="mt-2 text-md font-semibold leading-none text-white sm:text-2xl">
                  {item.value}
                </h2>
              </article>
            )
          })}
        </div>

        <div className="mt-6 grid gap-4 xl:grid-cols-[minmax(0,2.1fr)_minmax(280px,1fr)]">
          <article className="rounded-[9px] border border-white/6 bg-[#111111] p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.03)] sm:p-5 lg:p-6">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <h2 className="text-base font-black uppercase tracking-[0.08em] text-white sm:text-lg">
                Engagement Performance
              </h2>
              <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.08em] text-neutral-500">
                <span className="h-2 w-2 rounded-full bg-red-600 shadow-[0_0_12px_rgba(239,68,68,0.8)]" />
                Live Data
              </div>
            </div>

            <div className="mt-5 h-[220px] sm:h-[270px]">
              <Line data={engagementChartData} options={engagementChartOptions} />
            </div>
          </article>

          <article className="flex min-h-[420px] flex-col rounded-[9px] border border-white/6 bg-[#111111] p-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.03)] sm:p-6">
            <h2 className="flex items-center gap-3 text-md font-bold tracking-[0.08em] text-white sm:text-2xl">
              <PieChart className="h-6 w-6 fill-red-500 text-red-500" />
              Reach By Type
            </h2>

            <div className="mt-6 border-t border-white/7 pt-4">
              <div className="grid gap-5 sm:grid-cols-[minmax(110px,140px)_1fr] sm:items-start xl:grid-cols-[minmax(110px,140px)_1fr]">
                <div className="h-[120px] w-[120px] sm:h-[135px] sm:w-[135px] xl:h-[120px] xl:w-[120px] 2xl:h-[135px] 2xl:w-[135px]">
                  <Doughnut data={reachChartData} options={reachChartOptions} />
                </div>

                <div className="grid gap-3 pt-1 text-sm">
                  {[
                    ['New Products', 'bg-[#ff1010]'],
                    ['Low Stock', 'bg-[#a90000]'],
                    ['Promos', 'bg-[#351010]'],
                    ['System', 'bg-[#4a1717]'],
                  ].map(([label, color]) => (
                    <div key={label} className="flex items-center gap-4 text-slate-400">
                      <span className={`h-4 w-4 shrink-0 ${color}`} />
                      <span>{label}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-auto pt-8">
              <div className="flex items-center justify-between gap-4 text-sm sm:text-base">
                <span className="text-slate-400">Total Audience Cap</span>
                <span className="text-white">120k Units</span>
              </div>
              <div className="mt-4 h-1 overflow-hidden rounded-full bg-white/5">
                <div className="h-full w-[72%] rounded-full bg-[#1f1f1f]" />
              </div>
            </div>
          </article>
        </div>
      </div>
    </section>
  )
}

export default MarketingCard
