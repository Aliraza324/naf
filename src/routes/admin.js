import { createElement } from 'react'
import AdminLayout from '../components/layout/admindashboard/AdminLayout'
import MainDashboard from '../pages/admindashboard/MainDashboard'
import Dealers from '../pages/admindashboard/Dealers'
import DealersName from '../pages/admindashboard/DealersName'

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
    ],
  },
]

export default adminRoutes
