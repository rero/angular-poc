import { inject } from "@angular/core";
import { toObservable } from "@angular/core/rxjs-interop";
import { patchState, signalStore, withHooks, withMethods, withState } from "@ngrx/signals";
import { rxMethod } from "@ngrx/signals/rxjs-interop";
import { PaginatorState } from "primeng/paginator";
import { debounceTime, pipe, switchMap, tap } from "rxjs";
import { withPaginator } from "../../../shared/store/paginator-feature";
import { setFulfilled, setPending, withRequestStatus } from "../../../shared/store/request-status-feature";
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

export const OpenLibraryStore = signalStore(
  withState<OpenLibraryState>(initialOpenLibraryState),
  withRequestStatus(),
  withPaginator(),
  withMethods((store, api = inject(OpenLibraryBase)) => ({
    search: rxMethod<string>(
      pipe(
        debounceTime(500),
        tap(() => patchState(store, setPending())),
        switchMap((query: string) => api.search(query, store.pager.currentPage(), store.pager.rows())),
        tap((result: OpenLibraryApiResult) => patchState(
          store,
          { total: result.numFound, filter: result.q, documents: result.docs },
          setFulfilled()
        ))
      )
    ),
    reset(): void {
      patchState(store, { total: 0, filter: '', documents: []})
    },
    setPaginator(paginator: PaginatorState) {
      store.changePage(paginator);
    }
  })),
  withHooks((store) => ({
    onInit: () => {
      toObservable(store.pager).subscribe(() => store.search(store.filter()))
    }
  }))
);
