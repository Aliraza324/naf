import { Mail, MapPin, PhoneCall } from 'lucide-react'

const infoCards = [
  {
    title: 'Mail us 24/7',
    icon: Mail,
    lines: ['no-reply@pbminfo.com', 'no-reply@pbmadmin.com'],
  },
  {
    title: 'Call us 24/7',
    icon: PhoneCall,
    lines: ['Phone : (+55) 654 - 545 - 5418', 'Mobile : (+01) 654 - 545 - 1235'],
  },
  {
    title: 'Our Locations',
    icon: MapPin,
    lines: ['4821 Ride Top, Anch St, Alaska', '997998, USA main city.'],
  },
]

const ContactInfo = () => {
  return (
    <section className='bg-page px-4 py-10 text-white lg:px-6'>
      <div className='mx-auto grid max-w-[1180px] gap-6 md:grid-cols-3'>
        {infoCards.map(({ title, icon: Icon, lines }) => (
          <article
            key={title}
            className='rounded-[18px] bg-[#121212] px-7 py-8 shadow-[0_18px_40px_rgba(0,0,0,0.28)] ring-1 ring-white/5'
          >
            <Icon size={23} strokeWidth={1.9} className='text-primary' />

            <div className='mt-5 flex items-center gap-0'>
              <span className='h-px flex-1 bg-white/70' />
              <span className='size-2 rounded-full bg-white' />
            </div>

            <h2 className='mt-5 text-[clamp(1rem,2vw,1.35rem)] font-semibold text-white'>
              {title}
            </h2>

            <div className='mt-6 grid gap-1 text-xs font-semibold leading-5 text-white/70'>
              {lines.map((line) => (
                <p key={line}>{line}</p>
              ))}
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}

export default ContactInfo
