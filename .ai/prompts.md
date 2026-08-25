# Prompt Templates

These prompt templates help guide the LLM when performing common tasks in this repository.

## Fix Angular test

Goal: fix this failing or broken test.

Constraints:

- do not change business logic
- use Vitest APIs (`vi.fn`, `vi.spyOn`, etc.)
- keep TestBed only if Angular integration is required

## Refactor Angular component

Goal: simplify this component.

Constraints:

- Angular 22
- standalone components only
- do not introduce NgModules
- move business logic outside components when possible
- avoid RxJS if Angular Signals are sufficient
- use `@openng/optimus-ui` components instead of custom widgets or PrimeNG

## Improve typing

Goal: improve TypeScript typing.

Constraints:

- do not introduce `any`
- prefer explicit types
- keep code compatible with strict TypeScript mode

## Write unit test

Goal: write a unit test for the provided code.

Constraints:

- use Vitest
- prefer pure function testing
- avoid TestBed unless Angular integration is required
- keep the test minimal and readable
