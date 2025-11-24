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
    title: 'Document'
  },
  {
    path: 'books',
    loadComponent: () => import('./features/books/books'),
    title: 'Bibliothèque'
  },
  {
    path: '**',
    loadComponent: () => import('./features/not-found/not-found'),
    title: 'Not Found'
  }
];
