import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { ApplicationConfig, inject, provideBrowserGlobalErrorListeners, provideEnvironmentInitializer, provideZonelessChangeDetection } from '@angular/core';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideRouter, TitleStrategy } from '@angular/router';
import Lara from '@primeuix/themes/lara';
import { MessageService } from 'primeng/api';
import { providePrimeNG } from 'primeng/config';
import { routes } from './app.routes';
import { OpenLibraryApi } from './features/books/service/open-library-api';
import { OpenLibraryBase } from './features/books/service/open-library-base';
import { AppStateStore } from './shared/appSate/app-state-store';
import { httpResponseErrorInterceptor } from './shared/interceptor/http-response-error-interceptor';
import { PageTitleStrategy } from './shared/page-title-strategy';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZonelessChangeDetection(),
    provideRouter(routes),
    provideHttpClient(
      withInterceptors([httpResponseErrorInterceptor])
    ),
    provideAnimationsAsync(),
    provideEnvironmentInitializer(() => {
      inject(AppStateStore).loadSettings();
    }),
    providePrimeNG({
        ripple: true,
        theme: {
            preset: Lara
        }
    }),
    { provide: TitleStrategy, useClass: PageTitleStrategy },
    { provide: OpenLibraryBase, useClass: OpenLibraryApi },
    MessageService,
    AppStateStore
  ]
};
