import { useState } from "react";

export default function Home() {
  const [text, setText] = useState("");
  const [response, setResponse] = useState("");
  const API_URL =
    process.env.NEXT_PUBLIC_API_URL || "https://vocalwave.onrender.com";

  const handleSpeak = async () => {
    if (!text.trim()) {
      alert("Please enter some text first.");
      return;
    }
    try {
      const res = await fetch(`${API_URL}/api/speak`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text }),
      });
      const data = await res.json();
      setResponse(data.spoken_text || data.error || "No response");
    } catch (error) {
      console.error(error);
      setResponse("Error connecting to backend.");
    }
  };

  return (
    <main
      style={{
        fontFamily: "sans-serif",
        textAlign: "center",
        marginTop: "10%",
        padding: "20px",
      }}
    >
      <h1>🗣️ Speakify</h1>
      <p>Type something and click Speak to test your backend connection.</p>
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        rows={5}
        cols={50}
        placeholder="Enter text here..."
        style={{ padding: "10px", fontSize: "16px" }}
      />
      <br />
      <button
        onClick={handleSpeak}
        style={{
          marginTop: "15px",
          padding: "10px 25px",
          fontSize: "16px",
          cursor: "pointer",
        }}
      >
        Speak
      </button>

      {response && (
        <p style={{ marginTop: "25px", fontWeight: "bold", fontSize: "18px" }}>
          Backend says: {response}
        </p>
      )}
    </main>
  );
}
