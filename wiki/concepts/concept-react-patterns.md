---
title: React 19 Patterns
created: 2026-06-07
updated: 2026-06-07
type: concept
tags: [code, tech, react]
sources: [raw/articles/react-19-features-2024.md]
confidence: medium
---

# React 19 Patterns

> Modern React patterns for 2026. Server components, actions, the new compiler. Stack used in our [[ventures/code|Code venture]].

## Server Components (RSC)
- **Default to server** — less JS shipped
- **`'use client'`** — opt-in to client
- **Async components** — `async function Page() { const data = await ... }`
- **No useEffect for data** — fetch in component

## Actions
- **Form actions** — `<form action={fn}>`
- **Server mutations** — direct DB write from action
- **No useState for forms** — let the framework handle it

## React Compiler (auto-memo)
- **No more `useMemo`/`useCallback`** (mostly)
- Compiler infers dependencies
- Smaller bundles
- Still experimental, opt-in

## `use()` Hook
- **Unwraps promises** — `const data = use(promise)`
- **Unwraps context** — `use(Context)` outside hooks
- **Suspense integration** — natural loading states

## New Hooks
- **`useActionState`** — form state + pending
- **`useFormStatus`** — submit status
- **`useOptimistic`** — optimistic UI updates

## When NOT to Use
- Small interactive widgets — overkill
- Client-heavy apps — use Vite + SPA
- SEO-critical with auth — RSC not always enough

## Our Stack
- **React 19** + TypeScript strict
- **Vite** for dev/build
- **Tailwind** for styles
- **Supabase** for backend
- **Vercel** for deploy

## Related
- [[product-nextjs]]
- [[org-vercel]]
