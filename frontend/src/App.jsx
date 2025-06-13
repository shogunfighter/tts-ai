import { useState } from 'react';
import './App.css';

function App() {
  const [text, setText] = useState('');
  const [audioUrl, setAudioUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!text.trim()) {
      setError("Please enter text first!");
      return;
    }
  
    setIsLoading(true);
    setError("");
    setAudioUrl("");  // Reset previous audio
  
    try {
      const response = await fetch('http://localhost:8000/synthesize', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text }),
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
  
      // Handle binary audio (WAV format)
      const audioBlob = await response.blob();
      const url = URL.createObjectURL(audioBlob);
      setAudioUrl(url);  // Set URL for the <audio> element
  
    } catch (err) {
      setError(err.message || "Failed to synthesize audio");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="App">
      <h1>TTS Synthesizer</h1>
      <form onSubmit={handleSubmit}>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Enter text here..."
          disabled={isLoading}
        />
        <button type="submit" disabled={isLoading}>
          {isLoading ? 'Synthesizing...' : 'Synthesize'}
        </button>
      </form>
      {error && <p className="error">{error}</p>}
      {audioUrl && (
        <div className="audio-player">
          <audio controls src={audioUrl} autoPlay />
          <p>Listen to the result:</p>
        </div>
      )}
    </div>
  );
}

export default App;