import { createElement } from 'react'
import Dealer from '../pages/dashboard/Dealer'
import AllProduct from '../pages/dashboard/AllProduct'

const dashboardRoutes = [
  {
    path: '/dashboard',
    element: createElement(Dealer),
  },
  {
    path: '/dashboard/all-products',
    element: createElement(AllProduct),
  },
]

export default dashboardRoutes
