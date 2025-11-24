import { Component, computed, input } from '@angular/core';
import { environment } from '@env/environment';
import { OpenLibraryRecord } from './model/open-library.model';

@Component({
  selector: 'app-book',
  imports: [],
  template: `
    <div class="bg-white rounded-xl shadow-md border border-gray-100 overflow-hidden hover:shadow-xl hover:border-[#1EA1CF]/30 transition-all duration-300 group h-full flex flex-col">
      <!-- Book Cover -->
      <div class="relative bg-gradient-to-br from-gray-100 to-gray-200 h-64 flex items-center justify-center overflow-hidden">
        @if (coverUrl()) {
          <img
            [src]="coverUrl()"
            [alt]="book().title"
            class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            (error)="onImageError($event)" />
        } @else {
          <div class="text-center p-6">
            <i class="pi pi-book text-6xl text-gray-400 mb-3"></i>
            <p class="text-sm text-gray-500">Couverture non disponible</p>
          </div>
        }
        <!-- Overlay badge for publication year -->
        @if (book().first_publish_year) {
          <div class="absolute top-3 right-3 bg-[#1765A2] text-white px-3 py-1 rounded-full text-sm font-medium shadow-lg">
            {{ book().first_publish_year }}
          </div>
        }
      </div>

      <!-- Book Info -->
      <div class="p-5 flex-1 flex flex-col">
        <!-- Title -->
        <h3 class="text-lg font-bold text-gray-800 mb-2 line-clamp-2 group-hover:text-[#1765A2] transition-colors">
          {{ book().title }}
        </h3>

        <!-- Authors -->
        @if (book().author_name && book().author_name.length > 0) {
          <div class="flex items-start gap-2 mb-3">
            <i class="pi pi-user text-[#1EA1CF] text-sm mt-1 flex-shrink-0"></i>
            <p class="text-sm text-gray-600 line-clamp-2">
              {{ book().author_name.join(', ') }}
            </p>
          </div>
        }

        <!-- Metadata -->
        <div class="mt-auto space-y-2">
          <!-- Languages -->
          @if (book().language && book().language.length > 0) {
            <div class="flex items-center gap-2">
              <i class="pi pi-globe text-gray-400 text-xs"></i>
              <span class="text-xs text-gray-500">
                {{ book().language.slice(0, 3).join(', ') }}
                @if (book().language.length > 3) {
                  <span class="text-gray-400">+{{ book().language.length - 3 }}</span>
                }
              </span>
            </div>
          }

          <!-- Publisher -->
          @if (book().publisher?.length) {
            <div class="flex items-center gap-2">
              <i class="pi pi-building text-gray-400 text-xs"></i>
              <span class="text-xs text-gray-500 truncate">
                {{ book().publisher?.[0] }}
              </span>
            </div>
          }

          <!-- Edition count -->
          @if (book().edition_count && book().edition_count! > 1) {
            <div class="flex items-center gap-2">
              <i class="pi pi-copy text-gray-400 text-xs"></i>
              <span class="text-xs text-gray-500">
                {{ book().edition_count }} édition{{ book().edition_count! > 1 ? 's' : '' }}
              </span>
            </div>
          }
        </div>
      </div>
    </div>
  `
})
export class Book {
  book = input.required<OpenLibraryRecord>();

  // Compute cover URL from ISBN or cover_i
  coverUrl = computed(() => {
    const bookData = this.book();

    // Try to get cover from cover_i (cover edition id)
    if (bookData.cover_i) {
      return `${environment.openLibraryCoverApiUrl}/b/id/${bookData.cover_i}-L.jpg`;
    }

    // Try to get cover from ISBN
    if (bookData.isbn && bookData.isbn.length > 0) {
      return `${environment.openLibraryCoverApiUrl}/b/isbn/${bookData.isbn[0]}-L.jpg`;
    }

    return null;
  });

  onImageError(event: Event) {
    // Hide broken image
    (event.target as HTMLImageElement).style.display = 'none';
  }
}
