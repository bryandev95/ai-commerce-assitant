"use client";
import { useState } from "react";

export default function Search() {
  const [q, setQ] = useState("");
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  async function go() {
    const query = q.trim();
    if (!query) return;
    setLoading(true);
    const res = await fetch("/api/search", {
      method: "POST",
      body: JSON.stringify({ q: query })
    });
    const data = await res.json();
    setItems(data.results || []);
    setLoading(false);
  }

  return (
    <div className="flex flex-col gap-3">
      <div className="flex gap-2">
        <input
          className="input"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="e.g., vegan snacks under $5"
        />
        <button onClick={go} className="btn">
          Search
        </button>
      </div>
      <ul className="grid sm:grid-cols-2 gap-3">
        {loading && (
          <>
            <li className="card p-4 skeleton h-20" />
            <li className="card p-4 skeleton h-20" />
          </>
        )}
        {!loading &&
          items.map((i: any) => (
            <li key={i.id} className="card p-4">
              <div className="font-medium">{i.meta?.title ?? i.id}</div>
              <div className="text-xs text-neutral-500">
                score: {(i.score ?? 0).toFixed(3)}
              </div>
            </li>
          ))}
      </ul>
    </div>
  );
}
