import { createElement } from 'react'
import Home from '../pages/landing/Home'
import Product from '../pages/landing/Product'

const landingRoutes = [
  {
    path: '/',
    element: createElement(Home),
  },
  {
    path: '/products/:slug',
    element: createElement(Product),
  },
]

export default landingRoutes
