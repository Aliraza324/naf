import React from 'react'
import {
  BarChart3,
  CheckCircle2,
  ListFilter,
  Package,
  Plus,
  Settings,
  ShieldAlert,
} from 'lucide-react'
import { Line } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  CategoryScale,
  Filler,
  LinearScale,
  LineElement,
  PointElement,
  Tooltip,
} from 'chart.js'

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Filler)

const metrics = [
  {
    label: 'Total Recipients',
    value: '2,450',
    note: '+4.2%',
    noteColor: 'text-emerald-400',
    bars: true,
  },
  {
    label: 'Emails Opened',
    value: '1,764',
    note: '72% Rate',
    progress: '72%',
  },
  {
    label: 'Links Clicked',
    value: '441',
    note: '18% Rate',
    progress: '18%',
  },
  {
    label: 'Orders',
    value: '12',
    note: '+0.2%',
    noteColor: 'text-red-500',
    progress: '2%',
    muted: true,
  },
]

const impactRows = [
  ['Direct Orders', '142 Units', 'text-white'],
  ['Revenue Impact', '$63,900.00', 'text-emerald-400'],
  ['Conversion Rate', '5.8%', 'text-white'],
]

const chartData = {
  labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
  datasets: [
    {
      label: 'Views',
      data: [450, 680, 520, 890, 710, 430, 580],
      borderColor: '#ff1010',
      backgroundColor: 'rgba(255, 16, 16, 0.12)',
      borderWidth: 3,
      fill: false,
      tension: 0.42,
      pointBackgroundColor: '#ff1010',
      pointBorderColor: '#111111',
      pointBorderWidth: 2,
      pointRadius: 4,
    },
    {
      label: 'Clicks',
      data: [80, 145, 110, 215, 180, 95, 125],
      borderColor: 'rgba(255,255,255,0.18)',
      borderDash: [9, 8],
      borderWidth: 2,
      fill: false,
      tension: 0.35,
      pointRadius: 0,
    },
  ],
}

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: { display: false },
    tooltip: {
      backgroundColor: '#111111',
      borderColor: 'rgba(255,255,255,0.12)',
      borderWidth: 1,
      titleColor: '#ffffff',
      bodyColor: '#d4d4d4',
      padding: 12,
    },
  },
  scales: {
    y: {
      min: 0,
      max: 950,
      ticks: {
        stepSize: 200,
        color: '#4b5563',
        font: { size: 11 },
      },
      grid: {
        color: 'rgba(255,255,255,0.06)',
        drawBorder: false,
      },
      border: { display: false },
    },
    x: {
      ticks: {
        color: '#6b7280',
        font: { size: 11 },
      },
      grid: {
        color: 'rgba(255,255,255,0.05)',
        drawBorder: false,
      },
      border: { display: false },
    },
  },
}

