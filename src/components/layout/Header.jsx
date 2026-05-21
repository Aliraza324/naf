import { useState } from 'react'
import {
  ChevronDown,
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

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isAccountOpen, setIsAccountOpen] = useState(false)

  return (
    <header className='sticky top-0 z-50 border-b border-white/5 bg-[#050505]/95 text-white backdrop-blur-xl'>
      <div className='border-b border-white/8 bg-[#111]'>
        <div className='mx-auto flex min-h-9 max-w-[1180px] items-center justify-center gap-5 px-4 text-[9px] font-semibold uppercase tracking-[0.06em] text-white/85 sm:justify-between sm:text-[10px] sm:tracking-[0.08em] lg:px-6'>
          <p className='max-w-full truncate text-center sm:text-left'>
            Eco-friendly tactical paintballs now available
          </p>

          <a
            href='mailto:ops@NAFsupply.com'
            className='hidden items-center gap-2 normal-case tracking-normal text-white/75 transition hover:text-white sm:flex'
          >
            <Mail size={13} strokeWidth={1.8} />
            ops@NAFsupply.com
          </a>

          <div className='hidden items-center gap-5 text-[10px] text-white/85 lg:flex'>
            <button className='flex items-center gap-1 uppercase'>
              United States (USD $)
              <ChevronDown size={12} />
            </button>
            <button className='flex items-center gap-1 uppercase'>
              English
              <ChevronDown size={12} />
            </button>
          </div>
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
            <button className='rounded-full bg-primary px-8 py-3 text-[11px] font-black uppercase tracking-[0.16em] text-white transition hover:bg-primary-hover'>
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
                      <button className='shrink-0 rounded-full bg-primary px-4 py-2 text-[8px] font-black uppercase tracking-[0.1em] transition hover:bg-primary-hover sm:px-5 sm:text-[9px] sm:tracking-[0.13em]'>
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
        <div className='mx-auto flex max-w-[1180px] items-center gap-8 px-4 py-3 lg:px-6'>
          <button className='header-nav-text flex h-10 items-center gap-2.5 rounded-full bg-primary px-5 text-white transition hover:bg-primary-hover sm:h-11 sm:gap-3 sm:px-6'>
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
