import { createElement } from 'react'
import DashboardLayout from '../components/layout/dashboard/DashboardLayout'
import Dealer from '../pages/dashboard/Dealer'
import AllProduct from '../pages/dashboard/AllProduct'
import OrderHistory from '../components/dashboard/OrderHistory'
import OrderDetail from '../pages/dashboard/OrderDetail'
import Payment from '../pages/dashboard/Payment'
import SystemSetting from '../pages/dashboard/SystemSetting'
import WishList from '../pages/dashboard/WishList'

const dashboardRoutes = [
  {
    path: '/dashboard',
    element: createElement(DashboardLayout),
    children: [
      {
        index: true,
        element: createElement(Dealer),
      },
      {
        path: 'all-products',
        element: createElement(AllProduct),
      },
      {
        path: 'orders',
        element: createElement(OrderHistory),
      },
      {
        path: 'order-details',
        element: createElement(OrderDetail),
      },
      {
        path: 'payments',
        element: createElement(Payment),
      },
      {
        path: 'setting',
        element: createElement(SystemSetting),
      },
      {
        path: 'wishlist',
        element: createElement(WishList),
      },
    ],
  },
]

export default dashboardRoutes
