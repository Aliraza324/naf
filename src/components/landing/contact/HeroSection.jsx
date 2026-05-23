import contactImage from '../../../assets/images/contactImg.png'

const HeroSection = () => {
  return (
    <section className='relative isolate min-h-[430px] overflow-hidden bg-black text-white sm:min-h-[460px] lg:min-h-[360px]'>
      <img
        src={contactImage}
        alt='Paintball players moving through red smoke'
        className='absolute inset-0 -z-20 h-full w-full object-cover object-[62%_center] sm:object-center'
        loading='eager'
        decoding='async'
      />

      <div className='mx-auto flex min-h-[430px] max-w-[1180px] items-center px-5 py-16 sm:min-h-[460px] lg:min-h-[360px] lg:px-8'>
        <div className='max-w-[720px] pt-4 sm:pt-0'>
          <p className='mb-5 text-[10px] font-black uppercase tracking-[0.55em] text-primary sm:text-[11px]'>
            Contact Us
          </p>

          <h1 className='font-display text-[clamp(2.45rem,6.2vw,4.3rem)] font-black uppercase italic leading-[1.03] text-white drop-shadow-[0_8px_24px_rgba(0,0,0,0.55)]'>
            Ready To Connect
            <span className='block'>& Gear Up?</span>
          </h1>
        </div>
      </div>
    </section>
  )
}

export default HeroSection
