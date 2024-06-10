
from langchain.tools import tool
from langchain_community.document_loaders import TextLoader
from langchain_text_splitters import RecursiveCharacterTextSplitter
from langchain_chroma import Chroma
from langchain_google_genai import GoogleGenerativeAIEmbeddings
from langchain.tools.retriever import create_retriever_tool

from app.config import GOOGLE_API_KEY, PATH_DATA


def retrieval():
    loader = TextLoader(PATH_DATA)
    data = loader.load()
    text_splitter = RecursiveCharacterTextSplitter(chunk_size=500, chunk_overlap=0)
    all_splits = text_splitter.split_documents(data)
    vectorstore = Chroma.from_documents(documents=all_splits, embedding=GoogleGenerativeAIEmbeddings(model="models/embedding-001", google_api_key=GOOGLE_API_KEY))
    retriever = vectorstore.as_retriever(k=3)
    retriever_tool = create_retriever_tool(
        retriever,
        "hospital_search",
        "Search for information about Hospital or Doctor. For any questions about Hospital or Doctor, you must use this tool!",
    )
    return retriever_tool
