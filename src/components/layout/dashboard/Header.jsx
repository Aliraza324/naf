import { useEffect, useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { AnimatePresence, motion } from 'framer-motion'
import { ChevronDown, Heart, Mail, Search, ShoppingBasket, X } from 'lucide-react'
import logo from '../../../assets/images/logo.svg'
import userIcon from '../../../assets/images/user.svg'
import { logout, selectUser } from '../../../features/auth/authSlice'
import {
  selectCartProductCount,
  selectCartSubtotal,
} from '../../../features/cart/cartSlice'

const menuItems = [
  { label: 'Dashboard', href: '/dashboard' },
  { label: 'Browse Products', href: '/product' },
  { label: 'My Orders', href: '#orders' },
  { label: 'Payments', href: '#payments' },
  { label: 'Setting', href: '#setting' },
]

const dropdownMotion = {
  initial: { opacity: 0, y: -10, scale: 0.98 },
  animate: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.18, ease: 'easeOut' },
  },
  exit: {
    opacity: 0,
    y: -8,
    scale: 0.98,
    transition: { duration: 0.14, ease: 'easeIn' },
  },
}

const Header = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const dropdownRef = useRef(null)
  const user = useSelector(selectUser)
  const cartProductCount = useSelector(selectCartProductCount)
  const cartSubtotal = useSelector(selectCartSubtotal)
  const [isProfileOpen, setIsProfileOpen] = useState(false)

  const userName = user?.name || 'User Name'
  const userEmail = user?.email || 'Nafuser@gmail.com'
  const userAvatar = user?.avatar || user?.image || userIcon

  useEffect(() => {
    if (!isProfileOpen) return undefined

    const handlePointerDown = (event) => {
      if (!dropdownRef.current?.contains(event.target)) {
        setIsProfileOpen(false)
      }
    }

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        setIsProfileOpen(false)
      }
    }

    document.addEventListener('mousedown', handlePointerDown)
    document.addEventListener('keydown', handleKeyDown)

    return () => {
      document.removeEventListener('mousedown', handlePointerDown)
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [isProfileOpen])

  const handleSignOut = () => {
    dispatch(logout())
    setIsProfileOpen(false)
    navigate('/login')
  }

  return (
    <header className="relative z-50 border-b border-white/8 bg-black font-body text-white">
      <div className="border-b border-white/8 bg-[#111]">
        <div className="mx-auto flex min-h-9 max-w-[1560px] flex-col items-center justify-center gap-1 px-4 py-1.5 text-center sm:min-h-10 sm:flex-row sm:gap-8 sm:px-6 lg:px-10">
          <p className="text-[9px] font-semibold uppercase tracking-[0.16em] text-white/85 sm:text-[11px]">
            Eco-friendly tactical paintballs now available
          </p>
          <a
            href="mailto:ops@NAFsupply.com"
            className="inline-flex items-center gap-1.5 text-[10px] text-white/80 transition hover:text-primary sm:text-[12px]"
          >
            <Mail size={13} strokeWidth={1.8} />
            ops@NAFsupply.com
          </a>
        </div>
      </div>

      <div className="bg-black">
        <div className="mx-auto grid min-h-[82px] max-w-[1560px] grid-cols-[auto_1fr_auto] items-center gap-3 px-4 py-3 sm:gap-4 sm:px-6 lg:min-h-[88px] lg:px-10">
          <Link to="/" className="flex min-w-0 items-center">
            <img
              src={logo}
              alt="NAF Power logo"
              className="h-10 w-14 object-contain sm:h-12 sm:w-16 lg:h-[52px] lg:w-[78px]"
            />
          </Link>

          <form
            onSubmit={(event) => event.preventDefault()}
            className="order-3 col-span-3 flex h-11 min-w-0 items-center rounded-full border border-white/12 bg-white/[0.06] pl-4 shadow-inner shadow-white/[0.03] sm:order-none sm:col-span-1 sm:mx-auto sm:h-12 sm:max-w-[560px] lg:max-w-[650px]"
          >
            <label htmlFor="dashboard-search" className="sr-only">
              Search tactical gear
            </label>
            <input
              id="dashboard-search"
              type="search"
              placeholder="Search tactical gear..."
              className="min-w-0 flex-1 bg-transparent text-[13px] font-medium text-white outline-none placeholder:text-white/45 sm:text-sm"
            />
            <button
              type="submit"
              className="mr-1 inline-flex h-9 shrink-0 items-center justify-center rounded-full bg-primary px-4 text-[10px] font-black uppercase tracking-[0.18em] text-white transition hover:bg-primary-hover sm:h-10 sm:px-6"
            >
              Search
            </button>
          </form>

          <div ref={dropdownRef} className="relative flex items-center justify-end gap-2 sm:gap-2.5 lg:gap-3">
            <button
              type="button"
              aria-label="Wishlist"
              className="relative grid size-9 shrink-0 place-items-center rounded-full bg-white/[0.07] text-white transition hover:bg-white/[0.11] hover:text-primary sm:size-10"
            >
              <Heart size={21} strokeWidth={2.1} />
              <span className="absolute -right-1 top-0 grid size-4 place-items-center rounded-full bg-primary text-[9px] font-black text-white">
                0
              </span>
            </button>

            <Link
              to="/cart"
              aria-label="Cart"
              className="relative flex h-9 shrink-0 items-center gap-2 rounded-full border border-white/10 bg-white/[0.07] pr-2.5 text-white transition hover:border-white/20 hover:bg-white/[0.11] sm:h-10 sm:pr-4"
            >
              <span className="relative grid size-8 place-items-center rounded-full bg-primary sm:size-9">
                <ShoppingBasket size={17} strokeWidth={1.9} />
                <span className="absolute -right-1 -top-1 grid size-4 place-items-center rounded-full bg-white text-[9px] font-black text-primary">
                  {cartProductCount}
                </span>
              </span>
              <span className="hidden leading-tight sm:block">
                <span className="block text-[9px] font-bold uppercase tracking-[0.12em] text-white/55">
                  Cart
                </span>
                <span className="block text-xs font-black">${cartSubtotal.toFixed(2)}</span>
              </span>
            </Link>

            <button
              type="button"
              onClick={() => setIsProfileOpen((value) => !value)}
              className="flex shrink-0 items-center gap-2 rounded-full text-white transition hover:text-primary"
              aria-label="Open profile menu"
              aria-expanded={isProfileOpen}
            >
              <span className="size-9 overflow-hidden rounded-full bg-white/10 ring-1 ring-white/10 sm:size-10">
                <img src={userAvatar} alt="" className="h-full w-full object-cover" />
              </span>
              <ChevronDown
                size={16}
                strokeWidth={2}
                className={`hidden transition-transform sm:block ${isProfileOpen ? 'rotate-180' : ''}`}
              />
            </button>

            <AnimatePresence>
              {isProfileOpen && (
                <motion.div
                  variants={dropdownMotion}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  className="absolute right-0 top-[calc(100%+14px)] z-[80] w-[min(88vw,360px)] rounded-[24px] bg-[#202020] px-5 py-6 shadow-2xl ring-1 ring-white/10 sm:px-6"
                >
                  <div className="mb-4 flex items-start justify-between gap-4">
                    <span className="text-xs text-white/80">Dealer</span>
                    <button
                      type="button"
                      onClick={() => setIsProfileOpen(false)}
                      aria-label="Close profile menu"
                      className="grid size-6 place-items-center text-white transition hover:text-primary"
                    >
                      <X size={21} strokeWidth={2} />
                    </button>
                  </div>

                  <div className="flex min-w-0 items-center gap-3 border-b border-white/10 pb-5">
                    <span className="size-10 shrink-0 overflow-hidden rounded-full bg-white/10">
                      <img src={userAvatar} alt="" className="h-full w-full object-cover" />
                    </span>
                    <div className="min-w-0">
                      <p className="truncate text-sm font-bold text-white">{userName}</p>
                      <p className="truncate text-xs text-white/70">{userEmail}</p>
                    </div>
                  </div>

                  <nav className="grid gap-5 border-b border-white/10 py-5 text-sm font-semibold text-white">
                    {menuItems.map((item) => (
                      <Link
                        key={item.label}
                        to={item.href}
                        onClick={() => setIsProfileOpen(false)}
                        className="transition hover:text-primary"
                      >
                        {item.label}
                      </Link>
                    ))}
                  </nav>

                  <div className="mt-5 flex items-center justify-between gap-4">
                    <button
                      type="button"
                      onClick={handleSignOut}
                      className="text-base font-semibold text-white transition hover:text-primary"
                    >
                      Sign Out
                    </button>
                    <button
                      type="button"
                      onClick={handleSignOut}
                      className="rounded-full bg-primary px-5 py-2.5 text-[9px] font-black uppercase tracking-[0.18em] text-white transition hover:bg-primary-hover"
                    >
                      Sign Out
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header
