import { NextRequest } from "next/server";
import OpenAI from "openai";
import { upsertVectors } from "@/lib/vector";

export const runtime = "edge";

export async function POST(req: NextRequest) {
  const { items } = await req.json(); // [{id,text,meta}]
  const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY! });
  const resp = await client.embeddings.create({
    model: process.env.OPENAI_EMBED_MODEL || "text-embedding-3-small",
    input: items.map((i:any)=> i.text)
  });
  const vectors = resp.data.map((e, i) => ({
    id: items[i].id,
    values: e.embedding as number[],
    meta: items[i].meta
  }));
  upsertVectors(vectors);
  return Response.json({ upserted: vectors.length });
}
