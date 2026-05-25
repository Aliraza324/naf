import { useEffect, useState } from 'react'
import { useRoutes, useLocation, useNavigate } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import Header from './components/layout/Header'
import Footer from './components/layout/Footer'
import DashboardHeader from './components/layout/dashboard/Header'
import landingRoutes from './routes/landing'
import authRoutes from './routes/auth'
import dashboardRoutes from './routes/dashboard'
import { ToastProvider } from './components/utils/Toast'
import PageLoader from './components/utils/PageLoader'
import TopToScroll from './utils/TopToScroll'

const App = () => {
  const [isLoading, setIsLoading] = useState(true)
  const allRoutes = [...landingRoutes, ...authRoutes, ...dashboardRoutes]
  const routes = useRoutes(allRoutes)
  const location = useLocation()

  // Check if current route is an auth route
  const isAuthRoute = [
    '/login',
    '/register',
    '/forgot-password',
    '/verify-account',
    '/create-new-password',
  ].includes(location.pathname)
  const isDashboardRoute = location.pathname.startsWith('/dashboard')

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1500)

    return () => clearTimeout(timer)
  }, [])

  // If URL contains the special hash, redirect to wishlist
  const navigate = useNavigate()

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const h = window.location.hash
      if (h === '#sym:WishList') navigate('/dashboard/wishlist', { replace: true })
      if (h === '#sym:SystemSetting') navigate('/dashboard/setting', { replace: true })
    }
  }, [navigate])

  return (
    <>
      <AnimatePresence>{isLoading && <PageLoader />}</AnimatePresence>
      <TopToScroll />
      <div className='min-h-screen bg-page text-text flex flex-col justify-between'>
        <div>
          {!isAuthRoute && (isDashboardRoute ? <DashboardHeader /> : <Header />)}
          {routes}
        </div>
        {!isAuthRoute && <Footer />}
        <ToastProvider />
      </div>
    </>
  )
}

export default App
