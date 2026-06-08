import React from 'react'
import { NavLink } from 'react-router-dom'
import {
  LayoutDashboard,
  Users,
  Folder,
  Package,
  ShoppingCart,
  CreditCard,
  Settings,
  Headphones,
  Megaphone,
  X,
} from 'lucide-react'
import logo from '../../../assets/images/logo.svg'

const SaideBar = ({ isOpen, onClose }) => {
  const menuItems = [
    { icon: LayoutDashboard, label: 'Dashboard', path: '/admin', end: true },
    { icon: Users, label: 'Dealers', path: '/admin/dealers' },
    { icon: Folder, label: 'Categories', path: '/admin/categories' },
    { icon: Package, label: 'Products', path: '/admin/products', avatar: true },
    { icon: ShoppingCart, label: 'Orders', path: '/admin/orders' },
    { icon: CreditCard, label: 'Payments', path: '/admin/payment' },
    { icon: Megaphone, label: 'Marketing', path: '/admin/marketing' },
  ]

  const systemItems = [
    { icon: Settings, label: 'Settings', path: '/admin/settings' },
  ]

  return (
    <>
      <button
        type="button"
        onClick={onClose}
        aria-label="Close sidebar overlay"
        className={`fixed inset-0 z-30 bg-black/60 transition-opacity duration-300 ease-in-out lg:hidden ${
          isOpen ? 'opacity-100' : 'pointer-events-none opacity-0'
        }`}
      />

      <aside
        className={`fixed inset-y-0 left-0 z-40 h-screen shrink-0 overflow-hidden border-r border-white/5 bg-[#0a0a0a] transition-[width,transform,border-color] duration-300 ease-in-out will-change-transform lg:static ${
          isOpen
            ? 'w-64 translate-x-0'
            : 'w-64 -translate-x-full border-transparent lg:w-0 lg:translate-x-0'
        }`}
      >
        <div className="flex h-full w-64 flex-col overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
          <div className="flex items-center justify-between gap-3 p-6">
            <div className="flex items-center gap-3">
              <div className="flex h-8 w-8 items-center justify-center">
              <img src={logo} alt="" />
              </div>
              <span className="text-lg font-bold tracking-wider text-white">NAF Supply</span>
            </div>

            <button
              type="button"
              onClick={onClose}
              aria-label="Close sidebar"
              className="grid h-9 w-9 place-items-center rounded-lg border border-white/10 text-neutral-300 transition-colors hover:bg-red-600 hover:text-white lg:hidden"
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
                className={({ isActive }) =>
                  `relative flex cursor-pointer items-center justify-between rounded-lg px-3 py-2.5 transition-colors ${
                    isActive
                      ? 'bg-red-500/10 text-red-500'
                      : 'text-neutral-400 hover:bg-white/5 hover:text-white'
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    {isActive && (
                      <div className="absolute left-0 top-1/2 h-6 w-1 -translate-y-1/2 rounded-r-full bg-red-600" />
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

            {systemItems.map((item, idx) =>
              item.path ? (
                <NavLink
                  key={idx}
                  to={item.path}
                  className={({ isActive }) =>
                    `relative flex cursor-pointer items-center justify-between rounded-lg px-3 py-2.5 transition-colors ${
                      isActive
                        ? 'bg-red-500/10 text-red-500'
                        : 'text-neutral-400 hover:bg-white/5 hover:text-white'
                    }`
                  }
                >
                  {({ isActive }) => (
                    <>
                      {isActive && (
                        <div className="absolute left-0 top-1/2 h-6 w-1 -translate-y-1/2 rounded-r-full bg-red-600" />
                      )}
                      <div className="flex items-center gap-3">
                        <item.icon className="h-5 w-5" />
                        <span className="text-sm font-medium">{item.label}</span>
                      </div>
                    </>
                  )}
                </NavLink>
              ) : (
                <div
                  key={idx}
                  className="flex cursor-pointer items-center justify-between rounded-lg px-3 py-2.5 text-neutral-400 transition-colors hover:bg-white/5 hover:text-white"
                >
                  <div className="flex items-center gap-3">
                    <item.icon className="h-5 w-5" />
                    <span className="text-sm font-medium">{item.label}</span>
                  </div>
                </div>
              ),
            )}
          </nav>

          <div className="mt-auto p-4">
            <div className="rounded-xl border border-white/5 bg-[#141414] p-4">
              <div className="mb-2 flex items-center gap-2">
                <Headphones className="h-4 w-4 text-red-500" />
                <h4 className="text-sm font-semibold text-white">Support Center</h4>
              </div>
              <p className="mb-4 text-xs leading-relaxed text-neutral-500">
                Need help with property management?
              </p>
              <button className="w-full rounded-lg bg-red-600 py-2 text-xs font-bold text-white transition-colors hover:bg-red-700">
                Contact Support
              </button>
            </div>
          </div>
        </div>
      </aside>
    </>
  )
}

export default SaideBar
