import React from 'react'
import { Users, ShoppingCart, DollarSign, Package } from 'lucide-react'
import { useGetDealersStats } from '../../hooks/admin/useDealers'
import Loader from '../../utils/Loader'

const DealerCard = () => {
  const { data: statsData, isLoading } = useGetDealersStats()
  const stats = statsData?.stats || {
    totalDealers: 0,
    activeOrders: 0,
    totalRevenue: 0,
    pendingOrders: 0,
  }

  const kpis = [
    {
      title: 'Total Dealers',
      value: stats.totalDealers.toLocaleString(),
      icon: Users,
      iconBg: 'bg-blue-500/20',
      iconColor: 'text-blue-500',
      change: '+12.5%',
      isPositive: true,
    },
    {
      title: 'Active Orders',
      value: stats.activeOrders.toLocaleString(),
      icon: ShoppingCart,
      iconBg: 'bg-red-500/20',
      iconColor: 'text-red-500',
      change: '+8.2%',
      isPositive: true,
    },
    {
      title: 'Total Revenue',
      value: `$${stats.totalRevenue.toLocaleString()}`,
      icon: DollarSign,
      iconBg: 'bg-emerald-500/20',
      iconColor: 'text-emerald-500',
      change: '-2.1%',
      isPositive: false,
    },
    {
      title: 'Pending orders',
      value: stats.pendingOrders.toLocaleString(),
      icon: Package,
      iconBg: 'bg-lime-500/20',
      iconColor: 'text-lime-500',
      change: '+5.4%',
      isPositive: true,
    },
  ]

  if (isLoading) {
    return <Loader className="min-h-[150px]" />
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
      {kpis.map((kpi, idx) => (
        <div key={idx} className="bg-[#141414] border border-white/5 rounded-2xl p-5 relative overflow-hidden group hover:border-white/10 transition-colors">
          <div className={`absolute -right-6 -top-6 w-24 h-24 rounded-full blur-2xl transition-colors ${kpi.iconColor.replace('text-', 'bg-').replace('-500', '-500/10')}`} />
          <div className="flex justify-between items-start mb-6">
            <div className={`w-10 h-10 rounded-lg ${kpi.iconBg} flex items-center justify-center`}>
              <kpi.icon className={`w-5 h-5 ${kpi.iconColor}`} />
            </div>
            <span className={`px-2 py-1 rounded text-xs font-semibold flex items-center gap-1 ${
              kpi.isPositive ? 'bg-green-500/10 text-green-500' : 'bg-red-500/10 text-red-500'
            }`}>
              <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                {kpi.isPositive ? <path d="M7 17L17 7M17 7H7M17 7V17" /> : <path d="M7 7L17 17M17 17H7M17 17V7" />}
              </svg>
              {kpi.change}
            </span>
          </div>
          <div>
            <p className="text-neutral-400 text-sm mb-1">{kpi.title}</p>
            <h3 className="text-2xl font-bold text-white">{kpi.value}</h3>
          </div>
        </div>
      ))}
    </div>
  )
}

export default DealerCard