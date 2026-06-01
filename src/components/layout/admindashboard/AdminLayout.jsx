import React, { useEffect, useState } from 'react'
import { Outlet } from 'react-router-dom'
import SaideBar from './SaideBar'
import AdminHeader from './AdminHeader'

const AdminLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(() => {
    if (typeof window === 'undefined') return true
    return window.matchMedia('(min-width: 1024px)').matches
  })

  useEffect(() => {
    const mediaQuery = window.matchMedia('(min-width: 1024px)')
    const handleScreenChange = (event) => setIsSidebarOpen(event.matches)

    setIsSidebarOpen(mediaQuery.matches)
    mediaQuery.addEventListener('change', handleScreenChange)

    return () => mediaQuery.removeEventListener('change', handleScreenChange)
  }, [])

  return (
    <div className="flex min-h-screen bg-[#0a0a0a] text-white font-sans overflow-hidden">
      <SaideBar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
      <main className="flex-1 flex flex-col h-screen overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
        <AdminHeader
          isSidebarOpen={isSidebarOpen}
          onToggleSidebar={() => setIsSidebarOpen((prev) => !prev)}
        />
        <Outlet />
      </main>
    </div>
  )
}

export default AdminLayout
