export type OpenLibraryWork = {
  key: string;
  title: string;
  description?: string | { type: string; value: string };
  subjects?: string[];
  covers?: number[];
  first_publish_date?: string;
  authors?: { author: { key: string } }[];
};
