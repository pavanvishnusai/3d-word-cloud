import React, { useState } from "react";
import { analyze } from "./api";
import type { WordWeight } from "./api";
import { WordCloudScene } from "./components/WordCloud3D";
import { HUD } from "./components/HUD";
import "./styles.css";

const SAMPLES = [
  "https://www.bbc.com/news",
  "https://www.cnn.com",
  "https://www.nytimes.com",
];

export default function App() {
  const [url, setUrl] = useState(SAMPLES[0]);
  const [words, setWords] = useState<WordWeight[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function run() {
    try {
      setLoading(true);
      setError(null);
      const data = await analyze(url);
      setWords(data);
    } catch (err: any) {
      setError(err?.response?.data?.detail || err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="app">
      <div className="header">
        <strong>Enter article URL:</strong>
        <input
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="https://example.com/article"
        />
        <button onClick={run} disabled={loading}>
          {loading ? "Analyzing…" : "Go"}
        </button>
        <div className="samples">
          {SAMPLES.map((s) => (
            <span key={s} className="chip" onClick={() => setUrl(s)}>
              {new URL(s).host}
            </span>
          ))}
        </div>
        {loading && <span className="loading">Fetching & extracting…</span>}
        {error && <span className="error">{error}</span>}
      </div>

      <div className="canvas-wrap">
        <HUD count={words.length} />
        <WordCloudScene words={words} />
      </div>
    </div>
  );
}
