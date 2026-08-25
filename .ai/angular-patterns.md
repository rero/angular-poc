# Angular Patterns

# Zoneless component pattern

Components rely on signals for UI updates.

Example:

@Component({
  selector: 'app-counter'
})
export class CounterComponent {

  store = inject(CounterStore);

  count = this.store.count;

}

## NgRx Signal Store

Application state should be implemented using NgRx Signal Store.

Example pattern:

import { signalStore, withState, withMethods } from '@ngrx/signals';

export const CounterStore = signalStore(
  { providedIn: 'root' },

  withState({
    count: 0
  }),

  withMethods((store) => ({
    increment() {
      store.count.update(v => v + 1);
    }
  }))
  )

Usage in component:

@Component({
  selector: 'app-counter'
})
export class CounterComponent {
  store = inject(CounterStore);
}

## UI components with optimus-ui

UI components come from `@openng/optimus-ui`, imported per-component from their subpath.

Example:

import { Component, input, output } from '@angular/core';
import { Paginator, PaginatorState } from '@openng/optimus-ui/paginator';

@Component({
  selector: 'app-list',
  imports: [Paginator],
  template: `
    <p-paginator
      [first]="first()"
      [rows]="rows()"
      [totalRecords]="total()"
      (onPageChange)="pageChange.emit($event)" />
  `
})
export class ListComponent {
  first = input.required<number>();
  rows = input.required<number>();
  total = input.required<number>();
  pageChange = output<PaginatorState>();
}
