"use client";
import { useRef, useState } from "react";
export default function Chat(){ 
  const [msgs,setMsgs]=useState<{role:"user"|"assistant";content:string}[]>([]);
  const input=useRef<HTMLTextAreaElement>(null);
  const [loading,setLoading]=useState(false);
  async function send(){
    const content=input.current?.value?.trim(); if(!content) return;
    setMsgs(m=>[...m,{role:"user",content}]); input.current!.value="";
    setLoading(true);
    const res=await fetch("/api/chat",{method:"POST",body:JSON.stringify({messages:msgs.concat({role:"user",content})})});
    const reader=res.body!.getReader(); const dec=new TextDecoder(); let acc="";
    while(true){ const {done,value}=await reader.read(); if(done) break; acc+=dec.decode(value);
      setMsgs(m=>{ const c=[...m]; const last=c[c.length-1];
        if(!last||last.role!=="assistant") c.push({role:"assistant",content:acc});
        else c[c.length-1]={ role:"assistant", content:acc }; return c; }); }
    setLoading(false);
  }
  return (<div>
    <div style={{border:"1px solid #eee",height:220,overflow:"auto",padding:8,marginBottom:8}}>
      {msgs.map((m,i)=>(<div key={i} style={{textAlign:m.role==="user"?"right":"left"}}>{m.content}</div>))}
      {loading && <div style={{opacity:0.6}}>…</div>}
    </div>
    <div style={{display:"flex",gap:8}}>
      <textarea ref={input} rows={2} style={{flex:1}} placeholder="Ask for vegan snacks under $5…"/>
      <button onClick={send}>Send</button>
    </div>
  </div>);
}
