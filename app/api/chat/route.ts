import { NextRequest } from "next/server";
import OpenAI from "openai";

export const runtime = "edge";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY! });
  const sys = "You are a concise shopping assistant. Consider cart and search context.";
  const stream = await client.chat.completions.create({
    model: process.env.OPENAI_MODEL || "gpt-4o-mini",
    messages: [
      { role:"system", content: sys },
      { role:"user", content: JSON.stringify(body) }
    ],
    stream: true
  });

  const encoder = new TextEncoder();
  const readable = new ReadableStream({
    async start(controller) {
      for await (const chunk of stream) {
        const token = chunk.choices?.[0]?.delta?.content ?? "";
        controller.enqueue(encoder.encode(token));
      }
      controller.close();
    }
  });

  return new Response(readable, { headers: { "Content-Type":"text/plain" }});
}
