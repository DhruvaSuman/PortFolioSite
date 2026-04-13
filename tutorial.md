# Beginner-Friendly Tutorial: Building This Next.js Portfolio + AI Chat

## 1) What You Built (High-Level)

You built a modern personal portfolio website with:

- A professional homepage (hero, about, journey, skills, certifications, portfolio links)
- Resume/PDF links
- A real AI chat widget ("Digital Twin") that answers questions about your profile
- A secure backend API route that calls OpenRouter using your API key

In simple terms:

- **Frontend** = what users see and interact with
- **Backend API route** = server logic that talks to the AI model
- **AI provider (OpenRouter)** = where the model runs

---

## 2) Technology Stack (Beginner Overview)

### Core

- **Next.js (App Router)**: React framework for frontend + backend routes in one project
- **React**: UI library used by Next.js
- **TypeScript**: JavaScript with type safety (fewer bugs)
- **Tailwind CSS**: utility-first styling classes for fast UI design

### AI Integration

- **OpenRouter API**: one endpoint to access many models
- **Model used**: `openai/gpt-oss-120b`
- **Server route**: `app/api/chat/route.ts`

### Tooling

- **ESLint**: code linting/quality
- **npm**: package manager
- **Git/GitHub**: version control and source hosting
- **Vercel**: deployment platform

---

## 3) Project Structure

```text
webapp/
  app/
    api/chat/route.ts            # backend API for AI chat
    components/digital-twin-chat.tsx
    globals.css                  # global styling
    layout.tsx                   # app shell + metadata
    page.tsx                     # main homepage
  public/
    Profile.pdf
    Suman_resume.pdf
  package.json
```

---

## 4) How the App Works End-to-End

1. User opens homepage (`app/page.tsx`)
2. User types message in chat widget (`digital-twin-chat.tsx`)
3. Frontend sends `POST /api/chat` with chat messages
4. Backend route (`route.ts`) validates input and injects "digital twin context"
5. Backend calls OpenRouter with model `openai/gpt-oss-120b`
6. Response comes back from OpenRouter
7. Frontend shows AI answer in chat UI

---

## 5) Local Setup and Run (Step-by-Step)

## Prerequisites

- Node.js 20.x
- npm 10+

## Install

```bash
npm install
```

## Environment variable

Create `.env` (at project root as currently implemented) and add:

```env
OPENROUTER_API_KEY=your_openrouter_key
```

## Start dev server

```bash
npm run dev
```

Open:

- `http://localhost:3000`

---

## 6) Detailed Code Walkthrough

## A) `app/page.tsx` (Main Portfolio Page)

This file builds the static content sections and mounts the chat widget.

### Key patterns used

- Arrays for reusable content blocks:
  - `strengths`
  - `impactHighlights`
  - `milestones`
  - `certifications`
  - `awards`
- Mapping arrays into JSX to avoid hardcoding repetitive UI
- Reusable card-like Tailwind class patterns for consistent design

### Example snippet (data-driven rendering)

```tsx
const strengths = [
  "Java 8+",
  "Spring Boot",
  "Microservices",
  "Temporal Workflows",
];

<div className="flex flex-wrap gap-3">
  {strengths.map((skill) => (
    <span key={skill} className="rounded-full border px-4 py-1.5 text-sm">
      {skill}
    </span>
  ))}
</div>
```

Why this is good:

- Easy to edit content without rewriting layout
- Keeps JSX cleaner

---

## B) `app/components/digital-twin-chat.tsx` (Frontend Chat Widget)

This is a **client component** (`"use client"`) because it uses React state and browser events.

### State variables

- `messages`: chat history shown in UI
- `input`: current text in input field
- `isLoading`: controls spinner/loading state
- `error`: displays readable error feedback

### Core chat flow

```tsx
const response = await fetch("/api/chat", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ messages: nextMessages }),
});
```

Then:

- If request fails: show error message
- If success: append assistant response to `messages`

### UX features implemented

- Starter prompt buttons for first-time users
- Auto-scroll to latest message via `useRef + useEffect`
- Disabled buttons while loading
- Loading indicator dots
- Responsive layout (sidebar on large screens, compact on mobile)

---

## C) `app/api/chat/route.ts` (Backend AI Route)

This is your server-side bridge to OpenRouter.

### Why backend route is important

- Keeps API key secret (never expose in browser code)
- Allows validation and controlled prompt injection

### Key backend steps

1. Read key from env (`process.env` or fallback root `.env`)
2. Validate incoming message payload
3. Add a "system context" prompt describing Suman's profile
4. Call OpenRouter
5. Return parsed AI answer

### OpenRouter call snippet

```ts
const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${apiKey}`,
  },
  body: JSON.stringify({
    model: "openai/gpt-oss-120b",
    messages,
    temperature: 0.3,
  }),
});
```

### Error handling already present

- Missing key -> 500 with helpful message
- Invalid payload -> 400
- OpenRouter non-200 -> 502 with partial details
- Empty model response -> 502

---

## D) `app/layout.tsx` and `app/globals.css`

- `layout.tsx` sets metadata (title/description) and global font classes
- `globals.css` sets dark premium background and base typography behavior

These files make the whole app look and feel consistent.

---

## 7) Deployment Concept (Vercel)

For deployment:

1. Push repo to GitHub
2. Import repo in Vercel
3. Set env var:
   - `OPENROUTER_API_KEY`
4. Ensure Node version is `20.x`
5. Deploy

---

## 8) Beginner Notes: Why This Architecture Is Good

- **Single codebase** for frontend and backend route
- **Type-safe** development with TypeScript
- **Secure key handling** via server route
- **Maintainable UI** using mapped arrays and reusable styling patterns
- **Scalable foundation**: easy to add more pages and APIs later

---

## 9) Self-Review: 5 Improvements to Make Next

1. **Persist chat history**  
   Save conversations in local storage or a database so chat does not reset on refresh.

2. **Add markdown rendering for AI answers**  
   Model responses often include lists/tables. Rendering markdown would improve readability.

3. **Improve AI guardrails and grounding**  
   Add stricter prompt instructions and optional document retrieval so answers stay even more factual.

4. **Add testing**  
   Introduce unit tests (chat helpers), integration tests (`/api/chat`), and UI tests for message flow.

5. **Refactor content to CMS/data files**  
   Move profile data (milestones, skills, awards) into JSON/MD so updates do not require code edits.

---

## 10) Final Takeaway

You now have a production-style portfolio with a modern UI and a real AI digital twin assistant.  
The project is a strong foundation for learning full-stack frontend engineering with practical AI integration.
