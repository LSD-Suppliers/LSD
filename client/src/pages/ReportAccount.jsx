// src/pages/ReportAccount.jsx
import React, { useState } from "react";

const ReportAccount = () => {
  const [username, setUsername] = useState("");
  const [reason, setReason] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = () => {
    if (username.trim() && reason.trim()) {
      setSubmitted(true);
    }
  };

  return (
    <div className="relative min-h-screen w-full font-['Inter'] text-white">
      {/* Background Layer (Solid Black) */}
      <div className="absolute inset-0 bg-black z-0" />

      {/* Main Content */}
      <div className="relative z-10 px-6 py-20 max-w-3xl mx-auto">
        <div className="bg-blue-900/30 backdrop-blur-lg border border-blue-700 rounded-3xl p-10 shadow-2xl space-y-8">
          <h1 className="text-4xl font-bold text-center text-white">
            Report a Suspicious LinkedIn Account
          </h1>

          {!submitted ? (
            <>
              {/* Username Input */}
              <div>
                <label
                  htmlFor="username"
                  className="block text-lg font-semibold mb-2 text-blue-100"
                >
                  LinkedIn Username:
                </label>
                <input
                  type="text"
                  id="username"
                  placeholder="Enter suspected username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full px-5 py-4 bg-blue-800/30 border border-blue-700 rounded-xl text-white placeholder-blue-300 focus:outline-none focus:ring-4 focus:ring-blue-500"
                />
              </div>

              {/* Reason Input */}
              <div>
                <label
                  htmlFor="reason"
                  className="block text-lg font-semibold mb-2 text-blue-100"
                >
                  Proofs & Reasons:
                </label>
                <textarea
                  id="reason"
                  placeholder="Describe your suspicion, attach any relevant links or evidence."
                  rows="5"
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                  className="w-full px-5 py-4 bg-blue-800/30 border border-blue-700 rounded-xl text-white placeholder-blue-300 resize-y focus:outline-none focus:ring-4 focus:ring-blue-500"
                ></textarea>
              </div>

              {/* Submit Button */}
              <button
                onClick={handleSubmit}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-full text-xl font-semibold transition shadow-lg"
              >
                Submit Report
              </button>
            </>
          ) : (
            <div className="bg-blue-700/20 border-l-8 border-blue-500 p-8 rounded-3xl text-center space-y-4 shadow-xl">
              <h2 className="text-3xl font-bold text-blue-300">
                Report Submitted
              </h2>
              <p className="text-lg text-blue-100">
                ✅ Thank you for reporting the account{" "}
                <strong className="text-white">{username}</strong>.
              </p>
              <p className="text-base text-blue-200">
                Your input has been recorded and will be reviewed by our
                moderation team. If the profile is found to be malicious,
                appropriate actions will be taken.
              </p>
              <p className="italic text-sm text-blue-300 mt-2">
                Note: False reports may result in restricted access. Please
                report responsibly.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ReportAccount;
