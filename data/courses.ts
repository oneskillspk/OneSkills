import { Course } from '@/types/course';

export const INITIAL_COURSES: Course[] = [
  {
    id: 'course-web-dev',
    slug: 'full-stack-web-development',
    title: 'Full-Stack Modern Web Development Bootcamp',
    subtitle: 'Master React 19, Next.js, TypeScript, Tailwind CSS, REST APIs & deploy live client projects for high-paying remote jobs and freelancing.',
    category: 'Web Development',
    level: 'Beginner',
    badge: 'Most Popular',
    rating: 4.95,
    reviewsCount: 1680,
    studentsEnrolled: 4820,
    durationHours: 64,
    durationWeeks: '10 Weeks',
    pricePKR: 14999,
    originalPricePKR: 28000,
    priceUSD: 55,
    originalPriceUSD: 100,
    thumbnail: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1200&q=80',
    language: 'Urdu / Hindi + English Technical Terms',
    certificateIncluded: true,
    batchStartDate: 'Starts November 10, 2026',
    featuredOutcome: 'Land remote frontend roles or earn $500–$2,000/mo on Upwork building modern websites for international clients.',
    instructor: {
      name: 'Engr. Hammad Tariq',
      title: 'Senior Full-Stack Architect & Top Rated Plus Freelancer',
      company: 'Ex-Systems Ltd & OneSkills Lead',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=240&q=80',
      bio: 'Over 8 years in commercial software development with $250k+ earned on Upwork. Mentored over 3,000 Pakistani engineers into international tech careers.',
      experience: '8+ Years Experience',
      rating: 4.98,
      studentsCount: 9400,
    },
    learningOutcomes: [
      'Build production-ready, fully responsive web apps with Next.js 15 and React 19',
      'Master Tailwind CSS v4, component modularity, and modern UI engineering',
      'Integrate RESTful backends, database CRUD, and user authentication flows',
      'Deploy full-stack projects to Vercel, Supabase, and custom VPS servers',
      'Write winning client proposals specifically for React/Next.js gigs on Upwork',
      'Complete 4 real portfolio capstones ready for client presentations'
    ],
    prerequisites: [
      'Basic computer literacy and enthusiasm to practice coding daily',
      'No previous programming background required (we start from scratch)'
    ],
    modules: [
      {
        id: 'mod-1',
        title: 'Module 1: Foundations of the Modern Web & Git Workflow',
        lessons: [
          {
            id: 'les-1-1',
            title: 'Welcome & High-Income Developer Mindset',
            duration: '14 min',
            videoDurationSeconds: 840,
            type: 'video',
            description: 'Orientation to modern web development standards, roadmap, and how our hands-on project reviews work.',
            summaryPoints: [
              'Overview of the web ecosystem in 2026',
              'Setting up VS Code, extensions, and Chrome DevTools',
              'Freelance demand analysis for Frontend & Full-Stack skills'
            ],
            resources: [
              { title: 'Full Curriculum Roadmap PDF', type: 'pdf', size: '2.4 MB' },
              { title: 'VS Code Setup Extension Pack', type: 'link' }
            ]
          },
          {
            id: 'les-1-2',
            title: 'HTML5 Semantic Architecture & Clean Code Standards',
            duration: '26 min',
            videoDurationSeconds: 1560,
            type: 'video',
            description: 'Building accessible, SEO-compliant semantic web markup with forms, micro-data, and media tags.',
            summaryPoints: [
              'Semantic vs non-semantic tags',
              'Accessibility (a11y) basics and landmarks',
              'Form validation patterns and clean structure'
            ],
            quiz: {
              question: 'Which HTML5 element represents the primary navigation area of a website?',
              options: ['<header>', '<nav>', '<section>', '<aside>'],
              correctIndex: 1,
              explanation: '<nav> is the dedicated semantic HTML tag intended for navigational link blocks.'
            }
          },
          {
            id: 'les-1-3',
            title: 'Git Version Control & Professional GitHub Workflow',
            duration: '32 min',
            videoDurationSeconds: 1920,
            type: 'video',
            description: 'Branching strategies, commit etiquette, pushing repositories, and creating professional portfolio READMEs.',
            resources: [
              { title: 'Git Cheatsheet for Developers', type: 'pdf', size: '1.1 MB' }
            ]
          }
        ]
      },
      {
        id: 'mod-2',
        title: 'Module 2: Advanced Tailwind CSS & Responsive Layouts',
        lessons: [
          {
            id: 'les-2-1',
            title: 'Flexbox & CSS Grid Mastery for Pixel-Perfect Layouts',
            duration: '38 min',
            videoDurationSeconds: 2280,
            type: 'video',
            description: 'Hands-on layout challenges: mobile-first responsive grids, alignment tricks, and fluid spacing.',
            summaryPoints: [
              'Flexbox direction, justification, and alignment',
              'CSS Grid auto-fit and minmax patterns',
              'Tailwind breakpoints and responsive utility classes'
            ]
          },
          {
            id: 'les-2-2',
            title: 'Building a SaaS Hero Section with Micro-Interactions',
            duration: '45 min',
            videoDurationSeconds: 2700,
            type: 'assignment',
            description: 'Hands-on project: Code a landing page hero with animated gradients, glassmorphism badges, and mobile hamburger drawer.',
            resources: [
              { title: 'Figma Design File & Asset Bundle', type: 'figma', size: '18 MB' },
              { title: 'Starter Code Repository', type: 'code' }
            ],
            quiz: {
              question: 'In Tailwind CSS, which class sets a flexible container that wraps items when space runs out?',
              options: ['flex-nowrap', 'flex-wrap', 'flex-col', 'grid-flow-row'],
              correctIndex: 1,
              explanation: 'The `flex-wrap` utility allows flex items to wrap across multiple rows or lines.'
            }
          }
        ]
      },
      {
        id: 'mod-3',
        title: 'Module 3: JavaScript ES6+ & TypeScript Essentials',
        lessons: [
          {
            id: 'les-3-1',
            title: 'Modern JavaScript: Closures, Promises & Async/Await',
            duration: '42 min',
            videoDurationSeconds: 2520,
            type: 'video',
            description: 'Deep dive into asynchronous JavaScript, fetching remote APIs, error handling, and event loop mechanics.'
          },
          {
            id: 'les-3-2',
            title: 'TypeScript for Component Safety and Clean Code',
            duration: '35 min',
            videoDurationSeconds: 2100,
            type: 'video',
            description: 'Types, Interfaces, Generics, and typing props in React applications.'
          }
        ]
      },
      {
        id: 'mod-4',
        title: 'Module 4: React 19 & Next.js App Router Full-Stack Capstone',
        lessons: [
          {
            id: 'les-4-1',
            title: 'Component State, Hooks & Server Actions',
            duration: '50 min',
            videoDurationSeconds: 3000,
            type: 'video',
            description: 'Structuring clean reusable components, optimistic UI updates, and Next.js server actions.'
          },
          {
            id: 'les-4-2',
            title: 'Capstone Project: Full E-Commerce Shop & Payment Integration',
            duration: '65 min',
            videoDurationSeconds: 3900,
            type: 'video',
            description: 'Building an entire multi-page application with cart state, filterable catalog, and checkout flow.',
            resources: [
              { title: 'Complete Project Source Code', type: 'zip', size: '14 MB' }
            ]
          }
        ]
      }
    ],
    reviews: [
      {
        id: 'rev-1',
        studentName: 'Zubair Ahmed',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&q=80',
        rating: 5,
        date: '2 weeks ago',
        city: 'Lahore',
        comment: 'Hammad sir explained Next.js App Router so clearly. I landed my first $800 frontend project on Upwork within 3 weeks of completing Module 3!',
        achievement: 'Earned $800 on Upwork'
      },
      {
        id: 'rev-2',
        studentName: 'Ayesha Noor',
        avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=120&q=80',
        rating: 5,
        date: '1 month ago',
        city: 'Islamabad',
        comment: 'The focus on practical portfolio building is what separates OneSkills from regular YouTube tutorials. Every assignment gets reviewed by mentors.',
        achievement: 'Hired as Junior React Dev'
      }
    ]
  },
  {
    id: 'course-freelancing',
    slug: 'freelancing-upwork-fiverr-mastery',
    title: 'Freelancing & Client Acquisition Mastery: Upwork & Fiverr Pro',
    subtitle: 'The step-by-step Pakistani freelancer blueprint to craft winning profiles, write high-converting proposals, and secure recurring international clients.',
    category: 'Freelancing & Upwork',
    level: 'All Levels',
    badge: 'High Earning Potential',
    rating: 4.98,
    reviewsCount: 2150,
    studentsEnrolled: 6400,
    durationHours: 32,
    durationWeeks: '6 Weeks',
    pricePKR: 11999,
    originalPricePKR: 22000,
    priceUSD: 42,
    originalPriceUSD: 80,
    thumbnail: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=1200&q=80',
    language: 'Urdu / Hindi + English Business Terms',
    certificateIncluded: true,
    batchStartDate: 'Starts November 12, 2026',
    featuredOutcome: 'Reach Top-Rated status on Upwork, price your services at $30–$75/hr, and avoid common Pakistani payment and verification pitfalls.',
    instructor: {
      name: 'Usman Ali Sheikh',
      title: 'Top-Rated Plus Upwork Freelancer & Agency Founder',
      company: 'Digital Crest Agency & OneSkills Lead Mentor',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=240&q=80',
      bio: '$400k+ earned across Upwork & direct contracts. Has helped 5,000+ Pakistani freelancers navigate bidding, pricing, and client retention.',
      experience: '9+ Years Freelancing',
      rating: 4.99,
      studentsCount: 14200,
    },
    learningOutcomes: [
      'Create 100% optimized Upwork and Fiverr profiles that appear in top search results',
      'The "Reverse Engineering" proposal technique with 40%+ interview response rate',
      'Master video introductions, Loom client audits, and high-converting discovery calls',
      'Handle client objections, scope creep, and negotiate higher fixed-price milestones',
      'Set up Payoneer, Wise, and local bank transfers safely in Pakistan with zero tax delays',
      'Scale from solo freelancer to a boutique digital agency team'
    ],
    prerequisites: [
      'Any marketable digital skill (Web Dev, Graphic Design, Video Editing, SEO, etc.)',
      'Dedication to submit custom proposals and communicate professionally'
    ],
    modules: [
      {
        id: 'mod-fl-1',
        title: 'Module 1: The Freelance Market & Profile Architecture',
        lessons: [
          {
            id: 'les-fl-1-1',
            title: 'Understanding the International Client Psychology',
            duration: '22 min',
            videoDurationSeconds: 1320,
            type: 'video',
            description: 'Why US/UK/European clients hire Pakistani talent and what red flags immediately turn them off.',
            resources: [
              { title: 'Client Red Flags & Green Lights Checklist', type: 'pdf', size: '1.2 MB' }
            ]
          },
          {
            id: 'les-fl-1-2',
            title: 'Crafting an Irresistible Upwork Profile & Specialized Profiles',
            duration: '38 min',
            videoDurationSeconds: 2280,
            type: 'video',
            description: 'Headline copywriting, outcome-focused bio structure, portfolio tags, and verified work history.'
          }
        ]
      },
      {
        id: 'mod-fl-2',
        title: 'Module 2: The Art of Winning Proposals & First 50 Words',
        lessons: [
          {
            id: 'les-fl-2-1',
            title: 'The "Hook-Problem-Solution" Proposal Framework',
            duration: '40 min',
            videoDurationSeconds: 2400,
            type: 'video',
            description: 'Live teardowns of 10 real proposals that won $1,000+ contracts vs rejected generic copy-paste bids.',
            resources: [
              { title: '15 Proven Proposal Templates (Customizable)', type: 'pdf', size: '3.1 MB' }
            ],
            quiz: {
              question: 'What is the most effective approach for the first 2 lines of an Upwork proposal?',
              options: [
                'Introduce yourself, your degree, and your full years of experience',
                'Copy and paste your standard list of skills and certifications',
                'Address the client’s specific problem immediately with a tailored observation',
                'Ask the client for their Skype or WhatsApp right away'
              ],
              correctIndex: 2,
              explanation: 'Clients only see the first 2 preview lines in their dashboard. Hooking them with an immediate solution to their specific problem yields the highest open rate.'
            }
          },
          {
            id: 'les-fl-2-2',
            title: 'Using Loom Videos to 5x Your Response Rate',
            duration: '28 min',
            videoDurationSeconds: 1680,
            type: 'video',
            description: 'How to record a 90-second screen audit that stuns the prospective client before the interview.'
          }
        ]
      },
      {
        id: 'mod-fl-3',
        title: 'Module 3: Pricing, Negotiations & Long-Term Retainers',
        lessons: [
          {
            id: 'les-fl-3-1',
            title: 'Escaping Low Hourly Rates: Moving from $10/hr to $45+/hr',
            duration: '34 min',
            videoDurationSeconds: 2040,
            type: 'video',
            description: 'How to transition to value-based pricing and monthly retainers.'
          }
        ]
      }
    ],
    reviews: [
      {
        id: 'rev-fl-1',
        studentName: 'Bilal Khan',
        avatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=120&q=80',
        rating: 5,
        date: '3 weeks ago',
        city: 'Rawalpindi',
        comment: 'I was stuck on Upwork with 0 orders for 6 months. After applying Usman bhai’s proposal audit method, I closed 3 clients in 2 weeks!',
        achievement: '$2,400 earned in first month'
      }
    ]
  },
  {
    id: 'course-ui-ux',
    slug: 'ui-ux-design-figma-mastery',
    title: 'UI/UX & Product Design with Figma: Wireframe to Portfolio',
    subtitle: 'Design intuitive web and mobile applications, master design systems, auto-layout, interactive prototyping, and client handoffs.',
    category: 'Graphic & UI/UX Design',
    level: 'Beginner',
    badge: 'Creative Career',
    rating: 4.92,
    reviewsCount: 1240,
    studentsEnrolled: 3150,
    durationHours: 42,
    durationWeeks: '8 Weeks',
    pricePKR: 13500,
    originalPricePKR: 24000,
    priceUSD: 48,
    originalPriceUSD: 85,
    thumbnail: 'https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?auto=format&fit=crop&w=1200&q=80',
    language: 'Urdu / Hindi + English Design Terminology',
    certificateIncluded: true,
    batchStartDate: 'Starts November 15, 2026',
    featuredOutcome: 'Build an agency-grade Behance & Dribbble portfolio and qualify for UI/UX product design roles globally.',
    instructor: {
      name: 'Sara Farooq',
      title: 'Lead Product Designer & UX Consultant',
      company: 'Fintech UK & OneSkills Mentor',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=240&q=80',
      bio: 'Product Designer for European fintechs and SaaS startups with 7+ years creating user experiences that scale.',
      experience: '7+ Years Product Design',
      rating: 4.96,
      studentsCount: 6800,
    },
    learningOutcomes: [
      'Master Figma tools: Auto-layout v5, Component Variants, Variables, and Design Tokens',
      'Conduct user research, journey mapping, empathy maps, and competitive UX audits',
      'Design comprehensive mobile apps (iOS / Android) and responsive SaaS desktop dashboards',
      'Create interactive prototypes with smart animations for realistic user testing',
      'Publish high-converting case studies on Behance that attract international recruiters'
    ],
    prerequisites: [
      'A laptop/PC with Figma (free desktop or browser version)',
      'An eye for visual aesthetics and enthusiasm for problem solving'
    ],
    modules: [
      {
        id: 'mod-ux-1',
        title: 'Module 1: Design Fundamentals, Color Theory & Figma Setup',
        lessons: [
          {
            id: 'les-ux-1-1',
            title: 'Design Thinking & The 5 Stages of UX Research',
            duration: '28 min',
            videoDurationSeconds: 1680,
            type: 'video',
            description: 'Empathize, Define, Ideate, Prototype, and Test frameworks simplified.'
          },
          {
            id: 'les-ux-1-2',
            title: 'Figma Auto-Layout & Responsive Constraints Masterclass',
            duration: '42 min',
            videoDurationSeconds: 2520,
            type: 'video',
            description: 'Building dynamic cards, navigation bars, and data tables that adapt seamlessly.'
          }
        ]
      },
      {
        id: 'mod-ux-2',
        title: 'Module 2: Design Systems & Multi-Brand Tokens',
        lessons: [
          {
            id: 'les-ux-2-1',
            title: 'Creating Reusable Components & Nested Variants',
            duration: '36 min',
            videoDurationSeconds: 2160,
            type: 'video',
            description: 'How modern tech companies build scalable component libraries with light and dark mode.'
          }
        ]
      }
    ],
    reviews: [
      {
        id: 'rev-ux-1',
        studentName: 'Khadija Rizwan',
        avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=120&q=80',
        rating: 5,
        date: '2 weeks ago',
        city: 'Karachi',
        comment: 'Sara ma’am’s feedback on Behance case studies is pure gold. My case study received a featured badge on Behance!',
        achievement: 'Received Behance UX Feature'
      }
    ]
  },
  {
    id: 'course-digital-marketing',
    slug: 'digital-marketing-seo-meta-ads',
    title: 'Digital Marketing, SEO & Meta Ads Performance Mastery',
    subtitle: 'Run profitable Facebook, Instagram, Google Ads & master Technical SEO to scale e-commerce brands and local Pakistani businesses.',
    category: 'Digital Marketing & SEO',
    level: 'Beginner',
    badge: 'High Demand',
    rating: 4.89,
    reviewsCount: 980,
    studentsEnrolled: 2900,
    durationHours: 38,
    durationWeeks: '8 Weeks',
    pricePKR: 12500,
    originalPricePKR: 22000,
    priceUSD: 45,
    originalPriceUSD: 79,
    thumbnail: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80',
    language: 'Urdu / Hindi + English Marketing Terminology',
    certificateIncluded: true,
    batchStartDate: 'Starts November 18, 2026',
    featuredOutcome: 'Manage marketing budgets of $10,000+, achieve 3x–6x ROAS for client stores, and offer monthly SEO retainers.',
    instructor: {
      name: 'Farhan Siddiqui',
      title: 'Performance Marketing Director & Certified Google Partner',
      company: 'GrowthScale Agency & OneSkills Lead',
      avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=240&q=80',
      bio: 'Managed over $2.5 Million in ad spend across Meta, Google, and TikTok for US, UK, and Pakistani e-commerce retailers.',
      experience: '10+ Years Growth Marketing',
      rating: 4.93,
      studentsCount: 7500,
    },
    learningOutcomes: [
      'Set up Meta Business Suite, Pixel, CAPI (Conversions API), and custom audience targeting',
      'Design high-converting ad creatives, video hooks, and landing page funnels',
      'Conduct keyword research with Ahrefs/SEMrush and execute On-Page and Technical SEO',
      'Optimize Google Search and Shopping campaigns with high quality scores',
      'Read analytics dashboards and generate professional weekly client reports'
    ],
    prerequisites: [
      'Basic social media familiarity and willingness to understand analytical metrics'
    ],
    modules: [
      {
        id: 'mod-mkt-1',
        title: 'Module 1: Funnel Strategy & Meta Ads Ecosystem',
        lessons: [
          {
            id: 'les-mkt-1-1',
            title: 'Modern E-Commerce Funnels (TOFU, MOFU, BOFU)',
            duration: '24 min',
            videoDurationSeconds: 1440,
            type: 'video',
            description: 'How to structure advertising campaigns that convert cold traffic into repeat buyers.'
          },
          {
            id: 'les-mkt-1-2',
            title: 'Mastering Meta Ads Manager & CAPI Setup',
            duration: '38 min',
            videoDurationSeconds: 2280,
            type: 'video',
            description: 'Campaign objectives, Advantage+ budget optimization, and audience exclusions.'
          }
        ]
      }
    ],
    reviews: [
      {
        id: 'rev-mkt-1',
        studentName: 'Hamza Malik',
        avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=120&q=80',
        rating: 5,
        date: '1 month ago',
        city: 'Faisalabad',
        comment: 'Generated 4.8x ROAS for my client’s apparel brand in Lahore after applying the CAPI and retargeting framework.',
        achievement: 'Scaled client to Rs 1.5M/month'
      }
    ]
  },
  {
    id: 'course-shopify',
    slug: 'shopify-ecommerce-dropshipping',
    title: 'Shopify E-Commerce Mastery & Dropshipping in Pakistan',
    subtitle: 'Build a profitable online brand: store creation, winning product hunting, reliable local suppliers, Cash on Delivery (COD), and scaling sales.',
    category: 'Shopify & E-Commerce',
    level: 'Beginner',
    badge: 'Business Builder',
    rating: 4.91,
    reviewsCount: 1450,
    studentsEnrolled: 3900,
    durationHours: 36,
    durationWeeks: '6 Weeks',
    pricePKR: 13999,
    originalPricePKR: 25000,
    priceUSD: 50,
    originalPriceUSD: 90,
    thumbnail: 'https://images.unsplash.com/photo-1556742049-0a67e557224f?auto=format&fit=crop&w=1200&q=80',
    language: 'Urdu / Hindi + English E-Commerce Terms',
    certificateIncluded: true,
    batchStartDate: 'Starts November 20, 2026',
    featuredOutcome: 'Launch a high-converting Shopify store within 14 days and understand product sourcing, fulfillment, and local Pakistani courier tie-ups.',
    instructor: {
      name: 'Malik Daniyal',
      title: 'E-Commerce Founder & Shopify Partner',
      company: 'PrimeCart & OneSkills Senior Trainer',
      avatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=240&q=80',
      bio: 'Built 3 seven-figure e-commerce brands in Pakistan and UAE. Expert in local COD logistics and customer service automation.',
      experience: '7+ Years E-Commerce',
      rating: 4.94,
      studentsCount: 8200,
    },
    learningOutcomes: [
      'Launch a modern, high-converting Shopify store using premium theme architectures',
      'Validate winning products with high margins using Spy tools and Meta ad libraries',
      'Partner with reliable local wholesalers and manufacturers in Karachi, Lahore & Gujranwala',
      'Integrate Trax, CallCourier, Leopard, and PostEx courier APIs for automated COD booking',
      'Reduce Return to Origin (RTO) rates and handle customer confirmation calls via WhatsApp'
    ],
    prerequisites: [
      'Basic smartphone or computer with internet access'
    ],
    modules: [
      {
        id: 'mod-shp-1',
        title: 'Module 1: Product Hunting & Market Validation',
        lessons: [
          {
            id: 'les-shp-1-1',
            title: 'Criteria for a Winning E-Commerce Product in Pakistan',
            duration: '30 min',
            videoDurationSeconds: 1800,
            type: 'video',
            description: 'Margin calculation, weight constraints, perceived value, and viral potential.'
          }
        ]
      }
    ],
    reviews: [
      {
        id: 'rev-shp-1',
        studentName: 'Omer Farooq',
        avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=120&q=80',
        rating: 5,
        date: '3 weeks ago',
        city: 'Gujranwala',
        comment: 'The supplier contacts and courier integration lessons alone saved me months of trial and error. Hit 100 orders in week 2!',
        achievement: '100+ Orders in first 14 days'
      }
    ]
  },
  {
    id: 'course-video-editing',
    slug: 'video-editing-motion-graphics',
    title: 'Video Editing & Motion Graphics with Premiere & After Effects',
    subtitle: 'Edit viral YouTube content, Reels, TikToks, cinematic commercials, color grading, sound design, and kinetic typography.',
    category: 'Video Editing & Motion',
    level: 'All Levels',
    badge: 'Creator Economy',
    rating: 4.94,
    reviewsCount: 1120,
    studentsEnrolled: 2750,
    durationHours: 40,
    durationWeeks: '8 Weeks',
    pricePKR: 12999,
    originalPricePKR: 24000,
    priceUSD: 46,
    originalPriceUSD: 85,
    thumbnail: 'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?auto=format&fit=crop&w=1200&q=80',
    language: 'Urdu / Hindi + English Technical Terms',
    certificateIncluded: true,
    batchStartDate: 'Starts November 22, 2026',
    featuredOutcome: 'Get hired by US/European YouTubers and digital agencies as an elite video editor earning $300–$1,500 per project.',
    instructor: {
      name: 'Adnan Qureshi',
      title: 'Commercial Film Editor & YouTube Content Strategist',
      company: 'PixelForge Studios & OneSkills Trainer',
      avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=240&q=80',
      bio: 'Edited for top creators with over 20M+ combined views. Specializes in retention editing, sound design, and 3D camera tracking.',
      experience: '8+ Years Video Production',
      rating: 4.96,
      studentsCount: 5100,
    },
    learningOutcomes: [
      'Master Adobe Premiere Pro shortcuts, timeline organization, and fast pacing',
      'Retention editing secrets: seamless zooms, SFX layering, and graphic overlays',
      'Create custom After Effects motion graphics, title animations, and lower thirds',
      'Color grade footage with Lumetri color wheels and cinematic LUTs',
      'Package video services and pitch directly to high-profile creators and brands'
    ],
    prerequisites: [
      'A computer capable of running Adobe Premiere Pro & After Effects'
    ],
    modules: [
      {
        id: 'mod-vid-1',
        title: 'Module 1: Storytelling, Pacing & Audio Design',
        lessons: [
          {
            id: 'les-vid-1-1',
            title: 'The Psychology of High-Retention Video Hooks',
            duration: '26 min',
            videoDurationSeconds: 1560,
            type: 'video',
            description: 'Analyzing the first 5 seconds of viral videos and how sound design builds emotional resonance.'
          }
        ]
      }
    ],
    reviews: [
      {
        id: 'rev-vid-1',
        studentName: 'Zainab Batool',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80',
        rating: 5,
        date: '1 week ago',
        city: 'Multan',
        comment: 'Now editing reels for an Australian fitness influencer making $800/month part-time from home. Thank you OneSkills!',
        achievement: 'Retained by Australian creator'
      }
    ]
  },
  {
    id: 'course-python-ai',
    slug: 'python-data-ai-automation',
    title: 'Python Programming, Data Analytics & AI Automation',
    subtitle: 'From zero to writing automated scripts, web scrapers, data pipelines with Pandas, and integrating modern AI APIs for business automation.',
    category: 'Python & AI Automation',
    level: 'Beginner',
    badge: 'Future Tech',
    rating: 4.96,
    reviewsCount: 890,
    studentsEnrolled: 2200,
    durationHours: 48,
    durationWeeks: '9 Weeks',
    pricePKR: 14500,
    originalPricePKR: 26000,
    priceUSD: 52,
    originalPriceUSD: 95,
    thumbnail: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=1200&q=80',
    language: 'Urdu / Hindi + English Programming Terms',
    certificateIncluded: true,
    batchStartDate: 'Starts November 25, 2026',
    featuredOutcome: 'Automate business spreadsheets, scrape commercial datasets, and build custom workflow automations for international companies.',
    instructor: {
      name: 'Dr. Shahbaz Alam',
      title: 'Data Scientist & AI Automation Consultant',
      company: 'TechNovus & OneSkills Mentor',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=240&q=80',
      bio: 'PhD in Computer Science with over a decade of data systems experience. Passionate about demystifying coding for absolute beginners.',
      experience: '11+ Years Tech & AI',
      rating: 4.97,
      studentsCount: 4600,
    },
    learningOutcomes: [
      'Write clean, idiomatic Python code from variables and loops to Object-Oriented patterns',
      'Scrape data from complex websites using BeautifulSoup and Playwright',
      'Analyze and clean datasets with Pandas, NumPy, and create visual dashboards with Matplotlib',
      'Build automated Zapier/Webhook scripts and AI-augmented tools for clients',
      'Package Python scripts into standalone desktop and command line tools'
    ],
    prerequisites: [
      'No previous coding experience required. Starts from absolute basic syntax.'
    ],
    modules: [
      {
        id: 'mod-py-1',
        title: 'Module 1: Python Essentials & Algorithmic Thinking',
        lessons: [
          {
            id: 'les-py-1-1',
            title: 'Setting up Python 3.12, Virtual Environments & Jupyter',
            duration: '22 min',
            videoDurationSeconds: 1320,
            type: 'video',
            description: 'Getting your computer ready for fast data science and scripting development.'
          }
        ]
      }
    ],
    reviews: [
      {
        id: 'rev-py-1',
        studentName: 'Tariq Mehmood',
        avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=120&q=80',
        rating: 5,
        date: '2 weeks ago',
        city: 'Peshawar',
        comment: 'Built a web scraper that collected 15,000 real estate leads for a UK agency. The assignment in Module 2 was directly applicable!',
        achievement: 'Completed UK data scraping contract'
      }
    ]
  }
];

