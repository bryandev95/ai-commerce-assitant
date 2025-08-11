# AI Commerce Assistant
Next.js + TypeScript demo showcasing **AI chat**, **semantic search (embeddings + vector similarity)**, and **contextual cart recommendations**.

**Live demo**: (add your Vercel URL)  
**Tech**: Next.js, React, TypeScript, OpenAI, minimal vector store, Zod, Jest.

## Quick start
```bash
pnpm i    # or npm i / yarn
cp .env.example .env.local
pnpm dev
```

## Endpoints
- `/api/chat` — OpenAI streaming chat (Edge runtime)
- `/api/embed` — Embeds items and upserts vectors
- `/api/search` — Embeds query and returns top-K matches

## Architecture
- UI: Chat, Search, Cart components
- API routes: `/api/chat` (stream), `/api/embed` (embeddings), `/api/search` (semantic search)
- Vector index: simple cosine store in `lib/vector.ts` (swap with Pinecone/Weaviate)
- Strong typing + tests (Jest)

## What’s next
- Persist vectors (SQLite/Postgres)
- Auth + user sessions
- Real recommendation ranking + analytics
