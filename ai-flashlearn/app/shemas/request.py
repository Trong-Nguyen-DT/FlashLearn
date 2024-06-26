from pydantic import BaseModel

class Request(BaseModel):
    input: str
    part_of_speech: str
    
class RequestChat(BaseModel):
    message: str