import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { PaginatorComponent } from '@shared/component/paginator';
import { Book } from './book';
import { Search } from './search';
import { OpenLibraryStore } from './store/open-library.store';

@Component({
  selector: 'app-books',
  imports: [Search, Book, PaginatorComponent],
  templateUrl: './books.html',
  providers: [OpenLibraryStore],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export default class Books {
  protected store = inject(OpenLibraryStore);
}
