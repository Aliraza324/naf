import React, { useState } from 'react'
import { Mail, Phone, MapPin, Calendar, Ban, AlertTriangle } from 'lucide-react'

const DealerView = () => {
  const [activeTab, setActiveTab] = useState('All')

  const orders = [
    { id: '#ORD-0921', dealer: 'Alpha Tech Supply', amount: '$4,250.00', status: 'Pending', time: '2 min ago', initials: 'A' },
    { id: '#ORD-0920', dealer: 'Omega Industries', amount: '$1,890.50', status: 'Pickup', time: '15 min ago', initials: 'O' },
    { id: '#ORD-0919', dealer: 'Nova Logistics', amount: '$8,420.00', status: 'Pending', time: '1 hr ago', initials: 'N' },
    { id: '#ORD-0918', dealer: 'Zenith Corp', amount: '$650.00', status: 'Cancel', time: '3 hrs ago', initials: 'Z' },
    { id: '#ORD-0917', dealer: 'Quantum Goods', amount: '$1,120.00', status: 'Pickup', time: '5 hrs ago', initials: 'Q' },
  ]

  const getStatusColor = (status) => {
    switch(status) {
      case 'Pickup': return 'bg-green-500/10 text-green-500 border-green-500/20'
      case 'Pending': return 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20'
      case 'Cancel': return 'bg-red-500/10 text-red-500 border-red-500/20'
      default: return 'bg-neutral-500/10 text-neutral-500 border-neutral-500/20'
    }
  }

  const filteredOrders = activeTab === 'All' ? orders : orders.filter(order => order.status === activeTab)

  const tabs = ['All', 'Pickup', 'Pending', 'Cancel']

  return (
    <div className="flex flex-col gap-8">
      {/* Profile Header Card */}
      <div className="relative rounded-2xl overflow-hidden bg-[#141414] border border-white/5 p-8 flex items-center justify-between">
        {/* Background abstract effect (since we don't have the exact image) */}
        <div className="absolute top-0 right-0 w-[600px] h-full bg-gradient-to-l from-red-900/20 to-transparent pointer-events-none" />
        
        <div className="flex items-center gap-6 relative z-10">
          <img src="https://i.pravatar.cc/150?img=11" alt="Profile" className="w-28 h-28 rounded-full border-4 border-[#141414] shadow-xl object-cover" />
          <div>
            <h1 className="text-3xl font-bold text-white mb-4">Dealer Name</h1>
            <div className="flex items-center gap-6 text-sm">
              <div className="flex items-center gap-2 text-amber-500/80">
                <Mail className="w-4 h-4" />
                <span className="text-white">Email@gmail.com</span>
              </div>
              <div className="flex items-center gap-2 text-amber-500/80">
                <Phone className="w-4 h-4" />
                <span className="text-white">+912344636</span>
              </div>
              <div className="flex items-center gap-2 text-amber-500/80">
                <MapPin className="w-4 h-4" />
                <span className="text-white">Phoenix, AZ, USA</span>
              </div>
              <div className="flex items-center gap-2 text-amber-500/80">
                <Calendar className="w-4 h-4" />
                <span className="text-white">Oct 12, 2023</span>
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-4 relative z-10 self-start">
          <button className="flex items-center gap-2 px-6 py-2 bg-neutral-900 hover:bg-neutral-800 border border-white/5 rounded-lg text-sm font-semibold text-neutral-300 transition-colors">
            <Ban className="w-4 h-4 text-amber-500" />
            Block
          </button>
          <button className="flex items-center gap-2 px-6 py-2 bg-neutral-900 hover:bg-neutral-800 border border-red-500/20 rounded-lg text-sm font-semibold text-red-500 transition-colors">
            <AlertTriangle className="w-4 h-4" />
            Delete
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div>
        <h2 className="text-lg font-bold text-white mb-4">Order Details</h2>
        <div className="grid grid-cols-4 gap-4">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`py-4 rounded-xl text-white font-semibold transition-colors ${
                activeTab === tab 
                  ? 'bg-red-600 hover:bg-red-700' 
                  : 'bg-[#141414] hover:bg-white/5 border border-white/5'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Orders Table */}
      <div className="bg-[#141414] border border-white/5 rounded-2xl overflow-hidden">
        <div className="flex items-center justify-between p-6 border-b border-white/5">
          <div>
            <h2 className="text-lg font-bold text-white">All Order</h2>
            <p className="text-sm text-neutral-500 font-mono text-xs mt-1">All order list</p>
          </div>
          <button className="text-sm text-neutral-400 hover:text-white transition-colors">View All Logs</button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-white/5 text-[11px] font-mono text-neutral-500 uppercase tracking-wider">
                <th className="py-4 px-6">ORDER ID</th>
                <th className="py-4 px-6">DEALER</th>
                <th className="py-4 px-6">AMOUNT</th>
                <th className="py-4 px-6">STATUS</th>
                <th className="py-4 px-6 text-right">TIME</th>
              </tr>
            </thead>
            <tbody className="text-sm">
              {filteredOrders.map((order, i) => (
                <tr key={i} className="border-b border-white/5 last:border-0 hover:bg-white/[0.02] transition-colors">
                  <td className="py-4 px-6 text-neutral-300 font-mono">{order.id}</td>
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-3">
                      <div className="w-6 h-6 rounded bg-neutral-800 flex items-center justify-center text-xs font-semibold text-neutral-400">
                        {order.initials}
                      </div>
                      <span className="text-white">{order.dealer}</span>
                    </div>
                  </td>
                  <td className="py-4 px-6 text-white font-mono">{order.amount}</td>
                  <td className="py-4 px-6">
                    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded text-xs font-medium border ${getStatusColor(order.status)}`}>
                      <span className="w-1.5 h-1.5 rounded-full bg-current" />
                      {order.status}
                    </span>
                  </td>
                  <td className="py-4 px-6 text-right text-neutral-500 font-mono text-xs">{order.time}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default DealerView