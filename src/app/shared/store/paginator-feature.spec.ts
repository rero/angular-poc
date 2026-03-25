import { TestBed } from '@angular/core/testing';
import { signalStore } from '@ngrx/signals';
import { Pager, withPaginator } from './paginator-feature';

const defaultPager: Pager = {
  page: 1,
  first: 1,
  rows: 10,
  rowsPerPageOptions: [10, 25, 50],
};

function createStore(pager: Pager = defaultPager) {
  const Store = signalStore(withPaginator(pager));
  TestBed.configureTestingModule({ providers: [Store] });
  return TestBed.inject(Store);
}

describe('withPaginator()', () => {
  it('initializes with the provided pager state', () => {
    const store = createStore();
    expect(store.pager()).toEqual(defaultPager);
  });

  it('changes page correctly when rows stay the same', () => {
    const store = createStore();
    TestBed.runInInjectionContext(() =>
      store.changePage({ page: 1, rows: 10, first: 11, pageCount: 5 })
    );
    expect(store.pager().page).toBe(2);
    expect(store.pager().first).toBe(11);
    expect(store.pager().rows).toBe(10);
  });

  it('resets to first page when rows per page changes', () => {
    const store = createStore();
    TestBed.runInInjectionContext(() =>
      store.changePage({ page: 2, rows: 25, first: 51, pageCount: 5 })
    );
    expect(store.pager().page).toBe(1);
    expect(store.pager().first).toBe(1);
    expect(store.pager().rows).toBe(25);
  });

  it('preserves rowsPerPageOptions when changing page', () => {
    const store = createStore();
    TestBed.runInInjectionContext(() =>
      store.changePage({ page: 1, rows: 10, first: 11, pageCount: 5 })
    );
    expect(store.pager().rowsPerPageOptions).toEqual([10, 25, 50]);
  });

  it('handles page 0 (first page) correctly', () => {
    const store = createStore();
    TestBed.runInInjectionContext(() =>
      store.changePage({ page: 0, rows: 10, first: 1, pageCount: 5 })
    );
    expect(store.pager().page).toBe(1);
    expect(store.pager().first).toBe(1);
  });

  it('falls back to initial rows when event rows is undefined', () => {
    const store = createStore();
    TestBed.runInInjectionContext(() =>
      store.changePage({ page: 2, rows: undefined as unknown as number, first: 21, pageCount: 5 })
    );
    expect(store.pager().rows).toBe(defaultPager.rows);
  });
});
