'use client';
import "./globals.css";
import type { ReactNode } from "react";
import { ThemeProvider, useTheme } from "./theme";

function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  return (
    <button className="btn h-8 px-3 text-xs" onClick={toggleTheme}>
      {theme === "light" ? "Dark Mode" : "Light Mode"}
    </button>
  );
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider>
          <nav className="border-b bg-white/70 dark:bg-neutral-900/70 backdrop-blur supports-[backdrop-filter]:bg-white/60 dark:supports-[backdrop-filter]:bg-neutral-900/60">
            <div className="container flex items-center justify-between h-14">
              <div className="flex items-center gap-2">
                <div className="size-7 rounded-xl bg-neutral-900 dark:bg-white" />
                <span className="font-semibold">AI Commerce Assistant</span>
                <span className="badge">Demo</span>
              </div>
              <div className="flex items-center gap-4">
                <a
                  href="/"
                  className="hidden sm:inline text-sm text-neutral-600 dark:text-neutral-300 hover:underline"
                >
                  Home
                </a>
                <ThemeToggle />
              </div>
            </div>
          </nav>
          {children}
          <footer className="mt-16 py-10 text-center text-sm text-neutral-500 dark:text-neutral-400">
            Built with Next.js, TypeScript, Tailwind v4, and OpenAI
          </footer>
        </ThemeProvider>
      </body>
    </html>
  );
}
