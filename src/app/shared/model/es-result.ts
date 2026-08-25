export interface EsRecord {
  created: string;
  id: string;
  links: Links
  metadata: unknown,
  updated: string;
}

export interface EsResult {
  aggregations: Record<string, unknown>,
  hits: {
    hits: EsRecord[],
    total: {
      relation: string;
      value: number;
    }
  },
  links: Links;
}

export interface Links {
  create?: string;
  next?: string;
  prev?: string;
  self: string;
}

export const EsResultInitialState: EsResult = {
    aggregations: {},
    hits: {
      hits: [],
      total: {
        relation: 'eq',
        value: 0
      }
    },
    links: {
      self: ''
    }
};
