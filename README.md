# Inspiratia Test

Inspiratia Test is a Next.js application that displays a paginated table of posts fetched from the public JSONPlaceholder API. The UI includes a left navigation panel, a top header, and a filter drawer that lets you narrow results by post ID, user ID, title, or body text.

## Features

- Fetches post data from `https://jsonplaceholder.typicode.com/posts`
- Filters rows by `id`, `userId`, `title`, and `body`
- Supports pagination and page-size selection
- Uses a split layout with a sidebar and a main content area
- Built with Next.js, React, TypeScript, and Tailwind CSS

## Getting Started

### Prerequisites

- Node.js and npm

### Install dependencies

```bash
npm install
```

### Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Available Scripts

- `npm run dev` - start the Next.js development server
- `npm run build` - create a production build
- `npm run start` - run the production server
- `npm run lint` - run ESLint

## Project Structure

- `app/page.tsx` - main table view, data loading, filtering, and pagination
- `app/layout.tsx` - root layout and page shell
- `app/_components/Filtering.tsx` - filter form used by the page
- `app/_components/models/Item.tsx` - simple data model for post items
- `app/globals.css` - global styles

## Notes

- The app depends on an external API, so network access is required for the table to populate.
- Font Awesome is used for the filter icon and related UI elements.
- The project is deployed on Vercel at https://inspiratia-gold.vercel.app/.
