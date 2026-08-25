import { Service } from '@angular/core';
import { delay, Observable, of } from 'rxjs';

import { OpenLibraryApiResult, OpenLibraryRecord } from '../model/open-library.model';
import { OpenLibraryWork } from '../model/open-library-work.model';
import { OpenLibraryBase } from './open-library-base';
import data from './open-library-results.json';

// Docs: https://openlibrary.org/dev/docs/api/search

@Service({ autoProvided: false })
export class OpenLibraryMock extends OpenLibraryBase {
  getWork(key: string): Observable<OpenLibraryWork> {
    const record = (data as OpenLibraryRecord[]).find((r) => r.key === `/works/${key}`);
    return of({
      key: `/works/${key}`,
      title: record?.title ?? 'Inconnu',
    }).pipe(delay(500));
  }

  search(query: string, page = 1, limit = 10): Observable<OpenLibraryApiResult> {
    // no result
    if (!query) {
      return of({
        numFound: 0,
        start: 0,
        q: query,
        docs: [],
      }).pipe(delay(1000));
    }
    const filteredData: OpenLibraryRecord[] =
      query === '*' ? data : data.filter((result: OpenLibraryRecord) => result.title.includes(query));
    return of({
      numFound: filteredData.length,
      start: page * limit,
      q: query,
      docs: filteredData.slice((page - 1) * limit, page * limit),
    }).pipe(delay(2000));
  }
}
