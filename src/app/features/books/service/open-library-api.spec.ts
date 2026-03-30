import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { OpenLibraryApi } from './open-library-api';

const BASE_URL = 'https://openlibrary.org';

vi.mock('@env/environment', () => ({
  environment: {
    openLibraryApiUrl: 'https://openlibrary.org',
    openLibraryCoverApiUrl: 'https://covers.openlibrary.org',
  },
}));

describe('OpenLibraryApi', () => {
  let service: OpenLibraryApi;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        OpenLibraryApi,
        provideHttpClient(),
        provideHttpClientTesting(),
      ],
    });
    service = TestBed.inject(OpenLibraryApi);
    httpMock = TestBed.inject(HttpTestingController);
  });

  describe('getWork', () => {
    it('appelle la bonne URL', () => {
      service.getWork('OL12345W').subscribe();

      const req = httpMock.expectOne(`${BASE_URL}/works/OL12345W.json`);
      expect(req.request.method).toBe('GET');
      req.flush({ key: '/works/OL12345W', title: 'Test' });
      httpMock.verify();
    });

    it('retourne la notice avec title et key', () => {
      const mockWork = { key: '/works/OL12345W', title: 'Le Seigneur des Anneaux' };

      service.getWork('OL12345W').subscribe(work => {
        expect(work.title).toBe('Le Seigneur des Anneaux');
        expect(work.key).toBe('/works/OL12345W');
      });

      httpMock.expectOne(`${BASE_URL}/works/OL12345W.json`).flush(mockWork);
      httpMock.verify();
    });

    it('retourne les champs optionnels quand présents', () => {
      const mockWork = {
        key: '/works/OL12345W',
        title: 'Dune',
        description: 'Une saga de science-fiction.',
        subjects: ['Science fiction', 'Desert'],
        covers: [1234, 5678],
        first_publish_date: '1965',
      };

      service.getWork('OL12345W').subscribe(work => {
        expect(work.description).toBe('Une saga de science-fiction.');
        expect(work.subjects).toEqual(['Science fiction', 'Desert']);
        expect(work.covers).toEqual([1234, 5678]);
        expect(work.first_publish_date).toBe('1965');
      });

      httpMock.expectOne(`${BASE_URL}/works/OL12345W.json`).flush(mockWork);
      httpMock.verify();
    });
  });
});
