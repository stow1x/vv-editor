// src/services/stock-media.ts

/**
 * Stock media search service.
 *
 * TODO(backend): wire this up to your stock-media provider (upstream proxied Pexels).
 *   The upstream Nuxt app called GET /api/media-search?query=&type=image|video&page=&per_page=
 *   and forwarded the raw Pexels response. The UI consumes the Pexels shape.
 *   Replicate that contract or adapt the caller.
 */

export type StockMediaType = 'image' | 'video';

export interface SearchStockMediaParams {
  query?: string;
  type: StockMediaType;
  page?: number;
  perPage?: number;
}

// Loose typing — the response is the raw Pexels payload, which the UI walks
// directly. Treat as `any` until you formalize the shape.
export type StockMediaPage = any;

export async function searchStockMedia(
  params: SearchStockMediaParams,
): Promise<StockMediaPage> {
  // TODO(backend): replace with a real GET `${import.meta.env.VITE_API_BASE_URL}/media-search`
  //   Query: { query?: string, type: 'image'|'video', page?: number, per_page?: number }
  //   Response: Pexels search payload (see https://www.pexels.com/api/documentation/)
  void params;
  throw new Error(
    'searchStockMedia is not implemented — wire your backend in src/services/stock-media.ts',
  );
}
