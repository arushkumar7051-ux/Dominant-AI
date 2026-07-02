interface Message {
  role: string;
  text: string;
}

const API_URL = "https://dominant-ai.onrender.com";

export async function sendMessage(messages: Message[]) {
  const response = await fetch(`${API_URL}/chat`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      messages: messages,
    }),
  });

  if (!response.ok) {
    throw new Error("Failed to connect to backend");
  }

  return response.json();
}