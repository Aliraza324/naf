import React from 'react'
import {
  AlertCircle,
  Calendar,
  DollarSign,
  Download,
  Package,
  ShoppingCart,
  TrendingUp,
  Users,
} from 'lucide-react'
import { Line } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  CategoryScale,
  Filler,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
} from 'chart.js'
import { useAdminActivity } from '../../hooks/admin/useAdminActivity'

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Filler)

const cardIcons = {
  totalRevenue: DollarSign,
  totalOrders: ShoppingCart,
  activeDealers: Users,
  totalProducts: Package,
}

const fallbackCards = [
  {
    key: 'totalRevenue',
    label: 'Total Revenue',
    displayValue: '$0',
    change: { value: '0%', direction: 'up' },
  },
  {
    key: 'totalOrders',
    label: 'Total Orders',
    displayValue: '0',
    change: { value: '0%', direction: 'up' },
  },
  {
    key: 'activeDealers',
    label: 'Active Dealers',
    displayValue: '0',
    change: { value: '0%', direction: 'up' },
  },
  {
    key: 'totalProducts',
    label: 'Total Products',
    displayValue: '0',
    change: { value: '0%', direction: 'up' },
  },
]

const fallbackLabels = ['00:00', '04:00', '08:00', '12:00', '16:00', '20:00', '24:00']

const getStatusClasses = (status = '') => {
  const normalizedStatus = status.toLowerCase()

  if (['completed', 'active', 'unblocked', 'approved'].includes(normalizedStatus)) {
    return 'bg-green-500/10 text-green-500 border-green-500/20'
  }

  if (['processing', 'pending'].includes(normalizedStatus)) {
    return 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20'
  }

  if (['blocked', 'deleted', 'failed', 'cancelled', 'canceled'].includes(normalizedStatus)) {
    return 'bg-red-500/10 text-red-500 border-red-500/20'
  }

  return 'bg-neutral-500/10 text-neutral-400 border-neutral-500/20'
}

const formatAxisValue = (value) => {
  if (value >= 1000000) return `${(value / 1000000).toFixed(value % 1000000 ? 1 : 0)}M`
  if (value >= 1000) return `${(value / 1000).toFixed(value % 1000 ? 1 : 0)}K`
  return value
}

