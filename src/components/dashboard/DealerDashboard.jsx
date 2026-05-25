import { Download, TrendingUp } from 'lucide-react'
import { useEffect, useRef } from 'react'
import Chart from 'chart.js/auto'

const statsCards = [
  { label: 'Total Orders', value: '$124,500', meta: '12.5%', detail: 'vs last month', tone: 'success' },
  { label: 'Active Orders', value: '42', detail: 'Requires action', tone: 'danger', highlighted: true },
  { label: 'Last Transmission', value: '2 Hours Ago', meta: 'ORDER#9921-XPR', tone: 'success' },
  { label: 'Allocated Funds', value: '$84,200', detail: 'STATUS: AUDIT_CLEAR', tone: 'muted' },
]

const lastMonthOrders = [6200,5600,5200,5000,4800,900,1100,5800,4600,6100,5200,900,800,4500,6900,7200,7600,8200,3000,2500,7100,6900,7500,8400,7300]
const thisMonthOrders = [5400,6600,5800,5200,5000,2100,2900,7000,6200,6800,5400,1600,700,5900,7500,6900,6400,7600,2500,1400,7000,6000,5600,6400,1900,1900,5200,5700]

const StatCard = ({ card }) => {
  const isSuccess = card.tone === 'success'
  const isDanger = card.tone === 'danger'
  return (
    <article className={`rounded-[12px] border bg-[#151517] p-4 shadow-[0_14px_32px_rgba(0,0,0,0.28)] sm:p-5 ${card.highlighted ? 'border-primary/45 shadow-[0_0_32px_rgba(232,12,12,0.1)]' : 'border-white/8'}`}>
      <p className="text-[10px] font-black uppercase tracking-[0.18em] text-white/55 sm:text-[11px]">{card.label}</p>
      <h3 className={`mt-3 text-[clamp(1.35rem,3vw,1.55rem)] font-black leading-none ${isDanger ? 'text-primary' : 'text-white'}`}>{card.value}</h3>
      <div className="mt-4 flex min-h-5 items-center gap-2 text-[10px] font-semibold">
        {isSuccess && <TrendingUp size={14} strokeWidth={2.6} className="text-green-400" />}
        {card.meta && <span className={isSuccess ? 'text-green-400' : 'text-white/55'}>{card.meta}</span>}
        {card.detail && <span className={isDanger ? 'text-primary' : 'text-white/45'}>{card.detail}</span>}
      </div>
    </article>
  )
}

const DealerDashboard = () => {
  const chartRef = useRef(null)
  const chartInstance = useRef(null)

  useEffect(() => {
    if (chartInstance.current) chartInstance.current.destroy()

    const maxLen = Math.max(lastMonthOrders.length, thisMonthOrders.length)
    const labels = Array.from({ length: maxLen }, (_, i) => i + 1)

    chartInstance.current = new Chart(chartRef.current, {
      type: 'line',
      data: {
        labels,
        datasets: [
          {
            label: 'Last Month',
            data: lastMonthOrders,
            borderColor: '#14532D',
            backgroundColor: 'rgba(20,83,45,0.08)',
            borderWidth: 2.4,
            pointRadius: 0,
            pointHoverRadius: 4,
            tension: 0.35,
            fill: true,
            borderDash: [6, 3],
          },
          {
            label: 'This Month',
            data: thisMonthOrders,
            borderColor: '#E60103',
            backgroundColor: 'rgba(230,1,3,0.06)',
            borderWidth: 2.2,
            pointRadius: 0,
            pointHoverRadius: 4,
            tension: 0.35,
            fill: true,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        interaction: { mode: 'index', intersect: false },
        plugins: {
          legend: { display: false },
          tooltip: {
            backgroundColor: '#1a1a1c',
            borderColor: 'rgba(255,255,255,0.12)',
            borderWidth: 1,
            titleColor: 'rgba(255,255,255,0.55)',
            bodyColor: '#ffffff',
            padding: 10,
            callbacks: {
              title: ctx => `Day ${ctx[0].label}`,
              label: ctx => ` ${ctx.dataset.label}: $${ctx.parsed.y.toLocaleString()}`,
            },
          },
        },
        scales: {
          x: {
            grid: { color: 'rgba(255,255,255,0.06)' },
            ticks: {
              color: 'rgba(95,86,125,0.9)',
              font: { size: 10 },
              maxTicksLimit: 4,
              autoSkip: true,
              maxRotation: 0,
              callback: (val, i) => {
                const weekLabels = ['Week 1', 'Week 2', 'Week 3', 'Week 4']
                const approxWeek = Math.floor(i / 7)
                return i % 7 === 0 && approxWeek < 4 ? weekLabels[approxWeek] : ''
              },
            },
          },
          y: {
            min: 0,
            max: 10000,
            grid: { color: 'rgba(232,232,232,0.12)', borderDash: [4, 7] },
            ticks: {
              color: 'rgba(95,86,125,0.9)',
              font: { size: 10 },
              stepSize: 2500,
              callback: v => v === 0 ? '0' : v >= 1000 ? v / 1000 + 'k' : v,
            },
          },
        },
      },
    })

    return () => chartInstance.current?.destroy()
  }, [])

  return (
    <main className="bg-[#070807] px-4 py-6 font-body text-white sm:px-6 lg:px-10 lg:py-8">
      <div className="mx-auto max-w-6xl">
        <section className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <h1 className="font-display text-[clamp(1.55rem,3.2vw,1.95rem)] font-black uppercase leading-none tracking-[0.02em] text-white">Dealer Dashboard</h1>
            <p className="mt-3 max-w-[720px] text-[13px] leading-5 text-white/55">Welcome back, Alex. Your wholesale operations are performing 12% above last month's average.</p>
          </div>
          <button type="button" className="inline-flex h-9 w-fit items-center justify-center gap-2 border border-white/12 bg-white/[0.06] px-3.5 text-[11px] font-bold text-white transition hover:border-white/25 hover:bg-white/[0.1]">
            <Download size={15} strokeWidth={2.4} />
            Export Data
          </button>
        </section>

        <section className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4 xl:gap-5">
          {statsCards.map(card => <StatCard key={card.label} card={card} />)}
        </section>

        <section className="mt-6 rounded-[12px] bg-[#131413] p-4 shadow-[0_18px_48px_rgba(0,0,0,0.32)] sm:p-5 lg:p-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
            <div className="grid gap-1">
              <p className="text-[13px] text-white/90">Statistics</p>
              <div className="flex flex-wrap items-end gap-x-10 gap-y-1">
                <h2 className="text-lg font-black leading-none text-primary">Total order</h2>
                <span className="text-xs text-white/85">past 30 days</span>
              </div>
            </div>
            <div className="grid gap-2 text-xs text-white/80 sm:pr-5">
              <span className="inline-flex items-center gap-2"><span className="size-2 rounded-full bg-[#14532D]" />Last Month</span>
              <span className="inline-flex items-center gap-2"><span className="size-2 rounded-full bg-[#E60103]" />This Month</span>
            </div>
          </div>
          <div className="mt-5 overflow-hidden rounded-[8px]">
            <div className="relative h-[220px] w-full sm:h-[260px] lg:h-[300px]">
              <canvas ref={chartRef} className="h-full w-full" />
            </div>
          </div>
        </section>
      </div>
    </main>
  )
}

export default DealerDashboard