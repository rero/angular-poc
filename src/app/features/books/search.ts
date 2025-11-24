import { Component, inject } from '@angular/core';
import { InputText } from "primeng/inputtext";
import { OpenLibraryStore } from './store/open-library.store';
import { Button } from 'primeng/button';

@Component({
  selector: 'app-search',
  imports: [InputText, Button],
  template: `
    <div class="bg-white rounded-xl shadow-md border border-gray-100 p-6">
      <div class="flex gap-3">
        <div class="flex-1 relative">
          <input
            #input
            type="text"
            pInputText
            placeholder="Rechercher un livre, un auteur..."
            [value]="store.filter()"
            (keyup.enter)="store.search(input.value)"
            class="w-full transition-all"
          />
        </div>

        @if (store.filter()) {
          <p-button severity="secondary" (click)="store.reset()">
            <i class="pi pi-times"></i>
            <span class="hidden sm:inline">Effacer</span>
          </p-button>
        }

        <p-button severity="info" [disabled]="store.isPending()" (click)="store.search(input.value)">
          @if (store.isPending()) {
            <i class="pi pi-spin pi-spinner"></i>
            <span class="hidden sm:inline">Recherche...</span>
          } @else {
            <i class="pi pi-search"></i>
            <span class="hidden sm:inline">Rechercher</span>
          }
        </p-button>
      </div>
    </div>
  `,
})
export class Search {
  protected store = inject(OpenLibraryStore);
}
