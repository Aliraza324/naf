import { useEffect, useState } from 'react'
import { useRoutes, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import Header from './components/layout/Header'
import Footer from './components/layout/Footer'
import landingRoutes from './routes/landing'
import authRoutes from './routes/auth'
import { ToastProvider } from './components/utils/Toast'
import PageLoader from './components/utils/PageLoader'
import TopToScroll from './utils/TopToScroll'

const App = () => {
  const [isLoading, setIsLoading] = useState(true)
  const allRoutes = [...landingRoutes, ...authRoutes]
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

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1500)

    return () => clearTimeout(timer)
  }, [])

  return (
    <>
      <AnimatePresence>{isLoading && <PageLoader />}</AnimatePresence>
      <TopToScroll />
      <div className='min-h-screen bg-page text-text flex flex-col justify-between'>
        <div>
          {!isAuthRoute && <Header />}
          {routes}
        </div>
        {!isAuthRoute && <Footer />}
        <ToastProvider />
      </div>
    </>
  )
}

export default App
