import ollama

MODEL = "qwen3:1.7b"


def ask_ai(prompt: str):
    response = ollama.chat(
        model=MODEL,
        messages=[
            {
                "role": "user",
                "content": prompt
            }
        ]
    )

    return response["message"]["content"]