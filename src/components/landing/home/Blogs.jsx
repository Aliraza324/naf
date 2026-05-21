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
      style={styles.section}
    >
      {/* Header Row */}
      <motion.div variants={fadeInUp} style={styles.header}>
        <h2 style={styles.sectionTitle}>LATEST BLOG</h2>
        <div style={styles.navButtons}>
          <button
            style={styles.navBtn}
            onClick={() => slide('left')}
            aria-label="Previous"
          >
            ‹
          </button>
          <button
            style={styles.navBtn}
            onClick={() => slide('right')}
            aria-label="Next"
          >
            ›
          </button>
        </div>
      </motion.div>

      {/* Slider viewport */}
      <div style={styles.viewport}>
        <motion.div 
          variants={staggerContainer(0.08, 0.05)}
          style={{
            ...styles.track,
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
  const [hovered, setHovered] = useState(false);

  return (
    <motion.article
      variants={fadeInUp}
      style={styles.card}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Image */}
      <div style={styles.imageWrapper}>
        <img
          src={blog.image}
          alt={blog.title}
          style={{
            ...styles.image,
            transform: hovered ? 'scale(1.07)' : 'scale(1)',
          }}
        />
        <div style={{ ...styles.imageOverlay, opacity: hovered ? 0.38 : 0 }} />
        <span style={styles.badge}>{blog.category}</span>
      </div>

      {/* Text */}
      <div style={styles.content}>
        <h3 style={styles.title}>{blog.title}</h3>
        <p style={styles.excerpt}>{blog.excerpt}</p>
        <a
          href={blog.link}
          style={{
            ...styles.readMore,
            color: hovered ? '#ff2527' : '#e60103',
            gap: hovered ? '10px' : '6px',
          }}
        >
          READ MORE&nbsp;&nbsp;→
        </a>
      </div>
    </motion.article>
  );
};

const styles = {
  section: {
    backgroundColor: '#0a0a08',
    padding: 'clamp(42px, 7vw, 60px) clamp(1rem, 5vw, 5rem)',
    fontFamily: 'Inter, ui-sans-serif, system-ui, sans-serif',
    overflow: 'hidden',
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: '16px',
    flexWrap: 'wrap',
    marginBottom: '32px',
  },
  sectionTitle: {
    fontFamily: 'Oswald, Impact, "Arial Narrow Bold", sans-serif',
    fontSize: 'clamp(1.4rem, 2.5vw, 1.75rem)',
    fontWeight: 700,
    color: '#ffffff',
    margin: 0,
    letterSpacing: '0.04em',
    textTransform: 'uppercase',
  },
  navButtons: {
    display: 'flex',
    gap: '8px',
  },
  navBtn: {
    width: '36px',
    height: '36px',
    borderRadius: '50%',
    border: '1px solid rgba(255,255,255,0.2)',
    background: 'rgba(255,255,255,0.05)',
    color: '#ffffff',
    fontSize: '22px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    lineHeight: 1,
    transition: 'border-color 0.2s, background 0.2s',
  },
  viewport: {
    overflow: 'hidden',
    width: '100%',
  },
  track: {
    display: 'grid',
    gap: 'clamp(16px, 3vw, 20px)',
    transition: 'opacity 0.35s ease, transform 0.35s ease',
    willChange: 'opacity, transform',
  },
  card: {
    cursor: 'pointer',
    minWidth: 0,
  },
  imageWrapper: {
    position: 'relative',
    width: '100%',
    aspectRatio: '4/3',
    overflow: 'hidden',
    borderRadius: '6px',
    backgroundColor: '#111',
  },
  image: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    display: 'block',
    transition: 'transform 0.4s ease',
  },
  imageOverlay: {
    position: 'absolute',
    inset: 0,
    backgroundColor: '#000',
    transition: 'opacity 0.3s ease',
    pointerEvents: 'none',
  },
  badge: {
    position: 'absolute',
    top: '10px',
    left: '10px',
    backgroundColor: 'rgba(0,0,0,0.65)',
    color: '#ffffff',
    fontSize: '9px',
    fontWeight: 700,
    letterSpacing: '0.12em',
    textTransform: 'uppercase',
    padding: '4px 8px',
    borderRadius: '3px',
    backdropFilter: 'blur(4px)',
  },
  content: {
    padding: '16px 0 0',
  },
  title: {
    fontFamily: 'Oswald, Impact, "Arial Narrow Bold", sans-serif',
    fontSize: 'clamp(1rem, 5vw, 1.15rem)',
    fontWeight: 700,
    color: '#ffffff',
    margin: '0 0 8px',
    lineHeight: 1.3,
    letterSpacing: '0.01em',
    textTransform: 'uppercase',
  },
  excerpt: {
    fontSize: 'clamp(0.82rem, 4vw, 0.9rem)',
    color: '#a7a28b',
    lineHeight: 1.6,
    margin: '0 0 12px',
  },
  readMore: {
    fontSize: '0.72rem',
    fontWeight: 700,
    letterSpacing: '0.1em',
    textTransform: 'uppercase',
    textDecoration: 'none',
    display: 'inline-flex',
    alignItems: 'center',
    transition: 'color 0.2s, gap 0.2s',
  },
};

export default Blogs;
