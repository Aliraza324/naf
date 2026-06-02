import React, { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Eye, Search, Trash2 } from 'lucide-react'

const ordersData = [
  {
    id: '#5678',
    customer: 'Jerome Bell',
    status: 'Completed',
    amount: '$320.00',
    date: '01 Mar 2025',
    avatarColor: 'bg-red-500',
  },
  {
    id: '#5679',
    customer: 'Bessie Cooper',
    status: 'Completed',
    amount: '$440.00',
    date: '01 Mar 2025',
    avatarColor: 'bg-blue-500',
  },
  {
    id: '#5680',
    customer: 'Darrell Steward',
    status: 'Delayed',
    amount: '$220.00',
    date: '02 Mar 2025',
    avatarColor: 'bg-pink-500',
  },
  {
    id: '#5681',
    customer: 'Cameron Williamson',
    status: 'Processing',
    amount: '$510.00',
    date: '03 Mar 2025',
    avatarColor: 'bg-violet-500',
  },
  {
    id: '#5682',
    customer: 'Floyd Miles',
    status: 'Processing',
    amount: '$600.00',
    date: '04 Mar 2025',
    avatarColor: 'bg-amber-500',
  },
]

const statusStyles = {
  Completed: 'bg-emerald-500/10 text-emerald-300 border border-emerald-500/20',
  Processing: 'bg-sky-500/10 text-sky-300 border border-sky-500/20',
  Delayed: 'bg-rose-500/10 text-rose-300 border border-rose-500/20',
}

const tabs = ['All Orders', 'Pending', 'Processing', 'Delivered']

const OrderTable = () => {
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState('All Orders')
  const [search, setSearch] = useState('')

  const filteredOrders = useMemo(() => {
    const searchTerm = search.trim().toLowerCase()
    return ordersData.filter((order) => {
      const matchesTab =
        activeTab === 'All Orders' ||
        (activeTab === 'Processing' && order.status === 'Processing') ||
        (activeTab === 'Delivered' && order.status === 'Completed') ||
        (activeTab === 'Pending' && order.status === 'Delayed')

      const matchesSearch =
        !searchTerm ||
        order.id.toLowerCase().includes(searchTerm) ||
        order.customer.toLowerCase().includes(searchTerm) ||
        order.status.toLowerCase().includes(searchTerm)

      return matchesTab && matchesSearch
    })
  }, [activeTab, search])

  return (
    <div className="space-y-6 mx-auto w-full max-w-7xl">
      <div className="rounded-md p-5 shadow-lg shadow-black/20">
        <div className="grid gap-4">
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-4">
            {tabs.map((tab) => {
              const isActive = activeTab === tab
              return (
                <button
                  key={tab}
                  type="button"
                  onClick={() => setActiveTab(tab)}
                  className={`rounded-md px-5 py-2.5 text-sm font-semibold transition ${isActive
                    ? 'bg-red-600 text-white shadow-[0_10px_30px_rgba(239,68,68,0.18)]'
                    : 'bg-[#121212] text-neutral-300 hover:bg-white/5'
                    }`}
                >
                  {tab}
                </button>
              )
            })}
          </div>


        </div>
      </div>

      <div className="overflow-hidden rounded-3xl border border-white/10 bg-[#111111] shadow-xl shadow-black/10">
        <div className="flex items-center justify-between border-b border-white/10 px-5 py-4">
          <div>
            <h2 className="text-xl font-semibold text-white">Order List</h2>
          </div>
          <div className="relative w-full max-w-sm ml-auto">
            <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-500" />
            <input
              type="text"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search orders..."
              className="w-full rounded-2xl border border-white/10 bg-[#111111] py-3 pl-11 pr-4 text-sm text-white outline-none placeholder:text-neutral-500 transition focus:border-red-500/40"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full border-separate border-spacing-0 text-left text-sm">
            <thead>
              <tr className="bg-[#121212] text-[11px] uppercase tracking-[0.24em] text-neutral-500">
                <th className="px-6 py-4">ORDER ID</th>
                <th className="px-6 py-4">CUSTOMER</th>
                <th className="px-6 py-4">STATUS</th>
                <th className="px-6 py-4">TOTAL AMOUNT</th>
                <th className="px-6 py-4">DATE</th>
                <th className="px-6 py-4 text-right">ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              {filteredOrders.length > 0 ? (
                filteredOrders.map((order) => (
                  <tr key={order.id} className="border-b border-white/5 transition hover:bg-white/5">
                    <td className="px-6 py-5 font-medium text-white">{order.id}</td>
                    <td className="px-6 py-5">
                      <div className="flex items-center gap-3">
                        <div className={`flex h-10 w-10 items-center justify-center rounded-full text-sm font-semibold text-white ${order.avatarColor}`}>
                          {order.customer
                            .split(' ')
                            .map((part) => part[0])
                            .join('')}
                        </div>
                        <span className="text-sm text-white">{order.customer}</span>
                      </div>
                    </td>
                    <td className="px-6 py-5">
                      <span className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-[0.15em] ${statusStyles[order.status]}`}>
                        {order.status}
                      </span>
                    </td>
                    <td className="px-6 py-5 font-medium text-white">{order.amount}</td>
                    <td className="px-6 py-5 text-neutral-400">{order.date}</td>
                    <td className="px-6 py-5 text-right">
                      <div className="inline-flex items-center gap-3 text-neutral-400">
                        <button
                          type="button"
                          onClick={() => navigate(`/admin/orders/${order.id.replace('#', '')}`)}
                          className="rounded-full p-2 transition hover:bg-white/10 hover:text-white"
                        >
                          <Eye className="h-4 w-4" />
                        </button>
                        <button type="button" className="rounded-full p-2 transition hover:bg-white/10 hover:text-white">
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="px-6 py-10 text-center text-sm text-neutral-500">
                    No orders found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default OrderTable