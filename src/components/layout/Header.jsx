import { useEffect, useRef, useState } from 'react'
import {
  ChevronDown,
  ChevronRight,
  Heart,
  Mail,
  Menu,
  Search,
  ShoppingBasket,
  X,
} from 'lucide-react'
import logo from '../../assets/images/logo.svg'
import { motion, AnimatePresence } from 'framer-motion'
import { dropdownMenu, mobileNavMenu } from '../../animations/animations'

const navItems = ['Home', 'New Drops', 'Blog', 'Support', 'Contact Us']

const inventoryFeaturedCategory = {
  name: 'BBS',
  subCategories: ['Biodegradable (4)', 'Non-Biodegradable (5)', 'Grenades & Smoke'],
}

const inventoryItems = [
  {
    name: 'Guns',
    subCategories: ['Markers', 'Rifles', 'Pistols'],
  },
  {
    name: 'Goggles & Masks',
    subCategories: ['Full Face Masks', 'Thermal Lenses', 'Replacement Foam'],
  },
  {
    name: 'Tactical Gear',
    subCategories: ['Vests', 'Holsters', 'Mag Pouches'],
  },
  {
    name: 'Optics',
    subCategories: ['Red Dot Sights', 'Scopes', 'Mounts'],
  },
  {
    name: 'Gas',
    subCategories: ['CO2 Tanks', 'HPA Tanks', 'Regulators'],
  },
  {
    name: 'Batteries',
    subCategories: ['9V Batteries', 'Rechargeable Packs', 'Chargers'],
  },
  {
    name: 'Apparel',
    subCategories: ['Jerseys', 'Gloves', 'Protective Pants'],
  },
]

