---
name: vibe_scaffold
description: Generate full-stack project boilerplate in minutes. Folder structure, deps, sample components, deployed.
version: 1.0.0
triggers:
  - "scaffold a project"
  - "new project setup"
  - "boilerplate"
  - "start a new app"
tags: [code, scaffold, boilerplate, fullstack]
---

# Vibe Scaffold

## Purpose
Generate a complete, deployable full-stack project skeleton in minutes using AI-assisted rapid building.

## Trigger Conditions
- New project kickoff
- User asks "scaffold a [type] project"
- User wants to start a new app
- On-demand via `/vibe_scaffold <project_type>`

## Required Inputs
- **Project name**
- **Type** (web app, API, CLI, browser extension, mobile)
- **Stack preference** (React + Supabase, Next.js + Postgres, etc.)
- **Special features** (auth, payments, real-time, AI integration)

## Steps

### 1. Choose Stack Based on Type
- **Web app (interactive):** Vite + React 19 + TypeScript + Tailwind + shadcn/ui
- **Web app (SEO-heavy):** Next.js 15 + TypeScript + Tailwind + Postgres
- **API only:** FastAPI (Python) or Hono (Node) + Postgres
- **CLI tool:** Node + TypeScript + Commander + Chalk
- **Browser extension:** Plasmo or WXT
- **Mobile:** React Native or Expo
- **AI app:** Vite + React + LLM SDK + Vector DB

### 2. Create Folder Structure
```
project-name/
├── src/
│   ├── components/        # UI components
│   ├── lib/               # Helpers, utilities
│   ├── pages/ or routes/  # Route handlers
│   ├── hooks/             # Custom React hooks
│   ├── types/             # TypeScript types
│   └── main.tsx
├── tests/                 # Test suite
├── public/                # Static assets
├── .env.example           # Env template
├── .gitignore
├── README.md
├── package.json
├── tsconfig.json
├── vite.config.ts (or equivalent)
└── docker-compose.yml (if DB)
```

### 3. Install Dependencies
- Core: framework, language, UI library
- Dev: TypeScript, ESLint, Prettier, Vitest
- Feature: auth, payments, DB client, AI SDK
- Run `npm install` and verify no errors

### 4. Sample Components (1-2 each)
- Layout component (header, footer, sidebar)
- Button + Card primitives
- 1 working example page (e.g., "Hello World" with state)
- 1 API route handler (if applicable)

### 5. Auth + Database
- Supabase: auto-configured with RLS policies
- Auth: Magic link or OAuth
- Sample table: "todos" or similar
- Seed data: 5-10 rows for testing

### 6. Deploy
- Vercel (web apps)
- Railway (API + DB)
- Netlify (static)
- Fly.io (full stack)
- Configure env vars, deploy, verify live URL

### 7. Documentation
- README with setup steps
- Architecture diagram (mermaid)
- API endpoints (if applicable)
- 1 video walkthrough (optional)

## Output Format

```markdown
🏗️ **PROJECT SCAFFOLDED: [name]**

**Stack:**
- Vite + React 19 + TypeScript
- Supabase (Postgres + Auth)
- Tailwind + shadcn/ui
- Vitest for tests

**Folder structure:** [tree]

**Files created:** 47
**Dependencies installed:** 23
**Tests passing:** ✅ 8/8

**Deployed:** https://[name].vercel.app

**Next steps:**
1. Customize `src/lib/config.ts` with your brand
2. Add features in `src/components/`
3. Push to GitHub
4. Open PR
```

## Example Invocation

User: "Scaffold a SaaS app for tracking habits"
Assistant: [Generates complete project, deploys]

## Verification
- [ ] `npm run dev` works
- [ ] `npm run build` works
- [ ] `npm test` passes
- [ ] Deployed URL responds 200
- [ ] No TypeScript errors
- [ ] No console errors on load

## Related Skills
- `api_orchestrator` — Add third-party API integrations
- `ai_agent_builder` — Add AI agent features
- `freelance_deliverable` — Package for client handoff
