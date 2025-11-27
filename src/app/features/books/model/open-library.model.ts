export type OpenLibraryApiResult = {
  numFound: number;
  start: number;
  q: string;
  docs: OpenLibraryRecord[];
};

export type OpenLibraryRecord = {
  author_key: string[];
  author_name: string[];
  language: string[];
  key: string;
  title: string;
  cover_i?: number;
  isbn?: string[];
  first_publish_year?: number;
  publisher?: string[];
  edition_count?: number;
}

export const availableFields = [
  'author_key',
  'author_name',
  'language',
  'key',
  'title',
  'cover_i',
  'isbn',
  'first_publish_year',
  'publisher',
  'edition_count',
];
