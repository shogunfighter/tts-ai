from fastapi import FastAPI, Request  # Explicitly import 'Request'
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import Response  # Add this import
from tts_engine import TTSEngine

app = FastAPI()

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  # Replace with your frontend URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

tts = TTSEngine()

@app.get("/")
def read_root():
    return {"status": "TTS Ready"}


@app.post("/synthesize")
async def synthesize(request: Request):  # Now 'Request' is defined
    try:
        body = await request.json()
        text = body.get("text")
        audio_data = tts.synthesize(text)  # Returns bytes
        return Response(content=audio_data, media_type="audio/wav")  # Send raw audio
    except Exception as e:
        return {"error": str(e)}, 400