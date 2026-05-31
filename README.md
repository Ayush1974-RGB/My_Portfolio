# Ayush Singhal Portfolio

A premium developer portfolio built with React, Vite, Tailwind CSS v4, and Framer Motion.

The site is designed around a clean editorial layout, a responsive light/dark theme system, cybersecurity-focused storytelling, and reusable homepage interaction patterns such as sticky split sections and modal-based project case studies.

## Highlights

- Responsive portfolio with desktop, tablet, and mobile layouts
- Light and dark mode with shared theme tokens
- Deep slate and cobalt color system with glass-style navigation
- Sticky split layout pattern for long sections like Projects and Experience
- Compact project grid with `Show More / Show Less`
- Project detail modal for deeper case-study content
- Framer Motion page-load, reveal, and hover interactions
- Reusable content model driven from one data file

## Tech Stack

- React 19
- Vite 7
- Tailwind CSS v4
- Framer Motion
- ESLint

## Getting Started

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Create a production build:

```bash
npm run build
```

Run linting:

```bash
npm run lint
```

Preview the production build locally:

```bash
npm run preview
```

## Content and Customization

The portfolio is structured so the main content is easy to update without rewriting components.

### Update portfolio content

Edit:

```text
src/data/portfolioData.js
```

This file contains:

- profile information
- hero content
- highlights
- about and security sections
- skills
- projects
- experience
- contact and footer links

### Update the theme

Edit:

```text
src/index.css
```

This file contains:

- light/dark theme tokens
- shared surface, button, and card styles
- scrollbar styling
- project card and sticky layout styles

### Update homepage sections

Main homepage sections live in:

```text
src/components/site/
```

Important components:

- `HeroSection.jsx`
- `ProjectsSection.jsx`
- `ProjectCard.jsx`
- `ProjectThumbnail.jsx`
- `ProjectDetailsModal.jsx`
- `ExperienceSection.jsx`
- `StickySplitSection.jsx`

## Sticky Split Section Pattern

The homepage includes a reusable sticky scroll layout:

```text
src/components/site/StickySplitSection.jsx
```

Behavior:

- left column stays sticky on large screens
- right column scrolls naturally and drives the reading flow
- layout stacks vertically on smaller screens
- uses CSS `position: sticky` instead of heavy scroll listeners

This pattern is currently applied to:

- Projects section
- Experience section

## Project Section Behavior

The Projects section is intentionally compact on the homepage to reduce vertical length.

Features:

- responsive project grid
- compact visual project previews
- short summaries on each card
- hover lift and shadow feedback
- click-to-open modal for full details
- `Show More / Show Less` toggle

If you want to replace generated visual previews with real screenshots later, add thumbnail image paths to the project data and extend the project objects in `portfolioData.js`.

## Folder Structure

```text
src/
  components/
    site/
      AboutSection.jsx
      ContactSection.jsx
      ExperienceSection.jsx
      HeroSection.jsx
      KeyHighlightsSection.jsx
      ProjectCard.jsx
      ProjectDetailsModal.jsx
      ProjectsSection.jsx
      ProjectThumbnail.jsx
      Reveal.jsx
      SectionHeading.jsx
      SectionTransition.jsx
      SecurityMindsetSection.jsx
      SiteFooter.jsx
      SiteHeader.jsx
      SkillsSection.jsx
      StatementSection.jsx
      StickySplitSection.jsx
      ThemeToggle.jsx
  data/
    portfolioData.js
  hooks/
    useTheme.js
  App.jsx
  index.css
```

## Deployment

This project is configured for Netlify.

Netlify settings:

- Build command: `npm run build`
- Publish directory: `dist`
- Node version: `22`
- Site URL environment variable: `VITE_SITE_URL=https://your-netlify-site.netlify.app`

Local production build:

```bash
npm run build
```

Then deploy the generated `dist/` folder, or connect the repository to Netlify and let Netlify build it automatically.

## Notes

- Theme preference is stored in `localStorage`
- The app also respects system theme preference until the user manually toggles the theme
- Public assets such as the resume PDF and profile image live in `public/`
