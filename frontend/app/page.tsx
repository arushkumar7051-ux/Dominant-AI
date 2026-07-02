"use client";

import { useState } from "react";

import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import Chat from "../components/Chat";
import InputBox from "../components/InputBox";

export default function Home() {
  const [messages, setMessages] = useState<
    { role: string; text: string }[]
  >([]);

  const [loading, setLoading] = useState(false);

  return (
    <main className="flex bg-black min-h-screen">
      <Sidebar />

      <div className="flex flex-col flex-1 min-h-screen">
        <Header />

        <Chat messages={messages} loading={loading} />

        <InputBox
          messages={messages}
          setMessages={setMessages}
          setLoading={setLoading}
        />
      </div>
    </main>
  );
}