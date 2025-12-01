import { patchState, signalMethod, signalStoreFeature, withMethods, withState } from "@ngrx/signals";
import { PaginatorState } from "primeng/paginator";

export type Pager = {
  page: number;
  first: number;
  rows: number;
  rowsPerPageOptions: number[];
};

export type Paginator = {
  pager: Pager;
}

export function withPaginator(pager: Pager) {
  return signalStoreFeature(
    withState<Paginator>({
      pager: pager
    }),
    withMethods((store) => ({
      changePage: signalMethod<PaginatorState>(event => {
        if (event.rows !== store.pager.rows()) {
          event.page = 0;
          event.first = 1;
        }
        patchState(store, {
          pager: {
            page: (event.page || 0) + 1,
            first: (event.page || 0) * (event.rows || pager.rows) + 1,
            rows: (event.rows || pager.rows),
            rowsPerPageOptions: store.pager().rowsPerPageOptions
          }
        });
      }),
    }))
  );
}
