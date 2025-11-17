import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { Settings } from "./model/settings.model";
import { userData } from "./model/user.data";
import { User } from "./model/user.model";


@Injectable({ providedIn: 'root' })
export class AppStateApi {
  getUser(): User {
    return userData;
  }

  getSettings(): Observable<Settings> {
    return of({
      availableLanguages: ["de", "en", "fr"],
      currentLanguage: "fr",
    });
  }
}
