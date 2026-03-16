Add a new coffee personality type to the quiz.

Ask the user for the following (or accept if already provided):
- Personality ID (lowercase, hyphenated, e.g. "bold-adventurer")
- Display name (e.g. "Bold Adventurer")
- Recommended drink (a real Basecamp Coffee menu item or style)
- Tagline (short, punchy, 4–6 words, matches the personality's character)
- Image filename (must be added to public/ as a .jpg before running this)

Then:
1. Read `app/page.tsx`
2. Add the new personality to the PERSONALITIES array
3. Add the new PersonalityId to the `PersonalityId` union type
4. Remind the user that existing questions each need a new answer option mapping to this personality (quiz currently assumes exactly 5 personalities with one answer per question)
5. Show the user the new entries to confirm

Schema reminder:
```typescript
// PersonalityId union — add new id here
type PersonalityId = "cozy-classic" | "sweet-enthusiast" | ... | "new-id"

// PERSONALITIES array entry
{
  id: PersonalityId,
  name: string,
  drink: string,
  tagline: string,
  image: string   // format: "/filename.jpg"
}
```

Important: Adding a personality also requires updating every question to include a 6th answer option. Flag this clearly to the user.
