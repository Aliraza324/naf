import React, { useEffect, useState } from 'react'
import { Outlet } from 'react-router-dom'
import Sidebar from './Sidebar'
import Header from './Header'

const DashboardLayout = () => {
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
    <div className="flex min-h-screen bg-page text-text font-sans overflow-hidden">
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
      <main className="flex-1 flex flex-col h-screen overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
        <Header
          isSidebarOpen={isSidebarOpen}
          onToggleSidebar={() => setIsSidebarOpen((prev) => !prev)}
        />
        <div className="flex-1 pb-10">
          <Outlet />
        </div>
      </main>
    </div>
  )
}

export default DashboardLayout
