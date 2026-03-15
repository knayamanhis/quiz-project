# Coffee Personality Quiz — Requirements

## Overview
A "What's Your Coffee Personality?" quiz for Basecamp Coffee. Users answer 6 abstract & quirky questions and get a breakdown of their personality percentages with coffee drink recommendations.

---

## Personality → Coffee Pairings

| Personality | Drink | Tagline |
|---|---|---|
| Cozy Classic | Medium Roast Drip | "Comfort in every cup" |
| Sweet Enthusiast | Caramel Latte | "Life's too short for bitter" |
| Zen Minimalist | Black Coffee, Single Origin | "Simple. Clean. Perfect." |
| Night Owl | Red Eye (coffee + espresso shot) | "Sleep is optional" |
| Practical Pragmatist | Large Drip, Whatever's Fresh | "Just make it work" |

---

## Result Display

**Style B: Show all percentages**

After completing the quiz, users see ALL their personality percentages ranked from highest to lowest. Each result includes the personality name, percentage, drink recommendation, and tagline.

Example:
- 50% Cozy Classic → Medium Roast Drip — "Comfort in every cup"
- 30% Night Owl → Red Eye — "Sleep is optional"
- 20% Zen Minimalist → Black Coffee — "Simple. Clean. Perfect."

---

## Visual Style

**Style 3: Bold & Dramatic**
- Dark background (#0a0a0a / #111)
- Gold/amber accents (#c8a96e)
- High contrast white text
- Strong typography, uppercase headings
- Numbered answer options
- Minimal borders, no rounded corners

---

## Images

One image per personality result. Files located in `public/`:
- `cozy-classic.jpg` — drip coffee
- `sweet-enthusiast.jpg` — latte art
- `zen-minimalist.jpg` — pour over coffee
- `night-owl.jpg` — espresso shot
- `practical-pragmatist.jpg` — coffee mug

---

## Icons

**Yes — icons on each answer option.**
Use emojis as icons next to each answer choice throughout the quiz.

---

## Quiz Questions

### Q1: You're a color. Which one are you?
- 🔴 Deep crimson — intense and vivid → **Practical Pragmatist**
- 🤍 Soft cream — warm and familiar → **Cozy Classic**
- 💛 Pastel yellow — sweet and cheerful → **Sweet Enthusiast**
- 🩶 Cool grey — calm and uncluttered → **Zen Minimalist**
- 🖤 Midnight black — sharp and alive at 2am → **Night Owl**

### Q2: A mysterious package arrives. You:
- 📦 Open it immediately, no hesitation → **Practical Pragmatist**
- 🛋️ Wait until you're cozy with a blanket → **Cozy Classic**
- 🎀 Shake it and guess — half the fun is wondering → **Sweet Enthusiast**
- 🧘 Leave it. If it's important, it'll still be there tomorrow → **Zen Minimalist**
- 🌙 Open it at midnight for full dramatic effect → **Night Owl**

### Q3: If your brain were a room, it would look like:
- 🗂️ A tidy home office with a whiteboard → **Practical Pragmatist**
- 📚 A lived-in library with a reading chair → **Cozy Classic**
- 🍬 A candy shop — colorful and a little chaotic → **Sweet Enthusiast**
- 🪴 A Japanese garden — one rock, one plant, silence → **Zen Minimalist**
- 🌃 A rooftop at 3am with city lights → **Night Owl**

### Q4: Your spirit weather is:
- ⛅ Overcast but dry — reliable, gets things done → **Practical Pragmatist**
- 🌧️ Light rain — cozy, stay-inside weather → **Cozy Classic**
- 🌈 Rainbow after rain — unexpected and delightful → **Sweet Enthusiast**
- 🌤️ Crisp clear morning — still and clean → **Zen Minimalist**
- 🌩️ Thunderstorm at midnight — electric and alive → **Night Owl**

### Q5: You find a time machine. Where do you go?
- ⏩ Forward 10 years — see if the plan worked → **Practical Pragmatist**
- ⏮️ Back to a perfect childhood moment → **Cozy Classic**
- 🎠 1920s Paris — glamour and pastries → **Sweet Enthusiast**
- 🏯 Ancient Japan — simplicity and silence → **Zen Minimalist**
- 🚀 The far future, middle of the night, unknown city → **Night Owl**

### Q6: Your ideal Saturday is:
- ✅ Knock out the to-do list, feel accomplished → **Practical Pragmatist**
- 🧣 Slow morning, familiar coffee spot, no plans → **Cozy Classic**
- 🛍️ Brunch, window shopping, maybe dessert twice → **Sweet Enthusiast**
- 🌿 One long walk, phone off, just thinking → **Zen Minimalist**
- 🌙 Sleep until 2pm, peak energy hits at 11pm → **Night Owl**

---

## Scoring Logic

Each answer maps to one personality. After 6 questions, tally the count for each personality and display as percentages. Show all 5 results ranked from highest to lowest.
