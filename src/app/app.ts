import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Toast } from 'primeng/toast';
import { Sidebar } from './features/sidebar/sidebar';
import { AppStateStore } from './shared/appSate/app-state-store';
import { LayoutService } from './shared/layout/layout.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Sidebar, Toast],
  providers: [AppStateStore],
  template: `
  <div class="min-h-screen bg-gray-50">
    <app-sidebar />
    <div class="transition-all duration-300 p-4"
         [class.ml-64]="layoutService.sidebarExpanded()"
         [class.ml-16]="!layoutService.sidebarExpanded()">
      <div class="max-w-7xl mx-auto">
        <router-outlet />
      </div>
      <p-toast [showTransitionOptions]="'250ms'" [showTransformOptions]="'translateX(100%)'" [hideTransitionOptions]="'150ms'" [hideTransformOptions]="'translateX(100%)'" />
    </div>
  </div>
  `
})
export class App {
  protected readonly layoutService = inject(LayoutService);
}
