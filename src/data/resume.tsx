import { Icons } from "@/components/icons";
import { HomeIcon, NotebookIcon } from "lucide-react";

export const DATA = {
  name: "Shivam Narkar",
  initials: "SN",
  url: "https://shivamnarkar.com",
  location: "Mumbai, Maharashtra",
  locationLink: "https://www.google.com/maps/place/mumbai",
  description:
    "Student and Developer. I love building things and helping people. Life is too short to be boring.",
  summary: "",
  avatarUrl: "/me.png",
  skills: [
    "React",
    "Next.js",
    "Typescript",
    "Node.js",
    "Python",
    "Go",
    "Postgres",
    "Docker",
    "Kubernetes",
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
        url: "https://miniurl-shortener.onrender.com/4SDyRq",
        icon: Icons.github,
        navbar: true,
      },
      LinkedIn: {
        name: "LinkedIn",
        url: "https://miniurl-shortener.onrender.com/xaMMnn",
        icon: Icons.linkedin,
        navbar: true,
      },
      X: {
        name: "X",
        url: "https://miniurl-shortener.onrender.com/Ei3xkG",
        icon: Icons.x,

        navbar: true,
      },
      Resume: {
        name: "Resume",
        url: "/resume.pdf",
        icon: Icons.resume,
        navbar: true,
      },
      email: {
        name: "Send Email",
        url: "mailto:shivamnarkar16@gmail.com",
        icon: Icons.email,
        navbar: false,
      },
    },
  },

  work: [
    {
      company: "Cybercraft Software Solutions",
      href: "https://cybercraft.llc",
      badges: [],
      location: "Hybrid",
      title: "Software Developer Intern",
      logoUrl: "/cybercraft.png",
      start: "Sept 2024",
      end: "Feb 2025",
      description:
        "Developed a Puppeteer-based bot to automate meeting connections, significantly improving scheduling efficiency. Additionally, I built a custom WebRTC meeting application, gaining hands-on experience with real-time communication technologies. To meet project requirements effectively, I explored various automated scheduling tools and successfully resolved development challenges, demonstrating strong problem-solving skills throughout the process.",
    },
    {
      company: "Sonawane Tech Solutions LLP",
      href: "https://sonawane.com",
      badges: [],
      location: "Hybrid",
      title: "UI/UX Intern",
      logoUrl: "/navrang.png",
      start: "June 2022",
      end: "Aug 2022",
      description:
        "During my internship as a UI/UX Developer, I designed and developed user-friendly interfaces for two key projects. First, I created a Cryptocurrency Trading Website layout, focusing on intuitive navigation and real-time data visualization. Second, I designed an E-Commerce Clothes Website, ensuring a seamless shopping experience with an attractive and responsive design. Both projects enhanced my skills in wireframing, prototyping, and user-centered design while meeting business and usability goal",
    },
  ],
  education: [
    {
      school: "Atharva College of Engineering",
      href: "https://atharvacoe.ac.in",
      degree: "Bachelor of Engineering in Information Technology",
      logoUrl: "/atharva.png",
      start: "2023",
      end: "2026",
    },
    {
      school: "Vidyalankar Polytechnic College",
      href: "https://vpt.edu.in",
      degree: "Diploma in Information Technology",
      logoUrl: "/vp.png",
      start: "2020",
      end: "2023",
    },
  ],
  projects: [
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
      image: "/miniurl.png",
      video: "#",
      // "https://pub-83c5db439b40468498f97946200806f7.r2.dev/chat-collect.mp4",
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
      image: "/chihuahua.png",
      video: "#",
      // video: "https://cdn.magicui.design/bento-grid.mp4",
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
      image: "/dinesmart.png",
      video: "#",
      // video: "https://cdn.llm.report/openai-demo.mp4",
    },
  ],
  hackathons: [
    {
      title: "HackHazards 2025",
      dates: "Apr 11, 2025 - Apr 20, 2025",
      location: "Online",
      description:
        "Developed an platform where Spendings and donations of NGOs are transparent to the users with the help of Stellar Blockhain tech.",
      image:
        "https://hackhazards25.devfolio.co/_next/image?url=https%3A%2F%2Fassets.devfolio.co%2Fhackathons%2F2a2dfd8492574a2da83c47828270e0e1%2Fassets%2Ffavicon%2F920.png&w=1440&q=75",
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
      description:
        "Developed the 'Chihuahua Smart City Dashboard' using React, Django, Celery and OpenWeatherMap API.",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQxHradaY-0ZTjUj2VioBmT7Mj1alJ8mFbTcw&s",

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
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSL6s9HQObXmvWKYeTfN0uKvNEWiWVFQ0tOUA&s",
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
      description:
        "Developed a system which will check the adulteration of food using the image pic.",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcShsAPboPwHTs-I3OA8xHI_31_MXGTcAimepg&s",
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
      description: "Developed a Cross Border Ecommerce Platform.",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQyrvSYqKPdZ4F3ef48dVnWK2O9Thnmud-P8g&s",
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
      description:
        "Developed a Customer Virtual Assistant using Twillo and custom ML Model which helps in translation.",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQxHradaY-0ZTjUj2VioBmT7Mj1alJ8mFbTcw&s",
      links: [],
    },
    {
      title: "H-2.0",
      dates: "March 20, 2024 - March 21, 2024",
      location: "DMCE, Airoli",
      description:
        "Developed a system which will help to manage food waste from ceremonies to the NGOs.",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR1tq-9vFRWExy9-hLnUYnMr1GPtfmZaSHIwA&s",
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
      dates: "April 18, 2023",
      location: "VES Polytechnic",
      description:
        "Developed a system which will help to manage food waste from ceremonies to the NGOs.",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSciRZKo1pFkqtdRZZPnKLJkKyHH9SVxKfcSA&s",
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
      location: "Vidyalankar Polytechnic",
      description:
        "Developed a system which will check the attendance by connecting the WiFi network of the office.",
      image: "/vp.png",
      links: [],
    },
  ],
} as const;
