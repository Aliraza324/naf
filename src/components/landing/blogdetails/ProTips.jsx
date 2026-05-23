import { MapPin, House, Search, Wrench } from 'lucide-react'

const tips = [
  { icon: MapPin,  text: 'Never over-lubricate components' },
  { icon: House,   text: 'Store markers in dry environments' },
  { icon: Search,  text: 'Inspect O-rings regularly' },
  { icon: Wrench,  text: 'Clean after every competitive session' },
]

const ProTips = ({ quote }) => {
  return (
    <div className='flex w-full flex-col gap-8'>

      {/* Quote Block */}
      <blockquote className='relative rounded-[6px] border border-white/5 bg-[#161616] px-6 py-6 pl-10'>
        {/* Red left border accent */}
        <span className='absolute left-0 top-6 bottom-6 w-[4px] rounded-full bg-primary' />
        <p className='text-sm italic leading-7 text-white/75 md:text-base'>
          &ldquo;{quote || 'Consistent maintenance separates reliable gear from unreliable performance.'}&rdquo;
        </p>
      </blockquote>

      {/* Pro Tips Section */}
      <div>
        <h2 className='mb-5 text-xl font-black text-white lg:text-2xl'>Pro Tips From Field Experts</h2>
        <div className='rounded-[6px] border border-white/5 bg-[#131313]'>
          {tips.map((tip, i) => {
            const Icon = tip.icon
            return (
              <div
                key={i}
                className={`flex items-center gap-4 px-5 py-4 ${
                  i !== tips.length - 1 ? 'border-b border-white/5' : ''
                }`}
              >
                <span className='flex size-5 shrink-0 items-center justify-center'>
                  <Icon size={14} className='text-primary' strokeWidth={2.2} />
                </span>
                <span className='text-sm font-semibold text-white/75'>{tip.text}</span>
              </div>
            )
          })}
        </div>
      </div>

    </div>
  )
}

export default ProTips
