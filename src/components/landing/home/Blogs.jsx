import React, { useEffect, useState } from 'react';
import blogone from '../../../assets/images/blogone.png';
import blogtwo from '../../../assets/images/blogtwo.png';
import blogthree from '../../../assets/images/blogthree.png';
import blogfour from '../../../assets/images/blogfour.png';
import { motion } from 'framer-motion';
import { fadeInUp, staggerContainer } from '../../../animations/animations';

const blogs = [
  {
    id: 1,
    category: 'MAINTENANCE',
    image: blogone,
    title: 'MASTERING YOUR MARKER: PRO MAINTENANCE GUIDE',
    excerpt:
      'Ensure peak performance in every skirmish with our comprehensive internal maintenance walkthrough.',
    link: '#',
  },
  {
    id: 2,
    category: 'STRATEGY',
    image: blogtwo,
    title: 'STEALTH OPS: THE ART OF THE FLANK',
    excerpt:
      'Learn the movement techniques used by elite bushballers to disappear on the field.',
    link: '#',
  },
  {
    id: 3,
    category: 'SUSTAINABILITY',
    image: blogthree,
    title: 'THE FUTURE OF PAINT: OUR ECO COMMITMENT',
    excerpt:
      "How we're leading the charge in 100% biodegradable, non-toxic field paint.",
    link: '#',
  },
  {
    id: 4,
    category: 'PRO NEWS',
    image: blogfour,
    title: '2024 WORLD CUP PREVIEW: GEAR TRENDS',
    excerpt:
      "A first look at the equipment professional teams are bringing to this year's cup.",
    link: '#',
  },
  {
    id: 5,
    category: 'TACTICS',
    image: blogtwo,
    title: 'BUNKER CONTROL: DOMINATING THE FIELD',
    excerpt:
      'Master the art of bunker-to-bunker movement and control choke points like a pro.',
    link: '#',
  },
  {
    id: 6,
    category: 'GEAR REVIEW',
    image: blogone,
    title: 'TOP 5 MARKERS OF 2024: FULL BREAKDOWN',
    excerpt:
      'We tested the industry\'s best markers so you don\'t have to — here\'s the verdict.',
    link: '#',
  },
  {
    id: 7,
    category: 'TRAINING',
    image: blogthree,
    title: 'OFF-SEASON DRILLS FOR PAINTBALL ATHLETES',
    excerpt:
      'Stay sharp between events with these proven drills used by national-level teams.',
    link: '#',
  },
  {
    id: 8,
    category: 'COMMUNITY',
    image: blogfour,
    title: 'MEET THE TEAM: NAF ATHLETE SPOTLIGHT',
    excerpt:
      'Get to know the faces behind the masks — our sponsored athletes share their stories.',
    link: '#',
  },
];

const getCardsPerView = () => {
  if (typeof window === 'undefined') return 4;
  if (window.innerWidth < 640) return 1;
  if (window.innerWidth < 1024) return 2;
  return 4;
};

