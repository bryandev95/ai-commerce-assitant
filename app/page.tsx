import Chat from "./components/Chat";
import Search from "./components/Search";
import Cart from "./components/Cart";

export default function Page() {
  return (
    <main className="container mx-auto">
      <header className="mt-10 mb-8">
        <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight">
          Build smarter shopping experiences
        </h1>
        <p className="text-neutral-600 mt-2">
          Chat with an assistant, run semantic search, and preview context-aware cart recommendations.
        </p>
      </header>

      <section id="chat" className="grid md:grid-cols-2 gap-6 mb-6">
        <div className="card p-5">
          <h2 className="text-lg font-semibold mb-3">Assistant</h2>
          <p className="text-sm text-neutral-600 mb-4">
            Streaming responses with the OpenAI API. Try asking for gift ideas or product comparisons.
          </p>
          <Chat />
        </div>
        <div className="card p-5">
          <h2 className="text-lg font-semibold mb-3">Semantic Search</h2>
          <p className="text-sm text-neutral-600 mb-4">
            Embedding-based search across a tiny demo catalog. Swap to Pinecone/Weaviate later.
          </p>
          <Search />
        </div>
      </section>

      <section id="cart" className="card p-5">
        <h2 className="text-lg font-semibold mb-3">Cart Recommendations</h2>
        <p className="text-sm text-neutral-600 mb-4">
          Naive vector-similarity demo. Replace with your ranking logic or model outputs.
        </p>
        <Cart />
      </section>
    </main>
  );
}
