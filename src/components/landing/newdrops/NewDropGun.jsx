import { Link } from 'react-router-dom'
import heroImage from '../../../assets/images/heroimg.png'

const systemReadouts = [
  ['System_Status:', 'Online'],
  ['Target_Acquisition:', 'Active'],
  ['Bolt_PSI:', '145_Normal'],
]

const NewDropGun = () => {
  return (
    <section className='relative isolate overflow-hidden bg-black px-4 py-16 text-white sm:py-20 lg:px-6'>
      <div className='mx-auto max-w-[1180px]'>
        <div className='relative min-h-[520px] overflow-hidden bg-[#050505] px-5 py-12 sm:px-10 lg:px-[92px] lg:py-20'>
          <img
            src={heroImage}
            alt='Phantom Velocity Marker Gen-X'
            loading='lazy'
            decoding='async'
            className='absolute inset-0 -z-20 h-full w-full object-cover object-center opacity-65 lg:object-right'
          />
          <div className='absolute inset-0 -z-10 bg-gradient-to-r from-black via-black/72 to-black/12' />
          <div className='absolute inset-0 -z-10 bg-gradient-to-t from-black via-transparent to-black/45' />
          <div className='absolute inset-0 -z-10 bg-black/18' />

          <div className='absolute right-7 top-8 hidden text-right lg:block'>
            {systemReadouts.map(([label, value]) => (
              <p
                key={label}
                className='mb-5 border-r border-primary pr-4 text-[9px] font-black uppercase tracking-[0.2em] text-primary/75'
              >
                {label} <span className='text-primary'>{value}</span>
              </p>
            ))}
          </div>

          <div className='relative max-w-[620px]'>
            <p className='mb-7 inline-flex border border-primary/45 px-4 py-2 text-[10px] font-black uppercase tracking-[0.42em] text-primary'>
              Operational Priority: Class Omega
            </p>

            <h2 className='font-display text-[clamp(3rem,6.5vw,4.9rem)] font-black uppercase leading-[0.98] text-white'>
              Phantom
              <span className='block text-primary'>Velocity</span>
              <span className='block'>
                Marker <span className='text-white/45'>Gen-X</span>
              </span>
            </h2>

            <p className='mt-8 max-w-[590px] text-base leading-7 text-white/55'>
              Featuring the proprietary X-Flow bolt system for unrivaled consistency
              and a digital pressure mapping interface. Limited to 250 units globally.
            </p>

            <div className='mt-9 flex flex-col gap-6 sm:flex-row sm:items-center'>
              <Link
                to='/checkout'
                className='inline-flex h-14 w-full items-center justify-center bg-primary px-8 text-[12px] font-black uppercase tracking-[0.12em] text-black transition hover:bg-primary-hover sm:w-[215px]'
              >
                Pre-Order Mission
              </Link>

              <div>
                <p className='text-[9px] font-black uppercase tracking-[0.3em] text-white/35'>
                  Serial Range
                </p>
                <p className='mt-1 font-mono text-sm font-black tracking-[0.12em] text-white'>
                  PX-2026-001/250
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default NewDropGun
