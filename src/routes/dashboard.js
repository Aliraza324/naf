import { createElement } from 'react'
import Dealer from '../pages/dashboard/Dealer'
import AllProduct from '../pages/dashboard/AllProduct'
import OrderHistory from '../components/dashboard/OrderHistory'
import OrderDetail from '../pages/dashboard/OrderDetail'
import Payment from '../pages/dashboard/Payment'

const dashboardRoutes = [
  {
    path: '/dashboard',
    element: createElement(Dealer),
  },
  {
    path: '/dashboard/all-products',
    element: createElement(AllProduct),
  },
  {
    path: '/dashboard/orders',
    element: createElement(OrderHistory),
  },
  {
    path: '/dashboard/order-details',
    element: createElement(OrderDetail),
  },
  {
    path: '/dashboard/payments',
    element: createElement(Payment),
  },
]

export default dashboardRoutes
