import { Component, inject } from '@angular/core';
import { InputText } from "primeng/inputtext";
import { OpenLibraryStore } from './store/open-library.store';

@Component({
  selector: 'app-search',
  imports: [InputText],
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
            class="w-full pl-4 pr-4 py-3 border-2 border-gray-200 rounded-lg focus:border-[#1EA1CF] focus:ring-2 focus:ring-[#1EA1CF]/20 transition-all"
          />
        </div>

        @if (store.filter()) {
          <button
            (click)="store.reset()"
            class="px-4 py-3 bg-gray-100 hover:bg-gray-200 text-gray-600 rounded-lg transition-all flex items-center gap-2">
            <i class="pi pi-times"></i>
            <span class="hidden sm:inline">Effacer</span>
          </button>
        }

        <button
          (click)="store.search(input.value)"
          [disabled]="store.isPending()"
          class="px-6 py-3 bg-[#1765A2] hover:bg-[#1765A2]/90 disabled:bg-gray-300 text-white rounded-lg font-medium transition-all hover:shadow-md flex items-center gap-2">
          @if (store.isPending()) {
            <i class="pi pi-spin pi-spinner"></i>
            <span class="hidden sm:inline">Recherche...</span>
          } @else {
            <i class="pi pi-search"></i>
            <span class="hidden sm:inline">Rechercher</span>
          }
        </button>
      </div>
    </div>
  `,
})
export class Search {
  protected store = inject(OpenLibraryStore);
}
