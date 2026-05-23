import { createElement } from 'react'
import Home from '../pages/landing/Home'
import Product from '../pages/landing/Product'
import ProductDetails from '../pages/landing/ProductDetails'
import AddToCart from '../pages/landing/AddToCart'
import BuyNow from '../pages/landing/BuyNow'

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
  {
    path: '/checkout',
    element: createElement(BuyNow),
  },
]

export default landingRoutes

