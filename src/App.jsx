import { useEffect, useState } from 'react'
import { useRoutes } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import Header from './components/layout/Header'
import Footer from './components/layout/Footer'
import landingRoutes from './routes/landing'
import { ToastProvider } from './components/utils/Toast'
import PageLoader from './components/utils/PageLoader'
import TopToScroll from './utils/TopToScroll'

const App = () => {
  const [isLoading, setIsLoading] = useState(true)
  const routes = useRoutes(landingRoutes)

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
          <Header />
          {routes}
        </div>
        <Footer />
        <ToastProvider />
      </div>
    </>
  )
}

export default App
