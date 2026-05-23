import React from 'react'
import { ChevronsUp } from 'lucide-react'

const HeroBlog = () => {
  return (
    <section className='relative flex min-h-[600px] w-full items-center overflow-hidden bg-black py-20'>
      {/* Background Image Setup (User can replace the src) */}
      <div 
        className='absolute inset-0 bg-cover bg-center bg-no-repeat'
        style={{ 
            backgroundImage: `url('https://images.unsplash.com/photo-1595590424283-b8f1784cb2c2?q=80&w=2070&auto=format&fit=crop')`, // Placeholder background
            opacity: 0.5 
        }}
      />
      
      {/* Gradient overlay to ensure text readability */}
      <div className='absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent' />

      {/* Main Content */}
      <div className='relative z-10 mx-auto w-full max-w-[1280px] px-5 lg:px-10'>
        <div className='max-w-[600px]'>
          <p className='mb-4 text-[11px] font-black uppercase tracking-[0.3em] text-primary'>
            2026 Elite Series
          </p>
          
          <h1 className='font-display text-[clamp(3rem,7vw,5rem)] font-black uppercase italic leading-[1.05] tracking-tight text-white'>
            Latest Blog<br />
            Rule The Field.
          </h1>
          
          <p className='mt-6 max-w-[480px] text-sm leading-relaxed text-white/60 sm:text-base'>
            Built for unmatched precision. Step into the future of eco-certified high-performance gear and professional-grade tactical essentials.
          </p>
          
          <button 
            type='button'
            className='brand-red-gradient mt-8 rounded-[4px] px-8 py-3.5 text-[11px] font-black uppercase tracking-[0.12em] text-white transition hover:scale-105 active:scale-95'
          >
            Shop Arsenal
          </button>
        </div>
      </div>

      {/* Slider Indicators */}
      <div className='absolute bottom-8 left-1/2 z-10 flex -translate-x-1/2 items-center gap-2'>
        <div className='h-1 w-6 rounded-full bg-primary'></div>
        <div className='h-1 w-3 cursor-pointer rounded-full bg-white/20 transition hover:bg-white/40'></div>
        <div className='h-1 w-3 cursor-pointer rounded-full bg-white/20 transition hover:bg-white/40'></div>
      </div>

      {/* Scroll to Top / Side Button */}
      <button 
        type='button'
        className='brand-red-gradient absolute bottom-8 right-5 z-10 flex size-10 items-center justify-center rounded-[6px] text-white transition hover:scale-105 active:scale-95 lg:right-10'
        aria-label='Scroll to top'
      >
        <ChevronsUp size={20} strokeWidth={3} />
      </button>
    </section>
  )
}

export default HeroBlog