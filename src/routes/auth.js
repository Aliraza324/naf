import { createElement } from 'react'
import Login from '../pages/auth/Login'
import Register from '../pages/auth/Register'
import ForgotPassword from '../pages/auth/ForgotPassword'
import VerifyAccount from '../pages/auth/VerifyAccount'
import CreateNewPassword from '../pages/auth/CreateNewPassword'
import DealerLogin from '../pages/auth/DealerLogin'

const authRoutes = [
  {
    path: '/login',
    element: createElement(Login),
  },
  {
    path: '/dealer-login',
    element: createElement(DealerLogin),
  },
  {
    path: '/register',
    element: createElement(Register),
  },
  {
    path: '/forgot-password',
    element: createElement(ForgotPassword),
  },
  {
    path: '/verify-account',
    element: createElement(VerifyAccount),
  },
  {
    path: '/create-new-password',
    element: createElement(CreateNewPassword),
  },
]

export default authRoutes
