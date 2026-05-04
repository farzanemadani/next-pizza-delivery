<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# Project Instructions

## Project
- Next.js 16 app using React 19 and TypeScript.
- Source code lives in `src/`; app routes live in `src/app/`.
- Shared UI components live in `src/components/`; utility code lives in `src/lib/` and `src/utils/`.
- Auth-related server actions live in `src/actions/auth/`.
- Types and interfaces live in `src/types/` and `src/interfaces/`.

## Commands
- `npm run dev` starts the local dev server.
- `npm run build` verifies the production build.
- `npm run start` serves the production build after building.

## Coding Guidelines
- Use TypeScript for new code.
- Prefer existing project patterns before introducing new structure or dependencies.
- Keep components small and place reusable UI in `src/components/`.
- Keep validation schemas in `src/validation/`.
- Do not edit generated output such as `.next/` or `tsconfig.tsbuildinfo`.

## Before Changing Next.js Code
- Read the relevant local docs in `node_modules/next/dist/docs/` first.
- Prefer local documentation over memory for Next.js APIs and conventions.
