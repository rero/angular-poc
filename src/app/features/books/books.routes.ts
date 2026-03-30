import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, ResolveFn, Router, Routes } from '@angular/router';
import { OpenLibraryWork } from './model/open-library-work.model';
import { OpenLibraryBase } from './service/open-library-base';
import { catchError, EMPTY } from 'rxjs';

export const workResolver: ResolveFn<OpenLibraryWork> = (route: ActivatedRouteSnapshot) => {
  const key = route.paramMap.get('key');
  const api = inject(OpenLibraryBase);
  const router = inject(Router);

  if (!key) {
    void router.navigate(['/books']);
    return EMPTY;
  }

  return api.getWork(key).pipe(
    catchError(() => {
      void router.navigate(['/not-found']);
      return EMPTY;
    })
  );
};

export const routes: Routes = [
  {
    path: '',
    title: 'Bibliothèque',
    loadComponent: () => import('./books')
  },
  {
    path: ':key',
    title: 'Détail',
    resolve: {
      work: workResolver,
    },
    loadComponent: () => import('./book-detail')
  },
]
