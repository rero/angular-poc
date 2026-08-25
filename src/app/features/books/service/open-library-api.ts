import { HttpClient } from '@angular/common/http';
import { inject, Service } from '@angular/core';
import { environment } from '@env/environment';
import { Observable } from 'rxjs';

import { availableFields, OpenLibraryApiResult } from '../model/open-library.model';
import { OpenLibraryWork } from '../model/open-library-work.model';
import { OpenLibraryBase } from './open-library-base';

// Docs: https://openlibrary.org/dev/docs/api/search

@Service({ autoProvided: false })
export class OpenLibraryApi extends OpenLibraryBase {
  private client = inject(HttpClient);

  readonly entryPoint = `${environment.openLibraryApiUrl}/search.json`;

  search(query: string, page = 1, limit = 10): Observable<OpenLibraryApiResult> {
    const fields = availableFields.join(',');
    return this.client.get<OpenLibraryApiResult>(
      `${this.entryPoint}?q=${query}&page=${page}&limit=${limit}&fields=${fields}`,
    );
  }

  getWork(key: string): Observable<OpenLibraryWork> {
    return this.client.get<OpenLibraryWork>(`${environment.openLibraryApiUrl}/works/${key}.json`);
  }
}
