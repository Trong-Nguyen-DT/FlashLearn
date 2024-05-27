
from langchain_core.output_parsers import JsonOutputParser
from langchain_core.prompts import PromptTemplate
from langchain_google_genai import ChatGoogleGenerativeAI

from app.config import GOOGLE_API_KEY
from app.shemas.response import Response


class GeminiPro():
    def __init__(self):
        llm = ChatGoogleGenerativeAI(model="gemini-pro", google_api_key=GOOGLE_API_KEY)
        parser = JsonOutputParser(pydantic_object=Response)
        prompt = PromptTemplate(
            template="""
            You are an artificial intelligence.
            Your task is to give me the Vietnamese meaning of the word {input} whose part of speech is {type}.
            Provide 10 English words with letters similar to {input} and their Vietnamese meanings.
            Additionally, provide 5 sentences containing the word {input}.
            Along with the Vietnamese meanings of those sentences.
            If the word has no meaning in English, return 'Từ này không có nghĩa trong tiếng Anh'.
            {format_instructions}""",
            input_variables=["input", "type"],
            partial_variables={"format_instructions": parser.get_format_instructions()},
        )
        self.chain = prompt | llm | parser
        
    def run(self, input_text, part_of_speech):
        return self.chain.invoke({"input": input_text, "type": part_of_speech})