import { Component, input } from '@angular/core';
import { OpenLibraryRecord } from './model/open-library.model';

@Component({
  selector: 'app-book',
  imports: [],
  template: `
    <div class="flex flex-col">
      <h1>{{ book().title }}</h1>
      @if (book().author_name) {
        <div><span class="font-bold">Auteurs:</span> {{ book().author_name.join(', ') }}</div>
      }
      @if (book().language) {
        <div><span class="font-bold">Langues:</span> {{ book().language.join(', ') }}</div>
      }
    </div>
  `
})
export class Book {
  book = input.required<OpenLibraryRecord>();
}
