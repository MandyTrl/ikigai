# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
yarn dev        # Start dev server with Turbopack
yarn build      # Production build
yarn start      # Start production server
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

**Ikigai** is a Next.js 15 (App Router) + React 19 application that guides users through a 4-pillar career discovery framework (Love, Talent, Needs, Paid Work), then calls Gemini AI to generate a personalized career analysis.

### User flow

1. **Landing page** (`app/page.tsx`) — marketing sections
2. **Intro + Form** (`app/commencer/page.tsx`) — two sub-views controlled by `currentStep`:
   - `IkigaiStepEnum.INITIAL` → `YourIkigaiLayout`: VennDiagram + pillar list + "Analyser" button
   - Any pillar step → `FormLayout`: 3-question form for that pillar
3. **Results** (`app/votre-ikigai/page.tsx`) — displays AI analysis: summary, job recommendations, tags, confidence score, PDF export via `window.print()`

### Pillar interaction flow

1. User clicks a pillar in `MainstayList` → `updateForm(pillar, { progressState: IS_SELECTED })`
2. `PillarIntroduction` modal opens (description + guidelines for that pillar)
3. User confirms → `progressState` set to `IN_PROGRESS`, `setStep(pillar)` called
4. `FormLayout` renders with 3 questions for that pillar
5. On save → `progressState` set to `IS_SAVED` / `FINISHED`
6. When all 4 pillars have ≥ 2 answers → "Analyser mes réponses" button appears

### State management

All form state lives in `app/context/index.tsx` (the `AppProviders` component), which wraps two providers:

- **`IkigaiContext`** (`app/context/IkigaiContext.tsx`) — form answers for all 4 pillars, current step, pillar state machine (`PillarStateEnum`). Persisted to `localStorage` under the key `"ikigai-form"`.
- **`HoverContext`** (`app/context/HoverContext.tsx`) — which pillar is currently hovered (used for the Venn diagram to bring the hovered circle to the front).

Step progression uses `IkigaiStepEnum` (INITIAL → LOVE → NEEDS → PAID → TALENT → RESUME). The user can fill pillars in any order.

`PillarStateEnum` lifecycle: `NOT_STARTED → IS_SELECTED → IN_PROGRESS → IS_SAVED → FINISHED`

`colorMap` in `IkigaiContext.tsx` maps each `IkigaiPillarStep` to its pastel hex color.

### Form validation

`app/utils/validateForm.ts`:
- `isPillarCompleteForAnalysis(pillar)` — requires ≥ 2 non-empty answers out of 3
- `canAnalyzeIkigai(form)` — all 4 pillars must be complete (calls above for each)

### AI integration

`POST /api/analyze` (`app/api/analyze/route.ts`):
- Validates the payload with `isValidIkigaiPayload()`
- Builds a prompt via `app/utils/ikigaiPrompt.ts` (French-language system prompt, instructs Gemini to output strict JSON)
- Calls **Gemini 2.5 Flash** via `@google/genai`
- Strips markdown fences with `cleanJsonString()`, parses JSON
- Returns `{ success: true, data: IkigaiAnalysisResult }` or `{ success: false, error: string }`
- Client-side caching uses `sessionStorage` (key `"ikigai-analysis-cache"`, signature-based, helpers in `app/api/analyze/utils.ts`)

### Key types

`app/types.ts` — enums only:
- `IkigaiStepEnum` — INITIAL, LOVE, NEEDS, PAID, TALENT, RESUME
- `IkigaiPillarStep` — `IkigaiStepEnum` minus INITIAL and RESUME
- `PillarStateEnum` — NOT_STARTED, IS_SELECTED, IN_PROGRESS, IS_SAVED, FINISHED

`app/context/IkigaiContext.tsx`:
- `IkigaiForm` — `{ mainstay: IkigaiStepEnum, progressState: PillarStateEnum, answers: string[] }`
- `IkigaiContextProps` — context shape with `ikigaiForm`, `currentStep`, `setStep`, `updateForm`, `savePillar`, `resetIkigai`

`app/api/analyze/types/request.ts`:
- `IkigaiPayload` — `{ love, talent, needs, paid: string[] }`

`app/api/analyze/types/response.ts`:
- `IkigaiAnalysisResult` — `{ summary: { profile, key_strengths, motivations, work_environment }, analysis: { insights, tensions }, jobs: IkigaiJob[], recommendations: { actions, warning }, tags: IkigaiTags, confidence }`
- `IkigaiJob` — `{ title, description, match_reason, score, ikigai_scores: IkigaiScores }`
- `IkigaiTags` / `IkigaiScores` — per-pillar string arrays / numbers

### Data files

`app/utils/datas/ikigaiMainstay.ts` — static content for each pillar: title, modal description, modal guidelines, 3 guided questions with details, tips, help prompts. Used by `PillarIntroduction` modal and `FormGuidelines`.

`app/utils/datas/ikigaiPromises.ts` — static content for the landing page promises section.

### Path alias

`@/*` maps to the project root (e.g. `@/app/context/IkigaiContext`).

### Component structure

```
app/components/
  Analyze/         — result display: IkigaiSummary, JobCard, PillarAnalysis, CoherenceSignal, PdfButton
  Form/            — FormGuidelines, FormTextArea, QuestionTabs
  LandingPage/     — Banner, HeroSection, IntroSection/, PillarSection/, PromisesSection, WhatUGetSection
  Layouts/         — MainLayout, FormLayout, YourIkigaiLayout
  Modal/           — Modal, PillarIntroduction
  UI/              — Button, Collapse, DynamicIcon, HighlightText, KanjiRevealWord, Title, TypewriterItem, AsciiKoi, AsciiSakura
  VennDiagram/     — VennDiagram (SVG, responsive via %), Circle
  Navbar.tsx
  MainstayList.tsx
```

### UI

- Tailwind CSS 4 with custom fonts: `--font-arima` and `--font-andika` (loaded in `app/layout.tsx`)
- Icons: `@phosphor-icons/react`
- Animations: `motion` (Framer Motion)
- Conditional classnames: `clsx`
- Language: French throughout (UI strings, AI prompt, `lang="fr"` on `<html>`)
- View Transitions API used in `/commencer` on step change (`document.startViewTransition`)