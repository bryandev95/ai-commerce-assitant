"use client";
import { useState } from "react";
export default function Search(){
  const [q,setQ]=useState(""); const [items,setItems]=useState<any[]>([]);
  const [loading,setLoading]=useState(false);
  async function go(){
    const query=q.trim(); if(!query) return;
    setLoading(true);
    const res=await fetch("/api/search",{method:"POST", body: JSON.stringify({ q: query })});
    const data=await res.json();
    setItems(data.results || []);
    setLoading(false);
  }
  return (<div>
    <div style={{display:"flex",gap:8,marginBottom:8}}>
      <input value={q} onChange={e=>setQ(e.target.value)} placeholder="semantic search…" />
      <button onClick={go}>Search</button>
    </div>
    {loading ? <div>Loading…</div> :
      <ul>{items.map((i:any)=>(<li key={i.id}>{i.meta?.title ?? i.id} — score: {i.score?.toFixed(3)}</li>))}</ul>}
  </div>);
}
