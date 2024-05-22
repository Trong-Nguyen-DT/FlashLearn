from pydantic import BaseModel, Field

class OriginalWord(BaseModel):
    word: str = Field(description="I sent the original word")
    meaning: str = Field(description="meaning of the original word")

class SimilarWord(BaseModel):
    word: str = Field(description="word whose letter form is similar to the original word")
    meaning: str = Field(description="meaning of the similar word")

class Response(BaseModel):
    originalWord: OriginalWord = Field(description="original word and its meaning")
    similarWord: list[SimilarWord] = Field(description="list of similar words and their meanings")