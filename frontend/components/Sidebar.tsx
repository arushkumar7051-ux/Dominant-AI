export default function Sidebar() {
  return (
    <div className="w-64 h-screen bg-zinc-900 border-r border-zinc-800 p-5">
      <h1 className="text-2xl font-bold text-white mb-8">
        🤖 Dominant AI
      </h1>

      <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg mb-6">
        + New Chat
      </button>

      <div className="space-y-3 text-gray-300">
        <p className="cursor-pointer hover:text-white">💬 Chat History</p>
        <p className="cursor-pointer hover:text-white">🖼 Images</p>
        <p className="cursor-pointer hover:text-white">🎥 Videos</p>
        <p className="cursor-pointer hover:text-white">🎵 Music</p>
        <p className="cursor-pointer hover:text-white">⚙ Settings</p>
      </div>
    </div>
  );
}