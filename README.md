# Road to Machine Learning

An interactive learning platform for working through a Machine Learning, Deep Learning and GenAI curriculum, with progress tracking, a roadmap view, a projects tracker and a Gemini-powered AI study coach.

![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=white) ![TypeScript](https://img.shields.io/badge/TypeScript-5.8-3178C6?logo=typescript&logoColor=white) ![Vite](https://img.shields.io/badge/Vite-6-646CFF?logo=vite&logoColor=white) ![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-4-06B6D4?logo=tailwindcss&logoColor=white)

## Overview

A personal study app scaffolded with Google AI Studio and built around the open-source [road-to-machine-learning](https://github.com/NabidAlam/road-to-machine-learning) syllabus by NabidAlam. The curriculum structure is bundled in the app, and lesson content is fetched live from that repository's raw files through a small Express server, with built-in fallback content when GitHub is unreachable.

## Features

- Landing page and dashboard with overall progress, study stats and achievement badges
- Curriculum explorer covering 15+ modules, from math prerequisites and Python for data science through regression, classification, ensembles, unsupervised learning, neural networks, PyTorch, computer vision, NLP and transformers, deployment and MLOps
- Module detail pages with learning objectives, key takeaways and lesson content rendered from Markdown
- AI study coach: ask questions about the current lesson (Gemini, via `/api/ask-ai`)
- Auto-generated module quizzes (`/api/generate-quiz`), with static fallback quizzes when no API key is set
- Roadmap view, hands-on projects tracker (e.g. Titanic classification, house price regression, fraud detection, BERT fine-tuning, RAG) and a curated resources library
- Progress and theme (light/dark) saved to `localStorage`

## Tech Stack

- React 19 + TypeScript, built with Vite 6
- Tailwind CSS 4, Motion (animations), Lucide icons, React Markdown
- Express server (`server.ts`) serving the API and the Vite app
- Google Gen AI SDK (`@google/genai`)

## Getting Started

**Prerequisites:** Node.js 18+ and (optionally) a Gemini API key.

```bash
git clone https://github.com/coderasraf/ML-Learning.git
cd ML-Learning
npm install
cp .env.example .env   # then set GEMINI_API_KEY
npm run dev            # starts the Express + Vite dev server on http://localhost:3000
```

Other scripts:

| Command | Description |
| --- | --- |
| `npm run build` | Builds the client with Vite and bundles `server.ts` to `dist/server.cjs` |
| `npm start` | Runs the production server from `dist/server.cjs` |
| `npm run lint` | Type-checks with `tsc --noEmit` |
| `npm run clean` | Removes build output |

The app runs without a Gemini key, but the AI coach is disabled and quizzes fall back to static questions.

## Environment Variables

| Name | Purpose |
| --- | --- |
| `GEMINI_API_KEY` | Gemini API key for the AI study coach and quiz generation |
| `APP_URL` | Public URL where the app is hosted (set automatically in AI Studio) |
| `DISABLE_HMR` | Optional; set to `true` to disable Vite hot reload |

## Project Structure

```text
ML-Learning/
├── server.ts                   # Express server: lesson proxy, AI coach, quiz API, Vite middleware
├── index.html
├── src/
│   ├── App.tsx                 # Navigation, progress state, theme
│   ├── components/             # Dashboard, CurriculumExplorer, ModuleDetailPage, RoadmapView,
│   │                           # ProjectsTracker, ResourcesLibrary, LandingPage, ThemeToggle
│   ├── data/staticCurriculum.ts  # Modules, projects, resources, badges
│   └── types.ts
├── vite.config.ts
└── package.json
```

## Author

Built by **Ashraf Siddik**, Shopify developer & CRO specialist.

- Website: [ashraf-siddik.com](https://ashraf-siddik.com)
- GitHub: [@coderasraf](https://github.com/coderasraf)
