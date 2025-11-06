import { delay, Observable, of } from 'rxjs';
import { OpenLibraryBase } from './open-library-base';
import { Injectable } from '@angular/core';
import * as data from './open-library-results.json';
import { OpenLibraryApiResult, OpenLibraryRecord } from '../model/open-library.model';

// Docs: https://openlibrary.org/dev/docs/api/search

@Injectable()
export class OpenLibraryMock extends OpenLibraryBase {
  search(query: string, page: number = 1, limit: number = 10): Observable<OpenLibraryApiResult> {
    // no result
    if (!query) {
      return of({
        numFound: 0,
        start: 0,
        q: query,
        docs: [],
      }).pipe(delay(1000));
    }
    let filteredData: OpenLibraryRecord[] = [];
    if (query === '*') {
      filteredData = data;
    } else {
      filteredData = data.filter((result: OpenLibraryRecord) => result.title.includes(query));
    }
    return of({
      numFound: filteredData.length,
      start: page * limit,
      q: query,
      docs: filteredData.slice((page - 1) * limit, page * limit),
    }).pipe(delay(2000));
  }
}
