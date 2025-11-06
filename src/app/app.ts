import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Toast } from 'primeng/toast';
import { Menu } from './features/menu/menu';
import { AppStateStore } from './shared/appSate/app-state-store';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Menu, Toast],
  providers: [AppStateStore],
  template: `
  <div class="m-4">
    <app-menu />
    <div class="mt-4 mx-4 flex justify-center">
      <div class="w-[80%]">
        <router-outlet />
      </div>
      <p-toast [showTransitionOptions]="'250ms'" [showTransformOptions]="'translateX(100%)'" [hideTransitionOptions]="'150ms'" [hideTransformOptions]="'translateX(100%)'" />
    </div>
  </div>
  `
})
export class App {
}
