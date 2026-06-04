import { useEffect, useRef, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import {
  ChevronDown,
  ChevronRight,
  Heart,
  Menu,
  Search,
  ShoppingCart,
  UserRound,
  X,
} from 'lucide-react'
import { FaFacebookF, FaInstagram, FaYoutube } from 'react-icons/fa'
import logo from '../../assets/images/logo.svg'
import { motion, AnimatePresence } from 'framer-motion'
import { announcementFade, dropdownMenu, mobileNavMenu } from '../../animations/animations'
import { inventoryCategories } from '../../data/inventoryCategories'
import { selectCartProductCount } from '../../features/cart/cartSlice'
import { selectWishlistCount } from '../../features/wishlist/wishlistSlice'
import {
  selectIsAuthenticated,
  selectUser,
  logout,
} from '../../features/auth/authSlice'

const navItems = [
  { label: 'Home', href: '/' },
  { label: 'New Drops', href: '/new-drops' },
  { label: 'Blog', href: '/blog' },
  { label: 'Contact Us', href: '/contact' },
]

const announcementMessages = [
  'Customs & Duties Included - No Surprise Charges',
  'Free Shipping On Qualified Tactical Orders',
  'New Drops Added Weekly - Gear Up First',
]

const getSubCategoryLabel = (subCategory) =>
  subCategory.count ? `${subCategory.name} (${subCategory.count})` : subCategory.name

const Header = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const cartProductCount = useSelector(selectCartProductCount)
  const wishlistCount = useSelector(selectWishlistCount)
  const isAuthenticated = useSelector(selectIsAuthenticated)
  const user = useSelector(selectUser)
  const categoryMenuRef = useRef(null)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isAccountOpen, setIsAccountOpen] = useState(false)
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [isTopBarVisible, setIsTopBarVisible] = useState(true)
  const [activeAnnouncementIndex, setActiveAnnouncementIndex] = useState(0)
  const [activeCategorySlug, setActiveCategorySlug] = useState(null)
  const [activeSubCategorySlug, setActiveSubCategorySlug] = useState(null)
  const [dropdownLeft, setDropdownLeft] = useState(16)
  const [openMobileCategorySlug, setOpenMobileCategorySlug] = useState(null)

  useEffect(() => {
    const interval = window.setInterval(() => {
      setActiveAnnouncementIndex((index) => (index + 1) % announcementMessages.length)
    }, 3200)

    return () => window.clearInterval(interval)
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      setIsTopBarVisible(window.scrollY < 24)
    }

    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })

    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    if (!activeCategorySlug) return undefined

    const handleMouseDown = (event) => {
      if (!categoryMenuRef.current?.contains(event.target)) {
        setActiveCategorySlug(null)
      }
    }

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        setActiveCategorySlug(null)
      }
    }

    document.addEventListener('mousedown', handleMouseDown)
    document.addEventListener('keydown', handleKeyDown)

    return () => {
      document.removeEventListener('mousedown', handleMouseDown)
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [activeCategorySlug])

  const activeCategory = inventoryCategories.find((category) => category.slug === activeCategorySlug)
  const isDesktopCategoryMenuOpen = Boolean(activeCategory)

  const handleCategoryClick = (category, event) => {
    const container = categoryMenuRef.current
    if (!container) {
      setActiveCategorySlug((currentSlug) =>
        currentSlug === category.slug ? null : category.slug,
      )
      return
    }

    const containerRect = container.getBoundingClientRect()
    const buttonRect = event.currentTarget.getBoundingClientRect()
    const dropdownWidth = Math.min(window.innerWidth * 0.92, 560)
    const maxLeft = Math.max(16, containerRect.width - dropdownWidth - 16)
    const nextLeft = Math.min(
      Math.max(16, buttonRect.left - containerRect.left),
      maxLeft,
    )

    setDropdownLeft(nextLeft)
    setActiveCategorySlug((currentSlug) =>
      currentSlug === category.slug ? null : category.slug,
    )
  }

  return (
    <header className='sticky top-0 z-50 border-b border-white/8 bg-black font-body text-white'>
      <AnimatePresence initial={false}>
        {isTopBarVisible && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 40, opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.24, ease: [0.16, 1, 0.3, 1] }}
            className='overflow-hidden border-b border-white/8 bg-black'
          >
            <div className='mx-auto grid h-10 max-w-[1280px] grid-cols-[1fr_auto_1fr] items-center px-5 lg:px-10'>
              <div className='hidden items-center gap-6 text-[#a9a9a9] sm:flex'>
                <Link
                  to='#facebook'
                  aria-label='Facebook'
                  className='transition hover:text-white'
                >
                  <FaFacebookF size={13} />
                </Link>
                <Link to='#instagram' aria-label='Instagram' className='transition hover:text-white'>
                  <FaInstagram size={14} />
                </Link>
                <Link to='#youtube' aria-label='Youtube' className='transition hover:text-white'>
                  <FaYoutube size={16} />
                </Link>
              </div>

              <div className='col-start-2 grid min-w-[min(78vw,560px)] place-items-center overflow-hidden text-center'>
                <AnimatePresence mode='wait'>
                  <motion.p
                    key={announcementMessages[activeAnnouncementIndex]}
                    variants={announcementFade}
                    initial='initial'
                    animate='animate'
                    exit='exit'
                    className='whitespace-nowrap text-[10px] font-medium uppercase tracking-[0.22em] text-white/75'
                  >
                    {announcementMessages[activeAnnouncementIndex]}
                  </motion.p>
                </AnimatePresence>
              </div>

              <div />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className='border-b border-white/8 bg-black'>
        <div className='mx-auto grid h-[78px] max-w-[1280px] grid-cols-[1fr_auto_1fr] items-center px-5 lg:px-10'>
          <button
            type='button'
            aria-label='Search'
            onClick={() => setIsSearchOpen((value) => !value)}
            className='grid size-10 place-items-center justify-self-start text-white transition hover:text-primary'
            aria-expanded={isSearchOpen}
          >
            <Search size={25} strokeWidth={2.25} />
          </button>

          <Link to='/' className='flex items-center justify-center'>
            <img
              src={logo}
              alt='NAF Power logo'
              className='h-[54px] w-[76px] object-contain sm:h-[58px] sm:w-[86px]'
            />
          </Link>

          <div className='flex items-center justify-end gap-5 sm:gap-[26px]'>
            {/* Account/Login Section */}
            {isAuthenticated && user ? (
              <div className='relative hidden sm:block'>
                <button
                  type='button'
                  onClick={() => setIsAccountOpen((value) => !value)}
                  className='grid size-9 place-items-center text-white transition hover:text-primary'
                  aria-label='Account menu'
                >
                  <UserRound size={22} strokeWidth={2.15} />
                </button>

                <AnimatePresence>
                  {isAccountOpen && (
                    <motion.div
                      variants={dropdownMenu}
                      initial='initial'
                      animate='animate'
                      exit='exit'
                      className='dropdown-bg absolute right-0 top-12 z-[80] w-[min(78vw,284px)] rounded-[16px] p-5 shadow-2xl ring-1 ring-white/10'
                    >
                      <div className='mb-5 flex items-start justify-between'>
                        <span className='text-[10px] text-white/55'>Dealer</span>
                        <button
                          type='button'
                          onClick={() => setIsAccountOpen(false)}
                          aria-label='Close account menu'
                        >
                          <X size={20} />
                        </button>
                      </div>

                      <div className='flex min-w-0 items-center gap-3 border-b border-white/10 pb-5'>
                        <span className='grid size-9 place-items-center rounded-full bg-primary text-xs font-black'>
                          {user.name ? user.name.charAt(0).toUpperCase() : 'U'}
                        </span>
                        <div className='min-w-0'>
                          <p className='truncate text-xs font-bold'>{user.name || 'User'}</p>
                          <p className='truncate text-[10px] text-white/65'>{user.email}</p>
                        </div>
                      </div>

                      <nav className='grid gap-5 border-b border-white/10 py-5 text-sm font-semibold'>
                        {(() => {
                          const accountLinks = {
                            Dashboard: '/dashboard',
                            'Browse Products': '/dashboard/all-products',
                            'My Orders': '/dashboard/orders',
                            Payments: '/dashboard/payments',
                            Setting: '/dashboard/setting',
                          }

                          return ['Dashboard', 'Browse Products', 'My Orders', 'Payments', 'Setting'].map(
                            (item) => (
                              <Link key={item} to={accountLinks[item] || '#'} className='transition hover:text-primary'>
                                {item}
                              </Link>
                            ),
                          )
                        })()}
                      </nav>

                      <button
                        type='button'
                        onClick={() => {
                          dispatch(logout())
                          setIsAccountOpen(false)
                        }}
                        className='mt-5 text-sm font-semibold transition hover:text-primary'
                      >
                        Sign Out
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate('/login')}
                className='hidden sm:block px-6 py-2.5 bg-primary hover:bg-primary-hover text-white font-black rounded-full transition-colors text-sm tracking-wide shadow-[0_4px_12px_rgba(232,12,12,0.3)]'
              >
                LOGIN
              </motion.button>
            )}

            <Link
              to='/dashboard/wishlist'
              aria-label='Wishlist'
              className='relative grid size-9 place-items-center text-white transition hover:text-primary'
            >
              <Heart size={23} strokeWidth={2.1} />
              {wishlistCount > 0 && (
                <span className='absolute -right-1 top-0 grid size-4 place-items-center rounded-full bg-primary text-[9px] font-black text-white'>
                  {wishlistCount}
                </span>
              )}
            </Link>

            <Link
              to='/cart'
              aria-label='Cart'
              className='relative grid size-9 place-items-center text-white transition hover:text-primary'
            >
              <ShoppingCart size={24} strokeWidth={2.15} />
              <span className='absolute -right-1 top-0 grid size-4 place-items-center rounded-full bg-primary text-[9px] font-black text-white'>
                {cartProductCount}
              </span>
            </Link>

            <button
              type='button'
              onClick={() => setIsMenuOpen((value) => !value)}
              className='grid size-9 place-items-center text-white transition hover:text-primary md:hidden'
              aria-label='Toggle navigation menu'
            >
              {isMenuOpen ? <X size={23} /> : <Menu size={23} />}
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isSearchOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
            className='overflow-hidden border-b border-white/8 bg-black'
          >
            <div className='mx-auto flex h-[78px] max-w-[920px] items-center px-5 lg:px-10'>
              <form
                className='flex h-[46px] w-full items-center rounded-full border border-white/75 px-5 text-white'
                onSubmit={(event) => event.preventDefault()}
              >
                <label className='sr-only' htmlFor='header-search'>
                  Search products
                </label>
                <Search size={18} strokeWidth={2} className='mr-4 shrink-0 text-white/55' />
                <input
                  id='header-search'
                  type='search'
                  placeholder='Search products, brands, categories...'
                  autoFocus
                  className='min-w-0 flex-1 bg-transparent text-sm font-medium text-white outline-none placeholder:text-white/45'
                />
                <button
                  type='button'
                  onClick={() => setIsSearchOpen(false)}
                  className='ml-4 grid size-8 shrink-0 place-items-center text-white/80 transition hover:text-primary'
                  aria-label='Close search'
                >
                  <X size={20} strokeWidth={2.2} />
                </button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div ref={categoryMenuRef} className='relative hidden border-b border-white/8 bg-black md:block'>
        <nav className='mx-auto flex h-[49px] max-w-[920px] items-center justify-center gap-[35px] px-4'>
          {inventoryCategories.map((category) => (
            <button
              type='button'
              key={category.slug}
              onClick={(event) => handleCategoryClick(category, event)}
              className='flex h-full items-center gap-1.5 whitespace-nowrap text-[12px] font-extrabold uppercase tracking-[0.13em] text-white transition hover:text-primary'
              aria-expanded={activeCategorySlug === category.slug}
            >
              {category.name}
              <ChevronDown
                size={18}
                strokeWidth={3}
                className={`ml-1 shrink-0 text-white/70 transition-transform ${
                  activeCategorySlug === category.slug ? 'rotate-180' : ''
                }`}
              />
            </button>
          ))}
        </nav>

        <AnimatePresence>
          {isDesktopCategoryMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.16, ease: 'easeOut' }}
              style={{ left: dropdownLeft }}
              className='dropdown-bg absolute top-full z-[70] w-[min(92vw,254px)] rounded-[24px] border border-white/8 px-4 py-5 shadow-2xl'
            >
              <Link
                to={`/products/${activeCategory.slug}`}
                onClick={() => {
                  setActiveCategorySlug(null)
                  setExpandedDesktopCategorySlug(null)
                }}
                className='flex w-full items-center justify-between border-b border-white/10 pb-4 text-left text-[13px] font-black uppercase tracking-[0.04em] text-white'
              >
                {activeCategory.name}
                <ChevronRight size={17} strokeWidth={2.4} className='text-white/85' />
              </Link>

              <nav className='mt-4 grid gap-1 relative'>
                {activeCategory.subCategories.map((subCategory) => {
                  const isActive = activeSubCategorySlug === subCategory.slug;
                  const hasSub2 = subCategory.subCategories2 && subCategory.subCategories2.length > 0;

                  return (
                    <div
                      key={subCategory.slug}
                      className="relative"
                      onMouseEnter={() => setActiveSubCategorySlug(subCategory.slug)}
                      onMouseLeave={() => setActiveSubCategorySlug(null)}
                    >
                      <Link
                        to={`/products/${subCategory.slug}`}
                        onClick={() => {
                          setActiveCategorySlug(null)
                          setActiveSubCategorySlug(null)
                        }}
                        className={`flex items-center justify-between rounded-[6px] px-3 py-2 text-[12px] font-semibold uppercase tracking-[0.02em] transition ${
                          isActive ? 'text-white' : 'text-white/80 hover:text-white'
                        }`}
                      >
                        {getSubCategoryLabel(subCategory)}
                        {hasSub2 && (
                          <ChevronRight 
                            size={14} 
                            className={`text-white/50 transition-transform ${isActive ? 'rotate-90' : ''}`} 
                          />
                        )}
                      </Link>

                      {/* Level 3 (Products/SubCategory2) Accordion */}
                      <AnimatePresence>
                        {isActive && hasSub2 && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                            className='overflow-hidden'
                          >
                            <nav className='flex flex-col gap-2 pl-4 pr-3 pt-1 pb-3'>
                              {subCategory.subCategories2.map((sub2) => (
                                <Link
                                  key={sub2.slug}
                                  to={`/products/${sub2.slug}`}
                                  onClick={() => {
                                    setActiveCategorySlug(null)
                                    setActiveSubCategorySlug(null)
                                  }}
                                  className='block text-[10px] font-medium uppercase tracking-[0.04em] text-white/50 transition hover:text-white'
                                >
                                  {sub2.name}
                                </Link>
                              ))}
                            </nav>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                })}
              </nav>

              <div className='mt-4 border-t border-white/10' />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className='border-b border-white/8 bg-[#080808]'>
        <nav className='mx-auto hidden h-[56px] max-w-[500px] items-center justify-center gap-[43px] px-4 text-[12px] font-extrabold uppercase tracking-[0.16em] md:flex'>
          {navItems.map((item) =>
            item.href === '/' ? (
              <Link
                key={item.label}
                to={item.href}
                className='text-primary transition hover:text-primary-hover'
              >
                {item.label}
              </Link>
            ) : (
              <Link key={item.label} to={item.href} className='text-white transition hover:text-primary'>
                {item.label}
              </Link>
            ),
          )}
        </nav>

        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              variants={mobileNavMenu}
              initial='initial'
              animate='animate'
              exit='exit'
              className='overflow-hidden border-t border-white/8 px-4 pb-5 md:hidden'
            >
              <nav className='header-nav-text grid gap-1 py-3'>
                {navItems.map((item) =>
                  item.href === '/' ? (
                    <Link
                      key={item.label}
                      to={item.href}
                      onClick={() => setIsMenuOpen(false)}
                      className='rounded-[6px] px-3 py-3 text-primary transition hover:bg-white/7'
                    >
                      {item.label}
                    </Link>
                  ) : (
                    <Link
                      key={item.label}
                      to={item.href}
                      onClick={() => setIsMenuOpen(false)}
                      className='rounded-[6px] px-3 py-3 text-white transition hover:bg-white/7 hover:text-primary'
                    >
                      {item.label}
                    </Link>
                  ),
                )}
              </nav>

              {/* Mobile Auth Section */}
              {!isAuthenticated && (
                <div className='mt-3 border-t border-white/8 pt-4'>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => {
                      navigate('/login')
                      setIsMenuOpen(false)
                    }}
                    className='w-full px-4 py-3 bg-primary hover:bg-primary-hover text-white font-black rounded-full transition-colors text-sm tracking-wide shadow-[0_4px_12px_rgba(232,12,12,0.3)]'
                  >
                    LOGIN
                  </motion.button>
                </div>
              )}

              <div className='mt-2 grid gap-2 border-t border-white/8 pt-4'>
                {inventoryCategories.map((category) => (
                  <div key={category.slug} className='border-b border-white/8 last:border-b-0'>
                    <button
                      type='button'
                      onClick={() =>
                        setOpenMobileCategorySlug((currentSlug) =>
                          currentSlug === category.slug ? null : category.slug,
                        )
                      }
                      className='flex w-full items-center justify-between px-3 py-3 text-left text-xs font-black uppercase tracking-[0.12em]'
                    >
                      {category.name}
                      <ChevronDown
                        size={14}
                        className={`transition-transform ${
                          openMobileCategorySlug === category.slug ? 'rotate-180' : ''
                        }`}
                      />
                    </button>

                    {openMobileCategorySlug === category.slug && (
                      <div className='grid gap-1 px-3 pb-3'>
                        {category.subCategories.map((subCategory) => (
                          <Link
                            key={subCategory.slug}
                            to={`/products/${subCategory.slug}`}
                            onClick={() => setIsMenuOpen(false)}
                            className='block px-3 py-2 text-[11px] font-semibold uppercase tracking-[0.08em] text-white/55 transition hover:text-primary'
                          >
                            {getSubCategoryLabel(subCategory)}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  )
}

export default Header
