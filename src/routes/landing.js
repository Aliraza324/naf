import { createElement } from 'react'
import Home from '../pages/landing/Home'
import Product from '../pages/landing/Product'
import ProductDetails from '../pages/landing/ProductDetails'
import AddToCart from '../pages/landing/AddToCart'
import BuyNow from '../pages/landing/BuyNow'
import Blog from '../pages/landing/Blog'
import BlogsDetails from '../pages/landing/BlogsDetails'
import NewDrops from '../pages/landing/NewDrops'
import Contact from '../pages/landing/Contact'

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
  {
    path: '/blog',
    element: createElement(Blog),
  },
  {
    path: '/blog/:slug',
    element: createElement(BlogsDetails),
  },
  {
    path: '/new-drops',
    element: createElement(NewDrops),
  },
  {
    path: '/contact',
    element: createElement(Contact),
  },
]

export default landingRoutes
