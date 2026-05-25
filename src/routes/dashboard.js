import { createElement } from 'react'
import Dealer from '../pages/dashboard/Dealer'

const dashboardRoutes = [
  {
    path: '/dashboard',
    element: createElement(Dealer),
  },
]

export default dashboardRoutes
