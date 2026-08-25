import { computed, inject } from "@angular/core";
import { patchState, signalStore, withComputed, withMethods, withState } from "@ngrx/signals";
import { firstValueFrom } from "rxjs";

import { AppStateApi } from "./app-state-api";
import { Settings } from "./model/settings.model";
import { User } from "./model/user.model";

export interface AppState {
  user: Partial<User>,
  settings: Settings
}

const initialAppState: AppState = {
  user: {},
  settings: {
    availableLanguages: ["fr"],
    currentLanguage: "fr",
  }
}

export const AppStateStore = signalStore(
  { providedIn: 'root' },
  withState<AppState>(initialAppState),
  withComputed((store) => ({
    isConnected: computed(() => 'id' in store.user())
  })),
  withMethods((store, appStateApi = inject(AppStateApi)) => ({
    async loadSettings() {
      const settings = await firstValueFrom(appStateApi.getSettings());
      patchState(store, { user: {}, settings });
    },
    login(user: User) {
      patchState(store, { user })
    },
    logout() {
      patchState(store, { user: {}})
    }
  }))
);
