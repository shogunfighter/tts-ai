from TTS.api import TTS

class TTSEngine:
    def __init__(self):
        self.model = TTS(model_name="tts_models/en/ljspeech/glow-tts")

    def synthesize(self, text: str) -> bytes:
        output_path = "/tmp/output.wav"
        self.model.tts_to_file(text=text, file_path=output_path)
        with open(output_path, "rb") as f:
            return f.read()