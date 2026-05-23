import { createElement } from 'react'
import Home from '../pages/landing/Home'
import Product from '../pages/landing/Product'
import ProductDetails from '../pages/landing/ProductDetails'
import AddToCart from '../pages/landing/AddToCart'

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
  {
    path: '/cart',
    element: createElement(AddToCart),
  },
]

export default landingRoutes
