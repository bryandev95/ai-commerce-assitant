import Chat from "./components/Chat";
import Search from "./components/Search";
import Cart from "./components/Cart";

export default function Page() {
  return (
    <main style={{maxWidth:960, margin:"40px auto", padding:"0 16px", fontFamily:"system-ui"}}>
      <h1>AI Commerce Assistant</h1>
      <p>Chat with an assistant, run semantic search, and preview cart recommendations.</p>
      <section><h2>Chat</h2><Chat /></section>
      <section><h2>Search</h2><Search /></section>
      <section><h2>Cart</h2><Cart /></section>
    </main>
  );
}
