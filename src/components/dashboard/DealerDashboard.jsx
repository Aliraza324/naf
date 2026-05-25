import { Download, TrendingUp } from 'lucide-react'

const statsCards = [
  {
    label: 'Total Orders',
    value: '$124,500',
    meta: '12.5%',
    detail: 'vs last month',
    tone: 'success',
  },
  {
    label: 'Active Orders',
    value: '42',
    detail: 'Requires action',
    tone: 'danger',
    highlighted: true,
  },
  {
    label: 'Last Transmission',
    value: '2 Hours Ago',
    meta: 'ORDER#9921-XPR',
    tone: 'success',
  },
  {
    label: 'Allocated Funds',
    value: '$84,200',
    detail: 'STATUS: AUDIT_CLEAR',
    tone: 'muted',
  },
]

const chart = {
  width: 798,
  height: 138,
  maxValue: 10000,
}

const lastMonthOrders = [
  6200, 5600, 5200, 5000, 4800, 900, 1100, 5800, 4600, 6100, 5200, 900, 800,
  4500, 6900, 7200, 7600, 8200, 3000, 2500, 7100, 6900, 7500, 8400, 7300,
]

const thisMonthOrders = [
  5400, 6600, 5800, 5200, 5000, 2100, 2900, 7000, 6200, 6800, 5400, 1600, 700,
  5900, 7500, 6900, 6400, 7600, 2500, 1400, 7000, 6000, 5600, 6400, 1900, 1900,
  5200, 5700,
]

const getChartPoints = (values) =>
  values
    .map((value, index) => {
      const x = (index / (values.length - 1)) * chart.width
      const y = chart.height - (value / chart.maxValue) * chart.height

      return `${x.toFixed(1)},${y.toFixed(1)}`
    })
    .join(' ')

const StatCard = ({ card }) => {
  const isSuccess = card.tone === 'success'
  const isDanger = card.tone === 'danger'

  return (
    <article
      className={`rounded-[12px] border bg-[#151517] p-4 shadow-[0_14px_32px_rgba(0,0,0,0.28)] sm:p-5 ${
        card.highlighted ? 'border-primary/45 shadow-[0_0_32px_rgba(232,12,12,0.1)]' : 'border-white/8'
      }`}
    >
      <p className="text-[10px] font-black uppercase tracking-[0.18em] text-white/55 sm:text-[11px]">
        {card.label}
      </p>
      <h3
        className={`mt-3 text-[clamp(1.35rem,3vw,1.55rem)] font-black leading-none ${
          isDanger ? 'text-primary' : 'text-white'
        }`}
      >
        {card.value}
      </h3>
      <div className="mt-4 flex min-h-5 items-center gap-2 text-[10px] font-semibold">
        {isSuccess && <TrendingUp size={14} strokeWidth={2.6} className="text-green-400" />}
        {card.meta && (
          <span className={isSuccess ? 'text-green-400' : 'text-white/55'}>{card.meta}</span>
        )}
        {card.detail && (
          <span className={isDanger ? 'text-primary' : 'text-white/45'}>{card.detail}</span>
        )}
      </div>
    </article>
  )
}

const DealerDashboard = () => {
  return (
    <main className="bg-[#070807] px-4 py-6 font-body text-white sm:px-6 lg:px-10 lg:py-8">
      <div className="mx-auto max-w-6xl">
        <section className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <h1 className="font-display text-[clamp(1.55rem,3.2vw,1.95rem)] font-black uppercase leading-none tracking-[0.02em] text-white">
              Dealer Dashboard
            </h1>
            <p className="mt-3 max-w-[720px] text-[13px] leading-5 text-white/55">
              Welcome back, Alex. Your wholesale operations are performing 12% above last month's
              average.
            </p>
          </div>

          <button
            type="button"
            className="inline-flex h-9 w-fit items-center justify-center gap-2 border border-white/12 bg-white/[0.06] px-3.5 text-[11px] font-bold text-white transition hover:border-white/25 hover:bg-white/[0.1]"
          >
            <Download size={15} strokeWidth={2.4} />
            Export Data
          </button>
        </section>

        <section className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4 xl:gap-5">
          {statsCards.map((card) => (
            <StatCard key={card.label} card={card} />
          ))}
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
              <span className="inline-flex items-center gap-2">
                <span className="size-2 rounded-full bg-[#8a35ff]" />
                Last Month
              </span>
              <span className="inline-flex items-center gap-2">
                <span className="size-2 rounded-full bg-[#ffadc6]" />
                This Month
              </span>
            </div>
          </div>

          <div className="mt-5 overflow-x-auto pb-1">
            <svg
              viewBox="0 0 860 230"
              role="img"
              aria-label="Total order chart for the past 30 days"
              className="h-[210px] min-w-[720px] rounded-[8px] sm:h-[235px] lg:h-[250px] lg:min-w-0"
            >
              <g transform="translate(48 22)">
                <line x1="0" y1="0" x2="798" y2="0" stroke="#e8e8e8" strokeDasharray="4 7" strokeWidth="1.4" />
                <line x1="0" y1="46" x2="798" y2="46" stroke="#e8e8e8" strokeDasharray="4 7" strokeWidth="1.4" />
                <line x1="0" y1="92" x2="798" y2="92" stroke="#e8e8e8" strokeDasharray="4 7" strokeWidth="1.4" />
                <line x1="0" y1="138" x2="798" y2="138" stroke="#ffffff" strokeWidth="1.4" opacity="0.7" />
                <line x1="266" y1="0" x2="266" y2="138" stroke="#ffffff" strokeWidth="1" opacity="0.55" />
                <line x1="532" y1="0" x2="532" y2="138" stroke="#ffffff" strokeWidth="1" opacity="0.55" />
                <polyline
                  points={getChartPoints(lastMonthOrders)}
                  fill="none"
                  stroke="#0f6a3f"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2.6"
                />
                <polyline
                  points={getChartPoints(thisMonthOrders)}
                  fill="none"
                  stroke="#ff1010"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2.4"
                />
                <line x1="0" y1="0" x2="0" y2="138" stroke="#ffffff" strokeWidth="1.2" opacity="0.65" />
                <line x1="0" y1="138" x2="798" y2="138" stroke="#ffffff" strokeWidth="1.2" opacity="0.65" />
              </g>

              <g fill="#5f567d" fontSize="11" fontFamily="Inter, sans-serif">
                <text x="18" y="29">10k</text>
                <text x="24" y="75">5k</text>
                <text x="24" y="121">1k</text>
                <text x="31" y="167">0</text>
                <text x="76" y="206">Week 1</text>
                <text x="296" y="206">Week 2</text>
                <text x="562" y="206">Week 3</text>
                <text x="782" y="206">Week 4</text>
              </g>
            </svg>
          </div>
        </section>

       
      </div>
    </main>
  )
}

export default DealerDashboard
