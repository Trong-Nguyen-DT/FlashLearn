from fastapi import APIRouter, HTTPException

from app.models import GeminiPro, GeminiChat
from app.shemas.request import Request, RequestChat
from app.shemas.response import Response

router = APIRouter()

@router.post("/generate")
def generate(request: Request):
    chat = GeminiPro()
    response = chat.run(request.input, request.part_of_speech)
    return response

@router.post("/chat-completions")
def chat_completions(request: RequestChat):
    chat = GeminiChat()
    response = chat.run(request.message)
    return response
