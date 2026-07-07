# Inspiratia Test

Inspiratia Test is a Next.js application that displays a paginated table of posts fetched from the public JSONPlaceholder API. The UI includes a sidebar menu, a Redux-driven header title, a filter panel, and a details modal for each row.

## Features

- Fetches post data from `https://jsonplaceholder.typicode.com/posts`
- Filters rows by `id`, `userId`, `title`, and `body`
- Supports pagination and page-size selection
- Opens a details modal when a row is clicked
- Uses Redux Toolkit + React Redux for layout state (menu/header title)
- Uses a split layout with sidebar, top header, and main content area
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
- `npm run test` - run the Vitest test suite

## Testing

This project uses Vitest with Testing Library and a `jsdom` environment.

Run tests with:

```bash
npm run test
```

## Project Structure

- `app/page.tsx` - main posts table, data loading, filtering, pagination, and details modal
- `app/layout.tsx` - root layout with Providers, Sidebar, and Header
- `app/_components/Filtering.tsx` - filter form used by the page
- `app/_components/Sidebar.tsx` - navigation and title updates through Redux
- `app/_components/Header.tsx` - top navigation bar using Redux title state
- `app/_components/Providers.tsx` - React Redux provider wrapper
- `lib/store.tsx` - Redux Toolkit store and menu slice
- `lib/models/Item.tsx` - post item model
- `app/__tests__/Filtering.test.tsx` - component tests for Filtering behavior
- `vitest.config.ts` - test runner configuration
- `vitest.setup.ts` - global test setup
- `app/globals.css` - global styles

## Notes

- The app depends on an external API, so network access is required for the table to populate.
- Font Awesome is used for the filter icon and related UI elements.
- The project is deployed on Vercel at https://inspiratia-gold.vercel.app/.
