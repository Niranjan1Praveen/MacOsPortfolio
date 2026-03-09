const navLinks = [
  {
    id: 1,
    name: "Projects",
    type: "finder",
  },
  {
    id: 3,
    name: "Contact",
    type: "contact",
  },
  {
    id: 4,
    name: "Resume",
    type: "resume",
  },
];

const navIcons = [
  {
    id: 1,
    img: "/icons/wifi.svg",
  },
  {
    id: 2,
    img: "/icons/search.svg",
  },
  {
    id: 3,
    img: "/icons/user.svg",
  },
];

const dockApps = [
  {
    id: "finder",
    name: "Portfolio", // was "Finder"
    icon: "finder.png",
    canOpen: true,
  },
  {
    id: "safari",
    name: "Articles", // was "Safari"
    icon: "safari.png",
    canOpen: true,
  },
  {
    id: "photos",
    name: "Gallery", // was "Photos"
    icon: "photos.png",
    canOpen: true,
  },
  {
    id: "contact",
    name: "Contact", // or "Get in touch"
    icon: "contact.png",
    canOpen: true,
  },
  {
    id: "terminal",
    name: "Skills", // was "Terminal"
    icon: "terminal.png",
    canOpen: true,
  },
  {
    id: "trash",
    name: "Archive", // was "Trash"
    icon: "trash.png",
    canOpen: false,
  },
];

const blogPosts = [
  {
    id: 1,
    date: "Sep 2, 2025",
    title:
      "TypeScript Explained: What It Is, Why It Matters, and How to Master It",
    image: "/images/blog1.png",
    link: "https://jsmastery.com/blog/typescript-explained-what-it-is-why-it-matters-and-how-to-master-it",
  },
  {
    id: 2,
    date: "Aug 28, 2025",
    title: "The Ultimate Guide to Mastering Three.js for 3D Development",
    image: "/images/blog2.png",
    link: "https://jsmastery.com/blog/the-ultimate-guide-to-mastering-three-js-for-3d-development",
  },
  {
    id: 3,
    date: "Aug 15, 2025",
    title: "The Ultimate Guide to Mastering GSAP Animations",
    image: "/images/blog3.png",
    link: "https://jsmastery.com/blog/the-ultimate-guide-to-mastering-gsap-animations",
  },
];

const techStack = [
  {
    category: "Frontend",
    items: ["React.js", "Next.js", "TypeScript", "HTML", "CSS"],
  },
  {
    category: "Mobile",
    items: ["React Native", "Expo"],
  },
  {
    category: "Styling",
    items: ["Tailwind CSS", "Sass", "CSS"],
  },
  {
    category: "AI/ML",
    items: ["TensorFlow", "PyTorch", "LangChain", "OpenAI API", "Langgraph"],
  },
  {
    category: "Backend",
    items: ["Node.js", "Express", "Python", "Django", "Flask"],
  },
  {
    category: "Database",
    items: ["Supabase", "PostgreSQL"],
  },
  {
    category: "Dev Tools",
    items: ["Git", "GitHub"],
  },
];

const socials = [
  {
    id: 1,
    text: "Github",
    icon: "/icons/github.svg",
    bg: "#f4656b",
    link: "https://github.com/Niranjan1Praveen",
  },
  {
    id: 2,
    text: "Platform",
    icon: "/icons/atom.svg",
    bg: "#4bcb63",
    link: "https://jsmastery.com/",
  },
  {
    id: 3,
    text: "Twitter/X",
    icon: "/icons/twitter.svg",
    bg: "#ff866b",
    link: "https://x.com/jsmasterypro",
  },
  {
    id: 4,
    text: "LinkedIn",
    icon: "/icons/linkedin.svg",
    bg: "#05b6f6",
    link: "https://www.linkedin.com/in/niranjan-praveen-a9019921a/",
  },
];

const photosLinks = [
  {
    id: 1,
    icon: "/icons/gicon1.svg",
    title: "Library",
  },
  {
    id: 2,
    icon: "/icons/gicon2.svg",
    title: "Memories",
  },
  {
    id: 3,
    icon: "/icons/file.svg",
    title: "Places",
  },
  {
    id: 4,
    icon: "/icons/gicon4.svg",
    title: "People",
  },
  {
    id: 5,
    icon: "/icons/gicon5.svg",
    title: "Favorites",
  },
];

