from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

# Allow calls from the Vercel frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],   # later replace * with your Vercel domain
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def home():
    return {"message": "Speakify backend is running!"}

@app.post("/api/speak")
async def speak(request: Request):
    data = await request.json()
    text = data.get("text", "")
    if not text:
        return {"error": "No text provided"}
    # Placeholder for text-to-speech; just echo the text for now
    return {"spoken_text": text}
