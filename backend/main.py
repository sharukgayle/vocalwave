from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

# Allow your frontend to talk to backend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Replace "*" with your Vercel domain for better security
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def home():
    return {"message": "Speakify backend is running!"}

@app.post("/api/speak")
async def speak(request: Request):
    """Simple echo endpoint that repeats back what user typed."""
    data = await request.json()
    text = data.get("text", "").strip()
    if not text:
        return {"error": "Please provide some text to speak."}
    # Placeholder for text-to-speech logic
    return {"spoken_text": f"You said: {text}"}
