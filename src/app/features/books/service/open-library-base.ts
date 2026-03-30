import { Observable } from "rxjs";
import { OpenLibraryApiResult } from "../model/open-library.model";
import { OpenLibraryWork } from "../model/open-library-work.model";

export abstract class OpenLibraryBase {
  abstract search(query: string, page: number, limit: number): Observable<OpenLibraryApiResult>;
  abstract getWork(key: string): Observable<OpenLibraryWork>;
}
