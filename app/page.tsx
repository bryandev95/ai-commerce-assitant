"use client";
import { motion } from "framer-motion";
import Stats from "./components/Stats";
import Chat from "./components/Chat";
import Search from "./components/Search";
import Cart from "./components/Cart";

const fade = {
  initial: { opacity: 0, y: 8 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-10%" },
  transition: { duration: 0.35 }
};

export default function Page() {
  return (
    <main className="container">
      <header className="mt-10 mb-6">
        <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight">
          Build smarter shopping experiences
        </h1>
        <p className="text-neutral-600 dark:text-neutral-300 mt-2">
          Chat with an assistant, run semantic search, and preview context-aware
          cart recommendations.
        </p>
      </header>

      <motion.div {...fade} className="mb-8">
        <Stats />
      </motion.div>

      <motion.section
        {...fade}
        id="chat"
        className="grid md:grid-cols-2 gap-6 mb-6"
      >
        <div className="card p-5">
          <h2 className="text-lg font-semibold mb-3">Assistant</h2>
          <p className="text-sm text-neutral-600 dark:text-neutral-300 mb-4">
            Streaming responses with the OpenAI API.
          </p>
          <Chat />
        </div>
        <div className="card p-5">
          <h2 className="text-lg font-semibold mb-3">Semantic Search</h2>
          <p className="text-sm text-neutral-600 dark:text-neutral-300 mb-4">
            Embedding-based search across a tiny demo catalog.
          </p>
          <Search />
        </div>
      </motion.section>

      <motion.section {...fade} id="cart" className="card p-5">
        <h2 className="text-lg font-semibold mb-3">Cart Recommendations</h2>
        <p className="text-sm text-neutral-600 dark:text-neutral-300 mb-4">
          Replace the demo logic with your ranker or model outputs.
        </p>
        <Cart />
      </motion.section>
    </main>
  );
}