const Blogs = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [direction, setDirection] = useState(null); // 'left' | 'right'
  const [cardsPerView, setCardsPerView] = useState(getCardsPerView);

  useEffect(() => {
    const handleResize = () => {
      setCardsPerView(getCardsPerView());
      setCurrentIndex(0);
    };

    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const totalSlides = Math.ceil(blogs.length / cardsPerView);

  const slide = (dir) => {
    if (isAnimating) return;
    setDirection(dir);
    setIsAnimating(true);

    setTimeout(() => {
      setCurrentIndex((prev) => {
        if (dir === 'right') {
          return prev + 1 >= totalSlides ? 0 : prev + 1;
        } else {
          return prev - 1 < 0 ? totalSlides - 1 : prev - 1;
        }
      });
      setIsAnimating(false);
    }, 350);
  };

  const visibleBlogs = blogs.slice(
    currentIndex * cardsPerView,
    currentIndex * cardsPerView + cardsPerView
  );

  const slideStyle = isAnimating
    ? {
        opacity: 0,
        transform: direction === 'right' ? 'translateX(-40px)' : 'translateX(40px)',
      }
    : {
        opacity: 1,
        transform: 'translateX(0)',
      };

  return (
    <motion.section 
      initial="initial"
      whileInView="animate"
      viewport={{ once: true, amount: 0.15 }}
      className="bg-page-soft py-[clamp(42px,7vw,60px)] px-[clamp(1rem,5vw,5rem)] font-body overflow-hidden"
    >
      {/* Header Row */}
      <motion.div variants={fadeInUp} className="flex flex-wrap items-center justify-between gap-4 mb-8">
        <h2 className="font-display text-[clamp(1.4rem,2.5vw,1.75rem)] font-bold text-white m-0 tracking-[0.04em] uppercase">
          LATEST BLOG
        </h2>
        <div className="flex gap-2">
          <button
            className="w-9 h-9 rounded-full border border-white/20 bg-white/5 text-white text-[22px] flex items-center justify-center cursor-pointer leading-none transition-colors hover:border-white/40 hover:bg-white/10"
            onClick={() => slide('left')}
            aria-label="Previous"
          >
            ‹
          </button>
          <button
            className="w-9 h-9 rounded-full border border-white/20 bg-white/5 text-white text-[22px] flex items-center justify-center cursor-pointer leading-none transition-colors hover:border-white/40 hover:bg-white/10"
            onClick={() => slide('right')}
            aria-label="Next"
          >
            ›
          </button>
        </div>
      </motion.div>

      {/* Slider viewport */}
      <div className="overflow-hidden w-full">
        <motion.div 
          variants={staggerContainer(0.08, 0.05)}
          className="grid gap-[clamp(16px,3vw,20px)] transition-all duration-[350ms] ease-in-out will-change-[opacity,transform]"
          style={{
            gridTemplateColumns: `repeat(${cardsPerView}, minmax(0, 1fr))`,
            ...slideStyle,
          }}
        >
          {visibleBlogs.map((blog) => (
            <BlogCard key={blog.id} blog={blog} />
          ))}
        </motion.div>
      </div>
    </motion.section>
  );
};

const BlogCard = ({ blog }) => {
  return (
    <motion.article
      variants={fadeInUp}
      className="group cursor-pointer min-w-0"
    >
      {/* Image */}
      <div className="relative w-full aspect-[4/3] overflow-hidden rounded-[6px] bg-[#111]">
        <img
          src={blog.image}
          alt={blog.title}
          className="w-full h-full object-cover block transition-transform duration-[400ms] ease-in-out group-hover:scale-[1.07]"
        />
        <div className="absolute inset-0 bg-black opacity-0 transition-opacity duration-300 pointer-events-none group-hover:opacity-[0.38]" />
        <span className="absolute top-2.5 left-2.5 bg-black/65 text-white text-[9px] font-bold tracking-[0.12em] uppercase px-2 py-1 rounded-[3px] backdrop-blur-[4px]">
          {blog.category}
        </span>
      </div>

      {/* Text */}
      <div className="pt-4">
        <h3 className="font-display text-[clamp(1rem,5vw,1.15rem)] font-bold text-white mb-2 leading-[1.3] tracking-[0.01em] uppercase">
          {blog.title}
        </h3>
        <p className="text-[clamp(0.82rem,4vw,0.9rem)] text-text-muted leading-[1.6] mb-3">
          {blog.excerpt}
        </p>
        <a
          href={blog.link}
          className="text-[0.72rem] font-bold tracking-[0.1em] uppercase no-underline inline-flex items-center transition-all duration-200 text-primary gap-1.5 group-hover:text-primary-hover group-hover:gap-2.5"
        >
          READ MORE&nbsp;&nbsp;→
        </a>
      </div>
    </motion.article>
  );
};

export default Blogs;
