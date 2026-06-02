<p align="center">
  <a href="https://github.com/openvideodev/openvideo">
    <img width="150px" height="150px" src="https://cdn.scenify.io/openvideo-logo.png"/>
  </a>
</p>
<h1 align="center">Vue Video Editor (Vite SPA Port)</h1>

<div align="center">

A Vue 3 + Vite SPA port of [openvideodev/vue-video-editor](https://github.com/openvideodev/vue-video-editor) (originally a Nuxt 4 app), powered by [OpenVideo](https://openvideo.dev/).

</div>

## What this is

This is a plain Vue 3 + Vite single-page application — no Nuxt, no SSR, no Nitro server. The UI is a 1:1 port of the upstream Nuxt app; every backend touch-point has been replaced with a typed service-layer stub in `src/services/` that currently throws `Not implemented — wire your backend here`.

If you need a runnable end-to-end editor with cloud features (transcription, AI audio, stock media, presigned uploads), implement the service stubs against your own backend (or the upstream's Nuxt server).

## Features

- High-performance rendering powered by `openvideo` (WebCodecs + PixiJS).
- Multi-track timeline with custom HTMLCanvas-based engine.
- Project state serialization (IndexedDB + OPFS for large blobs).
- Tailwind CSS 4 styling, shadcn-vue components.
- Forced dark mode (configured via `<html class="dark">` in `index.html`).

The following features **require a backend** — they are wired to service stubs in `src/services/`:

- Captions / transcription (`src/services/transcribe.ts`)
- AI music / SFX / voiceover generation (`src/services/ai-audio.ts`)
- Stock media search (`src/services/stock-media.ts`)
- Music & SFX catalog (`src/services/audio.ts`)
- Presigned uploads to object storage (`src/services/uploads.ts`)

## Tech Stack

- **Framework**: [Vue 3](https://vuejs.org/) + [Vite](https://vite.dev/)
- **Engine**: [OpenVideo](https://openvideo.dev/) (WebCodecs + PixiJS)
- **Styling**: [Tailwind CSS 4](https://tailwindcss.com/) (via `@tailwindcss/vite`)
- **UI**: [shadcn-vue](https://www.shadcn-vue.com/) / [lucide-vue-next](https://lucide.dev/)
- **State**: plain `ref`-based singletons in `src/composables/` (no Pinia)
- **Utilities**: [VueUse](https://vueuse.org/)

## Getting started

### Prerequisites

- Node.js v18+
- pnpm v10+
- A modern browser with WebCodecs (`VideoEncoder`/`VideoDecoder`) — Chromium-based recommended.

### Install & run

```bash
pnpm install
pnpm dev          # Vite dev server on http://localhost:5173
pnpm build        # Production build to dist/
pnpm preview      # Serve the production build
pnpm typecheck    # vue-tsc --noEmit
```

### Env

Copy `.env.sample` to `.env`:

```
VITE_API_BASE_URL=http://localhost:8080
```

This is read by `import.meta.env.VITE_API_BASE_URL` inside the service stubs once you wire them up.

## Wiring up a backend

Each file in `src/services/` documents the upstream Nuxt endpoint it replaces (method, body shape, expected response). Search the codebase for `TODO(backend)` to enumerate the integration points:

```
src/services/uploads.ts       — presigned uploads (R2/S3-style PUT flow)
src/services/transcribe.ts    — speech-to-text (Deepgram-shaped response)
src/services/stock-media.ts   — image/video search (Pexels-shaped response)
src/services/audio.ts         — music & SFX catalog search
src/services/ai-audio.ts      — ElevenLabs music / SFX / voiceover
```

`src/lib/upload-utils.ts` re-exports the `uploadFile` helper from `src/services/uploads.ts` so existing callers keep working.

## Origin

Ported from [openvideodev/vue-video-editor](https://github.com/openvideodev/vue-video-editor) (MIT). Upstream commit at port time: `7e78fef1`.

## License

MIT.
