from pydantic import BaseModel, Field

class OriginalWord(BaseModel):
    word: str = Field(description="The original word you provided, this will be hidden in the response")
    meaning: str = Field(description="The meaning of the original word")
    part_of_speech: str = Field(description="The part of speech of the original word (e.g., NOUN, VERB, ADJECTIVE, ADVERB, PRONOUN, PREPOSITION, CONJUNCTION, INTERJECTION)")

class SimilarWord(BaseModel):
    word: str = Field(description="A word whose letter form is similar to the original word")
    meaning: str = Field(description="The meaning of the similar word")

class Sentence(BaseModel):
    sentence: str = Field(description="A sentence containing the original word, with the word replaced by '____'")
    meaning: str = Field(description="The meaning of the sentence")

class Response(BaseModel):
    status: bool = Field(description="If this word has no meaning in the English language, return true")
    error: str = Field(description="If this word has no meaning in the English language, return 'Từ này không có nghĩa trong tiếng Anh'")
    originalWord: OriginalWord = Field(description="The original word and its meaning")
    similarWord: list[SimilarWord] = Field(description="A list of similar words and their meanings")
    sentence: list[Sentence] = Field(description="A list of sentences containing the original word and their meanings")
    