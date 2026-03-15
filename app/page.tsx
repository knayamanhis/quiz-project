"use client";

import { useState } from "react";
import Image from "next/image";

type PersonalityId =
  | "cozy-classic"
  | "sweet-enthusiast"
  | "zen-minimalist"
  | "night-owl"
  | "practical-pragmatist";

interface Personality {
  id: PersonalityId;
  name: string;
  drink: string;
  tagline: string;
  image: string;
}

interface AnswerOption {
  emoji: string;
  text: string;
  maps_to: PersonalityId;
}

interface Question {
  id: number;
  text: string;
  options: AnswerOption[];
}

type Screen = "intro" | "quiz" | "results";

const PERSONALITIES: Personality[] = [
  {
    id: "cozy-classic",
    name: "Cozy Classic",
    drink: "Medium Roast Drip",
    tagline: "Comfort in every cup",
    image: "/cozy-classic.jpg",
  },
  {
    id: "sweet-enthusiast",
    name: "Sweet Enthusiast",
    drink: "Caramel Latte",
    tagline: "Life's too short for bitter",
    image: "/sweet-enthusiast.jpg",
  },
  {
    id: "zen-minimalist",
    name: "Zen Minimalist",
    drink: "Black Coffee, Single Origin",
    tagline: "Simple. Clean. Perfect.",
    image: "/zen-minimalist.jpg",
  },
  {
    id: "night-owl",
    name: "Night Owl",
    drink: "Red Eye (coffee + espresso shot)",
    tagline: "Sleep is optional",
    image: "/night-owl.jpg",
  },
  {
    id: "practical-pragmatist",
    name: "Practical Pragmatist",
    drink: "Large Drip, Whatever's Fresh",
    tagline: "Just make it work",
    image: "/practical-pragmatist.jpg",
  },
];

const QUESTIONS: Question[] = [
  {
    id: 1,
    text: "You're a color. Which one are you?",
    options: [
      { emoji: "🔴", text: "Deep crimson — intense and vivid", maps_to: "practical-pragmatist" },
      { emoji: "🤍", text: "Soft cream — warm and familiar", maps_to: "cozy-classic" },
      { emoji: "💛", text: "Pastel yellow — sweet and cheerful", maps_to: "sweet-enthusiast" },
      { emoji: "🩶", text: "Cool grey — calm and uncluttered", maps_to: "zen-minimalist" },
      { emoji: "🖤", text: "Midnight black — sharp and alive at 2am", maps_to: "night-owl" },
    ],
  },
  {
    id: 2,
    text: "A mysterious package arrives. You:",
    options: [
      { emoji: "📦", text: "Open it immediately, no hesitation", maps_to: "practical-pragmatist" },
      { emoji: "🛋️", text: "Wait until you're cozy with a blanket", maps_to: "cozy-classic" },
      { emoji: "🎀", text: "Shake it and guess — half the fun is wondering", maps_to: "sweet-enthusiast" },
      { emoji: "🧘", text: "Leave it. If it's important, it'll still be there tomorrow", maps_to: "zen-minimalist" },
      { emoji: "🌙", text: "Open it at midnight for full dramatic effect", maps_to: "night-owl" },
    ],
  },
  {
    id: 3,
    text: "If your brain were a room, it would look like:",
    options: [
      { emoji: "🗂️", text: "A tidy home office with a whiteboard", maps_to: "practical-pragmatist" },
      { emoji: "📚", text: "A lived-in library with a reading chair", maps_to: "cozy-classic" },
      { emoji: "🍬", text: "A candy shop — colorful and a little chaotic", maps_to: "sweet-enthusiast" },
      { emoji: "🪴", text: "A Japanese garden — one rock, one plant, silence", maps_to: "zen-minimalist" },
      { emoji: "🌃", text: "A rooftop at 3am with city lights", maps_to: "night-owl" },
    ],
  },
  {
    id: 4,
    text: "Your spirit weather is:",
    options: [
      { emoji: "⛅", text: "Overcast but dry — reliable, gets things done", maps_to: "practical-pragmatist" },
      { emoji: "🌧️", text: "Light rain — cozy, stay-inside weather", maps_to: "cozy-classic" },
      { emoji: "🌈", text: "Rainbow after rain — unexpected and delightful", maps_to: "sweet-enthusiast" },
      { emoji: "🌤️", text: "Crisp clear morning — still and clean", maps_to: "zen-minimalist" },
      { emoji: "🌩️", text: "Thunderstorm at midnight — electric and alive", maps_to: "night-owl" },
    ],
  },
  {
    id: 5,
    text: "You find a time machine. Where do you go?",
    options: [
      { emoji: "⏩", text: "Forward 10 years — see if the plan worked", maps_to: "practical-pragmatist" },
      { emoji: "⏮️", text: "Back to a perfect childhood moment", maps_to: "cozy-classic" },
      { emoji: "🎠", text: "1920s Paris — glamour and pastries", maps_to: "sweet-enthusiast" },
      { emoji: "🏯", text: "Ancient Japan — simplicity and silence", maps_to: "zen-minimalist" },
      { emoji: "🚀", text: "The far future, middle of the night, unknown city", maps_to: "night-owl" },
    ],
  },
  {
    id: 6,
    text: "Your ideal Saturday is:",
    options: [
      { emoji: "✅", text: "Knock out the to-do list, feel accomplished", maps_to: "practical-pragmatist" },
      { emoji: "🧣", text: "Slow morning, familiar coffee spot, no plans", maps_to: "cozy-classic" },
      { emoji: "🛍️", text: "Brunch, window shopping, maybe dessert twice", maps_to: "sweet-enthusiast" },
      { emoji: "🌿", text: "One long walk, phone off, just thinking", maps_to: "zen-minimalist" },
      { emoji: "🌙", text: "Sleep until 2pm, peak energy hits at 11pm", maps_to: "night-owl" },
    ],
  },
];

