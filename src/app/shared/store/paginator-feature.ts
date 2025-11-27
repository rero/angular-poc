import { patchState, signalMethod, signalStoreFeature, withMethods, withState } from "@ngrx/signals";
import { PaginatorState } from "primeng/paginator";

export type Paginator = {
  pager: {
    currentPage: number;
    firstRecord: number;
    rows: number;
  }
}

const paginatorInitialState: Paginator = {
  pager: {
    currentPage: 1,
    firstRecord: 1,
    rows: 10
  }
};

export function withPaginator() {
  return signalStoreFeature(
    withState<Paginator>(paginatorInitialState),
    withMethods((store) => ({
      changePage: signalMethod<PaginatorState>(event => {
        if (event.rows !== store.pager.rows()) {
          event.page = 0;
          event.first = 1;
        }
        patchState(store, {
          pager: {
            currentPage: (event.page || 0) + 1,
            firstRecord: (event.page || 0) * (event.rows || 10) + 1,
            rows: (event.rows || 10)
          }
        });
      }),
    }))
  );
}
