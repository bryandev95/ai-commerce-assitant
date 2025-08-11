"use client";
import { useState } from "react";
type Item = { id: string; title: string };
export default function Cart(){
  const [cart,setCart]=useState<Item[]>([{id:"sku_1", title:"Organic Almonds"}]);
  const [recs,setRecs]=useState<any[]>([]);
  const [loading,setLoading]=useState(false);

  async function getRecs(){
    setLoading(true);
    const res=await fetch("/api/recommend",{ method:"POST", body: JSON.stringify({ cart }) });
    const data=await res.json();
    setRecs(data.recommendations||[]);
    setLoading(false);
  }

  return (<div>
    <div><strong>Cart</strong></div>
    <ul>{cart.map(i=> <li key={i.id}>{i.title}</li>)}</ul>
    <button onClick={getRecs}>Get Recommendations</button>
    <div style={{marginTop:8}}>
      {loading ? "Loading…" : <ul>{recs.map((r:any)=>(<li key={r.id}>{r.meta?.title ?? r.id} — score: {r.score?.toFixed(3)}</li>))}</ul>}
    </div>
  </div>);
}
