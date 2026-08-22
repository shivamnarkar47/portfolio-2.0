import { Icons } from "@/components/icons";
import { HomeIcon, NotebookIcon, BarChartIcon, ImagesIcon } from "lucide-react";

export const DATA = {
  name: "Shivam Narkar",
  initials: "SN",
  url: "https://shivamnarkar16.vercel.app",
  location: "Mumbai, Maharashtra",
  locationLink: "https://www.google.com/maps/place/mumbai",
  description:
    "Student, Developer, and Open Source Enthusiast. I love building scalable solutions and helping people learn. Life is too short to be boring.",
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
    "System Design",
    "Cloud Computing",
    "Machine Learning",
    "WebRTC",
    "Blockchain/Stellar",
    "Framer Motion",
    "TailwindCSS",
    "shadcn/ui",
    "Django",
    "Celery",
    "OpenWeatherMap",
  ],
  navbar: [
    { href: "/", icon: (p: any) => <HomeIcon {...p} />, label: "Home" },
    { href: "/blog", icon: (p: any) => <NotebookIcon {...p} />, label: "Blog" },
    { href: "/stats", icon: BarChartIcon, label: "Stats" },
    { href: "/showcase", icon: ImagesIcon, label: "Showcase" },
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
        navbar: true,
      },
    },
  },
  work: [
    {
      company: "AIQ Space Ventures",
      href: "https://aiqspace.com",
      badges: ["full-time", "SDE"],
      location: "Hybrid",
      title: "Junior Software Developer",
      start: "Jun 2026",
      end: "Present",
      description: [
        "Working on scalable systems and optimizing development speed with sheer determination.",
        "Designing and shipping production features across the stack, from API to UI",
        "Collaborating with cross-functional teams to streamline deployment workflows",
      ],
    },
    {
      company: "AIQ Space Ventures",
      href: "https://aiqspace.com",
      badges: ["internship", "Tech"],
      location: "Hybrid",
      title: "Tech Intern",
      start: "Aug 2025",
      end: "May 2026",
      description: [
        "Optimized internal workflows - 28% increase in development speed",
        "Streamlined deployment processes with cross-functional teams",
        "Enhanced overall project efficiency",
      ],
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
        "Explored automated scheduling tools and resolved challenges",
      ],
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
        "Focused on wireframing, prototyping, and user-centered design",
      ],
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
      title: "kaal",
      href: "https://github.com/shivamnarkar47/kaal",
      dates: "August 2026 - Present",
      active: true,
      description:
        "A self-hosted coding-agent harness: interactive TUI plus a scriptable kaal run CLI that drives gateway-backed agent sessions against any OpenAI-compatible model. Features a stdlib-only core, a DSML-healing gateway that repairs malformed tool calls mid-stream, resumable JSONL sessions, durable memory, path-confined guarded tools with verify hooks, batch mode for parallel prompts, and checksummed one-line installs for Linux/macOS/Windows.",
      technologies: [
        "Agent Harness",
        "TUI",
        "OpenAI-compatible Gateway",
        "DSML Healing",
        "Session Persistence",
        "Guarded Tools",
      ],
      links: [
        {
          type: "Source",
          href: "https://github.com/shivamnarkar47/kaal",
          icon: <Icons.github className="size-3" />,
        },
      ],
    },
    {
      title: "omarchy-hotspot",
      href: "https://github.com/shivamnarkar47/omarchy-hotspot",
      dates: "August 2026",
      active: false,
      description:
        "A mobile hotspot for Omarchy/Hyprland that never drops your Wi-Fi: concurrent STA+AP via hostapd on a virtual interface, sharing any uplink through iptables NAT while your connection stays up. Ships a Quickshell bar plugin with an interactive panel — scannable QR-code join, live status, inline-editable WPA2 password, and passwordless toggling via a scoped polkit rule.",
      technologies: [
        "QML / Quickshell",
        "Bash",
        "hostapd",
        "dnsmasq",
        "iptables NAT",
        "systemd",
        "polkit",
      ],
      links: [
        {
          type: "Source",
          href: "https://github.com/shivamnarkar47/omarchy-hotspot",
          icon: <Icons.github className="size-3" />,
        },
      ],
    },
    {
      title: "OCaml Orderbook",
      href: "https://github.com/shivamnarkar47/OCaml-Orderbook",
      dates: "May 2026 - August 2026",
      active: false,
      description:
        "A price-aggregated limit order book implemented in pure, immutable OCaml — orders grouped into price levels via Int.Map with FIFO-like priority across levels. Supports limit/market execution, cancels, best bid/ask, spread, and depth queries, alongside micro-benchmarks contrasting OCaml vs Python performance.",
      technologies: [
        "OCaml",
        "Int.Map",
        "Functional Data Structures",
        "Micro-benchmarking",
      ],
      links: [
        {
          type: "Source",
          href: "https://github.com/shivamnarkar47/OCaml-Orderbook",
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
  achievements: [
    {
      title: "CodeCrafters 2nd Runner Up",
      description:
        "Built investment platform with Stocks, Crypto, Insurance in 24 hours",
      date: "Mar 2025",
    },
    {
      title: "Coherence 3.0 Finalist",
      description: "Developed Smart City Dashboard with React, Django, Celery",
      date: "Mar 2025",
    },
    {
      title: "Coherence 1.0 Finalist",
      description:
        "Created Customer Virtual Assistant with Twilio and ML model",
      date: "Mar 2024",
    },
    {
      title: "Technothon Special Mention",
      description: "Finalist with special recognition for achievements",
      date: "Apr 2023",
    },
    {
      title: "External Contributor",
      description: "GitHub PRs merged across multiple repositories",
      date: "2023",
    },
    {
      title: "Open Source Enthusiast",
      description: "PRs merged in multiple projects, technical documentation",
      date: "2023-2025",
    },
  ],
} as const;
