"use client";

import { useEffect, useState } from "react";

import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import Chat from "../components/Chat";
import InputBox from "../components/InputBox";

interface Message {
  role: string;
  text: string;
}

export default function Home() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);
  const [hasLoadedHistory, setHasLoadedHistory] = useState(false);

  useEffect(() => {
    const savedMessages = localStorage.getItem("dominant-ai-chat");

    if (savedMessages) {
      try {
        setMessages(JSON.parse(savedMessages));
      } catch {
        localStorage.removeItem("dominant-ai-chat");
      }
    }

    setHasLoadedHistory(true);
  }, []);

  useEffect(() => {
    if (!hasLoadedHistory) return;

    localStorage.setItem("dominant-ai-chat", JSON.stringify(messages));
  }, [messages, hasLoadedHistory]);

  function startNewChat() {
    setMessages([]);
    localStorage.removeItem("dominant-ai-chat");
  }

  return (
    <main className="flex bg-black min-h-screen">
      <Sidebar onNewChat={startNewChat} />

      <div className="flex flex-col flex-1 min-h-screen">
        <Header />
        <Chat messages={messages} loading={loading} />
        <InputBox
          messages={messages}
          setMessages={setMessages}
          loading={loading}
          setLoading={setLoading}
        />
      </div>
    </main>
  );
}