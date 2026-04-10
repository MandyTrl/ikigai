# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
yarn dev        # Start dev server with Turbopack
yarn build      # Production build
yarn lint       # ESLint
```

No test suite is configured.

## Environment

Requires a `.env.local` file with:
```
GEMINI_API_KEY=...
```

The key is loaded in `lib/gemini.ts` and throws at runtime if missing.

## Architecture

**Ikigai** is a Next.js 15 (App Router) application that guides users through a 4-pillar career discovery framework (Love, Talent, Needs, Paid Work), then calls Gemini AI to generate a personalized career analysis.

### User flow

1. **Landing page** (`app/page.tsx`) — marketing sections
2. **Form** (`app/commencer/`) — multi-step form, one pillar at a time (3 answers per pillar)
3. **Results** (`app/votre-ikigai/`) — displays AI analysis: summary, job recommendations, tags, confidence score, PDF export

### State management

All form state lives in `app/context/index.tsx` (the `AppProviders` component), which provides two contexts:

- **`IkigaiContext`** (`app/context/IkigaiContext.tsx`) — form answers for all 4 pillars, current step, pillar state machine (`PillarStateEnum`). Persisted to `localStorage` under the key `"ikigai-form"`.
- **`HoverContext`** (`app/context/HoverContext.tsx`) — which pillar is currently hovered (used for the Venn diagram).

Step progression uses `IkigaiStepEnum` (INITIAL → LOVE → NEEDS → PAID → TALENT → RESUME).

### AI integration

`POST /api/analyze` (`app/api/analyze/route.ts`):
- Validates the payload with `isValidIkigaiPayload()`
- Builds a prompt via `app/utils/ikigaiPrompt.ts` (the system prompt is ~246 lines, French language, instructs Gemini to output strict JSON)
- Calls **Gemini 2.5 Flash** via `@google/genai`
- Strips markdown fences with `cleanJsonString()`, parses JSON, returns `IkigaiAnalysisResult`
- Client-side caching uses `sessionStorage` (signature-based, helpers in `app/api/analyze/utils.ts`)

### Key types

- `IkigaiPayload` — `{ love, talent, needs, paid: string[] }` (API request)
- `IkigaiAnalysisResult` — `{ summary, analysis, jobs, recommendations, tags, confidence }` (API response)
- `IkigaiForm` — per-pillar form state with answers and `PillarStateEnum`
- All global types in `app/types.ts`; API-specific types in `app/api/analyze/types/`

### Path alias

`@/*` maps to the project root (e.g. `@/app/context/IkigaiContext`).

### UI

- Tailwind CSS 4 with custom fonts: `--font-arima` and `--font-andika` (loaded in `app/layout.tsx`)
- Icons: `@phosphor-icons/react`
- Animations: `motion` (Framer Motion)
- Language: French throughout (UI strings, AI prompt, `lang="fr"` on `<html>`)
