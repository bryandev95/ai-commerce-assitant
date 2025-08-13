"use client";
import { useState } from "react";
type Item = { id: string; title: string };

export default function Cart() {
  const [cart, setCart] = useState<Item[]>([
    { id: "sku_1", title: "Organic Almonds" },
    { id: "sku_2", title: "Dark Chocolate 70%" }
  ]);
  const [recs, setRecs] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  async function getRecs() {
    setLoading(true);
    const res = await fetch("/api/recommend", {
      method: "POST",
      body: JSON.stringify({ cart })
    });
    const data = await res.json();
    setRecs(data.recommendations || []);
    setLoading(false);
  }

  return (
    <div className="grid md:grid-cols-2 gap-4">
      <div className="card p-4">
        <div className="font-semibold mb-2">Cart</div>
        <ul className="space-y-2">
          {cart.map((i) => (
            <li
              key={i.id}
              className="flex items-center justify-between border border-neutral-200 rounded-xl px-3 py-2"
            >
              <span>{i.title}</span>
              <span className="badge">in cart</span>
            </li>
          ))}
        </ul>
      </div>
      <div className="card p-4">
        <div className="flex items-center justify-between mb-2">
          <div className="font-semibold">Recommendations</div>
          <button onClick={getRecs} className="btn">
            Refresh
          </button>
        </div>
        {loading && <div className="skeleton h-20 w-full" />}
        {!loading && (
          <ul className="space-y-2">
            {recs.map((r: any) => (
              <li
                key={r.id}
                className="flex items-center justify-between border border-neutral-200 rounded-xl px-3 py-2"
              >
                <span>{r.meta?.title ?? r.id}</span>
                <span className="text-xs text-neutral-500">
                  score {(r.score ?? 0).toFixed(3)}
                </span>
              </li>
            ))}
            {!recs.length && (
              <li className="text-sm text-neutral-500">
                No recommendations yet.
              </li>
            )}
          </ul>
        )}
      </div>
    </div>
  );
}
