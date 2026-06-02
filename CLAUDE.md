# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

- `pnpm install` — install deps (pnpm 10+, Node 18+).
- `pnpm dev` — Vite dev server at http://localhost:5173.
- `pnpm build` — production build (`vue-tsc -b && vite build`).
- `pnpm preview` — serve the built `dist/`.
- `pnpm typecheck` — `vue-tsc --noEmit`.

There is no test suite and no linter configured. The `openvideo` package ships loose types — typecheck may surface third-party noise; treat first-party errors as the priority.

## Origin and porting status

This project is a Vue 3 + Vite SPA port of [openvideodev/vue-video-editor](https://github.com/openvideodev/vue-video-editor) (originally a Nuxt 4 app, upstream commit `7e78fef1`).

- No SSR. No Nuxt. No Nitro. No backend in this repo.
- Every server-side feature from upstream has been replaced by a typed stub in `src/services/` that throws `Not implemented — wire your backend in src/services/<file>.ts`.
- To enumerate the integration points, search for `TODO(backend)`.

If a feature feels broken at runtime ("not implemented" toast / thrown error), check the corresponding service stub first.

## High-level architecture

Entry: `src/main.ts` mounts `src/App.vue`, which renders `<Editor/>` plus a toast container and a "WebCodecs unsupported" modal.

### Editor shell (`src/components/editor/`)

`Editor.vue` composes the workspace using shadcn-vue resizable panels:

- `Header.vue` — top bar (project name, export, undo/redo).
- `media-panel/MediaPanel.vue` — left sidebar with tabbed media browsers (uploads, images, videos, music, SFX, voiceovers, text, captions, transitions, effects, elements). The active tab is driven by `useMediaPanelStore`. The right side flips into `properties-panel/PropertiesPanel.vue` when a clip is selected.
- `CanvasPanel.vue` — center preview, hosts the `openvideo` Studio (WebCodecs + PixiJS).
- `timeline/Timeline.vue` — bottom region, mounts the custom timeline canvas.
- Modals: `ExportModal.vue`, `ShortcutsModal.vue`, `WebcodecsUnsupportedModal.vue`.

### Stores (composables, not Pinia)

`src/composables/` exposes plain `ref`-based singletons. Each store keeps its state in a module-level `ref` so all callers share the same instance (the same pattern Nuxt's `useState('key', factory)` provides, ported by hand).

- `useStudioStore` — owns the `openvideo` `Studio` instance and the currently selected clips.
- `useTimelineStore` — tracks, clips, selection, total duration.
- `usePlaybackStore` — `isPlaying`, `currentTime`, `duration`, volume, speed. Plays/pauses through the Studio.
- `useMediaPanelStore` — which media tab is active, "reveal in uploads" requests, properties-panel visibility.
- `useEditorHotkeys` — `hotkeys-js` integration (space to play, Cmd/Ctrl+Z, Delete, etc.).
- `useTimelinePlayhead`, `useEdgeAutoScroll` — drag/scrub interactions.

### Rendering engine

The `openvideo` npm package (WebCodecs + PixiJS) drives the canvas preview from inside `CanvasPanel.vue`. `App.vue` gates on `window.VideoEncoder`/`window.VideoDecoder` and shows `WebcodecsUnsupportedModal.vue` if either is missing.

### Timeline engine

A custom HTMLCanvas timeline UI lives in `src/components/editor/timeline/timeline/`:

- `canvas.ts` — `TimelineCanvas` main class.
- `clips/` — per-type clip renderers (audio, video, image, text, caption, effect, transition + base).
- `controls/` — selection box, trim/resize handles, render helpers.
- `handlers/` — drag, modify, selection.
- `guidelines/`, `objects/`, `scrollbar/`, `utils/` — auxiliary subsystems.
- `event-emitter.ts`, `data.ts`, `track.ts`, `index.ts`, `timeline-constants.ts` — glue.

`Timeline.vue` mounts the canvas; `TimelineStudioSync.vue` keeps the timeline in lockstep with the Studio (clip add/remove/update events).

### Local storage

`src/lib/storage/`:

- `storage-service.ts` — facade over the two adapters.
- `indexeddb-adapter.ts` — project state + small metadata.
- `opfs-adapter.ts` — large media blobs (Origin Private File System).
- `types.ts` — shared types.

Used for project autosave and uploaded-media caching.

### Service layer (`src/services/`)

Every previously-server-side feature is a typed stub. All functions currently throw. Each file documents the upstream Nuxt endpoint it replaces, the request body, and the expected response shape, so a backend can be implemented to match (or refactored as needed).

## Backend integration points

If you wire any of these up, set `VITE_API_BASE_URL` in `.env` and call `import.meta.env.VITE_API_BASE_URL` from inside the stubs.

| Service file | Upstream Nuxt endpoint | Function(s) | UI consumer |
|---|---|---|---|
| `src/services/uploads.ts` | `POST /api/uploads/presign` | `requestPresignedUploads(fileNames)`, `uploadFile(file)` | `src/lib/upload-utils.ts` (re-exports `uploadFile`); `PanelUploads.vue` and anywhere user-uploaded media enters the editor |
| `src/services/transcribe.ts` | `POST /api/transcribe` | `transcribeAudio(audioUrl, opts?)` returning `TranscribeResult` | `PanelCaptions.vue` — feeds `generateCaptionClips()` from `src/utils/caption-generator.ts` |
| `src/services/stock-media.ts` | `GET /api/media-search` (Pexels proxy) | `searchStockMedia({ query?, type, page?, perPage? })` | `PanelImages.vue` (type=image), `PanelVideos.vue` (type=video) |
| `src/services/audio.ts` | `POST /api/audio/music`, `POST /api/audio/sfx` | `listMusic(params)`, `listSfx(params)` | `PanelMusic.vue`, `PanelSFX.vue` |
| `src/services/ai-audio.ts` | `POST /api/elevenlabs/{music,sfx,voiceover}` | `generateMusic(prompt, durationMs?)`, `generateSfx(prompt, durationMs?)`, `generateVoiceover(text, voiceId?, opts?)` | Currently not invoked from a panel — `PanelVoiceovers.vue` is the natural consumer; wire when implementing |

`src/services/index.ts` re-exports everything as a barrel.

## Env vars

Single var: `VITE_API_BASE_URL` (see `.env.sample`). New service stubs should read from `import.meta.env.VITE_API_BASE_URL`. Vite only exposes vars prefixed with `VITE_` to client code.

## Conventions worth knowing

- Path alias: `@/*` resolves to `src/*` (configured in `vite.config.ts` and `tsconfig.json`).
- shadcn-vue primitives live in `src/components/ui/<name>/` with an `index.ts` barrel. Import as `import { Button } from '@/components/ui/button'`. Config is `components.json` (`framework: vite`).
- Tailwind 4 with `@tailwindcss/vite`. Config is in-CSS (`src/assets/css/tailwind.css`), not a JS config file. Custom theme tokens and dark-mode variant live in that file.
- Dark mode is forced via `class="dark"` on `<html>` in `index.html`.
- Vue auto-imports do **not** exist here. Every `.vue` and `.ts` file must explicitly import `ref`, `computed`, `watch`, `onMounted`, etc. from `'vue'`, and any VueUse helper from `'@vueuse/core'`.
- Stores are module-level singleton `ref`s exported via composables — do not call `ref()` again inside the composable factory, or you'll break the singleton.
- Time in the engine is in microseconds. `clip.display.from` / `clip.display.to` / `clip.duration` are all microseconds; `playbackState.currentTime` is in seconds. See `src/types/timeline.ts` (`MICROSECONDS_PER_SECOND = 1_000_000`).