const MainDashboard = () => {
  const { data: activityData, isLoading, isError } = useAdminActivity(10)

  const header = activityData?.header || {
    title: 'Welcome Back',
    subtitle: 'Global operations overview',
    range: 'Last 24 Hours',
  }
  const cards = activityData?.cards?.length ? activityData.cards : fallbackCards
  const salesVelocity = activityData?.salesVelocity || {}
  const salesLabels = salesVelocity.labels?.length
    ? salesVelocity.labels
    : salesVelocity.data?.map((item) => item.time) || fallbackLabels
  const salesValues = salesVelocity.data?.length
    ? salesVelocity.data.map((item) => item.value || 0)
    : fallbackLabels.map(() => 0)
  const maxSalesValue = Math.max(...salesValues, 80)
  const chartMax = Math.ceil((maxSalesValue * 1.15) / 10) * 10
  const dealerActivities = activityData?.dealerActivity?.activities || []
  const recentRows = activityData?.recentActivity?.rows || []

  const chartData = {
    labels: salesLabels,
    datasets: [
      {
        fill: true,
        label: salesVelocity.title || 'Sales Velocity',
        data: salesValues,
        borderColor: '#dc2626',
        backgroundColor: 'rgba(220, 38, 38, 0.1)',
        borderWidth: 2,
        tension: 0.4,
        pointBackgroundColor: '#dc2626',
        pointBorderColor: '#171717',
        pointBorderWidth: 2,
        pointRadius: 4,
      },
    ],
  }

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: {
        backgroundColor: '#171717',
        titleColor: '#fff',
        bodyColor: '#a3a3a3',
        borderColor: '#262626',
        borderWidth: 1,
        callbacks: {
          label: (context) => `${context.dataset.label}: ${formatAxisValue(context.parsed.y)}`,
        },
      },
    },
    scales: {
      y: {
        min: 0,
        max: chartMax,
        ticks: {
          color: '#525252',
          font: { size: 10 },
          callback: (value) => formatAxisValue(value),
        },
        grid: { color: '#262626', drawBorder: false },
      },
      x: {
        ticks: { color: '#525252', font: { size: 10 } },
        grid: { display: false, drawBorder: false },
      },
    },
  }

  return (
    <div className="mx-auto w-full max-w-7xl p-4">
      <div className="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-end">
        <div>
          <h1 className="mb-2 flex items-center gap-2 text-3xl font-bold text-white">
            {header.title} <span className="text-yellow-500">👋</span>
          </h1>
          <p className="text-sm text-neutral-500">{header.subtitle}</p>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <button className="flex items-center gap-2 rounded-lg border border-white/5 bg-[#141414] px-4 py-2 text-sm text-neutral-300 transition-colors hover:text-white">
            <Calendar className="h-4 w-4" />
            {header.range}
          </button>
          <button className="flex items-center gap-2 rounded-lg border border-red-900/50 px-4 py-2 text-sm font-semibold text-red-500 transition-colors hover:bg-red-500/10">
            <Download className="h-4 w-4" />
            Export Data
          </button>
        </div>
      </div>

      {isError && (
        <div className="mb-6 flex items-center gap-3 rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-300">
          <AlertCircle className="h-4 w-4" />
          Dashboard activity could not be loaded.
        </div>
      )}

      <div className="mb-8 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-4">
        {cards.map((card) => {
          const Icon = cardIcons[card.key] || Package
          const isPositive = card.change?.direction !== 'down'

          return (
            <div
              key={card.key || card.label}
              className="group relative overflow-hidden rounded-2xl border border-white/5 bg-[#141414] p-5 transition-colors hover:border-white/10"
            >
              <div className="absolute -right-6 -top-6 h-24 w-24 rounded-full bg-red-500/5 blur-2xl transition-colors group-hover:bg-red-500/10" />
              <div className="mb-4 flex items-start justify-between">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-red-500/10">
                  <Icon className="h-5 w-5 text-red-500" />
                </div>
                <span
                  className={`flex items-center gap-1 rounded px-2 py-1 text-xs font-semibold ${
                    isPositive ? 'bg-green-500/10 text-green-500' : 'bg-red-500/10 text-red-500'
                  }`}
                >
                  {card.change?.value || '0%'}
                </span>
              </div>
              <div>
                <p className="mb-1 text-sm text-neutral-500">{card.label}</p>
                <h3 className="text-2xl font-bold text-white">{card.displayValue ?? card.value}</h3>
              </div>
            </div>
          )
        })}
      </div>

      <div className="mb-8 grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="rounded-2xl border border-white/5 bg-[#141414] p-6 lg:col-span-2">
          <div className="mb-6 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-red-500" />
              <h2 className="text-lg font-bold text-white">
                {salesVelocity.title || 'Sales Velocity'}
              </h2>
            </div>
            <div className="flex items-center gap-2 text-xs text-neutral-500">
              <span className="h-2 w-2 animate-pulse rounded-full bg-red-500" />
              {salesVelocity.status || 'Live Feed'}
            </div>
          </div>
          <div className="h-[300px] w-full">
            <Line data={chartData} options={chartOptions} />
          </div>
        </div>

        <div className="rounded-2xl border border-white/5 bg-[#141414] p-6">
          <div className="mb-6 flex items-center gap-2">
            <Users className="h-5 w-5 text-red-500" />
            <h2 className="text-lg font-bold text-white">
              {activityData?.dealerActivity?.title || 'Dealer Activity'}
            </h2>
          </div>
          <div className="space-y-6">
            {dealerActivities.map((activity, index) => (
              <div key={activity.id || index} className="group flex gap-4">
                <div className="relative flex flex-col items-center">
                  <div
                    className={`mt-1.5 h-2 w-2 rounded-full ${
                      index === 0
                        ? 'bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.6)]'
                        : 'bg-neutral-600'
                    }`}
                  />
                  {index !== dealerActivities.length - 1 && (
                    <div className="mt-2 h-full w-px bg-neutral-800" />
                  )}
                </div>
                <div>
                  <h4 className="mb-0.5 text-sm font-semibold text-white">{activity.title}</h4>
                  <p className="mb-1 text-xs text-neutral-500">{activity.description}</p>
                  <p className={`text-[10px] font-medium ${index === 0 ? 'text-red-500' : 'text-neutral-600'}`}>
                    {activity.time}
                  </p>
                </div>
              </div>
            ))}

            {!isLoading && dealerActivities.length === 0 && (
              <p className="text-sm text-neutral-500">No dealer activity found.</p>
            )}

            {isLoading && <p className="text-sm text-neutral-500">Loading activity...</p>}
          </div>
        </div>
      </div>

      <div className="rounded-2xl border border-white/5 bg-[#141414] p-6">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h2 className="mb-1 text-lg font-bold text-white">
              {activityData?.recentActivity?.title || 'Recent Activity'}
            </h2>
            <p className="text-xs tracking-wider text-neutral-500">
              {activityData?.recentActivity?.subtitle || 'LOG_FEED: LIVE'}
            </p>
          </div>
          <button className="text-xs text-neutral-400 transition-colors hover:text-white">
            {activityData?.recentActivity?.actionLabel || 'View All Logs'}
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[760px] border-collapse text-left">
            <thead>
              <tr className="border-b border-white/5 text-[10px] font-bold uppercase tracking-widest text-neutral-500">
                <th className="pb-4 font-semibold">Title</th>
                <th className="pb-4 font-semibold">Description</th>
                <th className="pb-4 font-semibold">Admin</th>
                <th className="pb-4 font-semibold">Entity</th>
                <th className="pb-4 font-semibold">Status</th>
                <th className="pb-4 text-right font-semibold">Time</th>
              </tr>
            </thead>
            <tbody className="text-sm">
              {recentRows.map((row) => (
                <tr
                  key={row.id}
                  className="border-b border-white/5 transition-colors last:border-0 hover:bg-white/[0.02]"
                >
                  <td className="py-4 font-medium text-neutral-300">{row.title}</td>
                  <td className="max-w-[260px] py-4 text-neutral-500">
                    <span className="line-clamp-2">{row.description}</span>
                  </td>
                  <td className="py-4 text-neutral-300">{row.adminEmail || '-'}</td>
                  <td className="py-4 text-neutral-300">{row.entityName || '-'}</td>
                  <td className="py-4">
                    <span
                      className={`inline-flex items-center gap-1.5 rounded border px-2.5 py-1 text-xs font-medium ${getStatusClasses(row.status)}`}
                    >
                      <span className="h-1.5 w-1.5 rounded-full bg-current" />
                      {row.status || 'unknown'}
                    </span>
                  </td>
                  <td className="py-4 text-right text-xs text-neutral-500">{row.time}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {!isLoading && recentRows.length === 0 && (
          <div className="py-8 text-center text-sm text-neutral-500">No recent activity found.</div>
        )}
      </div>
    </div>
  )
}

export default MainDashboard
