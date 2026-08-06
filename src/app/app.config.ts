import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { ApplicationConfig, inject, provideBrowserGlobalErrorListeners, provideEnvironmentInitializer, provideZonelessChangeDetection } from '@angular/core';
import { provideRouter, TitleStrategy } from '@angular/router';
import Aura from '@openng/optimus-ui-themes/aura';
import { AppStateStore } from '@shared/appSate/app-state-store';
import { httpResponseErrorInterceptor } from '@shared/interceptor/http-response-error-interceptor';
import { PageTitleStrategy } from '@shared/page-title-strategy';
import { MessageService } from '@openng/optimus-ui/api';
import { provideOptimus } from '@openng/optimus-ui/config';
import { routes } from './app.routes';
import { OpenLibraryApi } from './features/books/service/open-library-api';
import { OpenLibraryBase } from './features/books/service/open-library-base';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZonelessChangeDetection(),
    provideRouter(routes),
    provideHttpClient(
      withInterceptors([httpResponseErrorInterceptor])
    ),
    provideEnvironmentInitializer(() => {
      inject(AppStateStore).loadSettings();
    }),
    provideOptimus({
        ripple: true,
        theme: {
          preset: Aura
      }
    }),
    { provide: TitleStrategy, useClass: PageTitleStrategy },
    { provide: OpenLibraryBase, useClass: OpenLibraryApi },
    MessageService,
    AppStateStore
  ]
};