const gallery = [
  {
    id: 1,
    img: "/images/gal1.png",
  },
  {
    id: 2,
    img: "/images/gal2.png",
  },
  {
    id: 3,
    img: "/images/gal3.png",
  },
  {
    id: 4,
    img: "/images/gal4.png",
  },
];

export {
  navLinks,
  navIcons,
  dockApps,
  blogPosts,
  techStack,
  socials,
  photosLinks,
  gallery,
};

const WORK_LOCATION = {
  id: 1,
  type: "work",
  name: "Work",
  icon: "/icons/work.svg",
  kind: "folder",
  children: [
    // ▶ EchoWithin
    {
      id: 5,
      name: "EchoWithin",
      icon: "/images/folder.png",
      kind: "folder",
      position: "top-10 left-5",
      windowPosition: "top-[5vh] left-5",
      children: [
        {
          id: 1,
          name: "EchoWithin.txt",
          icon: "/images/txt.png",
          kind: "file",
          fileType: "txt",
          position: "top-5 left-10",
          description: [
            "EchoWithin is a mindfulness and journaling application designed to help users reflect and track their emotional well-being.",
            "Instead of a basic diary, it uses AI-powered sentiment analysis to provide insights into your emotional patterns over time.",
            "Think of it as a personal wellness companion that helps you understand yourself better through guided reflection and mood tracking.",
            "Built with modern web technologies for a seamless and private journaling experience.",
          ],
        },
        {
          id: 2,
          name: "github.com/Niranjan1Praveen/EchoWithin",
          icon: "/images/safari.png",
          kind: "file",
          fileType: "url",
          href: "https://github.com/Niranjan1Praveen/EchoWithin.git",
          position: "top-10 right-20",
        },
        {
          id: 4,
          name: "echowithin-demo.png",
          icon: "/images/image.png",
          kind: "file",
          fileType: "img",
          position: "top-52 right-80",
          imageUrl: "/projectImages/echowithin.png",
        },
        {
          id: 5,
          name: "README.md",
          icon: "/images/plain.png",
          kind: "file",
          fileType: "md",
          href: "https://github.com/Niranjan1Praveen/EchoWithin/blob/main/README.md",
          position: "top-60 right-20",
        },
      ],
    },

    // ▶ AdversaNet
    {
      id: 6,
      name: "AdversaNet",
      icon: "/images/folder.png",
      kind: "folder",
      position: "top-52 right-80",
      windowPosition: "top-[20vh] left-7",
      children: [
        {
          id: 1,
          name: "AdversaNet.txt",
          icon: "/images/txt.png",
          kind: "file",
          fileType: "txt",
          position: "top-5 right-10",
          description: [
            "AdversaNet is a cybersecurity tool focused on adversarial machine learning and network security.",
            "Instead of traditional security measures, it uses AI to simulate and defend against sophisticated cyber attacks.",
            "Think of it as a digital sparring partner that helps strengthen your systems by thinking like an attacker.",
            "Perfect for security researchers and organizations wanting to test their defenses against AI-powered threats.",
          ],
        },
        {
          id: 2,
          name: "github.com/Niranjan1Praveen/AdversaNet",
          icon: "/images/safari.png",
          kind: "file",
          fileType: "url",
          href: "https://github.com/Niranjan1Praveen/AdversaNet.git",
          position: "top-20 left-20",
        },
        {
          id: 4,
          name: "adversanet-demo.png",
          icon: "/images/image.png",
          kind: "file",
          fileType: "img",
          position: "top-52 left-80",
          imageUrl: "/projectImages/adversanet.png",
        },
        {
          id: 5,
          name: "README.md",
          icon: "/images/plain.png",
          kind: "file",
          fileType: "md",
          href: "https://github.com/Niranjan1Praveen/AdversaNet/blob/main/README.md",
          position: "top-60 left-5",
        },
      ],
    },

    // ▶ Exoplanetarium
    {
      id: 7,
      name: "Exoplanetarium",
      icon: "/images/folder.png",
      kind: "folder",
      position: "top-10 left-80",
      windowPosition: "top-[33vh] left-7",
      children: [
        {
          id: 1,
          name: "Exoplanetarium.txt",
          icon: "/images/txt.png",
          kind: "file",
          fileType: "txt",
          position: "top-5 left-10",
          description: [
            "Exoplanetarium is an interactive 3D visualization platform for exploring exoplanets discovered by space telescopes.",
            "Instead of static data tables, it offers an immersive journey through distant star systems and alien worlds.",
            "Think of it as a personal planetarium where you can fly to real exoplanets and learn about their characteristics.",
            "Built with Three.js and astrophysics data to make space exploration accessible and educational.",
          ],
        },
        {
          id: 2,
          name: "github.com/Niranjan1Praveen/Exoplanetarium",
          icon: "/images/safari.png",
          kind: "file",
          fileType: "url",
          href: "https://github.com/Niranjan1Praveen/Exoplanetarium",
          position: "top-10 right-20",
        },
        {
          id: 4,
          name: "exoplanetarium-demo.png",
          icon: "/images/image.png",
          kind: "file",
          fileType: "img",
          position: "top-52 right-80",
          imageUrl: "/images/project-3.png",
        },
        {
          id: 5,
          name: "README.md",
          icon: "/images/plain.png",
          kind: "file",
          fileType: "md",
          href: "https://github.com/Niranjan1Praveen/Exoplanetarium/blob/main/README.md",
          position: "top-60 right-20",
        },
      ],
    },

    // ▶ FarmBandhu
    {
      id: 8,
      name: "FarmBandhu",
      icon: "/images/folder.png",
      kind: "folder",
      position: "top-40 left-40",
      windowPosition: "top-[46vh] left-7",
      children: [
        {
          id: 1,
          name: "FarmBandhu.txt",
          icon: "/images/txt.png",
          kind: "file",
          fileType: "txt",
          position: "top-5 left-10",
          description: [
            "FarmBandhu is a comprehensive agricultural platform connecting farmers with resources, markets, and expert advice.",
            "Instead of traditional farming methods, it uses AI and IoT to provide crop recommendations, weather updates, and pest detection.",
            "Think of it as a digital friend for farmers that helps increase yield, reduce costs, and access fair market prices.",
            "Built with a focus on accessibility and regional languages to serve rural communities effectively.",
          ],
        },
        {
          id: 2,
          name: "github.com/Niranjan1Praveen/FarmBandhu",
          icon: "/images/safari.png",
          kind: "file",
          fileType: "url",
          href: "https://github.com/Niranjan1Praveen/FarmBandhu",
          position: "top-20 right-20",
        },
        {
          id: 4,
          name: "farmbandhu-demo.png",
          icon: "/images/image.png",
          kind: "file",
          fileType: "img",
          position: "top-52 left-80",
          imageUrl: "/projectImages/farmbandhu.png",
        },
        {
          id: 5,
          name: "README.md",
          icon: "/images/plain.png",
          kind: "file",
          fileType: "md",
          href: "https://github.com/Niranjan1Praveen/FarmBandhu/blob/main/README.md",
          position: "top-60 right-20",
        },
      ],
    },

    // ▶ Mediscribe
    {
      id: 9,
      name: "Mediscribe",
      icon: "/images/folder.png",
      kind: "folder",
      position: "top-70 left-70",
      windowPosition: "top-[59vh] left-7",
      children: [
        {
          id: 1,
          name: "Mediscribe.txt",
          icon: "/images/txt.png",
          kind: "file",
          fileType: "txt",
          position: "top-5 right-10",
          description: [
            "Mediscribe is an AI-powered medical transcription and documentation assistant for healthcare professionals.",
            "Instead of manual note-taking, it converts doctor-patient conversations into structured medical records in real-time.",
            "Think of it as a virtual scribe that lets doctors focus on patients while ensuring accurate, compliant documentation.",
            "Built with healthcare-grade security and integration capabilities for modern medical practices.",
          ],
        },
        {
          id: 2,
          name: "github.com/Niranjan1Praveen/Mediscribe",
          icon: "/images/safari.png",
          kind: "file",
          fileType: "url",
          href: "https://github.com/Niranjan1Praveen/Mediscribe",
          position: "top-10 left-20",
        },
        {
          id: 4,
          name: "mediscribe-demo.png",
          icon: "/images/image.png",
          kind: "file",
          fileType: "img",
          position: "top-52 right-80",
          imageUrl: "/projectImages/mediscribe.png",
        },
        {
          id: 5,
          name: "README.md",
          icon: "/images/plain.png",
          kind: "file",
          fileType: "md",
          href: "https://github.com/Niranjan1Praveen/Mediscribe/blob/main/README.md",
          position: "top-60 left-5",
        },
      ],
    },
    // ▶ DropConnect
    {
      id: 10,
      name: "DropConnect",
      icon: "/images/folder.png",
      kind: "folder",
      position: "top-10 left-5",
      windowPosition: "top-[5vh] left-5",
      children: [
        {
          id: 1,
          name: "DropConnect Project.txt",
          icon: "/images/txt.png",
          kind: "file",
          fileType: "txt",
          position: "top-5 left-10",
          description: [
            "DropConnect is a digital platform that unites students, NGOs, and corporations to foster collective action for water resilience and climate-smart disaster management.",
            "Anchored in India's Schedule VII CSR mandate, DropConnect empowers verified impact creation through volunteer mobilization for water-centric initiatives, geo-based event matching, and corporate dashboards to monitor CSR outcomes.",
            "The platform features AI/ML-based volunteer matching, real-time QR/GPS event check-ins, gamified rewards, and auto-generated BRSR/ESG compliance reports.",
            "Selected as Track Winners in the University - Water Related Disasters Challenge 3 of the Xylem Global Innovation Challenge 2025, standing out among 4000+ teams from across the globe.",
          ],
        },
        {
          id: 2,
          name: "dropconnect.vercel.app",
          icon: "/images/safari.png",
          kind: "file",
          fileType: "url",
          href: "https://drop-connect-development.vercel.app",
          position: "top-10 right-20",
        },
        {
          id: 3,
          name: "dropconnect.png",
          icon: "/images/image.png",
          kind: "file",
          fileType: "img",
          position: "top-52 right-80",
          imageUrl: "/projectImages/dropconnect.png",
        },
        {
          id: 4,
          name: "Design.fig",
          icon: "/images/plain.png",
          kind: "file",
          fileType: "fig",
          href: "https://github.com/Niranjan1Praveen/DropConnect.git",
          position: "top-60 right-20",
        },
      ],
    },

    // ▶ VahaanBandhu
    {
      id: 11,
      name: "VahaanBandhu",
      icon: "/images/folder.png",
      kind: "folder",
      position: "top-52 right-80",
      windowPosition: "top-[20vh] left-7",
      children: [
        {
          id: 1,
          name: "VahaanBandhu Project.txt",
          icon: "/images/txt.png",
          kind: "file",
          fileType: "txt",
          position: "top-5 right-10",
          description: [
            "VahaanBandhu addresses rural India's inefficient agricultural transport network by enabling circular logistics for truck drivers, while maximizing outcomes for farmers and input dealers.",
            "Built by Team CODE4CHANGE, this platform secured Top 10 in Microsoft Azure Community Agritech Hackathon. It uses Next.js for the frontend and Python AI models with quantum computing techniques for route optimization.",
            "The system intelligently matches crop loads with available transport, reduces empty return trips, and ensures timely delivery through optimized routing using classical AI and quantum-enhanced pathfinding.",
            "Key features include real-time GPS tracking, demand forecasting, farmer-truck coordination, and multi-user roles for farmers, truck drivers, and input dealers.",
          ],
        },
        {
          id: 2,
          name: "vahaan-bandhu.vercel.app",
          icon: "/images/safari.png",
          kind: "file",
          fileType: "url",
          href: "https://vahaan-bandhu.vercel.app",
          position: "top-20 left-20",
        },
        {
          id: 3,
          name: "vahaanbandhu.png",
          icon: "/images/image.png",
          kind: "file",
          fileType: "img",
          position: "top-52 left-80",
          imageUrl: "/projectImages/vahaanbandhu.png",
        },
        {
          id: 4,
          name: "Design.fig",
          icon: "/images/plain.png",
          kind: "file",
          fileType: "fig",
          href: "https://github.com/Niranjan1Praveen/VahaanBandhu.git",
          position: "top-60 left-5",
        },
      ],
    },
  ],
};

