import { createElement } from 'react'
import AdminLayout from '../components/layout/admindashboard/AdminLayout'
import MainDashboard from '../pages/admindashboard/MainDashboard'
import Dealers from '../pages/admindashboard/Dealers'
import DealersName from '../pages/admindashboard/DealersName'
import Categorizes from '../pages/admindashboard/Categorizes'
import Orders from '../pages/admindashboard/Orders'
import OrderView from '../pages/admindashboard/OrderView'
import Payment from '../pages/admindashboard/Payment'
import PaymentDetails from '../pages/admindashboard/PaymentDetails'

const adminRoutes = [
  {
    path: '/admin',
    element: createElement(AdminLayout),
    children: [
      {
        index: true,
        element: createElement(MainDashboard),
      },
      {
        path: 'dealers',
        element: createElement(Dealers),
      },
      {
        path: 'dealers/:id',
        element: createElement(DealersName),
      },
      {
        path: 'categories',
        element: createElement(Categorizes),
      },
      {
        path: 'orders',
        element: createElement(Orders),
      },
      {
        path: 'orders/:id',
        element: createElement(OrderView),
      },
      {
        path: 'payment',
        element: createElement(Payment),
      }
      ,
      {
        path: 'payment/:id',
        element: createElement(PaymentDetails),
      }
    ],
  },
]

export default adminRoutes
