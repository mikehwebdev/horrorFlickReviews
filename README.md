# Mikey's Horror Flick Reviews

A React-based horror movie review app that combines curated local reviews with live movie data, giving users a fast, accessible way to discover films and contribute their own feedback.

## Live Project

- **Live Demo:** https://horrorflickreviews.netlify.app/
- **Source Code:** https://github.com/mikehwebdev/horrorFlickReviews

## Features

- Search movies using OMDb API data
- View curated horror film reviews alongside fetched movie details
- Add and manage user reviews with browser persistence (`localStorage`)
- Conditional UI states for loading, empty, and error scenarios
- Responsive layout designed for desktop and mobile use
- Route-based navigation using React Router

## Tech Stack

- React
- Vite
- React Router
- JavaScript (ES6+)
- CSS
- OMDb API

## Getting Started

### Prerequisites

- Node.js (v18+ recommended)
- npm

### Installation

```bash
npm install
```

### Run locally

```bash
npm run dev
```

### Build for production

```bash
npm run build
```

## Technical Decisions

- **Component-driven architecture:** Broke UI into reusable components to reduce duplication and improve maintainability.
- **State + persistence strategy:** Combined fetched API data with local review data and persisted user-generated content in `localStorage`.
- **Routing approach:** Used layout and nested route patterns to keep navigation and page structure consistent.

## Accessibility & UX

- Built with semantic structure and clear content hierarchy
- Designed for readability across screen sizes
- Added user feedback states (loading/error/empty) to improve clarity during async actions
- Iterated on complex interactive sections after accessibility review and learning

## Challenges & Learnings

- Merging external API responses with local review data while keeping UI predictable
- Debugging persisted state from `localStorage` during development
- Managing similar-but-different UI variants without overcomplicating components
- Strengthening error handling as a core part of data-fetching, not an afterthought

## Future Improvements

- Refactor complex UI variants into simpler, more composable patterns
- Improve search to blend local and remote results in a single streamlined experience
- Continue accessibility improvements with keyboard-first and screen reader checks

## About Me

I’m a junior frontend developer focused on building practical, user-friendly interfaces with React.
This project reflects my approach to clean component structure, resilient state handling, and iterative improvement through real-world problem solving.

- **LinkedIn:** https://www.linkedin.com/in/michael-hatton-29927b95/
- **Portfolio:** https://www.mikehatton.net/
