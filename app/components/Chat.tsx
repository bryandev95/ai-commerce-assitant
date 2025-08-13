"use client";
import { useRef, useState } from "react";

type Msg = { role: "user" | "assistant"; content: string };

export default function Chat() {
  const [msgs, setMsgs] = useState<Msg[]>([]);
  const input = useRef<HTMLTextAreaElement>(null);
  const [loading, setLoading] = useState(false);

  async function send() {
    const content = input.current?.value?.trim();
    if (!content) return;
    setMsgs((m) => [...m, { role: "user", content }]);
    input.current!.value = "";
    setLoading(true);
    const res = await fetch("/api/chat", {
      method: "POST",
      body: JSON.stringify({ messages: msgs.concat({ role: "user", content }) })
    });
    const reader = res.body!.getReader();
    const dec = new TextDecoder();
    let acc = "";
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      acc += dec.decode(value);
      setMsgs((m) => {
        const c = [...m];
        const last = c[c.length - 1];
        if (!last || last.role !== "assistant")
          c.push({ role: "assistant", content: acc });
        else c[c.length - 1] = { role: "assistant", content: acc };
        return c;
      });
    }
    setLoading(false);
  }

  return (
    <div className="flex flex-col gap-3">
      <div className="h-72 overflow-auto border border-neutral-200 rounded-2xl p-3 bg-neutral-50">
        {msgs.length === 0 && !loading && (
          <div className="text-neutral-500 text-sm">
            Try: “Find healthy snacks under $5 that go with red wine.”
          </div>
        )}
        <div className="flex flex-col gap-2">
          {msgs.map((m, i) => (
            <div
              key={i}
              className={`max-w-[85%] rounded-2xl px-3 py-2 text-sm ${
                m.role === "user"
                  ? "self-end bg-neutral-900 text-white"
                  : "self-start bg-white border border-neutral-200"
              }`}
            >
              {m.content}
            </div>
          ))}
          {loading && <div className="skeleton h-6 w-40" />}
        </div>
      </div>
      <div className="flex gap-2">
        <textarea
          ref={input}
          rows={2}
          className="input"
          placeholder="Ask the assistant…"
        />
        <button onClick={send} className="btn">
          Send
        </button>
      </div>
    </div>
  );
}
