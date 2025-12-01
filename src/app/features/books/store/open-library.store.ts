import { inject } from "@angular/core";
import { toObservable } from "@angular/core/rxjs-interop";
import { patchState, signalStore, withHooks, withMethods, withState } from "@ngrx/signals";
import { rxMethod } from "@ngrx/signals/rxjs-interop";
import { Pager, withPaginator } from "@shared/store/paginator-feature";
import { setFulfilled, setPending, withRequestStatus } from "@shared/store/request-status-feature";
import { debounceTime, pipe, skip, switchMap, tap } from "rxjs";
import { OpenLibraryApiResult, OpenLibraryRecord } from "../model/open-library.model";
import { OpenLibraryBase } from "../service/open-library-base";

type OpenLibraryState = {
  total: number;
  filter: string;
  documents: OpenLibraryRecord[];
};

const initialOpenLibraryState = {
  total: 0,
  filter: '',
  documents: []
};

const initialPagerConfig: Pager = {
  page: 1,
  first: 1,
  rows: 9,
  rowsPerPageOptions: [9, 18, 36]
}

export const OpenLibraryStore = signalStore(
  withState<OpenLibraryState>(initialOpenLibraryState),
  withRequestStatus(),
  withPaginator(initialPagerConfig),
  withMethods((store, api = inject(OpenLibraryBase)) => ({
    search: rxMethod<string>(
      pipe(
        debounceTime(500),
        tap(() => patchState(store, setPending())),
        switchMap((query: string) => api.search(query, store.pager.page(), store.pager.rows())),
        tap((result?: OpenLibraryApiResult) => {
          if (result) {
            patchState(
              store,
              { total: result.numFound, filter: result.q, documents: result.docs },
            );
          }
          patchState(store, setFulfilled());
        }
      )
    )),
    reset(): void {
      patchState(store, { total: 0, filter: '', documents: []});
    },
  })),
  withHooks((store) => ({
    onInit: () => {
      // skip: Skip the provided number of emitted values.
      toObservable(store.pager).pipe(skip(1)).subscribe(() => store.search(store.filter()));
    }
  }))
);
