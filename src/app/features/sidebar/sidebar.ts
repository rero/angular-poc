import { Component, computed, inject, signal } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { Avatar } from 'primeng/avatar';
import { AppStateStore } from '../../shared/appSate/app-state-store';
import { LayoutService } from '../../shared/layout/layout.service';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, Avatar],
  templateUrl: './sidebar.html',
})
export class Sidebar {
  protected readonly store = inject(AppStateStore);
  protected readonly router = inject(Router);
  protected readonly layoutService = inject(LayoutService);

  expanded = this.layoutService.sidebarExpanded;

  toggle() {
    this.layoutService.toggleSidebar();
  }

  formattedUserName = computed(() => {
    const user = this.store.user();
    if (user.firstName && user.lastName) {
      return `${user.firstName.charAt(0)}. ${user.lastName}`;
    }
    return '';
  });

  items = signal([
    {
      label: 'Accueil',
      icon: 'pi pi-home',
      routerLink: ['/']
    },
    {
      label: 'Tâche',
      icon: 'pi pi-check-square',
      routerLink: ['/', 'todo']
    },
    {
      label: 'Bibliothèque',
      icon: 'pi pi-book',
      routerLink: ['/', 'books']
    }
  ]);

  userItems = computed(() => [
    {
      label: "S'identifier",
      icon: 'pi pi-sign-in',
      visible: !this.store.isConnected(),
      command: () => {
        this.router.navigate(['login']);
      }
    },
    {
      label: 'Se déconnecter',
      icon: 'pi pi-sign-out',
      visible: this.store.isConnected(),
      command: () => {
        this.store.logout();
      }
    }
  ]);
}
