"use client";
import { useEffect, useState } from "react";
type Stat = { label: string; value: string; sub?: string };

export default function Stats() {
  const [stats, setStats] = useState<Stat[]>([
    { label: "CTR", value: "—", sub: "7d" },
    { label: "Conversion Lift", value: "—", sub: "vs control" },
    { label: "AOV", value: "—", sub: "avg order value" }
  ]);

  useEffect(() => {
    // Fake data; replace with your analytics API
    const t = setTimeout(() => {
      setStats([
        { label: "CTR", value: "3.8%", sub: "7d" },
        { label: "Conversion Lift", value: "+5.4%", sub: "vs control" },
        { label: "AOV", value: "$42.10", sub: "avg order value" }
      ]);
    }, 400);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
      {stats.map((s, i) => (
        <div key={i} className="card p-4">
          <div className="text-xs text-neutral-500 dark:text-neutral-400">
            {s.sub}
          </div>
          <div className="text-2xl font-semibold">{s.value}</div>
          <div className="text-sm text-neutral-600 dark:text-neutral-300">
            {s.label}
          </div>
        </div>
      ))}
    </div>
  );
}
