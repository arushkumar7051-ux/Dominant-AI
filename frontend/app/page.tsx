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

interface ChatSession {
  id: string;
  title: string;
  messages: Message[];
}

export default function Home() {
  const [chats, setChats] = useState<ChatSession[]>([]);
  const [activeChatId, setActiveChatId] = useState("");
  const [loading, setLoading] = useState(false);
  const [hasLoadedHistory, setHasLoadedHistory] = useState(false);

  useEffect(() => {
    const savedChats = localStorage.getItem("dominant-ai-chats");
    const savedActiveChatId = localStorage.getItem("dominant-ai-active-chat");

    if (savedChats) {
      try {
        setChats(JSON.parse(savedChats));
      } catch {
        localStorage.removeItem("dominant-ai-chats");
      }
    }

    if (savedActiveChatId) {
      setActiveChatId(savedActiveChatId);
    }

    setHasLoadedHistory(true);
  }, []);

  useEffect(() => {
    if (!hasLoadedHistory) return;

    localStorage.setItem("dominant-ai-chats", JSON.stringify(chats));
    localStorage.setItem("dominant-ai-active-chat", activeChatId);
  }, [chats, activeChatId, hasLoadedHistory]);

  const activeChat = chats.find((chat) => chat.id === activeChatId);
  const messages = activeChat?.messages || [];

  function createNewChat() {
    const newChat: ChatSession = {
      id: Date.now().toString(),
      title: "New Chat",
      messages: [],
    };

    setChats((prev) => [newChat, ...prev]);
    setActiveChatId(newChat.id);
  }

  function updateMessages(newMessages: Message[]) {
    setChats((prev) =>
      prev.map((chat) => {
        if (chat.id !== activeChatId) return chat;

        const firstUserMessage = newMessages.find(
          (message) => message.role === "user"
        );

        return {
          ...chat,
          title: firstUserMessage
            ? firstUserMessage.text.slice(0, 28)
            : "New Chat",
          messages: newMessages,
        };
      })
    );
  }

  function deleteAllChats() {
    setChats([]);
    setActiveChatId("");
    localStorage.removeItem("dominant-ai-chats");
    localStorage.removeItem("dominant-ai-active-chat");
  }

  return (
    <main className="flex bg-black min-h-screen">
      <Sidebar
        chats={chats}
        activeChatId={activeChatId}
        onNewChat={createNewChat}
        onSelectChat={setActiveChatId}
        onClearAllChats={deleteAllChats}
      />

      <div className="flex flex-col flex-1 min-h-screen">
        <Header />

        <Chat messages={messages} loading={loading} />

        <InputBox
          messages={messages}
          setMessages={updateMessages}
          loading={loading}
          setLoading={setLoading}
        />
      </div>
    </main>
  );
}