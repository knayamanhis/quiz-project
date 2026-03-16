# Coffee Personality Quiz — Basecamp Coffee

A personality-led quiz experience for Basecamp Coffee that helps customers discover their coffee identity through 6 abstract, quirky questions — and get matched with their perfect drink.

---

## Problem Statement

Basecamp Coffee's loyalty program launched 6 months ago with a $40K investment and was failing. Monthly active users sat at 26% of target, retention had dropped from 45% to 27%, and the rewards NPS was 12 against a brand NPS of 67. The root cause: the program was purely transactional. It had no personality. Customer feedback described it as "fine but forgettable" — the exact phrase appeared in 3 separate months of data. The gap between brand NPS (67) and rewards NPS (12) wasn't a points problem. It was an identity problem. The Coffee Personality Quiz was built to fix that — giving customers a reason to open the app, an identity to claim, and a drink recommendation that feels personal rather than algorithmic.

---

## Features

- **Intro screen** — bold full-screen entry with brand label, headline, and gold CTA
- **6-question quiz** — abstract, quirky questions with 5 emoji-labelled answer options each
- **Progress bar** — thin gold bar tracks advancement through the quiz
- **Instant response** — clicking an answer immediately advances to the next question, no "Next" button
- **Results screen** — all 5 personality types ranked by percentage, highest to lowest
- **Primary result** — full-width hero image, personality name, drink in gold, tagline, and percentage
- **Secondary results** — compact rows with thumbnail images, percentage bars, name, and drink
- **"Take It Again" button** — resets quiz to intro screen
- **Fully client-side** — no backend, no auth, no database

---

## Tech Stack

- **Framework** — Next.js 16 with App Router
- **Language** — TypeScript
- **Styling** — Tailwind CSS with custom gold (`#c8a96e`) and surface (`#111111`) tokens
- **State** — React `useState` — screen, current question, and answer array
- **Images** — Next.js `<Image>` with `fill` inside `relative aspect-video` wrappers
- **Scoring** — answer tallying and percentage calculation done in `computeScores()` at render time
- **Hosting** — Vercel (auto-deploys on every GitHub push)
- **Version Control** — GitHub (private repository)

---

## Architecture & Flow

### How This App Was Built — The Claude Code Flow

This app was built entirely using **Claude Code**, as part of the *Claude Code for Everyone* course. Here is the exact sequence of what happened.

---

**Step 1 — Course Context via CLAUDE.md**
The root `CLAUDE.md` of the course project loaded automatically at the start of every Claude Code session. It contained the full Basecamp Coffee scenario: the failing loyalty program, the metrics, the stakeholder map, the brand voice, and the 3-month deadline. Claude never needed to be re-briefed between sessions — this context was always present.

**Step 2 — Planning via `/start-2-2` Skill**
The `/start-2-2` skill was invoked to run the Plan lesson. This is a markdown file in the course's `.claude/commands/` folder that injected a full interactive teaching script into the conversation. The skill guided an interview process — Claude asked structured questions about visual style, result display format, question type, and image preferences — and produced a `REQUIREMENTS.md` file capturing all decisions before any code was written.

**Step 3 — Build via `/start-2-3` Skill**
The `/start-2-3` skill was invoked to run the Build & Iterate lesson. It injected another teaching script that instructed Claude to read the requirements, produce an implementation plan, and build the app file by file. The skill defined the expected screens, data structures, scoring logic, and visual style — giving Claude a complete blueprint to execute against.

**Step 4 — Implementation Plan**
A `Plan` sub-agent was invoked to translate `REQUIREMENTS.md` into a concrete build plan: exact file modifications (`globals.css`, `layout.tsx`, `page.tsx`), all TypeScript types, static data arrays, component structure, state variables, and the logic for each of the three screens. The plan was reviewed before any code was written.

