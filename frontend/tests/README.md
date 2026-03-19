# Frontend Tests

This folder contains frontend tests for the Productify React app.

## Stack

- Vitest as the runner
- `@testing-library/react` for rendering and assertions through the UI
- `@testing-library/user-event` for realistic user interactions
- JSDOM as the browser environment

## Structure

- `components/` covers reusable UI behavior
- `components/home/` covers homepage-specific building blocks
- `components/product/` covers product detail and product form building blocks
- `components/profile/` covers profile-specific building blocks
- `screens/` covers screen-level behavior and composed flows
- `router/` covers route protection and navigation behavior

## Run

```bash
bun run test
```

Watch mode:

```bash
bun run test:watch
```
