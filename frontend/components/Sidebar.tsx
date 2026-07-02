interface ChatSession {
  id: string;
  title: string;
  messages: {
    role: string;
    text: string;
  }[];
}

interface SidebarProps {
  chats: ChatSession[];
  activeChatId: string;
  onNewChat: () => void;
  onSelectChat: (id: string) => void;
  onClearAllChats: () => void;
}

export default function Sidebar({
  chats,
  activeChatId,
  onNewChat,
  onSelectChat,
  onClearAllChats,
}: SidebarProps) {
  return (
    <div className="w-64 h-screen bg-zinc-900 border-r border-zinc-800 p-5 flex flex-col">
      <h1 className="text-2xl font-bold text-white mb-8">
        🤖 Dominant AI
      </h1>

      <button
        onClick={onNewChat}
        className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg mb-5"
      >
        + New Chat
      </button>

      <div className="flex items-center justify-between mb-3">
        <p className="text-sm font-semibold text-zinc-400">Chat History</p>

        {chats.length > 0 && (
          <button
            onClick={onClearAllChats}
            className="text-xs text-zinc-500 hover:text-red-400"
          >
            Clear
          </button>
        )}
      </div>

      <div className="flex-1 overflow-y-auto space-y-2">
        {chats.length === 0 && (
          <p className="text-sm text-zinc-500">
            No saved chats yet.
          </p>
        )}

        {chats.map((chat) => (
          <button
            key={chat.id}
            onClick={() => onSelectChat(chat.id)}
            className={`w-full text-left px-3 py-2 rounded-lg text-sm truncate ${
              chat.id === activeChatId
                ? "bg-zinc-700 text-white"
                : "text-zinc-400 hover:bg-zinc-800 hover:text-white"
            }`}
          >
            💬 {chat.title}
          </button>
        ))}
      </div>

      <div className="space-y-3 text-gray-300 pt-4 border-t border-zinc-800">
        <p className="cursor-pointer hover:text-white">🖼 Images</p>
        <p className="cursor-pointer hover:text-white">🎥 Videos</p>
        <p className="cursor-pointer hover:text-white">🎵 Music</p>
        <p className="cursor-pointer hover:text-white">⚙ Settings</p>
      </div>
    </div>
  );
}