import { Icons } from "@/components/icons";
import { HomeIcon, NotebookIcon } from "lucide-react";

export const DATA = {
  name: "Shivam Narkar",
  initials: "SN",
  url: "https://shivamnarkar16.vercel.app",
  location: "Mumbai, Maharashtra",
  locationLink: "https://www.google.com/maps/place/mumbai",
  description:
    "Student and Developer. I love building things and helping people. Life is too short to be boring.",
  summary: "",
  avatarUrl: "",
  skills: [
    "React",
    "Next.js",
    "Typescript",
    "Node.js",
    "Python",
    "Go",
    "Postgres",
    "Docker",
    "Java",
    "C++",
  ],
  navbar: [
    { href: "/", icon: HomeIcon, label: "Home" },
    { href: "/blog", icon: NotebookIcon, label: "Blog" },
  ],
  contact: {
    email: "shivamnarkar16@gmail.com",
    tel: "",
    social: {
      GitHub: {
        name: "GitHub",
        url: "https://github.com/shivamnarkar47/",
        icon: Icons.github,
        navbar: true,
      },
      LinkedIn: {
        name: "LinkedIn",
        url: "https://www.linkedin.com/in/shivam-narkar/",
        icon: Icons.linkedin,
        navbar: true,
      },
      X: {
        name: "X",
        url: "https://x.com/linuxious",
        icon: Icons.x,

        navbar: true,
      },
      Resume: {
        name: "Resume",
        url: "/resume.pdf",
        icon: Icons.resume,
        navbar: true,
      },
      Leetcode: {
        name: "LeetCode",
        url: "https://leetcode.com/u/shivamnarkar16",
        icon: Icons.leetcode,
        navbar: true,
      },
      CodeForces: {
        name: "CodeForces",
        url: "https://codeforces.com/profile/destroyingchampions",
        icon: Icons.barChart,
        navbar: true
      }
    },
  },

  work: [
     {
       company: "AIQ Space Ventures",
       href: "https://aiqspace.com",
       badges: ["internship", "Tech"],
       location: "Hybrid",
       title: "Tech Intern",
       start: "Aug 2025",
       end: "Sep 2025",
       description: [
         "Optimized internal workflows - 28% increase in development speed",
         "Streamlined deployment processes with cross-functional teams",
         "Enhanced overall project efficiency"
       ]
     },

    {
       company: "Cybercraft Software Solutions",
       href: "https://cybercraft.llc",
       badges: ["internship", "SDE"],
       location: "Hybrid",
       title: "Software Developer Intern",
       start: "Sept 2024",
       end: "Feb 2025",
       description: [
         "Built Puppeteer-based bot for automated meeting connections",
         "Developed custom WebRTC meeting application",
         "Explored automated scheduling tools and resolved challenges"
       ]
     },
    {
       company: "Sonawane Tech Solutions LLP",
       href: "https://sonawane.com",
       badges: ["internship", "UI/UX"],
       location: "Hybrid",
       title: "UI/UX Intern",
       start: "June 2022",
       end: "Aug 2022",
       description: [
         "Designed Cryptocurrency Trading Website layout",
         "Created E-Commerce Clothes Website interface",
         "Focused on wireframing, prototyping, and user-centered design"
       ]
     },
    
  ],
  education: [
    {
      school: "Atharva College of Engineering",
      href: "https://atharvacoe.ac.in",
      degree: "Bachelor of Engineering in Information Technology",
      start: "2023",
      end: "2026",
    },
    {
      school: "Vidyalankar Polytechnic College",
      href: "https://vpt.edu.in",
      degree: "Diploma in Information Technology",
      start: "2020",
      end: "2023",
    },
  ],
  projects: [

    {
      title: "RaceDash - WEC Dashboard",
      href: "https://wec-dashboard.vercel.app/",
      dates: "June 2025 - current",
      active: true,
      description:
        "A cutting-edge motorsport analytics platform delivering live session data with millisecond precision.",
      technologies: [
        "React TS",
        "GraphQL",
        "TailwindCSS",
        "Shadcn UI",
        "Real-time"
      ],
      links: [
        {
          type: "Website",
          href: "https://wec-dashboard.vercel.app/",
          icon: <Icons.globe className="size-3" />,
        },
        {
          type: "Source",
          href: "https://github.com/shivamnarkar47/WEC_Dashboard",
          icon: <Icons.github className="size-3" />,
        },
      ],
    },
    {
      title: "MiniURL Shortener",
      href: "https://mini-url-shortener-ngee.vercel.app/",
      dates: "May 2025 - Present",
      active: true,
      description:
        "MiniURL-shortener is an open-source project that provides a simple and efficient URL shortening service, similar to TinyURL or Bitly.",
      technologies: [
        "React TS",
        "Typescript",
        "In-Memory Storage",
        "Go Fiber",
        "TailwindCSS",
        "Shadcn UI",
      ],
      links: [
        {
          type: "Website",
          href: "https://mini-url-shortener-ngee.vercel.app/",
          icon: <Icons.globe className="size-3" />,
        },
        {
          type: "Source",
          href: "https://github.com/shivamnarkar47/MiniURL-shortener",
          icon: <Icons.github className="size-3" />,
        },
      ],
    },
    {
      title: "Chihuahua Investments",
      href: "https://github.com/shivamnarkar47/CodeCrafters",
      dates: "March 2025",
      active: true,
      description:
        "24-hour build investment platform which help me to get 1st runner-up at SCOE Hackathon.",
      technologies: ["React TS", "Django", "Celery", "Gemini", "Shadcn UI"],
      links: [
        {
          type: "Source",
          href: "https://github.com/shivamnarkar47/CodeCrafters",
          icon: <Icons.github className="size-3" />,
        },
      ],
    },
    {
      title: "Dinesmart - Food Ordering Simulation",
      href: "https://dinesmart-final.vercel.app/",
      dates: "April 2024 - September 2024",
      active: true,
      description:
        "Built a Food Ordering System with React TS, Supabase, and Django, delivering a seamless dining experience. The app features real-time order management, a scalable backend, and an intuitive UI/UX. This project sharpened my full-stack and real-time development skills.",
      technologies: [
        "React TS",
        "Django",
        "PostgreSQL",
        "TailwindCSS",
        "Shadcn UI",
        "Razorpay",
        "Render",
      ],
      links: [
        {
          type: "Website",
          href: "https://dinesmart-final.vercel.app/",
          icon: <Icons.globe className="size-3" />,
        },
        {
          type: "Source",
          href: "https://github.com/shivamnarkar47/SE-MPL-B",
          icon: <Icons.github className="size-3" />,
        },
      ],
    },
  ],
  hackathons: [
    {
      title: "HackHazards 2025",
      dates: "Apr 11, 2025 - Apr 20, 2025",
      location: "Online",
      description:
        "Developed an platform where Spendings and donations of NGOs are transparent to the users with the help of Stellar Blockhain tech.",
      badge: "#",
      links: [
        {
          title: "Source",
          icon: <Icons.github className="h-4 w-4" />,
          href: "https://github.com/shivamnarkar47/ClearGive",
        },
      ],
    },
    {
      title: "Coherence 3.0",
      dates: "Mar 29, 2025 - March 30, 2025",
      location: "VCET, Vasai(W)",
      badge: "Finalist",
      description:
        "Developed the 'Chihuahua Smart City Dashboard' using React, Django, Celery and OpenWeatherMap API.",

      links: [
        {
          title: "Source",
          icon: <Icons.github className="h-4 w-4" />,
          href: "https://github.com/shivamnarkar47/COHERENCE-25_Chihuahua_WebApp",
        },
      ],
    },
    {
      title: "CodeCrafters",
      dates: "March 16 2025 - March 17 2025",
      location: "SCOE, Kharghar",
      description:
        "Built an MVC-based investment platform supporting stocks, crypto, and insurance.",
      badge: "Finalist & 1st runner up",
      links: [
        {
          title: "Source",
          icon: <Icons.github className="h-4 w-4" />,
          href: "https://github.com/shivamnarkar47/Codecrafters",
        },
      ],
    },
    {
      title: "MumbaiHacks",
      dates: "Sep 21 2024 - Sep 22 2024",
      location: "Atlas Skills University, Mumbai",
      badge: "#",
      description:
        "Developed a system which will check the adulteration of food using the image pic.",
      links: [
        {
          title: "Source",
          icon: <Icons.github className="h-4 w-4" />,
          href: "https://github.com/shivamnarkar47/SafeBit-backend",
        },
      ],
    },
    {
      title: "CSI WebCade",
      dates: "Sep 14 2024 ",
      location: "SJCEM, Palghar",
      badge: "#",
      description: "Developed a Cross Border Ecommerce Platform.",
      links: [
        {
          title: "Source",
          icon: <Icons.github className="h-4 w-4" />,
          href: "https://github.com/shivamnarkar47/CSI-WebCade-Cross-Border-Ecommerce-Platform",
        },
      ],
    },

    {
      title: "Coherence 1.0",
      dates: "March 23, 2024 - March 24, 2024",
      location: "VCET, Vasai(W)",
      badge: "Finalist",
      description:
        "Developed a Customer Virtual Assistant using Twillo and custom ML Model which helps in translation.",
      links: [],
    },
    {
      title: "H-2.0",
      dates: "March 20, 2024 - March 21, 2024",
      location: "DMCE, Airoli",
      badge: "#",
      description:
        "Developed a system which will help to manage food waste from ceremonies to the NGOs.",
      links: [
        {
          title: "Source",
          icon: <Icons.github className="h-4 w-4" />,
          href: "https://github.com/ANNI69/FeedForward",
        },
      ],
    },
    {
      title: "Technothon",
      badge: "Finalist & Special Mention",
      dates: "April 18, 2023",
      location: "VES Polytechnic",
      description:
        "Developed a system which will help to manage food waste from ceremonies to the NGOs.",
      links: [
        {
          title: "Source",
          icon: <Icons.github className="h-4 w-4" />,
          href: "http://github.com/shivamnarkar47/Hackathon/",
        },
      ],
    },
    {
      title: "Industrial Internal Hackathon",
      dates: "Mar 25, 2023",
      badge: "#",
      location: "Vidyalankar Polytechnic",
      description:
        "Developed a system which will check the attendance by connecting the WiFi network of the office.",
      links: [],
    },
  ],
} as const;
