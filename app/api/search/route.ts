import { NextRequest } from "next/server";
import OpenAI from "openai";
import { topK } from "@/lib/vector";

export const runtime = "edge";

export async function POST(req: NextRequest) {
  const { q } = await req.json();
  if (!q) return Response.json({ results: [] });
  const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY! });
  const e = await client.embeddings.create({
    model: process.env.OPENAI_EMBED_MODEL || "text-embedding-3-small",
    input: q
  });
  const query = e.data[0].embedding as number[];
  const results = topK(query, 8);
  return Response.json({ results });
}
