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
3. **Results** (`app/votre-ikigai/page.tsx`) — AI analysis: summary, job recommendations, tags, confidence score, PDF export via `window.print()`

### Pillar interaction flow
1. User clicks a pillar in `MainstayList` → `updateForm(pillar, { progressState: IN_PROGRESS })` + `setStep(pillar)` — directly transitions to `FormLayout`
2. `FormLayout` renders three stacked sections:
   - **`QuestionTabs`** — sticky progress header: back arrow (→ INITIAL), pillar counter (`pilier 01 / 04`), and three clickable tab indicators (one per question)
   - **`FormGuidelines`** — pillar title, icon, reading/reflection time estimate, long description
   - **`FormTextArea`** — current question label + detail hint, optional help `Collapse`, textarea, answer counter (`// 2/3 réponses`), and the "Terminer ce pilier" action button
3. **Navigation between questions** is done by clicking tabs in `QuestionTabs` (any order, at any time)
4. **Answers auto-save** to context after a 500 ms debounce via `updateForm`
5. **"Terminer ce pilier" button** (Outline variant) is disabled until ≥ 2 answers are filled:
   - When NOT on the last question → advances to the next question tab
   - When on the last question → calls `savePillar()` + `setStep(INITIAL)` → returns to overview
6. Back in `YourIkigaiLayout`: once all 4 pillars have ≥ 2 answers → "Analyser mes réponses" button appears and triggers the Gemini call

Each `QuestionTab` shows three states: active (amber glow bar, `en cours`), filled (green bar, check + `remplie`), empty (faded, `à faire`). All labels are monospace uppercase.

### State management
All form state lives in `app/context/index.tsx` (the `AppProviders` component), which wraps two providers:

- **`IkigaiContext`** (`app/context/IkigaiContext.tsx`) — form answers for all 4 pillars, current step, pillar state machine (`PillarStateEnum`). Persisted to `localStorage` under the key `"ikigai-form"`.
- **`HoverContext`** (`app/context/HoverContext.tsx`) — which pillar is currently hovered (used for the Venn diagram to bring the hovered circle to the front).

Step progression uses `IkigaiStepEnum` (INITIAL → LOVE → NEEDS → PAID → TALENT → RESUME). The user can fill pillars in any order.

`PillarStateEnum` lifecycle: `NOT_STARTED → IN_PROGRESS → IS_SAVED → FINISHED`
(`IS_SELECTED` still exists in the enum but is unused — it was tied to the modal, which has been removed.)

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

`app/utils/datas/ikigaiMainstay.ts` — static content for each pillar: title, description, 3 guided questions with detail hints, tips, help prompts. Used by `FormGuidelines` and `FormTextArea`.

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
  UI/              — Button, Collapse, DynamicIcon, HighlightText, KanjiRevealWord, Title, TypewriterItem, AsciiKoi, AsciiSakura
  VennDiagram/     — VennDiagram (SVG, responsive via %), Circle
  Navbar.tsx
  MainstayList.tsx
```


## Art direction
**Retro-tech · Minimalist · Airy · Calm · Modern**

The interface feels like a serious introspection tool with a discreet Japanese aesthetic: generous white space, thin typography, monospace for all system-like elements, soft pastels for pillar colors. Design tokens (colors, shadows, fonts, background) are defined in `app/globals.css` — always refer to them rather than hardcoding values.

Key visual conventions already established in the codebase:
- **Monospace for metadata**: counters (`01 / 04`), state labels (`en cours`, `remplie`, `à faire`), comment-style prefixes (`// 2/3 réponses`) — this is the "retro-tech terminal" signature of the project
- **Thin display weights** for titles (`font-[100]` to `font-[200]`), weight hierarchy comes from spacing, not font-weight
- **Subtle active states**: amber glow (`tertiary`) on the currently active element, soft green for completed states, muted/faded for inactive
- **Offset box-shadow on hover** for interactive elements (see `Button.tsx`) — not standard shadow, a directional `4px 4px 0px` offset
- **Noise texture overlay** on `body::before` via `nnnoise.svg` at 50% opacity — don't fight it with solid backgrounds
- **Pillar colors from `colorMap`** should be used consistently across any view related to a specific pillar


## UX/UI senior designer mindset
When creating a new component or redesigning a page, Claude must think as a senior UX/UI designer with a holistic view — not just implement what's asked but reveal the right visual and interaction hierarchy.

**Holistic vision**
- Every screen must make the user want to continue: the form should feel approachable, almost meditative, never overwhelming
- Visual harmony over functional richness — reduce friction, increase flow
- Read `globals.css` and existing components before choosing any color, spacing, or animation value

**Form UX principles**
- The user is doing introspective work: tone must be soft and encouraging, never clinical or urgent
- Progress must always be perceivable: `QuestionTabs` state indicators, answer counter, pillar counter all reinforce "you're making progress"
- Empty states should feel welcoming — soft placeholder text, no red by default

**Design rules to enforce**
- Generous spacing: elements breathe; dense blocks feel wrong in this product
- Monospace for anything "system" (numbers, statuses, counters, labels)
- Animate all state changes (color, opacity, position) — even 150–200 ms eases matter
- Use border-radius consistently: subtle rounding (`rounded-sm`, `rounded-2xl` on textareas) — no aggressive corners
- Never use saturated colors or hard contrasts; everything stays in the calm register of the palette

**What to avoid**
- Stacking too much information on one screen
- Saturated colors or visually loud components
- Adding UI elements that don't earn their presence — every visible affordance must have a clear reason to exist


## UI
- Tailwind CSS 4 with custom fonts: `--font-arima` and `--font-andika` (loaded in `app/layout.tsx`)
- Icons: `@phosphor-icons/react`
- Animations: `motion` (Framer Motion)
- Conditional classnames: `clsx`
- Language: French throughout (UI strings, AI prompt, `lang="fr"` on `<html>`)
- View Transitions API used in `/commencer` on step change (`document.startViewTransition`)