// src/services/ai-audio.ts

/**
 * AI audio generation — music, sound effects, voiceover.
 *
 * TODO(backend): wire this up to a generation provider (upstream used ElevenLabs).
 *   The upstream Nuxt app exposed:
 *     POST /api/elevenlabs/music     { text, duration }  → { url }
 *     POST /api/elevenlabs/sfx       { text, duration }  → { url }
 *     POST /api/elevenlabs/voiceover { text, voiceId? }  → { url }
 *   In each case the server generated the audio, uploaded it to R2, and returned
 *   the public URL. Replicate that contract (or refactor to your needs).
 */

export interface GeneratedAudio {
  url: string;
}

export interface GenerateVoiceoverOptions {
  stability?: number;
  similarityBoost?: number;
  model?: string;
}

export async function generateMusic(
  prompt: string,
  durationMs?: number,
): Promise<GeneratedAudio> {
  // TODO(backend): replace with a real POST `${import.meta.env.VITE_API_BASE_URL}/elevenlabs/music`
  //   Body: { text: string, duration?: number (seconds) }
  //   Response: { url: string }
  void prompt;
  void durationMs;
  throw new Error(
    'generateMusic is not implemented — wire your backend in src/services/ai-audio.ts',
  );
}

export async function generateSfx(
  prompt: string,
  durationMs?: number,
): Promise<GeneratedAudio> {
  // TODO(backend): replace with a real POST `${import.meta.env.VITE_API_BASE_URL}/elevenlabs/sfx`
  //   Body: { text: string, duration?: number (seconds) }
  //   Response: { url: string }
  void prompt;
  void durationMs;
  throw new Error(
    'generateSfx is not implemented — wire your backend in src/services/ai-audio.ts',
  );
}

export async function generateVoiceover(
  text: string,
  voiceId?: string,
  opts: GenerateVoiceoverOptions = {},
): Promise<GeneratedAudio> {
  // TODO(backend): replace with a real POST `${import.meta.env.VITE_API_BASE_URL}/elevenlabs/voiceover`
  //   Body: { text: string, voiceId?: string }
  //   Response: { url: string }
  void text;
  void voiceId;
  void opts;
  throw new Error(
    'generateVoiceover is not implemented — wire your backend in src/services/ai-audio.ts',
  );
}
