Add a new question to the Basecamp Coffee personality quiz.

Ask the user for the following (or accept if already provided):
- The question text (should be abstract and quirky — not coffee-related)
- 5 answer options, each with:
  - An emoji
  - Answer text (evocative, not literal)
  - Which personality it maps to (must be one of: cozy-classic, sweet-enthusiast, zen-minimalist, night-owl, practical-pragmatist)

Rules for good quiz questions:
- Questions should be abstract and personality-revealing, not coffee-related ("You're a color. Which one are you?" not "How do you take your coffee?")
- Each of the 5 answer options must map to a different personality — one per personality
- Answers should feel distinct and true to each personality's character
- Tone should be playful and warm, matching Basecamp Coffee's brand voice

Then:
1. Read `app/page.tsx`
2. Find the QUESTIONS array
3. Add the new question object with the next sequential id
4. Show the user the new entry to confirm

Schema reminder:
```typescript
{
  id: number,
  text: string,
  options: [
    { emoji: string, text: string, maps_to: PersonalityId },
    // ... 5 options total, one per personality
  ]
}
```
