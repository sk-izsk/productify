# Productify

Full-stack product showcase app built with a modern TypeScript stack.

![Productify Preview](frontend/public/image.png)

## Overview

Productify is a PERN-style application with Clerk authentication, product CRUD, and comment support.

- Frontend: React + Vite + React Router + React Query + Ky + Tailwind CSS + DaisyUI
- Backend: Express + Drizzle ORM + PostgreSQL + Clerk middleware
- Language: TypeScript across frontend and backend

## Project Structure

```text
.
├── backend/
│   ├── src/
│   │   ├── config/
│   │   ├── controllers/
│   │   ├── db/
│   │   ├── routes/
│   │   └── utils/
│   └── drizzle.config.ts
├── frontend/
│   ├── public/
│   └── src/
│       ├── api/
│       ├── components/
│       ├── contexts/
│       ├── hooks/
│       ├── providers/
│       └── screen/
└── README.md
```

## Features

- Clerk-based authentication and protected routes
- User sync from Clerk to local PostgreSQL user table
- Product management (create, read, update, delete)
- Product ownership checks for update/delete authorization
- Comments per product
- Cache-aware React Query mutations for comments/products
- API client abstraction with Ky + auth token injection

## Tech Stack

### Frontend

- React 19
- Vite
- React Router 7
- React Query
- Ky
- Tailwind CSS 4
- DaisyUI
- Lucide icons

### Backend

- Express 5
- Drizzle ORM
- PostgreSQL (Neon)
- Clerk Express SDK
- TypeScript + ts-node + nodemon

## Environment variables

Copy the example files and fill in real values:

```bash
cp frontend/.env.example frontend/.env
cp backend/.env.example backend/.env
```

### frontend/.env

```env
VITE_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
VITE_API_URL=http://localhost:3020/api
```

### backend/.env

```env
PORT=3020
DATABASE_URL=your_postgres_connection_string
NODE_ENV=development
CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
CLERK_SECRET_KEY=your_clerk_secret_key
FRONTEND_URL=http://localhost:5173
FRONTEND_URLS=http://localhost:5173
```

Notes:

- Frontend and backend must use keys from the same Clerk instance.
- `FRONTEND_URLS` accepts a comma-separated list. Useful for local dev plus deployed frontend.

## Getting Started

### 1. Install dependencies

From the repository root:

```bash
bun install
```

### 2. Run backend

```bash
cd backend
bun dev
```

### 3. Run frontend

```bash
cd frontend
bun start
```

### 4. Push schema changes (when needed)

```bash
cd backend
bun run db:push
```

## API Endpoints

Base URL: `http://localhost:3020/api`

### User

- `POST /users/sync` sync authenticated Clerk user to DB

### Products

- `GET /products` list all products
- `GET /products/:id` get product details
- `GET /products/my` list current user products
- `POST /products` create product (auth required)
- `PUT /products/:id` update product (auth + owner required)
- `DELETE /products/:id` delete product (auth + owner required)

### Comments

- `POST /comments/:productId` create comment (auth required)
- `DELETE /comments/:commentId` delete comment (auth + owner required)
- `GET /comments/my` current user comments
- `GET /comments/:commentId` single comment

## Architecture Notes

- Backend auth helper: `requireUserId(request, response)` centralizes unauthorized handling.
- Frontend auth state is managed via context provider and consumed by protected routes.
- React Query cache updates are used for delete flows to avoid unnecessary refetches.
- Drizzle relations are used for joined reads (product with user + comments + comment user).

## Latest Improvements

- Refactored product cards into a compound component API for clearer composition in Home screen.
- Refactored create/edit product UI into a shared `ProductForm` compound component.
- Extracted shared product form state logic into a reusable custom hook.
- Improved product CTA behavior: signed-in users now go directly to `/create`, while signed-out users open Clerk sign-in modal.
- Replaced broad `Partial<Product>` usage in core frontend product flows with stricter product and product-write types.
- Improved delete comment/product UX with cache-first updates instead of full endpoint refetches.
- Fixed post-delete 404 detail refetch behavior by avoiding active query removal during redirect flow.
- Removed frontend and backend debug logs/middleware noise and kept meaningful error logging.
- Preserved and verified build stability after refactors (`frontend` and `backend` TypeScript builds pass).

## My Accomplishments

- Set up full frontend and backend TypeScript architecture
- Implemented Clerk auth integration end-to-end
- Added route protection for private pages and API actions
- Built reusable API layer with Ky and centralized auth token behavior
- Implemented product detail, create, edit, and delete flows
- Built comments flow with create/delete and query invalidation
- Migrated and fixed schema mismatch issues (`text` vs `uuid`) in comments relation
- Fixed router configuration issues for React Router `Routes`/`Route` composition
- Improved runtime and type-safety fixes in params, mutation payloads, and hooks

## Screens

![App Visual](frontend/public/image.png)

## Health Check

- Backend root: `GET /`
- Backend health: `GET /api/health`

## Deployment

Recommended zero-cost demo stack:

- Frontend: Vercel
- Backend: Render web service
- Database: Neon Postgres
- Auth: Clerk

### 1. Create Neon database

- Create a free Neon project.
- Copy the pooled Postgres connection string.
- Use that value for `DATABASE_URL` in Render.

### 2. Configure Clerk

- Create or reuse a Clerk application.
- Copy the publishable key and secret key.
- Add your Vercel production URL to Clerk allowed origins and redirect URLs.

### 3. Deploy backend to Render

- Create a new Web Service from this repo.
- Choose `backend` as the root directory.
- Environment: Docker.
- Render will use [`backend/Dockerfile`](backend/Dockerfile).

Set these environment variables in Render:

```env
DATABASE_URL=your_neon_connection_string
NODE_ENV=production
CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
CLERK_SECRET_KEY=your_clerk_secret_key
FRONTEND_URL=https://your-app.vercel.app
FRONTEND_URLS=http://localhost:5173,https://your-app.vercel.app
```

Optional health check path:

```text
/api/health
```

### 4. Push database schema

After first backend deploy, run schema push once against Neon:

```bash
cd backend
DATABASE_URL=your_neon_connection_string bun run db:push
```

### 5. Deploy frontend to Vercel

- Import this repo into Vercel.
- Set `frontend` as the project root.
- Framework preset: Vite.

Set these environment variables in Vercel:

```env
VITE_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
VITE_API_URL=https://your-render-service.onrender.com/api
```

### 6. Final checks

- Open frontend on Vercel.
- Sign in with Clerk.
- Confirm `/api/health` works on Render.
- Create product and comment to verify DB writes.

### Free-tier tradeoffs

- Render free services sleep when idle, so first request can be slow.
- Neon free is great for demos and portfolio projects, but it still has storage and compute limits.
- Clerk free is enough for a portfolio app unless traffic grows a lot.

## Future Improvements

- Add tests for controllers and hooks
- Add pagination and search/filter for products
- Add optimistic UI updates for comments
- Add image upload storage service integration
- Add Docker setup for local development parity
