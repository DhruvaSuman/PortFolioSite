"use client";

import { FormEvent, useEffect, useMemo, useRef, useState } from "react";

type ChatRole = "user" | "assistant";

type ChatMessage = {
  role: ChatRole;
  content: string;
};

const starterPrompts = [
  "Tell me about Suman's backend expertise.",
  "What enterprise projects has Suman owned?",
  "Which technologies does Suman use most?",
];

export default function DigitalTwinChat() {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: "assistant",
      content:
        "Hello. I am Suman's digital twin. Ask about his HSBC role, enterprise backend experience, projects, or technology stack.",
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const listEndRef = useRef<HTMLDivElement>(null);

  const canSend = useMemo(
    () => input.trim().length > 0 && !isLoading,
    [input, isLoading],
  );

  useEffect(() => {
    listEndRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [messages, isLoading]);

  async function askQuestion(question: string) {
    const trimmed = question.trim();
    if (!trimmed || isLoading) {
      return;
    }

    setError("");
    setIsLoading(true);

    const nextMessages: ChatMessage[] = [
      ...messages,
      { role: "user", content: trimmed },
    ];
    setMessages(nextMessages);
    setInput("");

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: nextMessages,
        }),
      });

      if (!response.ok) {
        const payload = (await response.json().catch(() => null)) as
          | { error?: string }
          | null;
        throw new Error(payload?.error || "Failed to get a response.");
      }

      const payload = (await response.json()) as { answer: string };
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: payload.answer || "I could not generate a response.",
        },
      ]);
    } catch (requestError) {
      const message =
        requestError instanceof Error
          ? requestError.message
          : "Unexpected error while contacting the AI service.";
      setError(message);
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content:
            "I hit an issue while answering. Please retry in a moment.",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  }

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    void askQuestion(input);
  }

  return (
    <section className="mt-10">
      <div className="overflow-hidden rounded-3xl border border-zinc-800/90 bg-zinc-950/85 shadow-[0_24px_80px_-40px_rgba(0,0,0,0.9)]">
        <div className="border-b border-zinc-800/90 bg-zinc-900/70 px-6 py-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <h2 className="text-xl font-semibold text-zinc-100">
                Digital Twin Assistant
              </h2>
              <p className="mt-1 text-sm text-zinc-400">
                Modern conversational workspace for recruiter and stakeholder
                Q&amp;A
              </p>
            </div>
            <span className="rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-xs font-semibold tracking-wide text-emerald-300">
              LIVE ON OPENROUTER
            </span>
          </div>
        </div>

        <div className="grid gap-0 lg:grid-cols-[240px_1fr]">
          <aside className="hidden border-r border-zinc-800/90 bg-zinc-900/35 p-4 lg:block">
            <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-zinc-500">
              Quick prompts
            </p>
            <div className="space-y-2">
              {starterPrompts.map((prompt) => (
                <button
                  key={prompt}
                  type="button"
                  onClick={() => void askQuestion(prompt)}
                  disabled={isLoading}
                  className="w-full rounded-xl border border-zinc-800 bg-zinc-900/70 px-3 py-2 text-left text-xs text-zinc-300 transition hover:border-cyan-500/60 hover:text-zinc-100 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {prompt}
                </button>
              ))}
            </div>
          </aside>

          <div className="flex min-h-[520px] flex-col">
            <div className="h-[420px] space-y-3 overflow-y-auto bg-zinc-950/40 px-4 py-4 sm:px-6">
              {messages.map((message, index) => (
                <div
                  key={`${message.role}-${index}`}
                  className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[92%] rounded-2xl px-4 py-3 text-sm leading-relaxed sm:max-w-[78%] ${
                      message.role === "user"
                        ? "border border-cyan-500/35 bg-cyan-500/15 text-cyan-50"
                        : "border border-zinc-800 bg-zinc-900/90 text-zinc-100"
                    }`}
                  >
                    {message.content}
                  </div>
                </div>
              ))}

              {isLoading ? (
                <div className="flex justify-start">
                  <div className="inline-flex items-center gap-2 rounded-2xl border border-zinc-800 bg-zinc-900/90 px-4 py-3 text-sm text-zinc-300">
                    <span className="h-2 w-2 animate-pulse rounded-full bg-zinc-400" />
                    <span className="h-2 w-2 animate-pulse rounded-full bg-zinc-400 [animation-delay:120ms]" />
                    <span className="h-2 w-2 animate-pulse rounded-full bg-zinc-400 [animation-delay:240ms]" />
                  </div>
                </div>
              ) : null}

              <div ref={listEndRef} />
            </div>

            <div className="border-t border-zinc-800/90 bg-zinc-900/45 p-4 sm:p-5">
              <form onSubmit={onSubmit} className="flex flex-col gap-3 sm:flex-row">
                <input
                  value={input}
                  onChange={(event) => setInput(event.target.value)}
                  placeholder="Ask anything about Suman's career, skills, and enterprise impact..."
                  className="w-full rounded-2xl border border-zinc-700 bg-zinc-950 px-4 py-3 text-sm text-zinc-100 outline-none placeholder:text-zinc-500 focus:border-cyan-500"
                />
                <button
                  type="submit"
                  disabled={!canSend}
                  className="rounded-2xl bg-zinc-100 px-6 py-3 text-sm font-semibold text-zinc-900 transition hover:bg-white disabled:cursor-not-allowed disabled:opacity-50"
                >
                  Ask Twin
                </button>
              </form>
              {error ? <p className="mt-2 text-sm text-rose-300">{error}</p> : null}
            </div>
          </div>
        </div>
      </div>

      <div className="mt-3 flex flex-wrap gap-2 lg:hidden">
        {starterPrompts.map((prompt) => (
          <button
            key={`mobile-${prompt}`}
            type="button"
            onClick={() => void askQuestion(prompt)}
            disabled={isLoading}
            className="rounded-lg border border-zinc-700 px-3 py-2 text-xs text-zinc-300 transition hover:border-cyan-500/60 hover:text-zinc-100 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {prompt}
          </button>
        ))}
      </div>
      <p className="mt-3 text-xs text-zinc-500">
        Responses are generated from your curated profile context and current
        career data.
      </p>
    </section>
  );
}
