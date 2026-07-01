export default function Home() {
  return (
    <main className="min-h-screen bg-black text-white flex flex-col items-center justify-center">
      <h1 className="text-6xl font-bold mb-6">
        🤖 Dominant AI
      </h1>

      <p className="text-gray-400 text-xl mb-10">
        Your Own AI Platform
      </p>

      <button className="bg-blue-600 hover:bg-blue-700 px-8 py-3 rounded-xl text-lg">
        Start Chatting
      </button>
    </main>
  );
}