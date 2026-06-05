import React, { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Mail, Phone, MapPin, Calendar, Ban, AlertTriangle, CheckCircle, Loader2, ArrowLeft } from 'lucide-react'
import Loader from '../../utils/Loader'
import { useGetDealerDetail, useBlockDealer, useUnblockDealer, useDeleteDealer } from '../../hooks/admin/useDealers'

const DealerView = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const { data: dealer, isLoading, isError } = useGetDealerDetail(id)
  const { mutate: blockDealer, isPending: isBlocking } = useBlockDealer()
  const { mutate: unblockDealer, isPending: isUnblocking } = useUnblockDealer()
  const { mutate: deleteDealer, isPending: isDeleting } = useDeleteDealer()

  const [activeTab, setActiveTab] = useState('All')

  const getStatusColor = (status) => {
    switch ((status || '').toLowerCase()) {
      case 'pickup': return 'bg-green-500/10 text-green-500 border-green-500/20'
      case 'pending': return 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20'
      case 'processing': return 'bg-blue-500/10 text-blue-500 border-blue-500/20'
      case 'completed': return 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20'
      case 'cancel': return 'bg-red-500/10 text-red-500 border-red-500/20'
      default: return 'bg-neutral-500/10 text-neutral-500 border-neutral-500/20'
    }
  }

  const getDealerStatusColor = (status) => {
    switch ((status || '').toLowerCase()) {
      case 'active': return 'bg-green-500/10 text-green-500 border-green-500/20'
      case 'blocked': return 'bg-red-500/10 text-red-500 border-red-500/20'
      default: return 'bg-neutral-500/10 text-neutral-500 border-neutral-500/20'
    }
  }

  const formatDate = (dateStr) => {
    if (!dateStr) return 'N/A'
    const date = new Date(dateStr)
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })
  }

  const handleBlock = () => {
    blockDealer(id)
  }

  const handleUnblock = () => {
    unblockDealer(id)
  }

  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete this dealer? This action cannot be undone.")) {
      deleteDealer(id, {
        onSuccess: () => {
          navigate('/admin/dealers')
        }
      })
    }
  }

  // Loading state
  if (isLoading) {
    return <Loader className="min-h-[50vh]" />
  }

  // Error / Not Found state
  if (isError || !dealer) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] gap-4">
        <AlertTriangle className="w-12 h-12 text-red-500" />
        <h2 className="text-xl font-bold text-white">Dealer not found</h2>
        <button
          onClick={() => navigate('/admin/dealers')}
          className="flex items-center gap-2 px-6 py-2 bg-red-600 hover:bg-red-700 rounded-lg text-sm font-semibold text-white transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Dealers
        </button>
      </div>
    )
  }

  const orders = dealer.orderDetails || []
  const tabs = ['All', 'Pickup', 'Pending', 'Processing', 'Completed', 'Cancel']
  const filteredOrders = activeTab === 'All' ? orders : orders.filter(order => (order.status || '').toLowerCase() === activeTab.toLowerCase())
  const isBlocked = (dealer.status || '').toLowerCase() === 'blocked'

  return (
    <div className="flex flex-col gap-6 sm:gap-8 px-2 sm:px-0">

      {/* Back Button */}
      <button
        onClick={() => navigate('/admin/dealers')}
        className="flex items-center gap-2 text-neutral-400 hover:text-white transition-colors w-fit"
      >
        <ArrowLeft className="w-4 h-4" />
        <span className="text-sm font-medium">Back to Dealers</span>
      </button>

      {/* Profile Header Card */}
      <div className="relative rounded-2xl overflow-hidden bg-[#141414] border border-white/5 p-5 sm:p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5 sm:gap-4">
        {/* Background gradient */}
        <div className="absolute top-0 right-0 w-full sm:w-[600px] h-full bg-gradient-to-l from-red-900/20 to-transparent pointer-events-none" />

        {/* Avatar + Info */}
        <div className="flex flex-col sm:flex-row items-center sm:items-center gap-4 sm:gap-6 relative z-10 w-full sm:w-auto">
          <div className="w-20 h-20 sm:w-28 sm:h-28 rounded-full border-4 border-[#141414] shadow-xl bg-neutral-800 flex items-center justify-center text-3xl font-bold text-neutral-400">
            {(dealer.dealerName || 'D').charAt(0).toUpperCase()}
          </div>
          <div className="text-center sm:text-left">
            <div className="flex items-center gap-3 justify-center sm:justify-start mb-3">
              <h1 className="text-2xl sm:text-3xl font-bold text-white">{dealer.dealerName || 'Unknown Dealer'}</h1>
              <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded text-xs font-medium border capitalize ${getDealerStatusColor(dealer.status)}`}>
                <span className="w-1.5 h-1.5 rounded-full bg-current" />
                {dealer.status || 'active'}
              </span>
            </div>
            <div className="flex flex-col sm:flex-row flex-wrap justify-center sm:justify-start items-center gap-3 text-sm">
              <div className="flex items-center gap-2 text-amber-500/80">
                <Mail className="w-4 h-4 shrink-0" />
                <span className="text-white text-xs sm:text-sm">{dealer.email || 'N/A'}</span>
              </div>
              <div className="flex items-center gap-2 text-amber-500/80">
                <Phone className="w-4 h-4 shrink-0" />
                <span className="text-white text-xs sm:text-sm">{dealer.phone || 'N/A'}</span>
              </div>
              <div className="flex items-center gap-2 text-amber-500/80">
                <MapPin className="w-4 h-4 shrink-0" />
                <span className="text-white text-xs sm:text-sm">{dealer.location || 'N/A'}</span>
              </div>
              <div className="flex items-center gap-2 text-amber-500/80">
                <Calendar className="w-4 h-4 shrink-0" />
                <span className="text-white text-xs sm:text-sm">{formatDate(dealer.joined)}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-3 relative z-10 w-full sm:w-auto justify-center sm:justify-end sm:self-start">
          {isBlocked ? (
            <button
              onClick={handleUnblock}
              disabled={isUnblocking}
              className="flex items-center gap-2 px-4 sm:px-6 py-2 bg-neutral-900 hover:bg-neutral-800 border border-green-500/20 rounded-lg text-xs sm:text-sm font-semibold text-green-500 transition-colors disabled:opacity-50"
            >
              <CheckCircle className="w-4 h-4 shrink-0" />
              {isUnblocking ? 'Unblocking...' : 'Unblock'}
            </button>
          ) : (
            <button
              onClick={handleBlock}
              disabled={isBlocking}
              className="flex items-center gap-2 px-4 sm:px-6 py-2 bg-neutral-900 hover:bg-neutral-800 border border-white/5 rounded-lg text-xs sm:text-sm font-semibold text-neutral-300 transition-colors disabled:opacity-50"
            >
              <Ban className="w-4 h-4 text-amber-500 shrink-0" />
              {isBlocking ? 'Blocking...' : 'Block'}
            </button>
          )}
          <button
            onClick={handleDelete}
            disabled={isDeleting}
            className="flex items-center gap-2 px-4 sm:px-6 py-2 bg-neutral-900 hover:bg-neutral-800 border border-red-500/20 rounded-lg text-xs sm:text-sm font-semibold text-red-500 transition-colors disabled:opacity-50"
          >
            <AlertTriangle className="w-4 h-4 shrink-0" />
            {isDeleting ? 'Deleting...' : 'Delete'}
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-[#141414] border border-white/5 rounded-xl p-5">
          <p className="text-neutral-500 text-xs font-mono uppercase tracking-wider mb-2">Total Orders</p>
          <p className="text-2xl font-bold text-white">{dealer.orders || 0}</p>
        </div>
        <div className="bg-[#141414] border border-white/5 rounded-xl p-5">
          <p className="text-neutral-500 text-xs font-mono uppercase tracking-wider mb-2">Total Spending</p>
          <p className="text-2xl font-bold text-white">${(dealer.totalSpending || 0).toLocaleString()}</p>
        </div>
      </div>

      {/* Tabs */}
      <div>
        <h2 className="text-base sm:text-lg font-bold text-white mb-3 sm:mb-4">Order Details</h2>
        <div className="grid grid-cols-3 sm:grid-cols-6 gap-3 sm:gap-4">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`py-3 sm:py-4 rounded-xl text-white text-sm font-semibold transition-colors ${activeTab === tab
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
        <div className="flex items-center justify-between p-4 sm:p-6 border-b border-white/5">
          <div>
            <h2 className="text-base sm:text-lg font-bold text-white">All Orders</h2>
            <p className="text-neutral-500 font-mono text-[10px] sm:text-xs mt-1">
              {filteredOrders.length} order{filteredOrders.length !== 1 ? 's' : ''} found
            </p>
          </div>
        </div>

        {/* Scrollable on mobile */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[520px]">
            <thead>
              <tr className="border-b border-white/5 text-[10px] sm:text-[11px] font-mono text-neutral-500 uppercase tracking-wider">
                <th className="py-3 sm:py-4 px-4 sm:px-6">ORDER ID</th>
                <th className="py-3 sm:py-4 px-4 sm:px-6">DEALER</th>
                <th className="py-3 sm:py-4 px-4 sm:px-6">AMOUNT</th>
                <th className="py-3 sm:py-4 px-4 sm:px-6">STATUS</th>
                <th className="py-3 sm:py-4 px-4 sm:px-6 text-right">TIME</th>
              </tr>
            </thead>
            <tbody className="text-sm">
              {filteredOrders.length === 0 ? (
                <tr>
                  <td colSpan="5" className="py-12 text-center text-neutral-500">
                    No orders found.
                  </td>
                </tr>
              ) : (
                filteredOrders.map((order, i) => (
                  <tr
                    key={i}
                    className="border-b border-white/5 last:border-0 hover:bg-white/[0.02] transition-colors"
                  >
                    <td className="py-3 sm:py-4 px-4 sm:px-6 text-neutral-300 font-mono text-xs sm:text-sm">
                      {order.orderId || 'N/A'}
                    </td>
                    <td className="py-3 sm:py-4 px-4 sm:px-6">
                      <div className="flex items-center gap-2 sm:gap-3">
                        <div className="w-6 h-6 rounded bg-neutral-800 flex items-center justify-center text-xs font-semibold text-neutral-400 shrink-0">
                          {(order.dealer || 'D').charAt(0).toUpperCase()}
                        </div>
                        <span className="text-white text-xs sm:text-sm truncate max-w-[120px] sm:max-w-none">
                          {order.dealer || 'N/A'}
                        </span>
                      </div>
                    </td>
                    <td className="py-3 sm:py-4 px-4 sm:px-6 text-white font-mono text-xs sm:text-sm">
                      ${(order.amount || 0).toLocaleString()}
                    </td>
                    <td className="py-3 sm:py-4 px-4 sm:px-6">
                      <span className={`inline-flex items-center gap-1.5 px-2 sm:px-2.5 py-1 rounded text-xs font-medium border capitalize ${getStatusColor(order.status)}`}>
                        <span className="w-1.5 h-1.5 rounded-full bg-current" />
                        {order.status || 'N/A'}
                      </span>
                    </td>
                    <td className="py-3 sm:py-4 px-4 sm:px-6 text-right text-neutral-500 font-mono text-xs">
                      {order.time || 'N/A'}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default DealerView