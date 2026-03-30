import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    loadComponent: () => import('./features/home/home'),
    title: 'Home'
  },
  {
    path: 'login',
    pathMatch: 'full',
    loadComponent: () => import('./features/login/login'),
    title: 'Login'
  },
  {
    path: 'todo',
    pathMatch:'full',
    loadComponent: () => import('./features/todo/todo'),
    title: 'Tâches'
  },
  {
    path: 'books',
    loadChildren: () => import('./features/books/books.routes').then(m => m.routes),
  },
  {
    path: '**',
    loadComponent: () => import('./features/not-found/not-found'),
    title: 'Not Found'
  }
];
