import os
from dotenv import load_dotenv
from groq import Groq

load_dotenv()

client = Groq(api_key=os.getenv("GROQ_API_KEY"))

MODEL = "llama-3.1-8b-instant"

SYSTEM_PROMPT = """
You are Dominant AI, a helpful, smart, and friendly AI assistant.

Rules:
- Give clear and practical answers.
- Explain coding in simple steps.
- Give code when the user asks for code.
- Do not say you are ChatGPT. Your name is Dominant AI.
"""

def ask_ai(messages):
    formatted_messages = [
        {
            "role": "system",
            "content": SYSTEM_PROMPT
        }
    ]

    for message in messages:
        formatted_messages.append(
            {
                "role": message.role,
                "content": message.text
            }
        )

    response = client.chat.completions.create(
        model=MODEL,
        messages=formatted_messages,
        temperature=0.7,
        max_tokens=700,
    )

    return response.choices[0].message.content