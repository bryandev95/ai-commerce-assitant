import { NextRequest } from "next/server";
import OpenAI from "openai";
import { topK } from "@/lib/vector";

export const runtime = "edge";

export async function POST(req: NextRequest) {
  const { cart } = await req.json();
  // For demo: treat cart titles as a single query string and embed it
  const titles = (cart || []).map((c:any)=> c.title).join(", ");
  const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY! });
  const e = await client.embeddings.create({
    model: process.env.OPENAI_EMBED_MODEL || "text-embedding-3-small",
    input: titles || "popular items"
  });
  const query = e.data[0].embedding as number[];
  const recommendations = topK(query, 5);
  return Response.json({ recommendations });
}