const Header = () => {
  const inventoryRef = useRef(null)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isAccountOpen, setIsAccountOpen] = useState(false)
  const [isTopHeaderHidden, setIsTopHeaderHidden] = useState(false)
  const [isInventoryOpen, setIsInventoryOpen] = useState(false)
  const [isAllCategoriesOpen, setIsAllCategoriesOpen] = useState(true)
  const [isBbsOpen, setIsBbsOpen] = useState(true)
  const [openInventoryCategory, setOpenInventoryCategory] = useState(null)

  useEffect(() => {
    const handleScroll = () => {
      setIsTopHeaderHidden(window.scrollY > 8)
    }

    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })

    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    if (!isInventoryOpen) return undefined

    const handleMouseDown = (event) => {
      if (!inventoryRef.current?.contains(event.target)) {
        setIsInventoryOpen(false)
      }
    }

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        setIsInventoryOpen(false)
      }
    }

    document.addEventListener('mousedown', handleMouseDown)
    document.addEventListener('keydown', handleKeyDown)

    return () => {
      document.removeEventListener('mousedown', handleMouseDown)
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [isInventoryOpen])

  const toggleInventory = () => {
    setIsInventoryOpen((value) => !value)
  }

  return (
    <header className='sticky top-0 z-50 border-b border-white/5 bg-[#050505]/95 text-white backdrop-blur-xl'>
      <div
        className={`overflow-hidden border-b border-white/8 bg-[#111] mx-auto transition-all duration-300 ease-out ${
          isTopHeaderHidden ? 'max-h-0 opacity-0' : 'max-h-9 opacity-100'
        }`}
      >
        <div className='relative mx-auto flex min-h-9 max-w-[1180px] items-center justify-center gap-5 px-4 text-[9px] font-semibold uppercase tracking-[0.06em] text-white/85 sm:text-[10px] sm:tracking-[0.08em] lg:px-6'>
          <p className='max-w-full truncate text-center'>
            Eco-friendly tactical paintballs now available
          </p>

          <a
            href='mailto:ops@NAFsupply.com'
            className='hidden items-center gap-2 normal-case tracking-normal text-white/75 transition hover:text-white sm:flex'
          >
            <Mail size={13} strokeWidth={1.8} />
            ops@NAFsupply.com
          </a>
        </div>
      </div>

      <div className='border-b border-white/8 bg-[#080808]'>
        <div className='mx-auto grid max-w-[1180px] grid-cols-[auto_1fr_auto] items-center gap-3 px-4 py-4 lg:grid-cols-[140px_1fr_auto] lg:px-6'>
          <a href='/' className='flex items-center'>
            <img
              src={logo}
              alt='NAF Power logo'
              className='h-10 w-16 object-contain sm:h-12 sm:w-20'
            />
          </a>

          <form className='mx-auto hidden w-full max-w-[520px] items-center rounded-full border border-white/12 bg-[#171717] p-1 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.03)] md:flex'>
            <label className='sr-only' htmlFor='site-search'>
              Search tactical gear
            </label>
            <input
              id='site-search'
              type='search'
              placeholder='Search tactical gear...'
              className='min-w-0 flex-1 bg-transparent px-5 text-sm text-white outline-none placeholder:text-white/45'
            />
            <button className='brand-red-gradient rounded-full px-8 py-3 text-[11px] font-black uppercase tracking-[0.16em] text-white transition'>
              Search
            </button>
          </form>

          <div className='flex items-center justify-end gap-2 sm:gap-3'>
            <button
              aria-label='Wishlist'
              className='relative grid size-10 place-items-center rounded-full bg-white/7 text-white transition hover:bg-white/12'
            >
              <Heart size={21} strokeWidth={2.1} />
              <span className='absolute -right-0.5 -top-1 grid size-4 place-items-center rounded-full bg-primary text-[9px] font-black text-white'>
                0
              </span>
            </button>

            <button className='relative hidden h-10 items-center gap-2 rounded-full border border-white/10 bg-white/7 px-3 text-left transition hover:bg-white/12 sm:flex'>
              <span className='grid size-8 place-items-center rounded-full bg-primary/85'>
                <ShoppingBasket size={17} />
              </span>
              <span className='absolute left-8 top-0 grid size-4 place-items-center rounded-full bg-white text-[9px] font-black text-primary'>
                0
              </span>
              <span className='pr-2 text-[10px] font-bold uppercase leading-tight text-white/65'>
                Cart
                <strong className='block text-xs text-white'>$0.00</strong>
              </span>
            </button>

            <div className='relative'>
              <button
                onClick={() => setIsAccountOpen((value) => !value)}
                className='flex items-center gap-2 rounded-full bg-white/7 p-1 pr-2 transition hover:bg-white/12'
                aria-label='Account menu'
              >
                <span className='grid size-9 place-items-center overflow-hidden rounded-full bg-[#2d323a] text-xs font-bold'>
                  <img
                    src='https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=96&q=80'
                    alt=''
                    className='h-full w-full object-cover'
                  />
                </span>
                <ChevronDown size={14} className='hidden sm:block' />
              </button>

              <AnimatePresence>
                {isAccountOpen && (
                  <motion.div
                    variants={dropdownMenu}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                    className='fixed left-1/2 top-[30px] z-[60] w-[min(88vw,340px)] -translate-x-1/2 rounded-[22px] bg-[#171717] p-4 shadow-2xl ring-1 ring-white/10 sm:absolute sm:left-auto sm:right-0 sm:top-14 sm:w-[min(78vw,284px)] sm:translate-x-0 sm:p-5'
                  >
                    <div className='mb-4 flex items-start justify-between sm:mb-5'>
                      <span className='text-[10px] text-white/55'>Dealer</span>
                      <button
                        onClick={() => setIsAccountOpen(false)}
                        aria-label='Close account menu'
                      >
                        <X size={20} />
                      </button>
                    </div>

                    <div className='flex min-w-0 items-center gap-3 border-b border-white/10 pb-4 sm:pb-5'>
                      <img
                        src='https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=96&q=80'
                        alt=''
                        className='size-9 rounded-full object-cover'
                      />
                      <div className='min-w-0'>
                        <p className='truncate text-sm font-bold sm:text-xs'>User Name</p>
                        <p className='truncate text-[11px] text-white/65 sm:text-[10px]'>
                          Nafuser@gmail.com
                        </p>
                      </div>
                    </div>

                    <nav className='grid gap-4 border-b border-white/10 py-4 text-sm font-semibold sm:gap-5 sm:py-5'>
                      {['Dashboard', 'Browse Products', 'My Orders', 'Payments', 'Setting'].map(
                        (item) => (
                          <a key={item} href='#account' className='transition hover:text-primary'>
                            {item}
                          </a>
                        ),
                      )}
                    </nav>

                    <div className='flex items-center justify-between gap-3 pt-4 sm:pt-5'>
                      <a href='#signout' className='shrink-0 text-sm font-semibold'>
                        Sign Out
                      </a>
                      <button className='brand-red-gradient shrink-0 rounded-full bg-primary px-4 py-2 text-[8px] font-black uppercase tracking-[0.1em] transition hover:bg-primary-hover sm:px-5 sm:text-[9px] sm:tracking-[0.13em]'>
                        Sign Out
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <button
              onClick={() => setIsMenuOpen((value) => !value)}
              className='grid size-10 place-items-center rounded-full bg-primary text-white md:hidden'
              aria-label='Toggle navigation menu'
            >
              {isMenuOpen ? <X size={21} /> : <Menu size={21} />}
            </button>
          </div>
        </div>

        <div className='mx-auto px-4 pb-4 md:hidden'>
          <form className='mx-auto flex w-full max-w-[520px] items-center rounded-full border border-white/12 bg-[#171717] p-1'>
            <input
              type='search'
              placeholder='Search tactical gear...'
              className='min-w-0 flex-1 bg-transparent px-4 text-xs text-white outline-none placeholder:text-white/45 sm:text-sm'
            />
            <button aria-label='Search' className='grid size-10 place-items-center rounded-full bg-primary'>
              <Search size={17} />
            </button>
          </form>
        </div>
      </div>

      <div className='bg-[#050505]'>
        <div ref={inventoryRef} className='relative mx-auto max-w-[1180px]'>
          <div className='flex items-center gap-8 px-4 py-3 lg:px-6'>
          <button
            type='button'
          onClick={toggleInventory}
            className='brand-red-gradient header-nav-text flex h-10 items-center gap-2.5 rounded-full bg-primary px-5 text-white transition hover:bg-primary-hover sm:h-11 sm:gap-3 sm:px-6'
            aria-expanded={isInventoryOpen}
          >
            <Menu size={19} />
            Inventory
          </button>

          <nav className='header-nav-text hidden items-center gap-8 md:flex'>
            {navItems.map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase().replaceAll(' ', '-')}`}
                className={`transition hover:text-primary ${
                  item === 'Home' ? 'text-primary' : 'text-white'
                }`}
              >
                {item}
              </a>
            ))}
          </nav>
          </div>

          <AnimatePresence>
            {isInventoryOpen && (
              <motion.div
                initial={{ opacity: 0, y: -8, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -8, scale: 0.98 }}
                transition={{ duration: 0.18, ease: 'easeOut' }}
                className='absolute left-4 top-full z-[70] w-[min(82vw,324px)] rounded-[24px] bg-[#202020] px-6 py-7 text-white shadow-2xl ring-1 ring-white/8 lg:left-6'
              >
                <button
                  type='button'
                  onClick={() => setIsAllCategoriesOpen((value) => !value)}
                  className='flex w-full items-center justify-between border-b border-white/10 pb-5 text-left text-[15px] font-black'
                >
                  All categories
                  <ChevronDown
                    size={17}
                    strokeWidth={2.2}
                    className={`transition-transform ${isAllCategoriesOpen ? 'rotate-180' : ''}`}
                  />
                </button>

                {isAllCategoriesOpen && (
                  <div className='py-5'>
                    <button
                      type='button'
                      onClick={() => setIsBbsOpen((value) => !value)}
                      className='mb-1.5 flex w-full items-center justify-between text-left text-sm font-bold text-white'
                    >
                      {inventoryFeaturedCategory.name}
                      <ChevronRight
                        size={17}
                        strokeWidth={2.2}
                        className={`transition-transform ${isBbsOpen ? 'rotate-90' : ''}`}
                      />
                    </button>
                    {isBbsOpen && (
                      <div className='grid gap-0.5 text-[10px] font-bold uppercase leading-[18px] text-white/55'>
                        {inventoryFeaturedCategory.subCategories.map((subCategory) => (
                          <span key={subCategory}>{subCategory}</span>
                        ))}
                      </div>
                    )}
                  </div>
                )}

                {isAllCategoriesOpen && (
                  <nav className='grid gap-4 border-b border-white/10 pb-6 text-sm font-bold text-white/90'>
                    {inventoryItems.map((item) => (
                      <div key={item.name}>
                      <button
                        type='button'
                        key={item.name}
                        onClick={() =>
                          setOpenInventoryCategory((value) =>
                            value === item.name ? null : item.name,
                          )
                        }
                        className='flex w-full items-center justify-between text-left transition hover:text-primary'
                      >
                        {item.name}
                        <ChevronRight
                          size={18}
                          strokeWidth={2.1}
                          className={`transition-transform ${
                            openInventoryCategory === item.name ? 'rotate-90' : ''
                          }`}
                        />
                      </button>

                      {openInventoryCategory === item.name && (
                        <div className='mt-2 grid gap-1 pl-3 text-[10px] font-bold uppercase leading-[18px] text-white/55'>
                          {item.subCategories.map((subCategory) => (
                            <a
                              key={subCategory}
                              href={`#${subCategory.toLowerCase().replaceAll(' ', '-')}`}
                              onClick={() => setIsInventoryOpen(false)}
                              className='transition hover:text-primary'
                            >
                              {subCategory}
                            </a>
                          ))}
                        </div>
                      )}
                      </div>
                    ))}
                  </nav>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <AnimatePresence>
          {isMenuOpen && (
            <motion.nav
              variants={mobileNavMenu}
              initial="initial"
              animate="animate"
              exit="exit"
              className='header-nav-text grid gap-1 border-t border-white/8 px-4 pb-4 md:hidden overflow-hidden'
            >
              {navItems.map((item) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase().replaceAll(' ', '-')}`}
                  className={`rounded-lg px-3 py-3 transition hover:bg-white/7 ${
                    item === 'Home' ? 'text-primary' : 'text-white'
                  }`}
                >
                  {item}
                </a>
              ))}
            </motion.nav>
          )}
        </AnimatePresence>
      </div>
    </header>
  )
}

export default Header