function computeScores(answers: PersonalityId[]): Array<{ personality: Personality; percentage: number }> {
  const counts: Record<PersonalityId, number> = {
    "cozy-classic": 0,
    "sweet-enthusiast": 0,
    "zen-minimalist": 0,
    "night-owl": 0,
    "practical-pragmatist": 0,
  };
  for (const a of answers) {
    counts[a]++;
  }
  const total = answers.length;
  return PERSONALITIES.map((p) => ({
    personality: p,
    percentage: Math.round((counts[p.id] / total) * 100),
  })).sort((a, b) => b.percentage - a.percentage);
}

export default function Home() {
  const [screen, setScreen] = useState<Screen>("intro");
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<PersonalityId[]>([]);

  function handleAnswer(id: PersonalityId) {
    const newAnswers = [...answers, id];
    setAnswers(newAnswers);
    if (currentQuestion + 1 < QUESTIONS.length) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setScreen("results");
    }
  }

  function resetQuiz() {
    setScreen("intro");
    setCurrentQuestion(0);
    setAnswers([]);
  }

  if (screen === "intro") {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: "#0a0a0a" }}>
        <div className="max-w-2xl mx-auto px-6 py-16 text-center">
          <p
            className="text-xs tracking-[0.3em] font-semibold mb-8 uppercase"
            style={{ color: "#c8a96e" }}
          >
            BASECAMP COFFEE
          </p>
          <h1
            className="text-4xl md:text-6xl font-black uppercase tracking-tight leading-none mb-6"
            style={{ color: "#ededed" }}
          >
            WHAT&apos;S YOUR COFFEE PERSONALITY?
          </h1>
          <p className="text-base mb-12" style={{ color: "#888888" }}>
            6 questions. No wrong answers. Just you and your perfect cup.
          </p>
          <button
            onClick={() => setScreen("quiz")}
            className="px-12 py-4 text-sm font-bold tracking-[0.2em] uppercase transition-colors"
            style={{
              background: "#c8a96e",
              color: "#0a0a0a",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLButtonElement).style.background = "#b8955a";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLButtonElement).style.background = "#c8a96e";
            }}
          >
            FIND OUT
          </button>
        </div>
      </div>
    );
  }

  if (screen === "quiz") {
    const q = QUESTIONS[currentQuestion];
    const progress = ((currentQuestion) / QUESTIONS.length) * 100;
    return (
      <div className="min-h-screen" style={{ background: "#0a0a0a" }}>
        <div className="max-w-2xl mx-auto px-6 py-16">
          <div className="mb-8">
            <p
              className="text-xs tracking-[0.3em] font-semibold mb-3 uppercase"
              style={{ color: "#c8a96e" }}
            >
              QUESTION {currentQuestion + 1} OF {QUESTIONS.length}
            </p>
            <div className="w-full h-px" style={{ background: "#222222" }}>
              <div
                className="h-px transition-all duration-300"
                style={{ width: `${progress}%`, background: "#c8a96e" }}
              />
            </div>
          </div>

          <h2
            className="text-2xl md:text-3xl font-black uppercase tracking-tight mb-10"
            style={{ color: "#ededed" }}
          >
            {q.text}
          </h2>

          <div className="flex flex-col gap-2">
            {q.options.map((option, idx) => (
              <button
                key={idx}
                onClick={() => handleAnswer(option.maps_to)}
                className="flex items-center gap-4 px-5 py-4 text-left w-full transition-all border-l-2"
                style={{
                  background: "#111111",
                  borderLeftColor: "transparent",
                  color: "#ededed",
                }}
                onMouseEnter={(e) => {
                  const el = e.currentTarget as HTMLButtonElement;
                  el.style.borderLeftColor = "#c8a96e";
                  el.style.background = "#1a1a1a";
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget as HTMLButtonElement;
                  el.style.borderLeftColor = "transparent";
                  el.style.background = "#111111";
                }}
              >
                <span
                  className="text-xs font-bold tracking-widest w-6 shrink-0"
                  style={{ color: "#c8a96e" }}
                >
                  {String(idx + 1).padStart(2, "0")}
                </span>
                <span className="text-lg shrink-0">{option.emoji}</span>
                <span className="text-sm">{option.text}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // Results screen
  const scores = computeScores(answers);
  const [primary, ...secondary] = scores;

  return (
    <div className="min-h-screen" style={{ background: "#0a0a0a" }}>
      <div className="max-w-2xl mx-auto px-6 py-16">
        <p
          className="text-xs tracking-[0.3em] font-semibold mb-2 uppercase"
          style={{ color: "#c8a96e" }}
        >
          BASECAMP COFFEE
        </p>
        <h2
          className="text-xs tracking-[0.3em] font-semibold mb-10 uppercase"
          style={{ color: "#555555" }}
        >
          YOUR COFFEE PERSONALITY
        </h2>

        {/* Primary result */}
        <div className="mb-10">
          <div className="relative w-full aspect-video mb-6">
            <Image
              src={primary.personality.image}
              alt={primary.personality.name}
              fill
              className="object-cover"
            />
          </div>
          <div className="flex items-baseline gap-4 mb-2">
            <span
              className="text-5xl font-black"
              style={{ color: "#c8a96e" }}
            >
              {primary.percentage}%
            </span>
            <h3
              className="text-2xl font-black uppercase tracking-tight"
              style={{ color: "#ededed" }}
            >
              {primary.personality.name}
            </h3>
          </div>
          <p className="text-sm font-semibold mb-1" style={{ color: "#c8a96e" }}>
            {primary.personality.drink}
          </p>
          <p className="text-sm italic" style={{ color: "#888888" }}>
            &ldquo;{primary.personality.tagline}&rdquo;
          </p>
        </div>

        {/* Secondary results */}
        <div className="flex flex-col gap-3 mb-12">
          {secondary.map(({ personality, percentage }) => (
            <div
              key={personality.id}
              className="flex items-center gap-4 px-4 py-3"
              style={{ background: "#111111" }}
            >
              <div className="relative w-16 h-16 shrink-0">
                <Image
                  src={personality.image}
                  alt={personality.name}
                  fill
                  className="object-cover"
                />
              </div>
              <span
                className="text-lg font-black w-12 shrink-0"
                style={{ color: "#c8a96e" }}
              >
                {percentage}%
              </span>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span
                    className="text-sm font-bold uppercase tracking-wide"
                    style={{ color: "#ededed" }}
                  >
                    {personality.name}
                  </span>
                </div>
                <div className="w-full h-px" style={{ background: "#222222" }}>
                  <div
                    className="h-px"
                    style={{ width: `${percentage}%`, background: "#c8a96e" }}
                  />
                </div>
              </div>
              <span className="text-xs shrink-0" style={{ color: "#555555" }}>
                {personality.drink}
              </span>
            </div>
          ))}
        </div>

        {/* Reset button */}
        <button
          onClick={resetQuiz}
          className="px-10 py-3 text-xs font-bold tracking-[0.2em] uppercase border transition-colors"
          style={{
            borderColor: "#c8a96e",
            color: "#c8a96e",
            background: "transparent",
          }}
          onMouseEnter={(e) => {
            const el = e.currentTarget as HTMLButtonElement;
            el.style.background = "#c8a96e";
            el.style.color = "#0a0a0a";
          }}
          onMouseLeave={(e) => {
            const el = e.currentTarget as HTMLButtonElement;
            el.style.background = "transparent";
            el.style.color = "#c8a96e";
          }}
        >
          TAKE IT AGAIN
        </button>
      </div>
    </div>
  );
}
