import { provideHttpClient } from '@angular/common/http';
import { ApplicationConfig, inject, provideBrowserGlobalErrorListeners, provideEnvironmentInitializer, provideZonelessChangeDetection } from '@angular/core';
import { provideRouter, TitleStrategy } from '@angular/router';
import { MessageService } from '@openng/optimus-ui/api';
import { provideOptimus } from '@openng/optimus-ui/config';
import Lara from '@openng/optimus-ui-themes/lara';
import { AppStateStore } from '@shared/appSate/app-state-store';
import { PageTitleStrategy } from '@shared/page-title-strategy';

import { routes } from './app.routes';
import { OpenLibraryBase } from './features/books/service/open-library-base';
import { OpenLibraryMock } from './features/books/service/open-library-mock';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZonelessChangeDetection(),
    provideRouter(routes),
    provideHttpClient(),
    provideEnvironmentInitializer(() => {
      inject(AppStateStore).loadSettings();
    }),
    provideOptimus({
        ripple: true,
        theme: {
            preset: Lara
        }
    }),
    { provide: TitleStrategy, useClass: PageTitleStrategy },
    { provide: OpenLibraryBase, useClass: OpenLibraryMock },
    MessageService,
    AppStateStore
  ]
};