export const CATEGORIES: { name: string; icon: string; count: number; description: string }[] = [
  { name: 'All', icon: 'Sparkles', count: 7, description: 'All available career paths and bootcamps' },
  { name: 'Web Development', icon: 'Code2', count: 1, description: 'React, Next.js, Node.js & modern full-stack' },
  { name: 'Freelancing & Upwork', icon: 'Briefcase', count: 1, description: 'Upwork Top-Rated, Fiverr Pro & proposal mastery' },
  { name: 'Graphic & UI/UX Design', icon: 'Figma', count: 1, description: 'Figma, product design, wireframing & design systems' },
  { name: 'Digital Marketing & SEO', icon: 'TrendingUp', count: 1, description: 'Performance marketing, Meta ads & Technical SEO' },
  { name: 'Shopify & E-Commerce', icon: 'ShoppingBag', count: 1, description: 'Shopify stores, local dropshipping & COD scaling' },
  { name: 'Video Editing & Motion', icon: 'Film', count: 1, description: 'Premiere Pro, After Effects & retention editing' },
  { name: 'Python & AI Automation', icon: 'Cpu', count: 1, description: 'Python scripts, data analytics & smart workflows' },
];

export const PLATFORM_STATS = [
  { label: 'Active Students & Graduates', value: '18,500+', icon: 'GraduationCap' },
  { label: 'Average Course Rating', value: '4.95 / 5', icon: 'Star' },
  { label: 'Freelance & Job Placement', value: '92.4%', icon: 'Briefcase' },
  { label: 'Live Mentorship Batches', value: '680+', icon: 'Users' }
];

