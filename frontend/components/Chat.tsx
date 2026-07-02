"use client";

import { useEffect, useRef } from "react";

interface Message {
  role: string;
  text: string;
}

interface ChatProps {
  messages: Message[];
  loading: boolean;
}

export default function Chat({ messages, loading }: ChatProps) {
  const bottomRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages, loading]);

  return (
    <div className="flex-1 overflow-y-auto p-8 space-y-5">
      
      {messages.length === 0 && (
  <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
    <div className="text-5xl mb-5">🤖</div>

    <h2 className="text-3xl font-bold text-white">
      Welcome to Dominant AI
    </h2>

    <p className="text-zinc-400 mt-3">
      Your personal AI assistant.
    </p>

    <p className="text-zinc-500 mt-2 text-sm">
      Ask questions, create ideas, write code, and build projects.
    </p>
  </div>
)}

      {messages.map((msg, index) => (
        <div
          key={index}
          className={msg.role === "user" ? "text-right" : "text-left"}
        >
          <div
            className={`inline-block max-w-[80%] px-5 py-3 rounded-2xl whitespace-pre-wrap ${
              msg.role === "user"
                ? "bg-blue-600 text-white"
                : "bg-zinc-800 text-white"
            }`}
          >
            {msg.text}
          </div>
        </div>
      ))}

      {loading && (
        <div className="text-left">
          <div className="inline-block bg-zinc-800 text-zinc-300 px-5 py-3 rounded-2xl">
            Dominant AI is thinking...
          </div>
        </div>
      )}

      <div ref={bottomRef} />
    </div>
  );
}