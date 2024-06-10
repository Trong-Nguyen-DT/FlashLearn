
from langchain_core.output_parsers import JsonOutputParser
from langchain_core.prompts import PromptTemplate
from langchain_google_genai import GoogleGenerativeAI

from app.config import GOOGLE_API_KEY
from app.shemas.response import Response


class GeminiPro():
    def __init__(self):
        llm = GoogleGenerativeAI(model="gemini-pro", google_api_key=GOOGLE_API_KEY)
        parser = JsonOutputParser(pydantic_object=Response)
        prompt = PromptTemplate(
            template="""
            You are an artificial intelligence.
            Your task is to provide the Vietnamese meaning of the word {input} with the part of speech {part_of_speech}.
            Additionally, provide 10 English words that are not {input}, are not duplicates, and have letters similar to {input}, along with their Vietnamese meanings.
            Furthermore, provide 5 sentences containing the word {input}, replacing the word {input} with '____' in the sentences.
            Include the Vietnamese meanings of those sentences. If the word has no meaning in English, return 'Từ này không có nghĩa trong tiếng Anh'.
            {format_instructions}""",
            input_variables=["input", "part_of_speech"],
            partial_variables={"format_instructions": parser.get_format_instructions()},
        )
        self.chain = prompt | llm | parser
        
    def run(self, input_text, part_of_speech):
        return self.chain.invoke({"input": input_text, "part_of_speech": part_of_speech})