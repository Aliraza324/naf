import { createElement } from 'react'
import Login from '../pages/auth/Login'
import Register from '../pages/auth/Register'

const authRoutes = [
  {
    path: '/login',
    element: createElement(Login),
  },
  {
    path: '/register',
    element: createElement(Register),
  },
]

export default authRoutes
