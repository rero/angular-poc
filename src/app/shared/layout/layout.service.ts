import { Injectable, signal } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class LayoutService {
    sidebarExpanded = signal(false);

    toggleSidebar() {
        this.sidebarExpanded.update((v) => !v);
    }
}