**Step 5 — Build (All Files Written by Claude)**
Following the approved plan, Claude Code modified three files:
- `app/globals.css` — added gold/surface color tokens, forced dark background always-on
- `app/layout.tsx` — updated metadata title and description
- `app/page.tsx` — full replacement with all types, static data (5 personalities, 6 questions), quiz state, `handleAnswer()`, `resetQuiz()`, `computeScores()`, and three conditional render screens

**Step 6 — Iteration**
After testing, a bug was identified: tied personality scores only showed one image. The results screen was updated so all 5 secondary results include a 64×64 thumbnail alongside their percentage bar — not just the primary result.

**Step 7 — GitHub**
Claude Code used the GitHub CLI (`gh`) to initialise a git repo, commit all files, create a private GitHub repository, and push — without the user touching the terminal.

**Step 8 — Deployment**
Claude Code ran `vercel --prod --yes` to deploy directly to Vercel. The app went live at `https://quiz-project-indol-six.vercel.app`.

---

**Step 9 — Project Infrastructure (Added After Launch)**
Once the app was live, Claude Code set up the project's ongoing maintenance infrastructure:

- **`CLAUDE.md`** — written and added to the project root. Loads automatically in every future session, giving Claude persistent awareness of the quiz structure, personality data, visual constraints, and brand voice — without needing to re-brief it each time.

- **Skills** (`.claude/commands/`) — three slash commands created for repeatable tasks:
  - `/add-question` — enforces correct schema and brand voice when adding new questions to the QUESTIONS array
  - `/add-personality` — adds a new personality type and flags the downstream impact on all existing questions
  - `/deploy` — stages, commits, pushes, and confirms the live Vercel URL

- **Agents** (`.claude/agents/`) — two specialised sub-agents defined for ongoing work:
  - `quiz-designer` — designs new abstract, quirky questions that match Basecamp Coffee's brand voice and correctly map to all 5 personality types
  - `results-reviewer` — reviews the results screen for identity clarity, emotional resonance, drink connection, shareability, and brand fit

These are not used yet — they exist so that future work on the quiz is consistent, on-brand, and doesn't require Claude to guess at the quiz's rules or Basecamp Coffee's voice.

---

### Application Flow — When a User Visits the Quiz

```
User visits quiz-project-indol-six.vercel.app
        ↓
Vercel serves the Next.js app from its global CDN
        ↓
Browser downloads HTML + JS bundle
        ↓
React hydrates — quiz becomes interactive (client-side)
        ↓
screen === "intro" → IntroScreen renders
  → Gold CTA button: "FIND OUT"
```

---

### Quiz Flow — Answering Questions

```
User clicks "FIND OUT"
        ↓
screen = "quiz", currentQuestion = 0
        ↓
User clicks an answer option
        ↓
handleAnswer(PersonalityId) called
  → answer appended to answers[]
  → if currentQuestion < 5: currentQuestion++
  → if currentQuestion === 5: screen = "results"
        ↓
Repeat for all 6 questions (no Next button — immediate advance)
```

---

### Scoring Flow — Results Calculation

```
screen === "results" triggered
        ↓
computeScores(answers) called at render time
  → tally count per PersonalityId across all 6 answers
  → convert counts to percentages (Math.round count/6 * 100)
  → sort descending by percentage
        ↓
scores[0] = primary result → full-width image + name + drink + tagline + %
scores[1–4] = secondary results → thumbnail + % bar + name + drink
        ↓
"TAKE IT AGAIN" → resetQuiz() → all state reset → screen = "intro"
```

---

### Client vs Server

| Layer | Runs On | Examples |
|---|---|---|
| Server (Vercel) | Cloud | Serving HTML/JS, static page generation |
| Client (Browser) | User's device | All quiz logic, answer tracking, score calculation, screen transitions |

This app is entirely client-side after the initial page load. Vercel's only job is to serve the files. Every interaction — answering questions, computing scores, rendering results — happens in the browser with no server involvement.
