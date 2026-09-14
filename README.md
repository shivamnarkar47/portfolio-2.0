<div align="center">
  <img alt="Portfolio" src="https://github.com/dillionverma/portfolio/assets/16860528/57ffca81-3f0a-4425-b31d-094f61725455" width="90%">
</div>

# Portfolio [![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fshivamnarkar47%2Fportfolio-2.0)

The personal portfolio of **Shivam Narkar** — a modern, responsive portfolio website built with Next.js 14, featuring a clean design with shadcn/ui components and magical interactions from Magic UI. Forked from [dillionverma/portfolio](https://github.com/dillionverma/portfolio).

Live at: [shivamnarkar16.vercel.app](https://shivamnarkar16.vercel.app)

## ✨ Features

- **⚡ Single-File Config** - Configure your entire portfolio by editing `src/data/resume.tsx`
- **📝 MDX Blog** - Write posts as `.mdx` files in `content/`, rendered with Shiki-powered syntax highlighting
- **📊 Stats Page** - Live GitHub + Codeforces stats (auto-refreshing), contribution graph, language breakdown, and hackathon highlights
- **🖼️ Project Showcase** - A dedicated page featuring your best projects
- **🌙 Dark Mode** - Built-in theme switching with smooth transitions
- **📱 Responsive** - Optimized for all devices and screen sizes
- **✨ Animations** - Blur-fade and dock effects using Framer Motion and Magic UI
- **🔧 Component Library** - Built with shadcn/ui components

## 🛠️ Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript
- **Styling:** TailwindCSS
- **Components:** shadcn/ui, Magic UI
- **Animations:** Framer Motion
- **Markdown:** unified, remark, rehype, rehype-pretty-code (Shiki), gray-matter
- **Icons:** Lucide React, Radix UI Icons
- **Package Manager:** Bun 1.4.0
- **Deployment:** Vercel

## 🚀 Getting Started

### Prerequisites

- Bun 1.4.0+

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/shivamnarkar47/portfolio-2.0
   cd portfolio-2.0
   ```

2. **Install dependencies**

   ```bash
   bun install
   ```

3. **Start the development server**

   ```bash
   bun dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

### Environment Variables

Create a `.env` file (optional). The GitHub contributions graph on the home page and the live stats API use a GitHub personal access token:

```bash
GITHUB_TOKEN=your_github_token
```

`NEXT_GITHUB_TOKEN` is also accepted as a fallback. Without a token, the stats API falls back to unauthenticated endpoints with reduced data (no contribution calendar).

## ⚙️ Configuration

Customize your portfolio by editing the configuration file:

```bash
src/data/resume.tsx
```

This single file controls:

- Personal information (name, initials, location, description)
- Skills and technologies
- Navbar links
- Social media links
- Work experience and education
- Projects and hackathons
- Contact information

## 📁 Project Structure

```
portfolio-2.0/
├── content/               # MDX blog posts
├── public/                # Static assets (images, resume)
├── src/
│   ├── app/               # Next.js App Router pages
│   │   ├── page.tsx       # Landing page (/)
│   │   ├── api/stats/     # Live stats API (GitHub + Codeforces, cached 5m)
│   │   ├── blog/          # Blog index and /blog/[slug]
│   │   ├── stats/         # Stats page
│   │   └── showcase/      # Project showcase page
│   ├── components/        # React components
│   │   ├── ui/            # shadcn/ui components
│   │   ├── magicui/       # Magic UI components
│   │   ├── live-stats-grid.tsx      # Auto-refreshing stats cards
│   │   ├── contribution-graph.tsx   # GitHub contribution calendar
│   │   ├── languages-bar.tsx        # Top-languages breakdown
│   │   └── ...            # Feature components
│   ├── data/              # Configuration and data
│   │   ├── resume.tsx     # Single source of truth for content
│   │   └── blog.ts        # MDX → HTML pipeline (unified/remark/rehype)
│   └── lib/               # Utility functions
├── .github/workflows/     # CI (lint, type-check, build, prettier check)
└── package.json
```

## 📝 Writing Blog Posts

Add blog posts as `.mdx` files in `content/` with frontmatter:

```mdx
---
title: "Your Blog Post Title"
publishedAt: "2024-06-18"
summary: "Brief description"
image: "/optional-cover.png"
---

# Your content here
```

Posts support GitHub-flavored Markdown (tables, task lists) and code blocks with automatic Shiki syntax highlighting.

## 📜 Available Scripts

```bash
bun dev       # Start the development server
bun build     # Build for production
bun start     # Start the production server
bun lint      # Run ESLint
bun format    # Format everything with Prettier
```

CI (`.github/workflows/ci.yml`) runs `bun run lint`, `bunx tsc --noEmit`, `bun run build`, and `bunx prettier --check .` on pushes and PRs to `main`.

## 🚀 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Deploy automatically on every push

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fshivamnarkar47%2Fportfolio-2.0)

### Other Platforms

```bash
# Build for production
bun build

# Start production server
bun start
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [dillionverma/portfolio](https://github.com/dillionverma/portfolio) — the original template this project is forked from
- [shadcn/ui](https://ui.shadcn.com/) for the beautiful component library
- [Magic UI](https://magicui.design/) for the magical animations
- [Next.js](https://nextjs.org/) for the amazing framework
- [Vercel](https://vercel.com/) for the hosting platform

---

⭐ If you like this project, please give it a star!
