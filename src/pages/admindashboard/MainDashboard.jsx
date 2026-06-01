import React from 'react'
import { Calendar, Download, DollarSign, ShoppingCart, Users, Package, Clock, CheckCircle, XCircle, AlertCircle, TrendingUp } from 'lucide-react'
import { Line } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
} from 'chart.js'

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Filler)

const MainDashboard = () => {
  const chartData = {
    labels: ['00:00', '04:00', '08:00', '12:00', '16:00', '20:00', '24:00'],
    datasets: [
      {
        fill: true,
        label: 'Sales Velocity',
        data: [20, 35, 25, 60, 45, 80, 65],
        borderColor: '#dc2626', // red-600
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
      },
    },
    scales: {
      y: {
        min: 0,
        max: 80,
        ticks: { color: '#525252', font: { size: 10 } },
        grid: { color: '#262626', drawBorder: false },
      },
      x: {
        ticks: { color: '#525252', font: { size: 10 } },
        grid: { display: false, drawBorder: false },
      },
    },
  }

  const kpis = [
    {
      title: 'Total Revenue',
      value: '$2.4M',
      icon: DollarSign,
      change: '+12.5%',
      isPositive: true,
    },
    {
      title: 'Total Orders',
      value: '14,209',
      icon: ShoppingCart,
      change: '+8.2%',
      isPositive: true,
    },
    {
      title: 'Active Dealers',
      value: '842',
      icon: Users,
      change: '-2.1%',
      isPositive: false,
    },
    {
      title: 'Total Products',
      value: '3,194',
      icon: Package,
      change: '+5.4%',
      isPositive: true,
    },
  ]

  const activities = [
    {
      title: 'New Dealer Registration',
      desc: 'Alpha Corp registered from Sector 7',
      time: '2 mins ago',
      isAlert: true,
    },
    {
      title: 'Order #8942 Approved',
      desc: '$45,000 payload cleared for dispatch',
      time: '15 mins ago',
    },
    {
      title: 'System Update',
      desc: 'Security protocols upgraded to v4.2',
      time: '1 hour ago',
    },
    {
      title: 'Alert: Payment Failed',
      desc: 'Dealer Omega transaction rejected',
      time: '3 hours ago',
    },
  ]

  return (
    <div className="p-4 max-w-7xl w-full mx-auto">
          {/* Header Section */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
            <div>
              <h1 className="text-3xl font-bold text-white mb-2 flex items-center gap-2">
                Welcome Back, Usama <span className="text-yellow-500">👋</span>
              </h1>
              <p className="text-neutral-500 text-sm">Global operations overview</p>
            </div>
            <div className="flex items-center gap-3">
              <button className="flex items-center gap-2 px-4 py-2 bg-[#141414] border border-white/5 rounded-lg text-sm text-neutral-300 hover:text-white transition-colors">
                <Calendar className="w-4 h-4" />
                Last 24 Hours
              </button>
              <button className="flex items-center gap-2 px-4 py-2 border border-red-900/50 text-red-500 rounded-lg text-sm font-semibold hover:bg-red-500/10 transition-colors">
                <Download className="w-4 h-4" />
                Export Data
              </button>
            </div>
          </div>

          {/* KPIs */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
            {kpis.map((kpi, idx) => (
              <div key={idx} className="bg-[#141414] border border-white/5 rounded-2xl p-5 relative overflow-hidden group hover:border-white/10 transition-colors">
                <div className="absolute -right-6 -top-6 w-24 h-24 bg-red-500/5 rounded-full blur-2xl group-hover:bg-red-500/10 transition-colors" />
                <div className="flex justify-between items-start mb-4">
                  <div className="w-10 h-10 rounded-lg bg-red-500/10 flex items-center justify-center">
                    <kpi.icon className="w-5 h-5 text-red-500" />
                  </div>
                  <span className={`px-2 py-1 rounded text-xs font-semibold flex items-center gap-1 ${
                    kpi.isPositive ? 'bg-green-500/10 text-green-500' : 'bg-red-500/10 text-red-500'
                  }`}>
                    {kpi.change}
                  </span>
                </div>
                <div>
                  <p className="text-neutral-500 text-sm mb-1">{kpi.title}</p>
                  <h3 className="text-2xl font-bold text-white">{kpi.value}</h3>
                </div>
              </div>
            ))}
          </div>

          {/* Charts & Activity */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            {/* Main Chart */}
            <div className="lg:col-span-2 bg-[#141414] border border-white/5 rounded-2xl p-6">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-red-500" />
                  <h2 className="text-lg font-bold text-white">Sales Velocity</h2>
                </div>
                <div className="flex items-center gap-2 text-xs text-neutral-500">
                  <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                  Live Feed
                </div>
              </div>
              <div className="h-[300px] w-full">
                <Line data={chartData} options={chartOptions} />
              </div>
            </div>

            {/* Dealer Activity */}
            <div className="bg-[#141414] border border-white/5 rounded-2xl p-6">
              <div className="flex items-center gap-2 mb-6">
                <Users className="w-5 h-5 text-red-500" />
                <h2 className="text-lg font-bold text-white">Dealer Activity</h2>
              </div>
              <div className="space-y-6">
                {activities.map((act, i) => (
                  <div key={i} className="flex gap-4 group">
                    <div className="relative flex flex-col items-center">
                      <div className={`w-2 h-2 rounded-full mt-1.5 ${act.isAlert ? 'bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.6)]' : 'bg-neutral-600'}`} />
                      {i !== activities.length - 1 && (
                        <div className="w-[1px] h-full bg-neutral-800 mt-2" />
                      )}
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-white mb-0.5">{act.title}</h4>
                      <p className="text-xs text-neutral-500 mb-1">{act.desc}</p>
                      <p className={`text-[10px] font-medium ${act.isAlert ? 'text-red-500' : 'text-neutral-600'}`}>{act.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Recent Activity Table */}
          <div className="bg-[#141414] border border-white/5 rounded-2xl p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-lg font-bold text-white mb-1">Recent Activity</h2>
                <p className="text-xs text-neutral-500 tracking-wider">LOG_FEED: LIVE</p>
              </div>
              <button className="text-xs text-neutral-400 hover:text-white transition-colors">
                View All Logs
              </button>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-white/5 text-[10px] font-bold text-neutral-500 uppercase tracking-widest">
                    <th className="pb-4 font-semibold">ORDER ID</th>
                    <th className="pb-4 font-semibold">DEALER</th>
                    <th className="pb-4 font-semibold">AMOUNT</th>
                    <th className="pb-4 font-semibold">STATUS</th>
                    <th className="pb-4 font-semibold text-right">TIME</th>
                  </tr>
                </thead>
                <tbody className="text-sm">
                  {[
                    { id: '#ORD-0921', dealer: 'Alpha Tech Supply', initial: 'A', amount: '$4,250.00', status: 'Processing', time: '2 min ago' },
                    { id: '#ORD-0922', dealer: 'Bravo Tactical', initial: 'B', amount: '$1,890.00', status: 'Completed', time: '12 min ago' },
                    { id: '#ORD-0923', dealer: 'Charlie Gear Co', initial: 'C', amount: '$8,400.00', status: 'Pending', time: '45 min ago' },
                  ].map((row, i) => (
                    <tr key={i} className="border-b border-white/5 last:border-0 hover:bg-white/[0.02] transition-colors">
                      <td className="py-4 font-medium text-neutral-300">{row.id}</td>
                      <td className="py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-6 h-6 rounded bg-neutral-800 flex items-center justify-center text-xs font-bold text-neutral-400 border border-white/5">
                            {row.initial}
                          </div>
                          <span className="text-neutral-300">{row.dealer}</span>
                        </div>
                      </td>
                      <td className="py-4 font-medium text-neutral-300">{row.amount}</td>
                      <td className="py-4">
                        <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded text-xs font-medium border ${
                          row.status === 'Processing' ? 'bg-red-500/10 text-red-500 border-red-500/20' :
                          row.status === 'Completed' ? 'bg-green-500/10 text-green-500 border-green-500/20' :
                          'bg-yellow-500/10 text-yellow-500 border-yellow-500/20'
                        }`}>
                          <span className="w-1.5 h-1.5 rounded-full bg-current" />
                          {row.status}
                        </span>
                      </td>
                      <td className="py-4 text-right text-neutral-500 text-xs">{row.time}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

    </div>
  )
}

export default MainDashboard