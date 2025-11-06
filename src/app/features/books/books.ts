import { Component, inject, Signal } from '@angular/core';
import { deepComputed } from '@ngrx/signals';
import { Divider } from 'primeng/divider';
import { PaginatorComponent, PaginatorConfig } from '../../shared/component/paginator';
import { Book } from './book';
import { Search } from './search';
import { OpenLibraryStore } from './store/open-library.store';

@Component({
  selector: 'app-books',
  imports: [Search, Book, Divider, PaginatorComponent],
  templateUrl: './books.html',
  providers: [OpenLibraryStore]
})
export default class Books {
  protected store = inject(OpenLibraryStore);

  protected paginatorConfig: Signal<PaginatorConfig> = deepComputed(() => ({
    first: this.store.pager.firstRecord(),
    rows: this.store.pager.rows(),
    total: this.store.total()
  }));
}