export const SUCCESS_STORIES = [
  {
    name: 'Hamza Farooq',
    role: 'Top-Rated Freelancer on Upwork',
    course: 'Full-Stack Web Development + Freelancing',
    city: 'Lahore, Pakistan',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
    quote: 'Before OneSkills, I had watched countless tutorials without ever finishing a complete project. The live mentor code reviews and real Upwork proposal teardowns changed everything. I crossed $15,000 on Upwork in just 8 months!',
    monthlyEarnings: '$2,200/mo',
    badge: 'Upwork Top-Rated'
  },
  {
    name: 'Madiha Tariq',
    role: 'Remote UI/UX Product Designer',
    course: 'UI/UX & Product Design with Figma',
    city: 'Islamabad, Pakistan',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80',
    quote: 'The Figma design systems and auto-layout training prepared me for international agency standards. OneSkills connected me directly with my first design internship which turned into a full-time remote contract.',
    monthlyEarnings: '$1,800/mo',
    badge: 'Remote Contractor'
  },
  {
    name: 'Noman Qureshi',
    role: 'E-Commerce Brand Founder',
    course: 'Shopify E-Commerce & Local Dropshipping',
    city: 'Karachi, Pakistan',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80',
    quote: 'In Pakistan, COD and courier returns kill most stores. The OneSkills instructors taught us exact supplier tie-ups and automated WhatsApp confirmations. We crossed Rs 2.8 Million in revenue last month.',
    monthlyEarnings: 'Rs 2.8M Revenue',
    badge: 'Verified Business'
  }
];

