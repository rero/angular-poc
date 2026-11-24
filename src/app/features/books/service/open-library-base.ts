import { Observable } from 'rxjs';

import { OpenLibraryWork } from '../model/open-library-work.model';
import { OpenLibraryApiResult } from '../model/open-library.model';

export abstract class OpenLibraryBase {
  abstract search(query: string, page: number, limit: number): Observable<OpenLibraryApiResult>;
  abstract getWork(key: string): Observable<OpenLibraryWork>;
}
