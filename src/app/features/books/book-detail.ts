import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  SecurityContext
} from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { environment } from '@env/environment';
import { parse } from 'marked';
import { map } from 'rxjs';

@Component({
  selector: 'app-book-detail',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink],
  styles: [
    `
      :host ::ng-deep .prose :is(p, ul, ol) {
        margin-bottom: 0.75rem;
      }
      :host ::ng-deep .prose ul {
        list-style: disc;
        padding-left: 1.25rem;
      }
      :host ::ng-deep .prose ol {
        list-style: decimal;
        padding-left: 1.25rem;
      }
      :host ::ng-deep .prose a {
        color: #1765a2;
        text-decoration: underline;
        font-weight: 500;
      }
      :host ::ng-deep .prose a:hover {
        color: #1ea1cf;
      }
      :host ::ng-deep .prose strong {
        font-weight: 600;
      }
      :host ::ng-deep .prose em {
        font-style: italic;
      }
    `,
  ],
  template: `
    <div class="max-w-4xl mx-auto p-6">
      <a
        [routerLink]="['/books']"
        class="inline-flex items-center gap-2 text-[#1765A2] hover:underline mb-6"
      >
        <i class="pi pi-arrow-left"></i>
        Retour à la bibliothèque
      </a>

      <div class="bg-white rounded-xl shadow-md border border-gray-100 overflow-hidden">
        <div class="md:flex">
          <!-- Cover -->
          <div
            class="md:w-64 flex-shrink-0 bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center min-h-64"
          >
            @if (coverUrl()) {
              <img [src]="coverUrl()" [alt]="work().title" class="w-full h-full object-cover" />
            } @else {
              <div class="text-center p-8">
                <i class="pi pi-book text-6xl text-gray-400 mb-3"></i>
                <p class="text-sm text-gray-500">Couverture non disponible</p>
              </div>
            }
          </div>

          <!-- Info -->
          <div class="p-8 flex-1">
            <h1 class="text-2xl font-bold text-gray-800 mb-4">{{ work().title }}</h1>

            @if (work().first_publish_date) {
              <p class="text-sm text-gray-500 mb-4">
                <i class="pi pi-calendar mr-2"></i>
                {{ work().first_publish_date }}
              </p>
            }

            @if (descriptionHtml()) {
              <div class="mb-6">
                <h2 class="text-sm font-semibold text-gray-600 uppercase tracking-wide mb-2">
                  Description
                </h2>
                <div
                  class="prose text-gray-700 leading-relaxed text-sm"
                  [innerHTML]="descriptionHtml()"
                ></div>
              </div>
            }

            @if (work().subjects && work().subjects!.length > 0) {
              <div>
                <h2 class="text-sm font-semibold text-gray-600 uppercase tracking-wide mb-2">
                  Sujets
                </h2>
                <div class="flex flex-wrap gap-2">
                  @for (subject of work().subjects!.slice(0, 10); track subject) {
                    <span class="bg-[#1765A2]/10 text-[#1765A2] text-xs px-3 py-1 rounded-full">
                      {{ subject }}
                    </span>
                  }
                </div>
              </div>
            }
          </div>
        </div>
      </div>
    </div>
  `,
})
export default class BookDetail {
  private route = inject(ActivatedRoute);
  private sanitizer = inject(DomSanitizer);
  work = toSignal(this.route.data.pipe(map((data) => data['work'])), {
    initialValue: this.route.snapshot.data['work'],
  });

  coverUrl = computed(() => {
    const covers = this.work().covers;
    if (covers && covers.length > 0) {
      return `${environment.openLibraryCoverApiUrl}/b/id/${covers[0]}-L.jpg`;
    }
    return null;
  });

  descriptionHtml = computed(() => {
    const desc = this.work().description;
    if (!desc) return null;
    const text = typeof desc === 'string' ? desc : desc.value;
    const rawHtml = parse(text) as string;
    // Sanitize instead of bypassing - removes dangerous elements while preserving safe HTML
    return this.sanitizer.sanitize(SecurityContext.HTML, rawHtml);
  });
}