const ABOUT_LOCATION = {
  id: 2,
  type: "about",
  name: "About me",
  icon: "/icons/info.svg",
  kind: "folder",
  children: [
    {
      id: 1,
      name: "me.png",
      icon: "/images/image.png",
      kind: "file",
      fileType: "img",
      position: "top-10 left-5",
      imageUrl: "/images/niranjan.jpeg",
    },
    {
      id: 2,
      name: "casual-me.png",
      icon: "/images/image.png",
      kind: "file",
      fileType: "img",
      position: "top-28 right-72",
      imageUrl: "/images/niranjan.jpeg",
    },
    {
      id: 3,
      name: "conference-me.png",
      icon: "/images/image.png",
      kind: "file",
      fileType: "img",
      position: "top-52 left-80",
      imageUrl: "/images/niranjan.jpeg",
    },
    {
      id: 4,
      name: "about-me.txt",
      icon: "/images/txt.png",
      kind: "file",
      fileType: "txt",
      position: "top-60 left-5",
      subtitle: "Meet the Developer Behind the Code",
      description: [
        "👋 Hi, I'm Niranjan Praveen A Full Stack Developer, AI Engineer, and SEO Content Writer who builds intelligent web experiences and crafts content that ranks. I bridge the gap between cutting-edge AI technology and human connection—writing clean code on one side, and search-optimized content on the other.",
        "What I Do?",
        "Responsive Web Development: HTML, CSS/SASS, JavaScript, ReactJS, and NextJS—delivering robust, mobile-first websites that work seamlessly across devices.",
        "AI & Intelligent Systems: Building conversational agents and intelligent workflows with Langchain and Langgraph. Creating AI-powered applications that think, reason, and respond.",
        "SEO Content Development: Crafting website content, articles, and blogs that are not just well-written—but strategically optimized to rank on search engines and drive organic traffic.",
        "My Approach",
        "I believe great work comes from collaboration. I actively engage with clients—even on the smallest details—to build trust, ensure alignment, and deliver results that truly resonate.",
        "Let's Connect",
        "I'm currently available for freelance projects and contests. Whether you need a responsive website, an AI-powered solution, or SEO content that converts—let's create something remarkable together.",
      ],
    },
  ],
};

