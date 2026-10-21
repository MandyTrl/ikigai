# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
yarn dev        # Start dev server with Turbopack
yarn build      # Production build
yarn start      # Start production server
yarn lint       # ESLint
yarn fixtures   # Run the 4 persona fixtures through /api/analyze (needs yarn dev running)
yarn seed <persona>  # Open /votre-ikigai with a saved analysis (student | unhappy-employee | minimal | curious-explorer)
```

No test suite is configured. `yarn fixtures` is the closest thing: see **Fixtures & output review** below.

## Environment

Requires a `.env.local` file with:
```
GEMINI_API_KEY=...
FIXTURES_DEV_KEY=...   # any value; gates the dev-only /dev routes
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
- Validates the payload in two steps, both `400`: `isValidIkigaiPayload()` for the shape, then `isCompleteIkigaiPayload()` for the content (the same 2-valid-answers-per-pillar rule as the UI, reusing `getFilledAnswersCount` + `MIN_ANSWERS_REQUIRED_PER_PILLAR` from `validateForm.ts`). The second guard matters because `responseSchema` demands 3 jobs and a portrait no matter what: on an empty payload the model would have no choice but to invent a profile. `validateForm.ts` imports `IkigaiForm` with `import type` so the route can reuse these rules without pulling the `"use client"` context into its bundle
- Builds a prompt via `app/utils/ikigaiPrompt.ts` (French-language system prompt: role, reading rules, 9-step method, tone/writing constraints). The user data block is built by `app/utils/ikigaiPromptData.ts` — **`buildUserDataBlock()` pairs each pillar answer with the question it answers** (`answers[i]` ↔ `instructions[i]` from `ikigaiMainstay.ts`, unanswered ones marked `(non renseignée)`) and resolves the stored enrichment codes into labels (`disc: "green"` → `Stable`, `mbti: "INFP"` → `INFP · Médiateur`). The payload shape never changes, so validation and the cache signature are untouched.
- The prompt is calibrated on three personas (orientation with no work experience, employed and unsatisfied, curious without urgency) documented in the README. The rules that follow from them and must not be weakened: **`satisfaction` sets the register** (0–4 franchise, 7–10 the 3 jobs become directions to deepen rather than a new path, unfilled = middle ground); `confidence` measures the coherence of what was said and **never professional maturity**, so a pillar left thin by genuine inexperience does not drop it below 65; `insights` show what *holds together* and `tensions` what *pulls apart*, never the same material; `signature` is the one quotable sentence of the whole analysis (28 words max, generated before `summary` so the portrait deploys it instead of restating it); every score is a **multiple of 5** (an estimate, not a measurement) and must be defensible by its `match_reason`; nothing may reproach the user for what they did not write.
- Calls **Gemini 2.5 Flash** via `@google/genai` at `temperature: 0.8`, with `responseMimeType: "application/json"` + `responseSchema` (`app/api/analyze/responseSchema.ts`) — the runtime mirror of `IkigaiAnalysisResult`. **Keep the two in sync.** The schema carries what prose cannot guarantee: required fields (`warning` is always present, so `VigilancePoint` never renders empty), cardinalities calibrated on the UI (exactly 3 jobs and 3 actions, 3–4 items per `summary` list for the 3-card grid, 4–5 tags per pillar), integer bounds on every score. Its `propertyOrdering` also drives **generation order** (`tags` first since the whole analysis builds on them, `signature` before `summary` so the portrait knows the thesis is already stated, `confidence` last) and fixes the `ScoreBar` display order, which otherwise followed whatever key order Gemini returned.
- Parses JSON (`cleanJsonString()` stays as a cheap guard, now that the mime type makes fences unlikely)
- Returns `{ success: true, data: IkigaiAnalysisResult }` or `{ success: false, error: string }`
- Client-side caching uses `sessionStorage` (key `"ikigai-analysis-cache"`, signature-based, helpers in `app/api/analyze/utils.ts`)

### Fixtures & output review

Checking prompt output without filling the form by hand. Everything lives in `scripts/` — **outside `app/` on purpose**, so none of it can reach the client bundle.

| file | role |
| --- | --- |
| `scripts/fixtures.ts` | the 3 personas of the README as `IkigaiPayload`, with deliberately uneven fill levels (`student` 9 valid answers of 12 and no enrichment, `unhappy-employee` 12/12 with all 5 enrichment fields, `curious-explorer` 10/12 with partial enrichment). Skipped answers stay as `""` **at their index** — the prompt pairs `answers[i]` with `instructions[i]`. Each fixture carries a `probe` saying what it puts to the test |
| `scripts/checks.ts` | text helpers + the 4 check families, returning `Alert[]` with `kind`: **`contrat`** (cardinalities of `responseSchema`, duplicate job titles — the job cards key on `job.title`; a failure here means schema/types/UI diverged, i.e. a bug), **`regle`** (prompt rules: scores off the multiples-of-5 grid, flat pillars, pillar names leaking into the prose, forbidden openings, em dashes), **`vigilance`** (6-word verbatim reuse from the answers, over-long summary items) |
| `scripts/measures.ts` | `buildMeasures()` turns runs into the uniformity numbers (portrait openings and skeletons, confidence spread, pairwise lexical overlap, jobs proposed to more than one persona, intra-persona variance) + `formatTerminalSummary()` |
| `scripts/output-store.ts` | one dated folder per run (`scripts/output/2026-10-16_1642/<slug>.json`), so nothing is overwritten and nothing stale mixes in. Gitignored |
| `scripts/analyze-fixtures.ts` | the CLI. POSTs each fixture to the real `/api/analyze` (no logic duplicated), saves the JSON, prints the summary |

