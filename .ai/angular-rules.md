# Angular Rules

Framework version: Angular 22

## Core rules

- Use standalone components only (default since Angular 19, no need to set `standalone: true` explicitly).
- Do not introduce NgModules.
- Prefer Angular Signals for local state.
- Avoid RxJS when Signals are sufficient.
- Use strict TypeScript typing.
- Use `@openng/optimus-ui` components for UI needs instead of building custom widgets or reintroducing PrimeNG.

## Component design

- Components must remain small and focused on UI.
- Business logic should not live inside components.
- Move reusable logic to services or pure functions.

## Dependency injection

- Avoid unnecessary services.
- Prefer simple utility functions when Angular DI is not needed.

## State management

State management rules:

1. Local component state → Angular Signals
2. Application state → NgRx Signal Store

Use:

- @ngrx/signals
- signalStore
- withState
- withMethods
- withComputed
- signalStoreFeature

Do not use:

- NgRx Store (createReducer, createEffect)
- BehaviorSubject stores
- custom RxJS state services

## Code quality

- Avoid the use of `any`.
- Prefer explicit types.
- Keep functions small and testable.

## Zoneless mode

This project runs without Zone.js.

Rules:

- Do not rely on zone-based change detection.
- Prefer Angular Signals to trigger updates.
- Avoid patterns requiring `NgZone`.
- Do not introduce `zone.js` dependencies.
