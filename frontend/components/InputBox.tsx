"use client";

import { useState } from "react";
import { sendMessage } from "../lib/api";

interface Message {
  role: string;
  text: string;
}

interface InputBoxProps {
  messages: Message[];
  setMessages: React.Dispatch<React.SetStateAction<Message[]>>;
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function InputBox({
  messages,
  setMessages,
  loading,
  setLoading,
}: InputBoxProps) {
  const [message, setMessage] = useState("");

  async function handleSend() {
    const currentMessage = message.trim();

    if (!currentMessage || loading) return;

    setMessages((prev) => [
      ...prev,
      {
        role: "user",
        text: currentMessage,
      },
    ]);

    setMessage("");
    setLoading(true);

    try {
      const result = await sendMessage([
  ...messages,
  {
    role: "user",
    text: currentMessage,
  },
]);

      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          text: result.reply,
        },
      ]);
    } catch (error) {
      console.error(error);

      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          text: "Failed to connect to Dominant AI backend.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="border-t border-zinc-800 p-4 flex gap-3">
      <input
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            handleSend();
          }
        }}
        disabled={loading}
        className="flex-1 bg-zinc-900 rounded-lg p-3 text-white outline-none disabled:opacity-50"
        placeholder={
          loading
            ? "Dominant AI is thinking..."
            : "Ask Dominant AI..."
        }
      />

      <button
        onClick={handleSend}
        disabled={loading}
        className="bg-blue-600 hover:bg-blue-700 px-6 rounded-lg text-white disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {loading ? "Thinking..." : "Send"}
      </button>
    </div>
  );
}