const RESUME_LOCATION = {
  id: 3,
  type: "resume",
  name: "Resume",
  icon: "/icons/file.svg",
  kind: "folder",
  children: [
    {
      id: 1,
      name: "Resume.pdf",
      icon: "/images/pdf.png",
      kind: "file",
      fileType: "pdf",
    },
  ],
};

const TRASH_LOCATION = {
  id: 4,
  type: "trash",
  name: "Trash",
  icon: "/icons/trash.svg",
  kind: "folder",
  children: [
    {
      id: 1,
      name: "trash1.png",
      icon: "/images/image.png",
      kind: "file",
      fileType: "img",
      position: "top-10 left-10",
      imageUrl: "/images/trash-1.png",
    },
    {
      id: 2,
      name: "trash2.png",
      icon: "/images/image.png",
      kind: "file",
      fileType: "img",
      position: "top-40 left-80",
      imageUrl: "/images/trash-2.png",
    },
  ],
};

export const locations = {
  work: WORK_LOCATION,
  about: ABOUT_LOCATION,
  resume: RESUME_LOCATION,
  trash: TRASH_LOCATION,
};

const INITIAL_Z_INDEX = 1000;

const WINDOW_CONFIG = {
  finder: { isOpen: false, zIndex: INITIAL_Z_INDEX, data: null },
  contact: { isOpen: false, zIndex: INITIAL_Z_INDEX, data: null },
  resume: { isOpen: false, zIndex: INITIAL_Z_INDEX, data: null },
  safari: { isOpen: false, zIndex: INITIAL_Z_INDEX, data: null },
  photos: { isOpen: false, zIndex: INITIAL_Z_INDEX, data: null },
  terminal: { isOpen: false, zIndex: INITIAL_Z_INDEX, data: null },
  txtfile: { isOpen: false, zIndex: INITIAL_Z_INDEX, data: null },
  imgfile: { isOpen: false, zIndex: INITIAL_Z_INDEX, data: null },
};

export { INITIAL_Z_INDEX, WINDOW_CONFIG };
