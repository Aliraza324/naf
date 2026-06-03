import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { Search, Bell, ChevronDown, Menu, X } from 'lucide-react'
import { logout, selectUser } from '../../../features/auth/authSlice'

const AdminHeader = ({ isSidebarOpen, onToggleSidebar }) => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const user = useSelector(selectUser)

  const handleSignOut = () => {
    dispatch(logout())
    navigate('/login', { replace: true })
  }

  const userName = user?.name || 'Commander'
  const userRole = user?.role || 'Admin Level 5'

  return (
    <header className="flex items-center justify-between gap-4 px-4 py-4 border-b border-white/5 bg-[#0a0a0a] sm:px-8">
      <div className="flex flex-1 items-center gap-3">
        <button
          type="button"
          onClick={onToggleSidebar}
          aria-label="Toggle sidebar"
          className="grid h-10 w-10 shrink-0 place-items-center rounded-lg border border-white/10 bg-[#141414] text-neutral-300 transition-colors hover:bg-red-600 hover:text-white"
        >
          {isSidebarOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>

        <div className="flex w-full max-w-96 items-center gap-2 rounded-lg border border-white/5 bg-[#141414] px-3 py-2 transition-colors focus-within:border-neutral-700">
          <Search className="w-4 h-4 text-neutral-500" />
          <input
            type="text"
            placeholder="Search coordinates, IDs, logs..."
            className="bg-transparent border-none outline-none text-sm text-white w-full placeholder:text-neutral-600"
          />
        </div>
      </div>

      <div className="flex items-center gap-4 sm:gap-6">
        <button className="relative text-neutral-400 hover:text-white transition-colors">
          <Bell className="w-5 h-5" />
          <span className="absolute 0 top-0 right-0 w-2 h-2 bg-red-500 rounded-full border-2 border-[#0a0a0a]"></span>
        </button>
        <div className="flex items-center gap-3 cursor-pointer group">
          <div className="hidden text-right sm:block">
            <p className="text-sm font-semibold text-white group-hover:text-red-500 transition-colors">{userName}</p>
            <p className="text-xs text-neutral-500">{userRole}</p>
          </div>
          <img src={user?.avatar || 'https://i.pravatar.cc/150?img=11'} alt={userName} className="w-9 h-9 rounded-full object-cover border border-white/10" />
          <ChevronDown className="w-4 h-4 text-neutral-500" />
        </div>
        <button
          type="button"
          onClick={handleSignOut}
          className="hidden text-sm font-semibold text-white transition hover:text-red-500 sm:inline-flex"
        >
          Sign Out
        </button>
      </div>
    </header>
  )
}

export default AdminHeader
