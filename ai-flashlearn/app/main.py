from app.config import APP_HOST, APP_PORT
from app.server.app import app

if __name__ == "__main__":
    import uvicorn
    
    uvicorn.run("app.main:app", host=APP_HOST, port=APP_PORT, reload=True)