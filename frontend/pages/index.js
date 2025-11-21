import { useState } from "react";

export default function Home() {
  const [text, setText] = useState("");
  const [response, setResponse] = useState("");

  const handleSpeak = async () => {
    if (!text.trim()) {
      alert("Please enter some text first.");
      return;
    }
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL || "https://vocalwave.onrender.com"}/api/speak`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ text }),
        }
      );
      const data = await res.json();
      setResponse(data.spoken_text || data.error || "No response");
    } catch (err) {
      console.error(err);
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
      <p>Type something and click Speak to test the connection.</p>
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        rows={5}
        cols={50}
        style={{ padding: "10px" }}
      />
      <br />
      <button
        onClick={handleSpeak}
        style={{
          marginTop: "10px",
          padding: "10px 20px",
          fontSize: "16px",
          cursor: "pointer",
        }}
      >
        Speak
      </button>
      {response && (
        <p style={{ marginTop: "20px", fontWeight: "bold" }}>
          Backend says: {response}
        </p>
      )}
    </main>
  );
}
