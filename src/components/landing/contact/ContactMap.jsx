const ContactMap = () => {
  return (
    <section className='bg-page px-4 pb-14 text-white lg:px-6'>
      <div className='mx-auto w-full overflow-hidden border border-white/10 bg-[#111111]'>
        <iframe
          title='London Eye location map'
          src='https://www.google.com/maps?q=London%20Eye,%20London&output=embed'
          loading='lazy'
          referrerPolicy='no-referrer-when-downgrade'
          className='h-[320px] w-full grayscale invert-[0.88] contrast-[0.92] sm:h-[420px] lg:h-[500px]'
        />
      </div>
    </section>
  )
}

export default ContactMap
