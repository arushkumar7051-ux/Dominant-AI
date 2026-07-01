from fastapi import FastAPI
from pydantic import BaseModel
from app.chat import ask_ai

app = FastAPI(
    title="Dominant AI",
    version="1.0.0"
)


class ChatRequest(BaseModel):
    message: str


@app.get("/")
def home():
    return {
        "name": "Dominant AI",
        "status": "Online 🚀"
    }


@app.post("/chat")
def chat(request: ChatRequest):
    reply = ask_ai(request.message)

    return {
        "reply": reply
    }