from fastapi import FastAPI
from app.routers.generatorVocabulary import router

app = FastAPI()

app.include_router(router, prefix="/api")