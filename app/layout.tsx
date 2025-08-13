import "./globals.css";
import type { ReactNode } from "react";

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <nav className="border-b bg-white/70 backdrop-blur supports-[backdrop-filter]:bg-white/60">
          <div className="container flex items-center justify-between h-14">
            <div className="flex items-center gap-2">
              <div className="size-7 rounded-xl bg-neutral-900" />
              <span className="font-semibold">AI Commerce Assistant</span>
              <span className="badge">Demo</span>
            </div>
            <div className="hidden sm:flex items-center gap-6 text-sm text-neutral-600">
              <a href="/" className="hover:text-neutral-900">Home</a>
              <a href="#chat" className="hover:text-neutral-900">Chat</a>
              <a href="#search" className="hover:text-neutral-900">Search</a>
              <a href="#cart" className="hover:text-neutral-900">Cart</a>
            </div>
          </div>
        </nav>
        {children}
        <footer className="mt-16 py-10 text-center text-sm text-neutral-500">
          Built with Next.js, TypeScript, and OpenAI
        </footer>
      </body>
    </html>
  );
}
