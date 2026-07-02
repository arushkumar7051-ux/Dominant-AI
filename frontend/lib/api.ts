interface Message {
  role: string;
  text: string;
}

export async function sendMessage(messages: Message[]) {
  const response = await fetch("http://127.0.0.1:8000/chat", {
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