import { Observable } from "rxjs";
import { OpenLibraryApiResult } from "../model/open-library.model";

export abstract class OpenLibraryBase {
  abstract search(query: string, page:number, limit: number): Observable<OpenLibraryApiResult> ;
}
