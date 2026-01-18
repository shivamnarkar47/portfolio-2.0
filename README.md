<div align="center">
  <img alt="Portfolio" src="https://github.com/dillionverma/portfolio/assets/16860528/57ffca81-3f0a-4425-b31d-094f61725455" width="90%">
</div>

# Portfolio [![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fdillionverma%2Fportfolio)

A modern, responsive portfolio website built with Next.js 14, featuring a clean design with shadcn/ui components and magical interactions from Magic UI.

## ✨ Features

- **⚡ Quick Setup** - Configure your entire portfolio by editing a single config file
- **🎨 Modern Design** - Built with Next.js 14, React, TypeScript, and TailwindCSS
- **🌙 Dark Mode** - Built-in theme switching with smooth transitions
- **📱 Responsive** - Optimized for all devices and screen sizes
- **🚀 Performance** - Optimized for Next.js and Vercel deployment
- **📝 Blog Support** - Integrated blog with MDX support
- **✨ Animations** - Beautiful animations using Framer Motion and Magic UI
- **🔧 Component Library** - Built with shadcn/ui components

## 🛠️ Tech Stack

- **Framework:** Next.js 14
- **Language:** TypeScript
- **Styling:** TailwindCSS
- **Components:** shadcn/ui, Magic UI
- **Animations:** Framer Motion
- **Icons:** Lucide React, Radix UI Icons
- **Deployment:** Vercel

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- pnpm (recommended) or npm/yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/dillionverma/portfolio
   cd portfolio
   ```

2. **Install dependencies**
   ```bash
   pnpm install
   ```

3. **Start the development server**
   ```bash
   pnpm dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## ⚙️ Configuration

Customize your portfolio by editing the configuration file:

```bash
src/data/resume.tsx
```

This single file controls:
- Personal information (name, location, description)
- Skills and technologies
- Social media links
- Projects and experience
- Contact information

## 📁 Project Structure

```
portfolio/
├── src/
│   ├── app/                 # Next.js app router
│   ├── components/          # React components
│   │   ├── ui/             # shadcn/ui components
│   │   └── magicui/        # Magic UI components
│   ├── data/               # Configuration and data
│   └── lib/                # Utility functions
├── public/                 # Static assets
└── README.md
```

## 🎨 Customization

### Adding New Sections

1. Create components in `src/components/`
2. Add routes in `src/app/`
3. Update navigation in the config file

### Styling

- Modify `tailwind.config.js` for theme customization
- Edit CSS variables in `src/app/globals.css`
- Use shadcn/ui CLI for new components

### Blog Posts

Add blog posts as `.mdx` files in the appropriate directory with frontmatter:

```mdx
---
title: "Your Blog Post Title"
date: "2024-01-01"
description: "Brief description"
---

# Your content here
```

## 🚀 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Deploy automatically on every push

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fdillionverma%2Fportfolio)

### Other Platforms

```bash
# Build for production
pnpm build

# Start production server
pnpm start
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

- [shadcn/ui](https://ui.shadcn.com/) for the beautiful component library
- [Magic UI](https://magicui.design/) for the magical animations
- [Next.js](https://nextjs.org/) for the amazing framework
- [Vercel](https://vercel.com/) for the hosting platform

## 📞 Support

If you have any questions or need help, feel free to:
- Open an issue on GitHub
- Reach out via the contact information in the portfolio

---

⭐ If you like this project, please give it a star!