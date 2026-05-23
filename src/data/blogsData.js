// Mock blog data – shared across Blog listing and BlogsDetails pages

export const blogsData = [
  {
    id: 1,
    slug: 'mastering-your-marker-pro-maintenance-guide',
    category: 'MAINTENANCE',
    date: '4 MARCH, 2022',
    image: '/src/assets/images/blogone.png',
    title: 'MASTERING YOUR MARKER: PRO MAINTENANCE GUIDE',
    excerpt:
      'Ensure peak performance in every skirmish with our comprehensive internal maintenance walkthrough.',
    intro:
      'Proper marker maintenance is essential for achieving reliable performance, accuracy, and durability during competitive paintball matches and field operations.',
    sections: [
      {
        heading: 'Why Maintenance Matters',
        body: 'Routine cleaning prevents internal wear, improves firing consistency, and extends the lifespan of your tactical equipment.',
        benefits: [
          'Better air efficiency',
          'Smoother firing performance',
          'Reduced jamming risks',
          'Increased marker lifespan',
        ],
      },
    ],
    equipment: ['Barrel swabs', 'Lubricants', 'Microfiber cloths', 'O-ring kits', 'Cleaning rods'],
    steps: [
      { title: 'Step 1', desc: 'Unload and degas your marker safely.' },
      { title: 'Step 2', desc: 'Disassemble core components carefully.' },
      { title: 'Step 3', desc: 'Clean internal residue and paint buildup.' },
      { title: 'Step 4', desc: 'Lubricate moving parts using approved oil.' },
    ],
    quote: 'Consistent maintenance separates reliable gear from unreliable performance.',
    proTips: [
      'Never over-lubricate components',
      'Store markers in dry environments',
      'Inspect O-rings regularly',
      'Clean after every competitive session',
    ],
  },
  {
    id: 2,
    slug: 'stealth-ops-the-art-of-the-flank',
    category: 'STRATEGY',
    date: '10 MARCH, 2022',
    image: '/src/assets/images/blogtwo.png',
    title: 'STEALTH OPS: THE ART OF THE FLANK',
    excerpt:
      'Learn the movement techniques used by elite bushballers to disappear on the field.',
    intro:
      'Flanking is one of the most effective strategies in competitive paintball. Done correctly, it can break open even the most fortified defensive setups.',
    sections: [
      {
        heading: 'Reading the Field',
        body: 'Before you flank, study your opponent\'s positioning and identify lanes of movement that are covered by teammates.',
        benefits: [
          'Identify weak flanks early',
          'Use terrain as cover',
          'Coordinate with teammates',
          'Time your movement precisely',
        ],
      },
    ],
    equipment: ['Low-profile mask', 'Dark camo pack', 'Lightweight marker', 'Soft-shell pods', 'Knee pads'],
    steps: [
      { title: 'Step 1', desc: 'Identify the flank route before the point starts.' },
      { title: 'Step 2', desc: 'Communicate with your team to create a distraction.' },
      { title: 'Step 3', desc: 'Move fast and low through your chosen lane.' },
      { title: 'Step 4', desc: 'Engage from the side to collapse the opponent\'s line.' },
    ],
    quote: 'The team that flanks first wins the point — speed and stealth are your weapons.',
    proTips: [
      'Always communicate your flank route before moving',
      'Stay low and use every piece of cover available',
      'Time your move when opponents are distracted',
      'Confirm your teammate is suppressing before you push',
    ],
  },
  {
    id: 3,
    slug: 'the-future-of-paint-our-eco-commitment',
    category: 'SUSTAINABILITY',
    date: '18 MARCH, 2022',
    image: '/src/assets/images/blogthree.png',
    title: 'THE FUTURE OF PAINT: OUR ECO COMMITMENT',
    excerpt:
      "How we're leading the charge in 100% biodegradable, non-toxic field paint.",
    intro:
      'At NAF Supply, we believe that competitive paintball and environmental responsibility can coexist. Our new paint line is built on that belief.',
    sections: [
      {
        heading: 'Why Eco-Paint Matters',
        body: 'Traditional paintballs contain chemicals that can harm soil and water. Our biodegradable formula breaks down safely within 48 hours.',
        benefits: [
          '100% biodegradable shell',
          'Non-toxic fill formula',
          'Vibrant color retention',
          'Field-approved worldwide',
        ],
      },
    ],
    equipment: ['Eco paintballs', 'Reusable pod harness', 'Biodegradable barrel bag', 'Water-based cleaner'],
    steps: [
      { title: 'Step 1', desc: 'Store eco-paint in a cool, dry location.' },
      { title: 'Step 2', desc: 'Use within 6 months of manufacture date.' },
      { title: 'Step 3', desc: 'Clean up field residue with plain water.' },
      { title: 'Step 4', desc: 'Dispose of empties in compost-compatible bins.' },
    ],
    quote: 'Playing hard and playing green are not opposites — they are the future of this sport.',
    proTips: [
      'Always check the manufacture date before use',
      'Store paint away from direct sunlight',
      'Use plain water to rinse all residue from gear',
      'Advocate for eco-paint at your local field',
    ],
  },
  {
    id: 4,
    slug: '2024-world-cup-preview-gear-trends',
    category: 'PRO NEWS',
    date: '25 MARCH, 2022',
    image: '/src/assets/images/blogfour.png',
    title: '2024 WORLD CUP PREVIEW: GEAR TRENDS',
    excerpt:
      "A first look at the equipment professional teams are bringing to this year's cup.",
    intro:
      'The 2024 World Cup is weeks away, and teams are finalizing their loadouts. Here\'s a breakdown of the hottest gear choices this season.',
    sections: [
      {
        heading: 'What the Pros Are Running',
        body: 'This year, efficiency and lightweight builds dominate. Teams are favoring electronic triggers with low power consumption.',
        benefits: [
          'Ultra-light carbon fiber bodies',
          'Electronic OLED trigger boards',
          'Low-pressure regulators',
          'Two-piece aluminum barrels',
        ],
      },
    ],
    equipment: ['Planet Eclipse Gtek 180R', 'Ninja SL2 tank', 'HK Army HSTL harness', 'Dye i5 mask'],
    steps: [
      { title: 'Step 1', desc: 'Register and confirm team roster 30 days early.' },
      { title: 'Step 2', desc: 'Test and chrono all markers to 280 fps.' },
      { title: 'Step 3', desc: 'Pack backup parts and O-ring kits.' },
      { title: 'Step 4', desc: 'Run a full scrimmage the week before.' },
    ],
    quote: 'At the World Cup, your gear does not fail you — your preparation does.',
    proTips: [
      'Always bring a backup marker to tournaments',
      'Chrono every marker the morning of the event',
      'Pack double the paint you think you need',
      'Review layouts 2 weeks before the event',
    ],
  },
  {
    id: 5,
    slug: 'bunker-control-dominating-the-field',
    category: 'TACTICS',
    date: '1 APRIL, 2022',
    image: '/src/assets/images/blogtwo.png',
    title: 'BUNKER CONTROL: DOMINATING THE FIELD',
    excerpt:
      'Master the art of bunker-to-bunker movement and control choke points like a pro.',
    intro:
      'Controlling key bunkers on any layout gives your team the lanes, angles, and positional advantage needed to win games consistently.',
    sections: [
      {
        heading: 'Bunker Priority',
        body: 'Not all bunkers are equal. Learn to identify high-value positions and communicate their capture as a team objective.',
        benefits: [
          'Control center snake first',
          'Mirror opponent moves',
          'Lock down 50-yard lines',
          'Never leave your flank open',
        ],
      },
    ],
    equipment: ['Lightweight marker', 'Extended barrel', 'Pod pack with 4+ pods', 'Knee & elbow pads'],
    steps: [
      { title: 'Step 1', desc: 'Identify the 2-3 key bunkers from the layout map.' },
      { title: 'Step 2', desc: 'Assign roles: snake, center, doritos.' },
      { title: 'Step 3', desc: 'Sprint first 10 yards at the horn.' },
      { title: 'Step 4', desc: 'Communicate positions constantly.' },
    ],
    quote: 'Whoever controls the 50s controls the game — get there first or lose the lane.',
    proTips: [
      'Study the layout before every point',
      'Communicate key bunker positions to your team',
      'Never leave a high-value bunker uncontested',
      'Rotate when the opponent mirrors your position',
    ],
  },
  {
    id: 6,
    slug: 'top-5-markers-of-2024-full-breakdown',
    category: 'GEAR REVIEW',
    date: '8 APRIL, 2022',
    image: '/src/assets/images/blogone.png',
    title: 'TOP 5 MARKERS OF 2024: FULL BREAKDOWN',
    excerpt:
      'We tested the industry\'s best markers so you don\'t have to — here\'s the verdict.',
    intro:
      'After 3 months of field testing across multiple formats and conditions, we\'ve ranked the top 5 paintball markers of 2024.',
    sections: [
      {
        heading: 'What We Tested For',
        body: 'We evaluated each marker on accuracy, efficiency, ergonomics, noise level, and ease of maintenance.',
        benefits: [
          'Sub-280 fps consistency',
          'Under 3 oz trigger pull',
          'Under 6 oz body weight',
          'Tool-free disassembly',
        ],
      },
    ],
    equipment: ['Planet Eclipse Gtek 180R', 'DLX Luxe X', 'Empire Axe 2.0', 'Dye M3+', 'Shocker AMP'],
    steps: [
      { title: 'Step 1', desc: 'Chronograph at start of every session.' },
      { title: 'Step 2', desc: 'Oil bolt o-rings before and after play.' },
      { title: 'Step 3', desc: 'Break barrel down for transport.' },
      { title: 'Step 4', desc: 'Full teardown and clean after every event.' },
    ],
    quote: 'The best marker is the one you know inside out — understand your tool and it will never let you down.',
    proTips: [
      'Always chrono before competitive play',
      'Keep a spare bolt and solenoid in your bag',
      'Never loan your marker without checking it first',
      'Read the manual for your specific board settings',
    ],
  },
  {
    id: 7,
    slug: 'off-season-drills-for-paintball-athletes',
    category: 'TRAINING',
    date: '15 APRIL, 2022',
    image: '/src/assets/images/blogthree.png',
    title: 'OFF-SEASON DRILLS FOR PAINTBALL ATHLETES',
    excerpt:
      'Stay sharp between events with these proven drills used by national-level teams.',
    intro:
      'The off-season is when elite players separate themselves. These drills will keep your reflexes, conditioning, and game sense sharp.',
    sections: [
      {
        heading: 'Core Drill Categories',
        body: 'We break down drills into three pillars: physical conditioning, marker handling, and game-scenario simulation.',
        benefits: [
          'Lateral shuffle intervals',
          'Snap shooting repetitions',
          'Scenario role-playing',
          'Communication exercises',
        ],
      },
    ],
    equipment: ['Agility ladder', 'Cones', 'Dummy markers', 'Stopwatch', 'Resistance bands'],
    steps: [
      { title: 'Step 1', desc: 'Run 3x weekly cardio with lateral movement focus.' },
      { title: 'Step 2', desc: 'Practice snap-shooting on a wall drill 15 min/day.' },
      { title: 'Step 3', desc: 'Set up scenario maps in your backyard.' },
      { title: 'Step 4', desc: 'Film yourself and review footage weekly.' },
    ],
    quote: 'Champions are made in the off-season — what you do when no one is watching defines you on the field.',
    proTips: [
      'Film your drills and review weekly',
      'Train with teammates at least once a week',
      'Focus on weak sides during snap-shooting drills',
      'Maintain a training log to track progress',
    ],
  },
  {
    id: 8,
    slug: 'meet-the-team-naf-athlete-spotlight',
    category: 'COMMUNITY',
    date: '22 APRIL, 2022',
    image: '/src/assets/images/blogfour.png',
    title: 'MEET THE TEAM: NAF ATHLETE SPOTLIGHT',
    excerpt:
      'Get to know the faces behind the masks — our sponsored athletes share their stories.',
    intro:
      'Behind every sponsored athlete is a story of dedication, grind, and passion for the sport. This month, we spotlight four of our team members.',
    sections: [
      {
        heading: 'About Our Athlete Program',
        body: 'We support athletes at the divisional and pro level with gear, travel assistance, and coaching connections.',
        benefits: [
          'Full gear sponsorship',
          'Event travel support',
          'Social media growth',
          'Access to pro coaching',
        ],
      },
    ],
    equipment: ['Custom branded jersey', 'Sponsored marker', 'Branded pod pack', 'Team mask'],
    steps: [
      { title: 'Step 1', desc: 'Apply through our athlete portal.' },
      { title: 'Step 2', desc: 'Submit highlight reel and event history.' },
      { title: 'Step 3', desc: 'Interview with NAF team captain.' },
      { title: 'Step 4', desc: 'Sign agreement and receive gear package.' },
    ],
    quote: 'Sponsorship is not given — it is earned through dedication, community, and results.',
    proTips: [
      'Build your social media presence before applying',
      'Document all events and finishes you attend',
      'Be a positive ambassador on and off the field',
      'Engage with the NAF community before reaching out',
    ],
  },
]
