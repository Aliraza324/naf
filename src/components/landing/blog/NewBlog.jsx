import React from 'react'
import logo from '../../../assets/images/logo.svg' // Adjust path if needed

const NewBlog = () => {
  return (
    <section className='flex items-center justify-center bg-black px-5 py-24'>
      <div className='w-full max-w-[760px] rounded-[16px] border border-white/5 bg-[#161616] px-6 py-14 text-center md:px-16 lg:py-20'>
        
        {/* Logo */}
        <div className='mb-8 flex justify-center'>
          <img 
            src={logo} 
            alt='NAF Supply' 
            className='h-12 w-auto object-contain opacity-80 mix-blend-screen' 
          />
        </div>

        {/* Heading */}
        <h2 className='mb-4 text-3xl font-black uppercase tracking-tight text-white md:text-[42px] md:leading-[1.1]'>
          Stay Locked On Target
        </h2>

        {/* Description */}
        <p className='mx-auto mb-10 max-w-[540px] text-sm leading-relaxed text-white/60 sm:text-base'>
          Join the exclusive frequency. Receive priority intel on new drops, limited edition releases, and tactical operational guides.
        </p>

        {/* Subscription Form eeeeeeeeeee*/}
        <form 
          className='mx-auto mb-8 flex w-full max-w-[560px] flex-col gap-4 sm:flex-row'
          onSubmit={(e) => e.preventDefault()}
        >
          <input
            type='email'
            placeholder='ENTER CALLSIGN (EMAIL)...'
            required
            className='h-[52px] w-full flex-1 rounded-[6px] border border-white/10 bg-[#080808] px-5 text-[12px] font-semibold tracking-wider text-white outline-none transition placeholder:text-white/20 focus:border-primary sm:h-[56px]'
          />
          <button
            type='submit'
            className='brand-red-gradient h-[52px] w-full shrink-0 rounded-[6px] px-10 text-[13px] font-black uppercase tracking-[0.1em] text-white transition hover:scale-105 active:scale-95 sm:h-[56px] sm:w-auto'
          >
            Subscribe
          </button>
        </form>

        {/* Footer Text */}
        <p className='text-[10px] font-bold uppercase tracking-[0.2em] text-white/30'>
          Encrypted Transmission. Zero Spam Guaranteed.
        </p>
      </div>
    </section>
  )
}

export default NewBlog