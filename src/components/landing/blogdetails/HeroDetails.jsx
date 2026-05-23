import React from 'react'
import { ChevronsUp } from 'lucide-react'

const HeroDetails = ({ blog }) => {
  return (
    <section className='relative flex min-h-[500px] w-full items-center overflow-hidden bg-black py-20'>
      {/* Background Image */}
      <div 
        className='absolute inset-0 bg-cover bg-center bg-no-repeat'
        style={{ 
            backgroundImage: `url('${blog?.image || 'https://images.unsplash.com/photo-1595590424283-b8f1784cb2c2?q=80&w=2070&auto=format&fit=crop'}')`,
            opacity: 0.6 
        }}
      />
      
      {/* Gradient overlay: Strong black on the left fading to transparent on the right */}
      <div className='absolute inset-0 bg-gradient-to-r from-black via-black/80 to-transparent md:w-[80%]' />
      
      {/* Additional bottom gradient for smooth blending */}
      <div className='absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80' />

      {/* Main Content */}
      <div className='relative z-10 mx-auto w-full max-w-[1280px] px-5 lg:px-10'>
        <div className='max-w-[800px]'>
          <p className='mb-4 text-[11px] font-black uppercase tracking-[0.3em] text-primary'>
            {blog?.category || 'Blog Detail'}
          </p>
          
          <h1 className='font-display text-[clamp(2.5rem,6vw,4.5rem)] font-black italic leading-[1.05] tracking-tight text-white'>
            {blog?.title || 'Mastering Your Marker: Pro Maintenance Guide'}
          </h1>
        </div>
      </div>

      {/* Scroll to Top Button */}
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

export default HeroDetails