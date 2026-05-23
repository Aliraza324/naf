import { Search, Clock, Phone } from 'lucide-react'
import { blogsData } from '../../../data/blogsData'
import ProTips from './ProTips'

const recentPosts = blogsData.slice(0, 3)

const BlogMoreDetails = ({ blog }) => {
  if (!blog) return null

  const section = blog.sections?.[0] || {}
  return (
    <section className='bg-page px-4 py-14 text-white lg:px-10 lg:py-20'>
      <div className='mx-auto grid w-full max-w-[1280px] grid-cols-1 gap-12 lg:grid-cols-[1fr_360px]'>

        {/* ─── LEFT: MAIN ARTICLE CONTENT ─────────────────────────── */}
        <article className='flex flex-col gap-10'>

          {/* Intro Text */}
          <p className='text-sm leading-7 text-white/60 lg:text-base'>
            {blog.intro}
          </p>

          {/* Why Maintenance Matters */}
          {section.heading && (
          <div>
            <h2 className='mb-4 text-xl font-black text-white lg:text-2xl'>{section.heading}</h2>
            <p className='mb-6 text-sm leading-7 text-white/60'>{section.body}</p>
            <div className='grid grid-cols-1 gap-3 sm:grid-cols-2'>
              {(section.benefits || []).map((item) => (
                <div key={item} className='flex items-center gap-3 rounded-[8px] border border-white/5 bg-[#131313] px-5 py-4'>
                  <span className='flex size-5 shrink-0 items-center justify-center rounded-full bg-primary text-[10px] font-black text-white'>✕</span>
                  <span className='text-sm font-semibold text-white/80'>{item}</span>
                </div>
              ))}
            </div>
          </div>
          )}

          {/* Essential Cleaning Equipment */}
          {blog.equipment?.length > 0 && (
          <div>
            <h2 className='mb-5 text-xl font-black text-white lg:text-2xl'>Essential Cleaning Equipment</h2>
            <ul className='flex flex-col gap-3'>
              {blog.equipment.map((item) => (
                <li key={item} className='flex items-center gap-4 text-sm text-white/70'>
                  <span className='text-primary'>🔧</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
          )}

          {/* Step-by-Step Process */}
          {blog.steps?.length > 0 && (
          <div>
            <h2 className='mb-6 text-xl font-black text-white lg:text-2xl'>Step-By-Step Maintenance Process</h2>
            <div className='flex flex-col gap-4'>
              {blog.steps.map((step, i) => (
                <div key={i} className='flex items-start gap-5 rounded-[10px] border border-white/5 bg-[#131313] p-5'>
                  <span className='flex size-9 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-black text-white'>
                    {i + 1}
                  </span>
                  <div>
                    <p className='mb-1 text-[13px] font-black uppercase tracking-wider text-white'>{step.title}</p>
                    <p className='text-sm text-white/55'>{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          )}

          <ProTips quote={blog.quote} />

        </article>

        {/* ─── RIGHT: SIDEBAR ─────────────────────────────────────── */}
        <aside className='flex flex-col gap-8'>

          {/* Search */}
          <div>
            <h3 className='mb-4 text-base font-black uppercase tracking-wider text-white'>Search</h3>
            <div className='relative'>
              <input
                type='text'
                placeholder='Search Your Keyword...'
                className='h-[50px] w-full rounded-[8px] border border-white/10 bg-[#131313] pl-5 pr-12 text-sm text-white outline-none transition placeholder:text-white/30 focus:border-primary'
              />
              <button type='button' className='absolute right-4 top-1/2 -translate-y-1/2 text-white/40 transition hover:text-primary'>
                <Search size={18} />
              </button>
            </div>
          </div>

          {/* Recent Posts */}
          <div>
            <h3 className='mb-5 text-base font-black uppercase tracking-wider text-white'>Recent Post</h3>
            <div className='flex flex-col gap-5'>
              {recentPosts.map((post, i) => (
                <div key={i} className='flex items-center gap-4 cursor-pointer group'>
                  <img
                    src={post.image}
                    alt={post.title}
                    className='size-14 shrink-0 rounded-[6px] object-cover'
                  />
                  <div>
                    <p className='text-[13px] font-bold leading-snug text-white transition group-hover:text-primary line-clamp-2'>
                      {post.title}
                    </p>
                    <p className='mt-1 text-[11px] font-semibold uppercase tracking-wider text-white/40'>
                      {post.date}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Business Info Card */}
          <div className='overflow-hidden rounded-[12px] border border-white/5'>
            <img
              src='https://images.unsplash.com/photo-1528702748617-c64d49f918af?q=80&w=800&auto=format&fit=crop'
              alt='Team in the field'
              className='h-[180px] w-full object-cover'
            />
            <div className='bg-[#131313] p-5'>
              <div className='flex items-start gap-3 border-b border-white/10 pb-5'>
                <span className='mt-0.5 flex size-9 shrink-0 items-center justify-center rounded-full bg-primary text-white'>
                  <Clock size={16} />
                </span>
                <div>
                  <p className='text-sm font-bold text-white'>Opening hours</p>
                  <p className='mt-1 text-xs text-white/50'>Monday – Friday (8am to 5pm)</p>
                  <p className='text-xs text-white/50'>Sunday – Closed</p>
                </div>
              </div>
              <div className='mt-5 flex cursor-pointer items-center gap-3 rounded-[8px] bg-primary px-5 py-3.5 transition hover:opacity-90'>
                <Phone size={18} className='text-white' />
                <span className='text-sm font-black tracking-wider text-white'>+123 456 789</span>
              </div>
            </div>
          </div>

        </aside>
      </div>
    </section>
  )
}

export default BlogMoreDetails