**Quota**: the Gemini free tier allows **20 `gemini-2.5-flash` requests per day**. A full `yarn fixtures` run costs one call per persona (4 today), so budget ~5 full runs per day. The route maps an upstream 429 to a 429 (`Quota Gemini atteint`) and a 503 to a 503, so the harness can tell a transient spike (it retries 3 times) from an exhausted quota (it stops immediately).

```bash
yarn fixtures                      # one Gemini call per persona, one new dated folder
yarn fixtures --only=student       # a single persona
yarn fixtures --runs=2             # each persona twice, measures intra-persona variance
yarn fixtures --report-only        # recompute the measures from the latest folder, no API call
yarn fixtures --base-url=http://localhost:3001
```

Scripts run under Node's native TypeScript (no `tsx`, no `ts-node`), which requires explicit `.ts` extensions in their relative imports — hence `allowImportingTsExtensions` in `tsconfig.json`. They only ever `import type` from `app/`, so nothing from the client context is loaded at runtime.

**`yarn seed <persona>`** fills the browser cache with a saved analysis and opens the real `/votre-ikigai` page with it — the only way to see how an output actually renders (that is how the `d'« éveil au vivant »` typography bug and the schema-drift crash were found). `localStorage` can only be written from the page itself, so the command opens `/dev/seed`, a route that writes `ikigai-form`, `ikigai-enrichment` and the signed `sessionStorage` cache, then redirects — no UI, you never see it. It takes the latest complete run unless `run=` says otherwise, and a **full page load** is required: `AppProviders` lives in the root layout and only reads localStorage on mount.

Two locks on that route: it 404s when `NODE_ENV === "production"`, and 404s without `?k=` matching `FIXTURES_DEV_KEY` from `.env.local` (compared with `timingSafeEqual`). `yarn seed` reads that key itself.

Quotation marks are stripped at render time by `withoutStrayQuotes()` (`app/utils/stripQuotes.ts`), applied once when `/votre-ikigai` reads the cached analysis — on every prose field **except `match_reason`**, where quoting the user is the point and `QuotedText` styles it. The prompt reserves citation to `match_reason`, but the model keeps quoting elsewhere on the densest profiles; the harness still flags it as a `regle` alert (it signals paraphrase), the interface no longer shows it. Apostrophes are untouched: only `"`, `“`, `”`, `«`, `»` are removed, so `d'"expliquer"` renders as `d'expliquer`.

`getPayloadSignature` prefixes the signature with `ANALYSIS_SCHEMA_VERSION` (`app/api/analyze/utils.ts`): **bump it whenever a field is added to the response schema**, otherwise a visitor's cached analysis from before the deploy renders without the new field. `checkAnalysis` reports a missing field as a `contrat` alert instead of crashing, for the same reason.

### Profile enrichment (optional)

An **« enrichir mon profil »** trigger sits in `SiteHeader`'s `endSlot` next to « réinitialiser » (wired in `YourIkigaiLayout`, visible on the INITIAL view of `/commencer`). It opens a generic **`Modal`** (`app/components/UI/Modal.tsx`) driven by the generic **`useModal()`** hook (`app/hooks/useModal.ts`, `{ isOpen, open, close }` — both are reusable beyond this feature, not enrichment-specific).

The modal hosts `EnrichProfileForm` (`app/components/EnrichProfile/`), an **entirely optional** form that densifies the context sent to Gemini: MBTI type (custom `MbtiSelect` listbox, data in `app/utils/datas/mbtiTypes.ts`), DISC behavioral colour (`app/utils/datas/discProfiles.ts`), current job, satisfaction (0–10 slider), age. Every field is optional and nothing here gates analysis — fields auto-save to `IkigaiContext`'s `enrichment` after a 500 ms debounce, same convention as pillar answers.

`buildIkigaiPayload(form, enrichment)` (`app/api/analyze/utils.ts`) folds `enrichment` into the `/api/analyze` payload only when at least one field is filled (`pickEnrichmentFields()` in `app/utils/ikigaiEnrichment.ts` — kept outside `IkigaiContext.tsx` so the server route doesn't pull a client-context module into its bundle). `normalizePayload`/`getPayloadSignature` also account for `enrichment`, so the `sessionStorage` analysis cache correctly invalidates when only the enrichment changes. **Every `buildIkigaiPayload` call site must pass `enrichment`** — `useIkigaiAnalyze` writes the cache signature and `/votre-ikigai` compares it, so omitting the argument on one side makes the signatures diverge and bounces the user back to `/commencer` as soon as a single profile field is filled. `ikigaiPrompt.ts` gives the fields three graded uses and never lets Gemini flag their absence: they shape the **wording**, they **arbitrate** between two jobs of equal relevance, and a clear contradiction with the answers may be **raised as a hypothesis to verify** (at most one such tension, since MBTI/DISC are self-declared and the pillars always win).

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
- `IkigaiAnalysisResult` — `{ signature, summary: { profile, key_strengths, motivations, work_environment }, analysis: { insights, tensions }, jobs: IkigaiJob[], recommendations: { actions, warning }, tags: IkigaiTags, confidence }`
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
  About/           — AboutModal + AboutContent (« à propos » in the overview header: what is sent to Gemini, what stays in the browser)
  Analyze/         — result display: Signature (the quotable line, ichigyô-mono rule), IkigaiSummary, JobCardReveal (desktop click reveal) + JobCardMobile (accordion) + QuotedText, PillarAnalysis, CoherenceSignal, PdfButton
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