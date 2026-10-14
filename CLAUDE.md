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

The key is read lazily by `getGemini()` in `lib/gemini.ts`; if it is missing the call throws **inside the route handler** (caught there), so `/api/analyze` always returns a clean JSON error — never an HTML error page. The client (`useIkigaiAnalyze`) then shows a friendly French message, never the raw error.

## Architecture
**Ikigai** is a Next.js 15 (App Router) + React 19 application that guides users through a 4-pillar career discovery framework (Love, Talent, Needs, Paid Work), then calls Gemini AI to generate a personalized career analysis.

### User flow
1. **Landing page** (`app/page.tsx`) — marketing sections
2. **Intro + Form** (`app/commencer/page.tsx`) — two sub-views controlled by `currentStep`:
   - `IkigaiStepEnum.INITIAL` → `YourIkigaiLayout`: VennDiagram + pillar list + "Analyser" button
   - Any pillar step → `FormLayout`: 3-question form for that pillar
3. **Results** (`app/votre-ikigai/page.tsx`) — AI analysis: summary, job recommendations, tags, confidence score, PDF export via `window.print()`

### Pillar interaction flow
1. User clicks a pillar in `MainstayList` (or a circle in the Venn) → `updateForm(pillar, { progressState: IN_PROGRESS })` + `setStep(pillar)` — transitions to `FormLayout`
2. `FormLayout` puts a **`FormStepBar`** at the top, then stacks the rest in a vertically-centred column (the block animates its `layout` so height changes glide, never snap):
   - **`FormStepBar`** (top) — the utility + navigation bar: a back chip (→ INITIAL) then the 3-question multistep nav (one **`FormStep`** per question). The **active** question *deploys* with its « Question N » label (framer `layout` width animation); the others stay compact (number only). Status is read by **colour + outline**: à faire = thin graphite, en cours = dashed accent, validée = thicker solid accent, active = filled accent. Offset box-shadow on hover (like the buttons), a small scale "pop" when a question turns complete, and one muted microline (« ordre libre · 2 réponses suffisent »). **No pillar counter** — the kanji identity below situates the user. The pillar `accent` is passed in and applied via an inline `--accent` CSS var (so `bg-accent` / `border-accent` / `text-accent` resolve to the current pillar's colour).
   - **`PillarIdentity`** — opens the column with `kanji — pilier` (kanji in the pillar's `accent`, vertically centred when the title wraps). On validation the kanji settles and a calligraphic brush-stroke draws under it (the "seal"). Carries **`PillarAbout`** (info popover « à propos de ce pilier »)
   - **`FormGuidelines`** — the current question (serif `Title`, keyed fade on change) + detail hint + **`FormHelp`** (« besoin d'aide ? »)
   - **`FormTextArea`** — textarea (warm `bg-surface`, focus ring in the pillar `accent`, autofocus on each question/pillar; `rows=6` on mobile, taller on desktop), `AnswerCounter` (pencil + char progress), and the guided action button (full-width on mobile)
3. **Navigation between questions**: free, via the `FormStepBar` (any order) *or* the guided button below
4. **Answers auto-save** to context after a 500 ms debounce via `updateForm`
5. **Guided action button** (non-blocking): pillar not yet valid → **« Continuer »** (Outline) advances to the next question (on the last, jumps to the first still-unfilled — never gated, never a dead-end). Once ≥ 2 answers are valid → **« Terminer ce pilier »** (Primary) calls `savePillar()` + `setStep(INITIAL)`.
6. Back in `YourIkigaiLayout`: each completed circle seals with its kanji on the Venn; once all 4 are complete → the Venn centre reveals `生き甲斐` and "Analyser mes réponses" triggers the Gemini call.

A question only counts as **valid** once its answer reaches `MIN_ANSWER_LENGTH` (60 chars) — the introspective garde-fou. All chrome labels are monospace uppercase.

### State management
All form state lives in `app/context/index.tsx` (the `AppProviders` component). It wraps everything in `<MotionConfig reducedMotion="user">` (Framer Motion respects the system "reduce motion" setting app-wide; CSS animations are neutralized via a `prefers-reduced-motion` block in `globals.css`), then two providers:

- **`IkigaiContext`** (`app/context/IkigaiContext.tsx`) — form answers for all 4 pillars, current step, pillar state machine (`PillarStateEnum`), and the optional **`enrichment`** profile (see below). Persisted to `localStorage` under the key `"ikigai-form"` (pillars) and `"ikigai-enrichment"` (profile). Exposes **`isHydrated`** (false until the localStorage read effect has run) — any page-level redirect that depends on `ikigaiForm` (e.g. `/votre-ikigai` bouncing back to `/commencer` when the form is incomplete) must gate on `isHydrated` first, otherwise it fires against the transient empty initial state on every hard refresh, before localStorage has had a chance to populate.
- **`HoverContext`** (`app/context/HoverContext.tsx`) — which pillar is currently hovered (used for the Venn diagram to bring the hovered circle to the front).

`enrichment` (`updateEnrichment` to patch it) is identity/profile data, not pillar progress — it lives on its own localStorage key and is **never cleared by `resetIkigai()`**.

Step progression uses `IkigaiStepEnum` (INITIAL → LOVE → NEEDS → PAID → TALENT → RESUME). The user can fill pillars in any order.

`PillarStateEnum` lifecycle: `NOT_STARTED → IN_PROGRESS → IS_SAVED → FINISHED`
(`IS_SELECTED` still exists in the enum but is unused — it was tied to the modal, which has been removed.)

Per-pillar colours live in a few intentionally-distinct places: `colorMap` in `IkigaiContext.tsx` (pastels), the Venn circle `fill`s in `VennDiagram/index.tsx`, and — the single source for the **form + seal accent** — the `accent` field on each entry in `ikigaiMainstay.ts` (a deepened "ink" tone, legible on cream). The form obeys **one pillar, one colour**: the current pillar's `accent` is the only chromatic accent on screen; everything else is ink / graphite / paper.

### Form validation

`app/utils/validateForm.ts`:
- `MIN_ANSWER_LENGTH` (60) — an answer only "counts" once it reaches this length (introspective garde-fou; stops trivial answers from validating a pillar)
- `isAnswerFilled(answer)` — `answer.trim().length >= MIN_ANSWER_LENGTH`
- `getFilledAnswersCount(answers)` — number of answers passing `isAnswerFilled`
- `isPillarCompleteForAnalysis(pillar)` — requires ≥ 2 valid answers out of 3
- `canAnalyzeIkigai(form)` — all 4 pillars must be complete (calls above for each)

### AI integration

`POST /api/analyze` (`app/api/analyze/route.ts`):
- Validates the payload with `isValidIkigaiPayload()`
- Builds a prompt via `app/utils/ikigaiPrompt.ts` (French-language system prompt, instructs Gemini to output strict JSON)
- Calls **Gemini 2.5 Flash** via `@google/genai`
- Strips markdown fences with `cleanJsonString()`, parses JSON
- Returns `{ success: true, data: IkigaiAnalysisResult }` or `{ success: false, error: string }`
- Client-side caching uses `sessionStorage` (key `"ikigai-analysis-cache"`, signature-based, helpers in `app/api/analyze/utils.ts`)

### Profile enrichment (optional)

An **« enrichir mon profil »** trigger sits in `SiteHeader`'s `endSlot` next to « réinitialiser » (wired in `YourIkigaiLayout`, visible on the INITIAL view of `/commencer`). It opens a generic **`Modal`** (`app/components/UI/Modal.tsx`) driven by the generic **`useModal()`** hook (`app/hooks/useModal.ts`, `{ isOpen, open, close }` — both are reusable beyond this feature, not enrichment-specific).

The modal hosts `EnrichProfileForm` (`app/components/EnrichProfile/`), an **entirely optional** form that densifies the context sent to Gemini: MBTI type (custom `MbtiSelect` listbox, data in `app/utils/datas/mbtiTypes.ts`), DISC behavioral colour (`app/utils/datas/discProfiles.ts`), current job, satisfaction (0–10 slider), age. Every field is optional and nothing here gates analysis — fields auto-save to `IkigaiContext`'s `enrichment` after a 500 ms debounce, same convention as pillar answers.

`buildIkigaiPayload(form, enrichment)` (`app/api/analyze/utils.ts`) folds `enrichment` into the `/api/analyze` payload only when at least one field is filled (`hasEnrichmentData()` in `app/utils/ikigaiEnrichment.ts` — kept outside `IkigaiContext.tsx` so the server route doesn't pull a client-context module into its bundle). `normalizePayload`/`getPayloadSignature` also account for `enrichment`, so the `sessionStorage` analysis cache correctly invalidates when only the enrichment changes. `ikigaiPrompt.ts` instructs Gemini to use these fields to nuance tone/relevance, never to flag their absence.

### Key types

`app/types.ts` — enums + domain unions:
- `IkigaiStepEnum` — INITIAL, LOVE, NEEDS, PAID, TALENT, RESUME
- `IkigaiPillarStep` — `IkigaiStepEnum` minus INITIAL and RESUME
- `PillarStateEnum` — NOT_STARTED, IS_SELECTED, IN_PROGRESS, IS_SAVED, FINISHED
- `MbtiType` — union of the 16 4-letter MBTI codes
- `DiscColor` — `"red" | "yellow" | "green" | "blue"`

`app/context/IkigaiContext.tsx`:
- `IkigaiForm` — `{ mainstay: IkigaiStepEnum, progressState: PillarStateEnum, answers: string[] }`
- `IkigaiEnrichment` — `{ mbti?, disc?, currentJob?: string, satisfaction?: number, age?: number }` (optional profile, see above)
- `IkigaiContextProps` — context shape with `ikigaiForm`, `currentStep`, `isHydrated`, `enrichment`, `setStep`, `updateForm`, `savePillar`, `resetIkigai`, `updateEnrichment`

`app/api/analyze/types/request.ts`:
- `IkigaiPayload` — `{ love, talent, needs, paid: string[], enrichment?: IkigaiEnrichmentPayload }`
- `IkigaiEnrichmentPayload` — same shape as `IkigaiEnrichment` but decoupled (plain `string`/`number`), since the API route is a boundary and shouldn't import client-context types

`app/api/analyze/types/response.ts`:
- `IkigaiAnalysisResult` — `{ summary: { profile, key_strengths, motivations, work_environment }, analysis: { insights, tensions }, jobs: IkigaiJob[], recommendations: { actions, warning }, tags: IkigaiTags, confidence }`
- `IkigaiJob` — `{ title, description, match_reason, score, ikigai_scores: IkigaiScores }`
- `IkigaiTags` / `IkigaiScores` — per-pillar string arrays / numbers

### Data files

`app/utils/datas/ikigaiMainstay.ts` — static content for each pillar: `kanji` (愛 / 要 / 稼 / 才), `accent` (the pillar's ink colour), title, description, 3 guided questions with detail hints, tips, help prompts. Single source consumed by `FormGuidelines`, `FormTextArea`, `PillarIdentity`, the Venn seal, and the question navs.

`app/utils/datas/ikigaiPromises.ts` — static content for the landing page promises section.

`app/utils/datas/mbtiTypes.ts` / `app/utils/datas/discProfiles.ts` — static options for the optional profile-enrichment form (MBTI codes, DISC colours + muted swatch hexes).

### Path alias

`@/*` maps to the project root (e.g. `@/app/context/IkigaiContext`).

### Component structure

```
app/components/
  Analyze/         — result display: IkigaiSummary, JobCard, PillarAnalysis, CoherenceSignal, PdfButton
  EnrichProfile/   — EnrichProfileModal (owns useModal + Modal), EnrichProfileForm, MbtiSelect (custom listbox)
  Form/            — FormStepBar + FormStep (top-bar multistep nav), PillarIdentity + PillarAbout, FormGuidelines + FormHelp, FormTextArea + AnswerCounter, FormSideEstampe (faded ukiyo-e side print, xl+) + FormBottomEstampe (bottom→up fade, mobile/tablet)
  IkigaiGuide/     — overview "mode d'emploi": IkigaiGuide, GuideStep
  LandingPage/     — Banner, HeroSection, IntroSection/, PillarSection/, PromisesSection
  Layouts/         — MainLayout, FormLayout, YourIkigaiLayout
  UI/              — Button, Eyebrow, Collapse, DynamicIcon, EnrichProfileButton, HighlightText, KanjiRevealWord, Modal, Title, AsciiKoi, AsciiSakura
  VennDiagram/     — VennDiagram (SVG, responsive via %), Circle (per-pillar kanji seal on completion + `生き甲斐` capstone), VennProgress
  SiteHeader.tsx   — shared logo-only header (landing + overview); replaced the old Navbar
  MainstayList.tsx
```

`app/hooks/` also has **`useModal()`** — generic `{ isOpen, open, close }`, not tied to `EnrichProfile`, reuse it for any future modal.

**File size**: keep component / layout / interface files focused. If one grows past ~150 lines, split it into smaller sub-components (e.g. `AnswerCounter` extracted from `FormTextArea`, `GuideStep` from `IkigaiGuide`). A file that needs scrolling to understand is usually doing too much.


## Art direction

**Neo-tech · Neo-vintage · Minimalist · Airy · Calm · Modern**

Ikig-ai sits at the intersection of two worlds: Japanese tradition and the philosophy of ikigai (slowness, meaning, depth) meets contemporary AI technology (precision, clarity, quiet intelligence). The interface must carry both — never cold like a dashboard, never decorative like a mood board. It should feel like a thoughtful tool that respects the user's time and inner space.

Design tokens (colors, shadows, fonts, background) are defined in `app/globals.css` — always refer to them rather than hardcoding values.

**The visual signature**
- **Airy before everything**: whitespace is the primary design element. Density signals stress; space signals calm. When in doubt, add space.
- **One focal point per screen**: the user should never have to scan to find what to do next. Visual hierarchy is achieved through spacing and weight, not decoration.
- **Neo-vintage through typography**: thin display weights (`font-[100]` to `font-[200]`), warm background gradient — evokes craftsmanship and slowness, not sterility
- **Neo-tech through monospace**: counters (`01 / 04`), state labels (`en cours`, `complété`, `à faire`), the answer counter (`12 / 60 caractères` → `réponse enregistrée`), system microlines (`~20 min · 4 piliers`, `gratuit · sans inscription`, `analyse assistée par gemini-2.5-flash`) — precise, terminal-like, a quiet nod to the AI layer underneath
- **Section eyebrows** open each landing section in a single format via the `Eyebrow` component: `kanji — français · dot` (e.g. `生き甲斐 — ikigai`, `哲学 — la philosophie`, `道 — la méthode · 04 piliers`, `実り — le résultat`). The kanji carries the authentic Japanese thread.
- **Warm register, cold reserved for tech**: pastel accents stay warm (`--tertiary` sand is the default accent). The cool blue (`--secondary` / `--accentbis`) is reserved for the "tech/AI" thread only — the monospace microlines and the "l'intelligence artificielle" mention. ASCII art (koï/sakura) is warm ton-sur-ton, never the old cold blue.
- **Ukiyo-e estampes as atmosphere, not decoration**: use them subtly — a faded full-bleed background behind a section, or an organic-shaped ("galet"/torn-paper) print — kept low enough that text stays legible. Never a plain "stock image in a card".
- **Transitions as breathing**: all state changes animate (150–300 ms, ease-in-out). Nothing snaps. Motion respects `prefers-reduced-motion` — the app is wrapped in `<MotionConfig reducedMotion="user">` (Framer) and `globals.css` has a `prefers-reduced-motion` block for CSS animations.
- **One pillar, one colour** — on the form, the current pillar's `accent` (from `ikigaiMainstay.ts`) is the *only* chromatic accent: kanji identity, active nav state, textarea focus ring all share it; ink / graphite / paper for everything else. The overview stays multi-colour — it is the map of all 4 pillars.
- **The seal ritual (hanko 印)** — completing a pillar is a reward, not a form submit: the identity kanji settles and a calligraphic brush-stroke draws under it; back on the Venn the circle seals with its kanji, and the 4th completion reveals `生き甲斐` at the centre. This "collect the four seals" arc is the engine that makes users want to finish. Keep it in the ink/calligraphy register — never confetti or a green tick.
- **Offset box-shadow on hover** for interactive elements (see `Button.tsx`) — directional `4px 4px 0px`, not a standard glow
- **Noise texture overlay** on `body::before` via `nnnoise.svg` at ~3.5% opacity — gives organic warmth; don't cover it with solid backgrounds
- **Less is more**: every element must earn its place — nothing exists by default. If removing it doesn't break comprehension, remove it.


## UX/UI senior designer mindset

When creating a new component or redesigning a page, Claude must think as a senior UX/UI designer with a holistic view — not just implement what's asked but reveal the right visual and interaction hierarchy.

**Holistic vision**
- Every screen must make the user want to continue: the form should feel approachable, almost meditative, never overwhelming
- Visual harmony over functional richness — reduce friction, increase flow
- Read `globals.css` and existing components before choosing any color, spacing, or animation value

**Form UX principles**
- The user is doing introspective work: tone must be soft and encouraging, never clinical or urgent
- Progress must always be perceivable: the per-question nav (`FormStepBar`), the `AnswerCounter`, and the Venn filling up all reinforce "you're making progress"
- Momentum without lock-in: the guided **« Continuer »** button leads the user forward (MBTI-style readiness — autofocus, one obvious next action), but never gates — any question can be skipped and revisited, still 2 of 3 in any order
- Empty states should feel welcoming — soft placeholder text, no red by default
- The experience must be intuitive on first view: if a user needs to figure out what to do, the design has failed

**Design rules to enforce**
- Generous spacing: elements breathe; dense blocks feel wrong in this product
- Monospace for anything "system" (numbers, statuses, counters, labels)
- Animate all state changes (color, opacity, position) — even 150–200 ms eases matter
- Use border-radius consistently: subtle rounding (`rounded-sm`, `rounded-2xl` on textareas) — no aggressive corners
- Never use saturated colors or hard contrasts; everything stays in the calm register of the palette

**What to avoid**
- Stacking too much information on one screen — one action, one focus, one moment at a time
- Saturated colors or visually loud components
- Adding UI elements that don't earn their presence — every visible affordance must have a clear reason to exist
- Decorative complexity: ornaments must be subtle or absent; content and space do the work


## UI
- Tailwind CSS 4 with custom fonts: `--font-arima` and `--font-andika` (loaded in `app/layout.tsx`)
- Icons: `@phosphor-icons/react`
- Animations: `motion` (Framer Motion)
- Conditional classnames: `clsx`
- Language: French throughout (UI strings, AI prompt, `lang="fr"` on `<html>`)
- View Transitions API used in `/commencer` on step change (`document.startViewTransition`)