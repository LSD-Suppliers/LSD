// src/pages/AnalyzeURL.jsx
import React, { useState } from "react";

const AnalyzeURL = () => {
  const [url, setUrl] = useState("");
  const [result, setResult] = useState(null);
  const [submitted, setSubmitted] = useState(false);

  const handleAnalyze = () => {
    const safe = Math.random() > 0.4;
    setResult(safe ? "Safe" : "Not Safe");
    setSubmitted(true);
  };

  return (
    <div className="relative min-h-screen w-full font-['Inter'] text-white">
      {/* Solid Black Background */}
      <div className="absolute inset-0 bg-black z-0" />

      {/* Main Content */}
      <div className="relative z-10 px-6 py-20 max-w-3xl mx-auto">
        {/* Input Box */}
        <div className="bg-blue-900/30 backdrop-blur-xl border border-blue-700 rounded-3xl p-10 shadow-2xl text-center space-y-8">
          <h2 className="text-4xl font-bold text-white">
            Analyze Shared LinkedIn URL
          </h2>

          <input
            type="text"
            placeholder="Paste a LinkedIn URL to verify..."
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            className="w-full px-6 py-4 rounded-xl bg-blue-800/30 border border-blue-700 placeholder-blue-300 text-lg text-white shadow-inner focus:outline-none focus:ring-4 focus:ring-blue-500"
          />

          <button
            onClick={handleAnalyze}
            className="bg-blue-600 hover:bg-blue-700 text-white text-xl px-8 py-4 rounded-full transition shadow-lg"
          >
            Check Safety
          </button>
        </div>

        {/* Result Display */}
        {submitted && (
          <div
            className={`mt-12 p-8 rounded-3xl text-xl font-medium shadow-xl border-l-8 ${
              result === "Safe"
                ? "bg-green-500/10 border-green-500 text-green-200"
                : "bg-red-500/10 border-red-500 text-red-200"
            }`}
          >
            <h3 className="text-2xl font-bold mb-2">
              {result === "Safe" ? "✅ URL is Safe" : "🚫 URL is Not Safe"}
            </h3>
            <p className="text-base">
              {result === "Safe"
                ? "This URL appears legitimate. It shows no signs of redirection or phishing patterns."
                : "Warning! This URL may be suspicious, shortened, or redirecting to malicious content. Be cautious."}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AnalyzeURL;
