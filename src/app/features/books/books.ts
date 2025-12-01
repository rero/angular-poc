import { Component, inject } from '@angular/core';
import { Book } from './book';
import { Search } from './search';
import { OpenLibraryStore } from './store/open-library.store';
import { PaginatorComponent } from '@shared/component/paginator';

@Component({
  selector: 'app-books',
  imports: [Search, Book, PaginatorComponent],
  templateUrl: './books.html',
  providers: [OpenLibraryStore]
})
export default class Books {
  protected store = inject(OpenLibraryStore);
}