const ViewCampaign = () => {
  return (
    <div className="space-y-7">
      <header className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex items-start gap-5">
          <button
            type="button"
            aria-label="Campaign controls"
            className="mt-1 grid h-11 w-11 place-items-center rounded-full border border-white/10 bg-black text-neutral-400"
          >
            <ListFilter className="h-5 w-5" />
          </button>
          <div>
            <div className="flex flex-wrap items-center gap-3">
              <h1 className="text-2xl font-black uppercase tracking-tight text-white sm:text-3xl">
                Vortex Elite Launch Q3
              </h1>
              <span className="rounded-[5px] border border-emerald-500/20 bg-emerald-500/10 px-3 py-1 text-xs font-black uppercase text-emerald-400">
                Active
              </span>
            </div>
            <p className="mt-2 text-[11px] font-black uppercase tracking-[0.16em] text-neutral-500">
              Campaign ID: CP-9823-Vortex
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-4 lg:justify-end">
          <span className="text-sm font-bold text-white">Active</span>
          <button
            type="button"
            aria-label="Toggle campaign active state"
            className="relative h-9 w-[66px] rounded-full bg-lime-500"
          >
            <span className="absolute right-1 top-1 h-7 w-7 rounded-full bg-white shadow-lg" />
          </button>
          <button
            type="button"
            className="inline-flex h-11 items-center gap-3 rounded-[8px] border border-white/10 bg-[#141414] px-5 text-xs font-black uppercase tracking-[0.08em] text-white transition hover:bg-white/5"
          >
            <Settings className="h-4 w-4" />
            Manage Campaign
          </button>
        </div>
      </header>

      <section className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
        {metrics.map((metric) => (
          <article
            key={metric.label}
            className="min-h-[164px] rounded-[12px] border border-white/7 bg-[#141414] p-6"
          >
            <div className="flex items-center justify-between gap-4">
              <p className="text-[11px] font-black uppercase tracking-[0.16em] text-neutral-500">
                {metric.label}
              </p>
              <span className={`text-xs font-black ${metric.noteColor || 'text-neutral-500'}`}>
                {metric.note}
              </span>
            </div>
            <p className="mt-4 text-4xl font-black text-white">{metric.value}</p>
            {metric.bars ? (
              <div className="mt-6 flex h-6 items-end gap-1">
                {[38, 52, 42, 68, 78].map((height, index) => (
                  <span
                    key={index}
                    style={{ height: `${height}%` }}
                    className="flex-1 bg-red-600/70 last:bg-red-600"
                  />
                ))}
              </div>
            ) : (
              <div className="mt-9 h-2 overflow-hidden rounded-full bg-white/6">
                <div
                  style={{ width: metric.progress }}
                  className={`h-full rounded-full ${metric.muted ? 'bg-slate-600' : 'bg-red-600'}`}
                />
              </div>
            )}
          </article>
        ))}
      </section>

      <section className="grid gap-7 xl:grid-cols-[minmax(0,2.1fr)_minmax(300px,1fr)]">
        <article className="rounded-[12px] border border-white/7 bg-[#141414] p-5 sm:p-8">
          <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-3">
              <Plus className="h-5 w-5 text-red-500" />
              <h2 className="text-base font-black uppercase tracking-[0.12em] text-white">
                Engagement Over Time
              </h2>
            </div>
            <div className="flex items-center gap-5 text-xs font-bold uppercase text-neutral-500">
              <span className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-red-600" />
                Views
              </span>
              <span className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-neutral-600" />
                Clicks
              </span>
            </div>
          </div>
          <div className="h-[320px] sm:h-[380px]">
            <Line data={chartData} options={chartOptions} />
          </div>
        </article>

        <article className="rounded-[12px] border border-white/7 bg-[#141414] p-5 sm:p-8">
          <div className="flex items-center gap-3 border-b border-white/7 pb-6">
            <ShieldAlert className="h-5 w-5 fill-red-500 text-red-500" />
            <h2 className="text-base font-black uppercase tracking-[0.12em] text-white">
              Product Impact
            </h2>
          </div>

          <div className="mt-8 flex items-center gap-4 rounded-[10px] bg-black p-4">
            <img
              src="https://images.unsplash.com/photo-1595590424283-b8f17842773f?auto=format&fit=crop&w=160&q=80"
              alt=""
              className="h-16 w-16 rounded-[8px] object-cover brightness-75"
            />
            <div>
              <p className="text-sm font-black text-white">Vortex Elite V4</p>
              <p className="mt-1 text-xs text-neutral-500">SKU: VT-E4-2024</p>
            </div>
          </div>

          <div className="mt-8 space-y-7">
            {impactRows.map(([label, value, color]) => (
              <div key={label} className="flex items-center justify-between gap-4">
                <span className="text-xs font-black uppercase tracking-[0.14em] text-slate-500">
                  {label}
                </span>
                <span className={`text-lg font-black ${color}`}>{value}</span>
              </div>
            ))}
          </div>

          <div className="mt-10 border-t border-white/7 pt-7">
            <p className="text-center text-xs font-black uppercase tracking-[0.16em] text-slate-500">
              Inventory Status
            </p>
            <div className="mt-6 flex items-center gap-3">
              <div className="h-2 flex-1 overflow-hidden rounded-full bg-white/6">
                <div className="h-full w-[65%] rounded-full bg-red-600" />
              </div>
              <span className="text-xs font-black text-white">65% Left</span>
            </div>
          </div>
        </article>
      </section>
    </div>
  )
}

export default ViewCampaign
