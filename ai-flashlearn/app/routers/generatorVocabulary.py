from fastapi import APIRouter

from app.models import GeminiPro
from app.shemas.request import Request


router = APIRouter()

@router.get("/")
def read_root():
    return {"Hello": "World"}

@router.post("/generate")
def generate(request: Request):
    chat = GeminiPro()
    response = chat.run(request.input, request.part_of_speech)
    return response

    