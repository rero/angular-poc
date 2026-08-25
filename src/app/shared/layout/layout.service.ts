import { Service, signal } from '@angular/core';

@Service()
export class LayoutService {
    sidebarExpanded = signal(false);

    toggleSidebar() {
        this.sidebarExpanded.update((v) => !v);
    }
}
