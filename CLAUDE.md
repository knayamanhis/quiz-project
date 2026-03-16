# Basecamp Coffee — Coffee Personality Quiz

## What This Is

A "What's Your Coffee Personality?" quiz for Basecamp Coffee, a regional coffee chain with 45 locations across the Pacific Northwest (Seattle, Portland, Boise). Users answer 6 abstract, quirky questions and receive a breakdown of all 5 personality types ranked by percentage, with coffee drink recommendations and personality images.

This quiz was built as part of a loyalty program turnaround initiative. The goal: replace a failing transactional points program with a personality-led experience that gives customers an identity, not just a point balance.

---

## Tech Stack

- **Framework:** Next.js 16 with App Router
- **Language:** TypeScript
- **Styling:** Tailwind CSS — dark background (`#0a0a0a`), gold accents (`#c8a96e`) are the primary brand colors
- **State:** React `useState` — all quiz logic runs client-side, no backend
- **Images:** Next.js `<Image>` with `fill` — one `.jpg` per personality in `public/`
- **Deployment:** Vercel — auto-deploys on every push to GitHub (`master` branch)
- **Repo:** `github.com/knayamanhis/quiz-project` (private)

---

## File Structure

```
app/
  page.tsx        — entire quiz: all types, data, logic, and three UI screens
  layout.tsx      — metadata only
  globals.css     — Tailwind base + gold/surface color tokens
public/
  cozy-classic.jpg
  sweet-enthusiast.jpg
  zen-minimalist.jpg
  night-owl.jpg
  practical-pragmatist.jpg
REQUIREMENTS.md   — full quiz spec: personalities, questions, answer mappings, visual style
```

---

## The 5 Personalities

| ID | Name | Drink | Tagline |
|---|---|---|---|
| `cozy-classic` | Cozy Classic | Medium Roast Drip | "Comfort in every cup" |
| `sweet-enthusiast` | Sweet Enthusiast | Caramel Latte | "Life's too short for bitter" |
| `zen-minimalist` | Zen Minimalist | Black Coffee, Single Origin | "Simple. Clean. Perfect." |
| `night-owl` | Night Owl | Red Eye | "Sleep is optional" |
| `practical-pragmatist` | Practical Pragmatist | Large Drip, Whatever's Fresh | "Just make it work" |

---

## Quiz Structure

- 6 questions, each with 5 answer options
- Every answer maps to exactly one `PersonalityId`
- After 6 answers: tally counts → convert to percentages → sort descending
- Results screen shows all 5 personalities ranked highest to lowest
- Primary result (top %) gets a full-width image; secondary results get thumbnails

---

## Visual Style — Bold & Dramatic

- Background: `#0a0a0a` (always dark — no light mode)
- Surface: `#111111`
- Accent: `#c8a96e` (gold)
- Text: `#ededed` (primary), `#888888` (muted)
- Typography: uppercase headings, no border radius (`rounded-none` everywhere)
- No external UI library — all styling via inline styles and Tailwind

---

## Constraints

- Single-page app — all logic lives in `app/page.tsx`
- No database, no backend, no auth
- Cannot change the dark/gold visual style (brand requirement)
- Cannot change the fundamental scoring logic (each answer = one personality point)
- Images are fixed — one per personality, already in `public/`

---

## Brand Voice

- Warm, genuine, playful — "the local shop that knows your name"
- Use: "community", "your local Basecamp", "baristas", "coffee ritual", "neighborhood"
- Avoid: corporate tone, ALL CAPS enthusiasm, generic language
- This quiz should feel like a conversation with a barista, not a corporate form

---

## Available Skills

- `/add-question` — add a new question with 5 answer options mapped to personality IDs
- `/add-personality` — add a new personality type with drink, tagline, and image
- `/deploy` — commit, push to GitHub, and deploy to Vercel

## Available Agents

- `quiz-designer` — designs new quiz questions that are abstract, quirky, and on-brand for Basecamp Coffee
- `results-reviewer` — reviews the results screen for personality clarity, emotional resonance, and shareability
