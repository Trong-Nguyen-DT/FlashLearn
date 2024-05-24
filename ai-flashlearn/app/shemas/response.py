from pydantic import BaseModel, Field

class OriginalWord(BaseModel):
    word: str = Field(description="I sent the original word")
    meaning: str = Field(description="meaning of the original word")

class SimilarWord(BaseModel):
    word: str = Field(description="word whose letter form is similar to the original word")
    meaning: str = Field(description="meaning of the similar word")

class Sentence(BaseModel):
    sentence: str = Field(description="sentence containing the original word")
    meaning: str = Field(description="meaning of the sentence")

class Response(BaseModel):
    status: bool = Field(description="If This word has no meaning in the English language, return true")
    error: str = Field(description="If This word has no meaning in the English language, return Từ này không có nghĩa trong tiếng Anh")
    originalWord: OriginalWord = Field(description="original word and its meaning")
    similarWord: list[SimilarWord] = Field(description="list of similar words and their meanings")
    sentence: list[Sentence] = Field(description="list of sentences containing the original word and their meanings")
    