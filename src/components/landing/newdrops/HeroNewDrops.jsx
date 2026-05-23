import { ChevronsUp } from 'lucide-react'
import { Link } from 'react-router-dom'
import heroImage from '../../../assets/images/heroimg.png'

const stats = [
  { value: '12', label: 'Unique Skus', accent: true },
  { value: '01', label: 'Limited Edition' },
  { value: '99.9%', label: 'Field Success' },
  { value: '24H', label: 'Dispatch Time' },
]

const HeroNewDrops = () => {
  return (
    <section className='relative isolate min-h-[620px] overflow-hidden bg-black text-white sm:min-h-[640px] lg:min-h-[560px]'>
      <img
        src={heroImage}
        alt='New drops tactical paintball marker'
        className='absolute inset-0 -z-20 h-full w-full object-cover object-center'
        loading='eager'
        decoding='async'
      />
      <div className='absolute inset-0 -z-10 bg-black/60' />
      <div className='absolute inset-0 -z-10 bg-gradient-to-r from-black via-black/58 to-black/10' />
      <div className='absolute inset-x-0 bottom-0 -z-10 h-40 bg-gradient-to-t from-black to-transparent' />

      <div className='mx-auto flex min-h-[620px] max-w-[1180px] flex-col justify-center px-4 py-16 sm:min-h-[640px] lg:min-h-[560px] lg:px-6'>
        <div className='grid items-end gap-10 lg:grid-cols-[1fr_360px]'>
          <div className='max-w-[720px]'>
            <p className='mb-6 text-[12px] font-black uppercase tracking-[0.55em] text-primary'>
              2024 Elite Series
            </p>

            <h1 className='font-display text-[clamp(2.1rem,5vw,3.25rem)] font-black uppercase italic leading-[1.08] text-white'>
              New Drops
              <span className='block'>Command The Field.</span>
            </h1>

            <p className='mt-7 max-w-[475px] text-base leading-7 text-white/55'>
              Engineered for competitive superiority. Experience the next generation of
              eco-certified high-impact consumables and professional tactical gear.
            </p>

            <Link
              to='/products/grenades-smoke'
              className='brand-red-gradient mt-9 inline-flex h-14 min-w-[168px] items-center justify-center rounded-[6px] px-8 text-[12px] font-black uppercase tracking-[0.12em] text-white shadow-[0_12px_26px_rgba(230,1,3,0.24)] transition hover:brightness-110 active:translate-y-0.5'
            >
              Shop Arsenal
            </Link>
          </div>

          <aside className='w-full max-w-[360px] justify-self-start rounded-[12px] border border-white/15 bg-[#07101a]/90 p-7 shadow-[0_20px_50px_rgba(0,0,0,0.42)] backdrop-blur-md lg:justify-self-end'>
            <div className='grid grid-cols-2 gap-x-8 gap-y-8'>
              {stats.map((item) => (
                <div key={item.label}>
                  <p
                    className={`font-display text-3xl font-black uppercase leading-none ${
                      item.accent ? 'text-primary' : 'text-white'
                    }`}
                  >
                    {item.value}
                  </p>
                  <p className='mt-2 text-[9px] font-black uppercase tracking-[0.28em] text-white/45'>
                    {item.label}
                  </p>
                </div>
              ))}
            </div>
          </aside>
        </div>

        <div className='mt-10 flex items-center justify-center gap-3 lg:mt-[-18px]'>
          <span className='h-1.5 w-10 rounded-full bg-primary' />
          <span className='size-1.5 rounded-full bg-white/25' />
          <span className='size-1.5 rounded-full bg-white/25' />
        </div>
      </div>

      <button
        type='button'
        aria-label='Back to top'
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className='absolute bottom-16 right-5 z-10 grid size-12 place-items-center rounded-[10px] bg-primary text-white shadow-[0_12px_28px_rgba(230,1,3,0.35)] transition hover:bg-primary-hover active:scale-95 lg:right-10'
      >
        <ChevronsUp size={18} strokeWidth={3} />
      </button>
    </section>
  )
}

export default HeroNewDrops
