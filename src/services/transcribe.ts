// src/services/transcribe.ts

/**
 * Transcription service — speech-to-text + paragraph segmentation.
 *
 * TODO(backend): wire this up to a transcription provider (upstream used Deepgram).
 *   The upstream Nuxt app called POST /api/transcribe with
 *     { url, targetLanguage?, language?, model? }
 *   and returned a TranscriptObject (see types below).
 *   Implement the same response contract (or adapt the caller to your API).
 */

export interface Word {
  word: string;
  start: number;
  end: number;
  confidence: number;
}

export interface Sentence {
  text: string;
  start: number;
  end: number;
}

export interface Paragraph {
  sentences: Sentence[];
  numWords: number;
  start: number;
  end: number;
}

export interface LanguageDetectionResultsEntry {
  language: string;
  languageName: string;
  confidence?: number;
}

export interface TranscriptObject {
  id: string;
  sourceUrl: string;
  duration: number;
  results: {
    main: {
      language: LanguageDetectionResultsEntry;
      text: string;
      words: Word[];
      paragraphs: Paragraph[];
    };
    translation?: {
      language: LanguageDetectionResultsEntry;
      text: string;
      words: Word[];
      paragraphs: Paragraph[];
    };
  };
  createdAt: Date;
}

export type TranscribeResult = Partial<TranscriptObject> | null;

export interface TranscribeOptions {
  language?: string;
  targetLanguage?: string;
  model?: string;
}

export async function transcribeAudio(
  audioUrl: string,
  opts: TranscribeOptions = {},
): Promise<TranscribeResult> {
  // TODO(backend): replace with a real POST `${import.meta.env.VITE_API_BASE_URL}/transcribe`
  //   Body: { url: string, targetLanguage?: string, language?: string, model?: string }
  //   Response: TranscriptObject
  void audioUrl;
  void opts;
  throw new Error(
    'transcribeAudio is not implemented — wire your backend in src/services/transcribe.ts',
  );
}
