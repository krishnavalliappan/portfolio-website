# Portfolio Website

A modern, responsive portfolio website built with Next.js, React, TypeScript, and Tailwind CSS.

## Project Structure

The project follows a clean, organized structure:

- `app/` - Next.js App Router pages and layouts
- `components/` - Reusable React components
  - `ui/` - UI components (buttons, inputs, cards, etc.)
  - `common/` - Common components used across sections
  - `sections/` - Page sections (hero, about, projects, etc.)
- `hooks/` - Custom React hooks
- `utils/` - Utility functions
- `data/` - Data files and constants
- `lib/` - Shared libraries and services
- `public/` - Static assets

## Key Features

- Modern UI with smooth animations using Framer Motion
- Responsive design for all device sizes
- Dark/light mode support
- Interactive components
- SEO optimized
- Performance optimized

## Technologies Used

- **Next.js 14** - React framework with App Router
- **React 18** - UI library
- **TypeScript** - Type safety
- **Tailwind CSS** - Utility-first CSS
- **Framer Motion** - Animations
- **shadcn/ui** - UI component library
- **Vercel Analytics** - Performance monitoring

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

1. Clone the repository

```bash
git clone https://github.com/yourusername/portfolio-website.git
cd portfolio-website
```

2. Install dependencies

```bash
npm install
# or
yarn install
```

3. Run the development server

```bash
npm run dev
# or
yarn dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Deployment

The site is configured for easy deployment on Vercel:

```bash
npm run build
# or
yarn build
```

## Project Structure Details

### Components

- **UI Components**: Reusable UI elements like cards, buttons, etc.
- **Common Components**: Shared components used across different sections
- **Section Components**: Major page sections like Hero, About, Projects, etc.

### Hooks

- `use-scroll-section.ts` - Hook for scroll-based animations
- `use-media-query.ts` - Hook for responsive design
- `use-outside-click.ts` - Hook for detecting clicks outside elements

### Data

- `projects.ts` - Project information
- `workExperience.ts` - Work experience information

## License

MIT

## Author

Krishnakumar Valliappan
