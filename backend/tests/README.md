# Backend End-to-End Tests

This folder contains backend end-to-end coverage for the Productify API.

## Stack

- Vitest as the test runner
- Chai for assertions
- Supertest for HTTP requests against the Express app

## Structure

- `e2e/` contains API flow tests
- `helpers/` contains shared test utilities

## Authentication in Tests

When `NODE_ENV=test`, authenticated routes accept the `x-test-user-id` request header.
This only applies to the test environment. Normal backend runs still use Clerk middleware.

## Environment

The test suite reads `.env.test` first, then falls back to `.env`.

Recommended test variables:

```env
NODE_ENV=test
PORT=3020
DATABASE_URL_TEST=your_test_database_url
FRONTEND_URL=http://localhost:5173
```

If `DATABASE_URL_TEST` is not set, the backend falls back to `DATABASE_URL`.

## Run

```bash
bun run test:e2e
```
