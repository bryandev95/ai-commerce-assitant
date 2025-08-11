export type Vec = { id: string; values: number[]; meta?: any };
const DB: Vec[] = [
  // tiny demo catalog — in a real app you'd seed via /api/embed
  { id:"sku_1", values: Array(1536).fill(0).map((_,i)=>Math.sin(i)*0.001), meta:{ title:"Organic Almonds" } },
  { id:"sku_2", values: Array(1536).fill(0).map((_,i)=>Math.cos(i)*0.001), meta:{ title:"Dark Chocolate 70%" } },
  { id:"sku_3", values: Array(1536).fill(0).map((_,i)=>Math.sin(i*1.3)*0.001), meta:{ title:"Whole Grain Crackers" } },
  { id:"sku_4", values: Array(1536).fill(0).map((_,i)=>Math.cos(i*1.7)*0.001), meta:{ title:"Cashew Butter" } },
  { id:"sku_5", values: Array(1536).fill(0).map((_,i)=>Math.sin(i*0.7)*0.001), meta:{ title:"Sparkling Water - Lime" } }
];

export function upsertVectors(vs: Vec[]) {
  for (const v of vs) {
    const i = DB.findIndex(x => x.id === v.id);
    i >= 0 ? (DB[i] = v) : DB.push(v);
  }
}
function cosine(a:number[], b:number[]) {
  let dot=0,na=0,nb=0;
  for (let i=0;i<a.length;i++){ dot+=a[i]*b[i]; na+=a[i]*a[i]; nb+=b[i]*b[i]; }
  return dot / (Math.sqrt(na)*Math.sqrt(nb));
}
export function topK(q:number[], k=8) {
  return DB.map(v => ({ v, s: cosine(q, v.values) }))
    .sort((a,b)=>b.s-a.s)
    .slice(0,k)
    .map(x => ({ id:x.v.id, score:x.s, meta:x.v.meta }));
}
