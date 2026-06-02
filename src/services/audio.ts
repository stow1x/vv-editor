// src/services/audio.ts

/**
 * Music & sound-effect catalog search.
 *
 * TODO(backend): wire this up to your audio catalog.
 *   The upstream Nuxt app proxied to a Cloudflare Worker:
 *     POST /api/audio/music  → https://api-editor.cloud-45c.workers.dev/api/musics/search
 *     POST /api/audio/sfx    → https://api-editor.cloud-45c.workers.dev/api/sound-effects/search
 *   The body was forwarded verbatim; replicate that contract or adapt the caller.
 */

export interface AudioSearchParams {
  // upstream forwarded the entire body, so the shape is open-ended.
  // Callers may pass `query` as a string OR a structured filter (e.g. `{ keys: ['rock'] }`).
  query?: unknown;
  page?: number;
  limit?: number;
  [key: string]: unknown;
}

// Response shape was passed through opaquely — keep loose.
export type AudioSearchPage = any;

export async function listMusic(
  params: AudioSearchParams = {},
): Promise<AudioSearchPage> {
  // TODO(backend): replace with a real POST `${import.meta.env.VITE_API_BASE_URL}/audio/music`
  void params;
  throw new Error(
    'listMusic is not implemented — wire your backend in src/services/audio.ts',
  );
}

export async function listSfx(
  params: AudioSearchParams = {},
): Promise<AudioSearchPage> {
  // TODO(backend): replace with a real POST `${import.meta.env.VITE_API_BASE_URL}/audio/sfx`
  void params;
  throw new Error(
    'listSfx is not implemented — wire your backend in src/services/audio.ts',
  );
}
