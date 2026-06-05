import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Search, ChevronDown, Eye, EyeOff, Edit2, Trash2, Plus, X, Image as ImageIcon, Ban, CheckCircle } from 'lucide-react'
import Pagination from './Pagination'
import Loader from '../../utils/Loader'
import { useAddDealer, useGetDealers, useDeleteDealer, useBlockDealer, useUnblockDealer } from '../../hooks/admin/useDealers'

const DealerTable = () => {
  const { data: dealersData = [], isLoading } = useGetDealers()

  const dealers = Array.isArray(dealersData) ? dealersData : (dealersData.dealers || [])
  const [isAddDealerOpen, setIsAddDealerOpen] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [dealerForm, setDealerForm] = useState({
    name: '',
    email: '',
    password: '',
    phone: '',
    location: '',
  })
  const { mutate: addDealer, isPending: isAdding } = useAddDealer()
  const { mutate: deleteDealer, isPending: isDeleting } = useDeleteDealer()
  const { mutate: blockDealer, isPending: isBlocking } = useBlockDealer()
  const { mutate: unblockDealer, isPending: isUnblocking } = useUnblockDealer()

  const getStatusColor = (status) => {
    switch ((status || '').toLowerCase()) {
      case 'active': return 'bg-green-500/10 text-green-500 border-green-500/20'
      case 'offline': return 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20'
      case 'blocked': return 'bg-red-500/10 text-red-500 border-red-500/20'
      default: return 'bg-neutral-500/10 text-neutral-500 border-neutral-500/20'
    }
  }

  const handleFormChange = (event) => {
    const { name, value } = event.target
    setDealerForm((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleImageChange = (event) => {
    const file = event.target.files?.[0]

    if (!file) return

    setDealerForm((prev) => ({
      ...prev,
      avatar: URL.createObjectURL(file),
    }))
  }

  const closeAddDealerModal = () => {
    setIsAddDealerOpen(false)
    setDealerForm({
      name: '',
      email: '',
      password: '',
      avatar: '',
    })
  }

  const handleAddDealer = (event) => {
    event.preventDefault()

    addDealer(
      {
        dealerName: dealerForm.name,
        email: dealerForm.email,
        password: dealerForm.password,
        phone: dealerForm.phone,
        location: dealerForm.location,
      },
      {
        onSuccess: (data) => {
          if (data.success) {
            closeAddDealerModal()
          }
        },
      }
    )
  }

  return (
    <div className="flex flex-col gap-6 mt-4">
      {/* Search and Filter Bar */}
      <div className="grid gap-3 md:grid-cols-[1fr_190px_auto] md:gap-4">
        <div className="flex items-center gap-2 bg-[#141414] border border-white/5 rounded-lg px-4 py-3 focus-within:border-neutral-700 transition-colors">
          <Search className="w-5 h-5 text-neutral-500" />
          <input
            type="text"
            placeholder="Search by Name"
            className="bg-transparent border-none outline-none text-sm text-white w-full placeholder:text-neutral-600"
          />
        </div>
        <div className="relative">
          <select className="w-full appearance-none bg-[#141414] border border-white/5 rounded-lg px-4 py-3 text-sm text-neutral-400 outline-none focus:border-neutral-700 transition-colors cursor-pointer">
            <option>All Dealer</option>
            <option>Active</option>
            <option>Offline</option>
          </select>
          <ChevronDown className="w-4 h-4 text-neutral-500 absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none" />
        </div>
        <button className="min-h-11 bg-red-600 hover:bg-red-700 text-white px-8 rounded-lg font-semibold transition-colors">
          Search
        </button>
      </div>

      {/* Main Table Card */}
      <div className="bg-[#141414] border border-white/5 rounded-2xl overflow-hidden mt-4">
        {/* Table Header Section */}
        <div className="flex flex-col gap-5 border-b border-white/5 p-4 sm:p-6 lg:flex-row lg:items-center lg:justify-between">
          <div className="min-w-0">
            <h2 className="text-xl font-bold text-white mb-1 sm:text-2xl">Dealer Roster</h2>
            <p className="max-w-sm text-sm leading-6 text-neutral-500">Manage and monitor affiliated dealerships</p>
          </div>
          <div className="grid w-full grid-cols-2 gap-3 sm:flex sm:items-center lg:w-auto">
            <button className="min-h-11 rounded-lg border border-white/10 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-white/5">
              Export CSV
            </button>
            <button
              type="button"
              onClick={() => setIsAddDealerOpen(true)}
              className="flex min-h-11 items-center justify-center gap-2 rounded-lg bg-red-600 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-red-700"
            >
              <Plus className="w-4 h-4" />
              Add Dealer
            </button>
          </div>
        </div>

        {/* Tableeeeeeeeeeeeee3333333333333333 */}
        <div className="overflow-x-auto whitespace-nowrap">
          <table className="min-w-[980px] w-full text-left border-collapse">
            <thead>
              <tr className="bg-[#1a1a1a] text-[11px] font-bold text-neutral-500 uppercase tracking-wider">
                <th className="py-4 px-6 font-semibold">DEALER NAME</th>
                <th className="py-4 px-6 font-semibold">EMAIL</th>
                <th className="py-4 px-6 font-semibold">STATUS</th>
                <th className="py-4 px-6 font-semibold">ORDERS</th>
                <th className="py-4 px-6 font-semibold">TOTAL SPENDING</th>
                <th className="py-4 px-6 font-semibold">JOINED</th>
                <th className="py-4 px-6 font-semibold text-right">ACTIONS</th>
              </tr>
            </thead>
            <tbody className="text-sm whitespace-nowrap">
              {isLoading ? (
                <tr>
                  <td colSpan="7" className="py-16">
                    <Loader className="min-h-[200px]" />
                  </td>
                </tr>
              ) : dealers.length === 0 ? (
                <tr>
                  <td colSpan="7" className="py-8 text-center text-neutral-400">No dealers found.</td>
                </tr>
              ) : (
                dealers.map((dealer, i) => (
                  <tr key={dealer.id || i} className="border-b border-white/5 last:border-0 hover:bg-white/[0.02] transition-colors">
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-4">

                        <div>
                          <p className="text-white font-semibold mb-0.5">{dealer.dealerName || dealer.name || 'Unknown'}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-6 text-neutral-400">{dealer.email}</td>
                    <td className="py-4 px-6">
                      <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded text-xs font-medium border capitalize ${getStatusColor(dealer.status || 'active')}`}>
                        <span className="w-1.5 h-1.5 rounded-full bg-current" />
                        {dealer.status || 'Active'}
                      </span>
                    </td>
                    <td className="py-4 px-6 text-white font-medium">{dealer.orders || '0'}</td>
                    <td className="py-4 px-6 text-white font-medium">{dealer.totalSpending || dealer.spending || '$0'}</td>
                    <td className="py-4 px-6 text-neutral-400 text-xs whitespace-nowrap">
                      {dealer.joined ? (
                        <>
                          {new Date(dealer.joined).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                          <br />
                          {new Date(dealer.joined).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}
                        </>
                      ) : 'N/A'}
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex items-center justify-end gap-4 text-neutral-400">
                        <Link to={`/admin/dealers/${dealer.id}`} className="hover:text-white transition-colors" title="View Details">
                          <Eye size={16} />
                        </Link>

                        <Link to={`/admin/dealers/${dealer.id}`} className="hover:text-blue-400 transition-colors" title="Edit Dealer">
                          <Edit2 size={16} />
                        </Link>

                        <button
                          onClick={() => {
                            if (window.confirm("Are you sure you want to delete this dealer?")) {
                              deleteDealer(dealer.id);
                            }
                          }}
                          disabled={isDeleting}
                          className="hover:text-red-500 transition-colors"
                          title="Delete Dealer"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination */}
      <Pagination />

      {isAddDealerOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-4 backdrop-blur-[2px]">
          <div className="w-full max-w-[552px] overflow-hidden rounded-[18px] border border-white/5 bg-[#1a1a1a] shadow-2xl">
            <div className="relative flex items-center justify-center bg-[#141414] px-6 py-5">
              <h3 className="text-lg font-bold text-white">Add Dealer</h3>
              <button
                type="button"
                onClick={closeAddDealerModal}
                aria-label="Close add dealer form"
                className="absolute right-5 top-1/2 -translate-y-1/2 text-white transition-colors hover:text-red-500"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            <form onSubmit={handleAddDealer} className="px-7 py-8">
              <div className="space-y-4">
                <div className="relative">
                  <input
                    type="text"
                    name="name"
                    value={dealerForm.name}
                    onChange={handleFormChange}
                    placeholder="User name"
                    className="h-11 w-full rounded-[9px] border border-transparent bg-[#292929] px-4 text-sm text-white outline-none transition placeholder:text-neutral-400 focus:border-red-500/60"
                  />
                </div>

                <div className="relative">
                  <input
                    type="email"
                    name="email"
                    value={dealerForm.email}
                    onChange={handleFormChange}
                    placeholder="Email Address"
                    className="h-11 w-full rounded-[9px] border border-transparent bg-[#292929] px-4 text-sm text-white outline-none transition placeholder:text-neutral-400 focus:border-red-500/60"
                  />
                </div>

                <div className="relative">
                  <input
                    type="text"
                    name="phone"
                    value={dealerForm.phone}
                    onChange={handleFormChange}
                    placeholder="Phone Number"
                    className="h-11 w-full rounded-[9px] border border-transparent bg-[#292929] px-4 text-sm text-white outline-none transition placeholder:text-neutral-400 focus:border-red-500/60"
                  />
                </div>

                <div className="relative">
                  <input
                    type="text"
                    name="location"
                    value={dealerForm.location}
                    onChange={handleFormChange}
                    placeholder="Location"
                    className="h-11 w-full rounded-[9px] border border-transparent bg-[#292929] px-4 text-sm text-white outline-none transition placeholder:text-neutral-400 focus:border-red-500/60"
                  />
                </div>

                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={dealerForm.password}
                    onChange={handleFormChange}
                    placeholder="Password"
                    className="h-11 w-full rounded-[9px] border border-transparent bg-[#292929] px-4 pr-10 text-sm text-white outline-none transition placeholder:text-neutral-400 focus:border-red-500/60"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-white transition-colors"
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={isAdding}
                className="mt-9 h-14 w-full rounded-[5px] bg-red-600 text-base font-semibold text-white transition-colors hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-55"
              >
                {isAdding ? 'Adding Dealer...' : 'Add'}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

export default DealerTable
