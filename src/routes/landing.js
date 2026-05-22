import { createElement } from 'react'
import Home from '../pages/landing/Home'
import Product from '../pages/landing/Product'
import ProductDetails from '../pages/landing/ProductDetails'

const landingRoutes = [
  {
    path: '/',
    element: createElement(Home),
  },
  {
    path: '/products/:slug',
    element: createElement(Product),
  },
  {
    path: '/product-details/:slug',
    element: createElement(ProductDetails),
  },
]

export default landingRoutes
