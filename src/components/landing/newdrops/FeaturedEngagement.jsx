import { useMemo, useState } from 'react'
import { ChevronLeft, ChevronRight, Plus } from 'lucide-react'
import { featuredCategories } from '../../../data/featuredCategories'

const prices = {
  'eco-grade': '$39.99',
  'field-grade': '$44.99',
  iconic: '$69.99',
  'iconic-ops': '$69.99',
  '50-cal': '$49.99',
}

const baseGear = featuredCategories.filter((item) =>
  ['eco-grade', 'field-grade', 'iconic', '50-cal'].includes(item.id),
)

const iconicGear = baseGear.find((item) => item.id === 'iconic')

const engagementGear = [
  ...baseGear.slice(0, 3),
  iconicGear && { ...iconicGear, id: 'iconic-ops' },
  ...baseGear.slice(3),
]
  .filter(Boolean)
  .map((item) => ({
    ...item,
    description: item.description.replace('â€¢', '-'),
    price: prices[item.id],
  }))

const FeaturedEngagement = () => {
  const [activeIndex, setActiveIndex] = useState(0)
  const visibleGear = useMemo(
    () =>
      engagementGear.map((_, index) => {
        const itemIndex = (activeIndex + index) % engagementGear.length
        return engagementGear[itemIndex]
      }),
    [activeIndex],
  )

  const showPrevious = () => {
    setActiveIndex((currentIndex) =>
      currentIndex === 0 ? engagementGear.length - 1 : currentIndex - 1,
    )
  }

  const showNext = () => {
    setActiveIndex((currentIndex) => (currentIndex + 1) % engagementGear.length)
  }

  return (
    <section className='bg-page px-4 py-14 text-white sm:py-16 lg:px-6'>
      <div className='mx-auto max-w-[1180px]'>
        <div className='mb-10 flex items-center justify-between gap-5'>
          <h2 className='font-display text-[clamp(1.7rem,3vw,2.35rem)] font-black uppercase italic leading-none text-white'>
            Featured Engagement Gear
          </h2>

          <div className='flex items-center gap-3'>
            <button
              type='button'
              aria-label='Previous products'
              onClick={showPrevious}
              className='grid size-9 place-items-center rounded-full border border-white/12 bg-black text-white transition hover:border-primary hover:text-primary'
            >
              <ChevronLeft size={18} strokeWidth={2.6} />
            </button>
            <button
              type='button'
              aria-label='Next products'
              onClick={showNext}
              className='grid size-9 place-items-center rounded-full border border-white/12 bg-black text-white transition hover:border-primary hover:text-primary'
            >
              <ChevronRight size={18} strokeWidth={2.6} />
            </button>
          </div>
        </div>

        <div className='grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5'>
          {visibleGear.map((item) => (
            <article
              key={item.id}
              className='flex min-h-[354px] flex-col rounded-[7px] border border-white/8 bg-[#141414] p-5 transition duration-300 hover:-translate-y-1 hover:border-primary/60 hover:shadow-[0_0_28px_rgba(230,1,3,0.12)]'
            >
              <div className='relative grid aspect-square place-items-center overflow-hidden rounded-[4px] bg-[#101010] p-4'>
                <span className='absolute left-2 top-2 rounded-[2px] bg-primary px-2.5 py-1.5 text-[9px] font-black uppercase leading-none tracking-[0.04em] text-white'>
                  New Arrival
                </span>
                <img
                  src={item.image}
                  alt={item.name}
                  loading='lazy'
                  decoding='async'
                  className='h-full max-h-[145px] w-full object-contain'
                />
              </div>

              <div className='flex flex-1 flex-col pt-5'>
                <h3 className='font-display text-[1.65rem] font-black uppercase leading-none text-white'>
                  {item.name}
                </h3>
                <p className='mt-3 min-h-9 text-[12px] leading-5 text-white/45'>
                  {item.description}
                </p>

                <dl className='mt-4 grid gap-3'>
                  {item.specs.map((spec) => (
                    <div
                      key={spec.label}
                      className='flex items-center justify-between border-b border-white/5 pb-2 text-[10px] uppercase'
                    >
                      <dt className='font-semibold tracking-[0.08em] text-white/35'>
                        {spec.label}
                      </dt>
                      <dd
                        className={`font-black normal-case ${
                          spec.accent ? 'text-[#20ff4f]' : 'text-white'
                        }`}
                      >
                        {spec.value}
                      </dd>
                    </div>
                  ))}
                </dl>

                <div className='mt-auto flex items-end justify-between pt-7'>
                  <p className='text-xl font-black leading-none text-white'>{item.price}</p>
                  <button
                    type='button'
                    aria-label={`Add ${item.name}`}
                    className='grid size-9 place-items-center rounded-[3px] bg-white/5 text-white transition hover:bg-primary'
                  >
                    <Plus size={14} strokeWidth={3} />
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

export default FeaturedEngagement
