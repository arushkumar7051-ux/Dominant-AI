from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from app.chat import ask_ai

app = FastAPI(
    title="Dominant AI",
    version="1.0.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
    "http://localhost:3000",
    "https://dominant-ai.vercel.app/",
],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class Message(BaseModel):
    role: str
    text: str


class ChatRequest(BaseModel):
    messages: list[Message]


@app.get("/")
def home():
    return {
        "name": "Dominant AI",
        "status": "Online"
    }


@app.post("/chat")
def chat(request: ChatRequest):
    reply = ask_ai(request.messages)

    return {
        "reply": reply
    }