// src/pages/AnalyzeURL.jsx
import React, { useState } from "react";

const AnalyzeURL = () => {
  const [url, setUrl] = useState("");
  const [result, setResult] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const [showReportForm, setShowReportForm] = useState(false);
  const [reportReason, setReportReason] = useState("");
  const [reportProof, setReportProof] = useState("");
  const [reportSubmitted, setReportSubmitted] = useState(false);

  const handleAnalyze = async () => {
    if (!url.trim()) {
      alert("Please enter a valid URL to analyze.");
      return;
    }

    setLoading(true);
    setSubmitted(false);
    setResult(null);
    setShowReportForm(false);
    setReportSubmitted(false);

    try {
      const response = await fetch("http://localhost:3000/api/check-url", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ url }),
      });

      const data = await response.json();

      if (response.ok) {
        setResult(data.result);
        setSubmitted(true);
      } else {
        alert("Server Error: " + data.error);
      }
    } catch (error) {
      console.error("Error checking URL:", error);
      alert("Something went wrong. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const handleReportSubmit = (e) => {
    e.preventDefault();

    // Simulate report submission
    setReportSubmitted(true);
    setReportReason("");
    setReportProof("");
    setShowReportForm(false);
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
            Analyze Any Suspicious URL
          </h2>

          <input
            type="text"
            placeholder="Paste a URL to verify (e.g., LinkedIn, bit.ly)..."
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            className="w-full px-6 py-4 rounded-xl bg-blue-800/30 border border-blue-700 placeholder-blue-300 text-lg text-white shadow-inner focus:outline-none focus:ring-4 focus:ring-blue-500"
          />

          <button
            onClick={handleAnalyze}
            className="bg-blue-600 hover:bg-blue-700 text-white text-xl px-8 py-4 rounded-full transition shadow-lg disabled:opacity-60 disabled:cursor-not-allowed"
            disabled={loading}
          >
            {loading ? "Analyzing..." : "Check Safety"}
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

            {/* Report Button */}
            <div className="mt-6">
              <button
                onClick={() => setShowReportForm(true)}
                className="underline text-blue-400 hover:text-blue-300 text-base"
              >
                Incorrect Detection? Report It
              </button>
            </div>
          </div>
        )}

        {/* Report Form */}
        {showReportForm && !reportSubmitted && (
          <form
            onSubmit={handleReportSubmit}
            className="mt-8 p-6 bg-blue-800/40 border border-blue-600 rounded-2xl space-y-4 shadow-xl"
          >
            <h3 className="text-xl font-semibold text-white">
              Help us understand why this detection might be wrong
            </h3>

            <textarea
              placeholder="Why do you think this URL was unsafe?"
              value={reportReason}
              onChange={(e) => setReportReason(e.target.value)}
              required
              className="w-full p-4 rounded-lg bg-blue-700/30 border border-blue-500 placeholder-blue-200 text-white"
            />

            <input
              type="text"
              placeholder="Any proofs? (optional)"
              value={reportProof}
              onChange={(e) => setReportProof(e.target.value)}
              className="w-full p-4 rounded-lg bg-blue-700/30 border border-blue-500 placeholder-blue-200 text-white"
            />

            <button
              type="submit"
              className="bg-green-600 hover:bg-green-700 px-6 py-3 rounded-full font-semibold shadow-md"
            >
              Submit Report
            </button>
          </form>
        )}

        {/* Thank You Message */}
        {reportSubmitted && (
          <div className="mt-8 p-6 bg-green-800/30 border border-green-600 rounded-2xl shadow-md text-green-200 text-lg text-center">
            <p>
              Thank you for reporting this! We truly appreciate your input.
              Our team will review your submission and improve the detection
              mechanism. Together, we’ll make the web a safer place!!
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AnalyzeURL;
