# Space News Explorer

A modern and responsive web application that displays the latest space-related news, blogs, and reports using the Spaceflight News API.

**Live Demo:** [https://space-news-explorer-alpha.vercel.app/](https://space-news-explorer-alpha.vercel.app/)

---

## Features

- Browse **Articles**, **Blogs**, and **Reports** using tab navigation
- Real-time search with **debounce** (400ms)
- Pagination with "Load more"
- Featured news horizontal slider
- Skeleton loading states with shimmer effect
- Error handling with retry option
- Empty state when no results are found
- Fully responsive design (mobile, tablet, and desktop)
- Dark space-themed UI
- Back to top button
- Accessible (keyboard navigation + alt texts)

---

## Tech Stack

- **React 19** + **TypeScript**
- **Vite**
- **Tailwind CSS**
- Custom Hooks (`useDebounce`, `useNews`)
- Spaceflight News API (v4)
- Deployed on **Vercel**

---

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm

### Installation

```bash
# Clone the repository
git clone https://github.com/Surendra-Bhujel/space-news-explorer.git

# Go into the project folder
cd space-news-explorer

# Install dependencies
npm install

# Start the development server
npm run dev
