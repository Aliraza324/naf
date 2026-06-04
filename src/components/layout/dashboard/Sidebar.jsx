import React from 'react'
import { NavLink } from 'react-router-dom'
import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  CreditCard,
  Settings,
  Heart,
  Headphones,
  X,
} from 'lucide-react'
import logo from '../../../assets/images/logo.svg'

const Sidebar = ({ isOpen, onClose }) => {
  const menuItems = [
    { icon: LayoutDashboard, label: 'Dashboard', path: '/dashboard', end: true },
    { icon: Package, label: 'Browse Products', path: '/dashboard/all-products' },
    { icon: ShoppingCart, label: 'My Orders', path: '/dashboard/orders' },
    { icon: CreditCard, label: 'Payments', path: '/dashboard/payments' },
    { icon: Heart, label: 'Wishlist', path: '/dashboard/wishlist' },
  ]

  const systemItems = [
    { icon: Settings, label: 'Settings', path: '/dashboard/setting' },
  ]

  return (
    <>
      <button
        type="button"
        onClick={onClose}
        aria-label="Close sidebar overlay"
        className={`fixed inset-0 z-[130] bg-black/60 transition-opacity duration-300 ease-in-out lg:hidden ${
          isOpen ? 'opacity-100' : 'pointer-events-none opacity-0'
        }`}
      />

      <aside
        className={`fixed inset-y-0 left-0 z-[140] h-screen shrink-0 overflow-hidden border-r border-white/5 bg-[#0a0a0a] transition-[width,transform,border-color] duration-300 ease-in-out will-change-transform lg:static ${
          isOpen
            ? 'w-64 translate-x-0'
            : 'w-64 -translate-x-full border-transparent lg:w-0 lg:translate-x-0'
        }`}
      >
        <div className="flex h-full w-64 flex-col overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
          <div className="flex items-center justify-between gap-3 p-6">
            <div className="flex items-center gap-3">
              <div className="flex h-8 w-8 items-center justify-center">
                <img src={logo} alt="Logo" />
              </div>
              <span className="text-lg font-bold tracking-wider text-white">NAF Supply</span>
            </div>

            <button
              type="button"
              onClick={onClose}
              aria-label="Close sidebar"
              className="grid h-9 w-9 place-items-center rounded-lg border border-white/10 text-neutral-300 transition-colors hover:bg-primary hover:text-white lg:hidden"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <nav className="flex-1 space-y-1 px-4 py-4">
            {menuItems.map((item, idx) => (
              <NavLink
                key={idx}
                to={item.path}
                end={item.end}
                onClick={() => {
                  if (window.innerWidth < 1024) onClose()
                }}
                className={({ isActive }) =>
                  `relative flex cursor-pointer items-center justify-between rounded-lg px-3 py-2.5 transition-colors ${
                    isActive
                      ? 'bg-primary/10 text-primary'
                      : 'text-neutral-400 hover:bg-white/5 hover:text-white'
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    {isActive && (
                      <div className="absolute left-0 top-1/2 h-6 w-1 -translate-y-1/2 rounded-r-full bg-primary" />
                    )}
                    <div className="flex items-center gap-3">
                      <item.icon className="h-5 w-5" />
                      <span className="text-sm font-medium">{item.label}</span>
                    </div>
                  </>
                )}
              </NavLink>
            ))}

            <div className="pb-2 pt-6">
              <p className="px-3 text-xs font-semibold uppercase tracking-wider text-neutral-500">
                System
              </p>
            </div>

            {systemItems.map((item, idx) => (
              <NavLink
                key={idx}
                to={item.path}
                onClick={() => {
                  if (window.innerWidth < 1024) onClose()
                }}
                className={({ isActive }) =>
                  `relative flex cursor-pointer items-center justify-between rounded-lg px-3 py-2.5 transition-colors ${
                    isActive
                      ? 'bg-primary/10 text-primary'
                      : 'text-neutral-400 hover:bg-white/5 hover:text-white'
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    {isActive && (
                      <div className="absolute left-0 top-1/2 h-6 w-1 -translate-y-1/2 rounded-r-full bg-primary" />
                    )}
                    <div className="flex items-center gap-3">
                      <item.icon className="h-5 w-5" />
                      <span className="text-sm font-medium">{item.label}</span>
                    </div>
                  </>
                )}
              </NavLink>
            ))}
          </nav>

          <div className="mt-auto p-4">
            <div className="rounded-xl border border-white/5 bg-[#141414] p-4">
              <div className="mb-2 flex items-center gap-2">
                <Headphones className="h-4 w-4 text-primary" />
                <h4 className="text-sm font-semibold text-white">Support Center</h4>
              </div>
              <p className="mb-4 text-xs leading-relaxed text-neutral-500">
                Need help with your orders or account?
              </p>
              <button className="w-full rounded-lg bg-primary py-2 text-xs font-bold text-white transition-colors hover:bg-primary-hover">
                Contact Support
              </button>
            </div>
          </div>
        </div>
      </aside>
    </>
  )
}

export default Sidebar
