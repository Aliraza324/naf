import { useRoutes } from 'react-router-dom'
import Header from './components/layout/Header'
import Footer from './components/layout/Footer'
import landingRoutes from './routes/landing'
import { ToastProvider } from './components/utils/Toast'

const App = () => {
  const routes = useRoutes(landingRoutes)

  return (
    <div className='min-h-screen bg-page text-text flex flex-col justify-between'>
      <div>
        <Header />
        {routes}
      </div>
      <Footer />
      <ToastProvider />
    </div>
  )
}

export default App

