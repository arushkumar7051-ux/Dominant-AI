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
        <div className="text-zinc-400 text-center mt-20">
          Start a conversation with Dominant AI.
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