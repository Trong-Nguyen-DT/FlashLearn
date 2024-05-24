from fastapi import APIRouter, HTTPException

from app.models import GeminiPro
from app.shemas.request import Request
from app.shemas.response import Response

router = APIRouter()

@router.post("/generator")
def generate(request: Request):
    chat = GeminiPro()
    response = chat.run(request.input)
    return response
