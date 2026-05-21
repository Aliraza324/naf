import dollarIcon from '../../../assets/images/dollar.svg'
import giftIcon from '../../../assets/images/gift.svg'
import trackIcon from '../../../assets/images/track.svg'
import userIcon from '../../../assets/images/user.svg'
import { motion } from 'framer-motion'
import { fadeInUp, staggerContainer } from '../../../animations/animations'

const supportItems = [
  {
    title: 'Field Support',
    text: '24/7 Expert assistance',
    icon: userIcon,
  },
  {
    title: 'Elite Guarantee',
    text: '90-Day gear protection',
    icon: dollarIcon,
  },
  {
    title: 'Rapid Deployment',
    text: 'Free over $49 orders',
    icon: trackIcon,
  },
  {
    title: 'Operator Perks',
    text: 'Earn points on every buy',
    icon: giftIcon,
  },
]

const SecondHero = () => {
  return (
    <section className='bg-page px-4 py-12 sm:py-14 lg:px-6'>
      <motion.div 
        variants={staggerContainer(0.08, 0)}
        initial="initial"
        whileInView="animate"
        viewport={{ once: true, amount: 0.15 }}
        className='mx-auto grid max-w-[1180px] grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4'
      >
        {supportItems.map((item) => (
          <motion.article
            variants={fadeInUp}
            key={item.title}
            className='flex min-h-[104px] items-center gap-5 rounded-[14px] border border-white/10 bg-surface/70 px-6 shadow-[inset_0_1px_0_rgba(255,255,255,0.03)] transition hover:border-primary/60 hover:bg-surface-raised'
          >
            <div className='grid size-[54px] shrink-0 place-items-center rounded-[12px] bg-white/6'>
              <img
                src={item.icon}
                alt=''
                loading='lazy'
                decoding='async'
                className='size-8 object-contain'
              />
            </div>

            <div className='min-w-0'>
              <h2 className='text-sm font-black uppercase leading-5 tracking-[0.02em] text-text-strong'>
                {item.title}
              </h2>
              <p className='mt-1 truncate text-xs leading-5 text-text-subtle'>{item.text}</p>
            </div>
          </motion.article>
        ))}
      </motion.div>
    </section>
  )
}

export default SecondHero

