# 📘 NEXT.JS CRASH COURSE — Build a Portfolio in 2 Hours

**Why:** Next.js is the #1 most requested skill after React in job postings.
**Goal:** Build + deploy a basic portfolio that shows you know Next.js.
**Time:** 2 hours total.

---

## STEP 1: CREATE THE PROJECT (5 min)

```bash
cd /h/DevJourney/Projects
npx create-next-app@latest my-portfolio --typescript --tailwind --app
cd my-portfolio
```

## STEP 2: BUILD THE PAGES (60 min)

### `app/page.tsx` — Home Page

```tsx
export default function Home() {
  return (
    <main className="min-h-screen bg-gray-950 text-white p-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-5xl font-bold mb-4">
          Fahad Ibrahim
        </h1>
        <p className="text-xl text-gray-400 mb-8">
          Full-Stack Developer · React, TypeScript, Supabase
        </p>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4 text-blue-400">Projects</h2>
          <div className="grid gap-4">
            <div className="border border-gray-800 rounded-lg p-6 hover:border-blue-500 transition">
              <h3 className="text-xl font-semibold">🐞 BugSmasher</h3>
              <p className="text-gray-400 mt-2">Full-stack arcade game with auth, leaderboards, PWA</p>
              <div className="flex gap-2 mt-3">
                <span className="text-sm bg-blue-900 px-3 py-1 rounded">React 19</span>
                <span className="text-sm bg-blue-900 px-3 py-1 rounded">TypeScript</span>
                <span className="text-sm bg-blue-900 px-3 py-1 rounded">Supabase</span>
              </div>
              <a href="https://bugsmasher-ten.vercel.app" 
                 className="inline-block mt-4 text-blue-400 hover:underline">
                Live Demo →
              </a>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4 text-blue-400">Tech Stack</h2>
          <div className="flex flex-wrap gap-2">
            {["React", "TypeScript", "Supabase", "Node.js", "Tailwind", "Git"].map(skill => (
              <span key={skill} className="bg-gray-800 px-4 py-2 rounded-full text-sm">
                {skill}
              </span>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
```

### `app/layout.tsx` — Layout (update if needed)

```tsx
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Fahad Ibrahim — Full-Stack Developer",
  description: "Full-Stack Developer specializing in React, TypeScript, and Supabase",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
```

## STEP 3: DEPLOY (10 min)

```bash
npm run build
npx vercel --prod
```

Done. You now have a Next.js portfolio to show employers.

---

## PORTFOLIO CHECKLIST

```
□ Page loads fast (Next.js SSR = fast by default)
□ Projects section with live links
□ Tech stack badges
□ Clean, professional design (Tailwind)
□ Deployed on Vercel
□ Custom URL if possible (portfolio.vercel.app or hopetheory.co/portfolio)
```

---

## WHY THIS MATTERS FOR JOB SEARCH

When a recruiter asks: "Do you know Next.js?"

You say: "Yes, I built my portfolio with it — here's the live URL."

That closes the skill gap question immediately. 🚀
