import { Component, computed, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { Avatar } from 'primeng/avatar';
import { Menubar } from 'primeng/menubar';
import { TieredMenu } from 'primeng/tieredmenu';
import { AppStateStore } from '../../shared/appSate/app-state-store';
import { ConnectedUser } from '../connected-user/connected-user';

@Component({
  selector: 'app-menu',
  imports: [Avatar, Menubar, ConnectedUser, TieredMenu],
  templateUrl: './menu.html',
})
export class Menu {
  protected readonly store = inject(AppStateStore);
  protected readonly router = inject(Router);

  items = signal([
    {
      label: 'Accueil',
      routerLink: ['/']
    },
    {
      label: 'Tâche',
      routerLink: ['/', 'todo']
    },
    {
      label: 'Livres',
      routerLink: ['/', 'books']
    }
  ]);

  userItems = computed(() => [
    {
      label: "S'identifier",
      visible: !this.store.isConnected(),
      command: () => {
        this.router.navigate(['login']);
      }
    },
    {
      label: 'Se déconnecter',
      visible: this.store.isConnected(),
      command: () => {
        this.store.logout();
      }
    }
  ]
  );
}
