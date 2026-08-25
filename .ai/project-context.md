# Project Context

## Stack

- Angular 22
- Standalone components
- TypeScript strict mode
- Zoneless change detection (Zone.js disabled)
- NgRx Signal Store for application state
- Signals preferred over RxJS
- @openng/optimus-ui as UI component library (Tailwind CSS-based)
- Vitest for testing
- Node ^22.22.3 || ^24.15.0 || >=26.0.0 (per @angular/cli's engines requirement)
- pnpm as package manager

## Architecture principles

- Business logic should be isolated from Angular when possible.
- Prefer pure functions for reusable logic.
- Angular components should remain thin and focused on UI.

## Folder conventions

src/app/features
src/app/shared

- features: A feature contains all the components that make it work (model, service, store)
- shared: elements shared across multiple features

## Testing philosophy

- Prefer unit tests without Angular when possible.
- Use TestBed only when Angular integration is required.
- Tests must run with Vitest.

## State management

State management uses **NgRx Signal Store**.

Rules:

- Application state must use NgRx Signal Store.
- Component-local state should use Angular Signals.
- Do not use NgRx reducers/effects/store module.
- Do not introduce BehaviorSubject-based stores.

## Change detection

The application runs in **zoneless mode**.

Rules:

- Zone.js is not used.
- Change detection must rely on Angular Signals.
- Avoid patterns depending on automatic zone-based updates.