export const TRUST_PARTNERS = [
  'Upwork Top Rated',
  'Fiverr Pro',
  'Shopify Partner',
  'Meta Certified',
  'Google Partner',
  'PASHA Member'
];

export const FAQS = [
  {
    q: 'Are the lectures live or recorded?',
    a: 'Courses include high-definition recorded lessons for self-paced learning, accompanied by live weekly Zoom doubt-clearing sessions and 24/7 dedicated WhatsApp community support from your mentors.'
  },
  {
    q: 'Will I get an official verifiable certificate?',
    a: 'Yes! Upon completing 100% of the lessons and assignments, an official OneSkills Certificate of Completion with a unique verification ID and QR code is issued and stored in your Student Dashboard.'
  },
  {
    q: 'Can beginners with zero prior background join?',
    a: 'Absolutely. Courses are structured starting from ground zero with no complex prerequisites. Instruction is delivered in conversational Urdu / English terminology with step-by-step practical screen shares.'
  },
  {
    q: 'How does payment work in Pakistan?',
    a: 'We accept all major local payment methods including JazzCash, EasyPaisa, Nayapay, Sadapay, Pakistani Bank Transfers, and international credit/debit cards.'
  },
  {
    q: 'How does the Student Dashboard track my progress?',
    a: 'Your Student Dashboard automatically updates your completion percentages, remembers the exact video timestamp and lesson you last watched, tracks completed quizzes, stores your personal lecture notes, and unlocks your certificate as soon as all modules are completed.'
  }
];
