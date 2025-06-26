// src/pages/Analyze.jsx
import React, { useState } from 'react';
import ScamLogo from '../assets/Scam.webp';
import SusLogo from '../assets/Sus.jpg';
import GenuineLogo from '../assets/Genuine.webp';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Analyze = () => {
  const [usernameURL, setUsernameURL] = useState('');
  const [scamScore, setScamScore] = useState(0);
  const [inputData, setInputData] = useState(null);
  const [analyzed, setAnalyzed] = useState(false);
  const navigate = useNavigate();

const handleAnalyze = async () => {
  // const validPattern = /^https://www.linkedin.com/in/[\w-]+$/;
  // if (!validPattern.test(usernameURL.trim())) {
  //   alert("Please enter a valid LinkedIn URL in the format: https://www.linkedin.com/in/username");
  //   return;
  // }

  try {
    const res = await axios.post('http://127.0.0.1:8000/analyze-url', {
      url: usernameURL
    });

    setScamScore(res.data.scam_score.toFixed(2));
    setInputData(res.data.input_data);
    setAnalyzed(true);
  } catch (err) {
    console.error("Error:", err);
    alert("Analysis failed. Check backend logs.");
  }
};


  const getStatusLogo = () => {
    if (scamScore > 65) return ScamLogo;
    if (scamScore >= 41) return SusLogo;
    return GenuineLogo;
  };

  const getUsernameFromURL = (url) => {
    const match = url.match(/linkedin\.com\/in\/([\w-]+)/);
    return match ? match[1] : 'N/A';
  };

  return (
    <div className="relative min-h-screen w-full font-['Inter'] text-white">
      <div className="absolute inset-0 bg-black z-0" />
      <div className="relative z-10 px-6 py-16 max-w-7xl mx-auto">
        {!analyzed ? (
          <div className="flex flex-col items-center text-center gap-14">
            <h1 className="text-6xl font-extrabold text-white drop-shadow-lg">
              LinkedIn Scam Detonator
            </h1>
            <p className="text-2xl text-blue-300 max-w-4xl">
              Paste any LinkedIn profile URL and our system will assess the likelihood of the profile being
              scam, suspicious, or genuine.
            </p>
            <input
              type="text"
              placeholder="https://www.linkedin.com/in/username"
              value={usernameURL}
              onChange={(e) => setUsernameURL(e.target.value)}
              className="w-full max-w-3xl px-8 py-5 text-2xl text-white bg-blue-900/30 border border-blue-700 rounded-xl shadow-inner focus:outline-none focus:ring-4 focus:ring-blue-500 backdrop-blur-md"
            />
            <button
              onClick={handleAnalyze}
              className="bg-blue-600 hover:bg-blue-700 text-white text-3xl px-10 py-5 rounded-full shadow-xl transition-all duration-300"
            >
              Analyze
            </button>
          </div>
        ) : (
          <div className="space-y-16 text-[22px]">
            {/* Scam Likelihood Box */}
            <div className="bg-blue-900/30 border border-blue-700 backdrop-blur-lg p-10 rounded-3xl shadow-lg flex flex-col items-center gap-6 text-center">
              <img src={getStatusLogo()} alt="Status" className="w-40 drop-shadow-lg" />
              <h3 className="text-5xl font-bold text-blue-300">Scam Likelihood: {scamScore}%</h3>
            </div>

            {/* Profile Details Box */}
            <div className="bg-blue-900/30 border border-blue-700 backdrop-blur-md p-10 rounded-3xl text-blue-300">
              <h4 className="text-3xl font-bold text-white mb-4">Profile Details</h4>
              <p className="mb-3"><strong className="text-white">Profile URL:</strong> {usernameURL}</p>
              <p><strong className="text-white">User Name:</strong> {getUsernameFromURL(usernameURL)}</p>
            </div>

            {/* Stats Box with Real Data */}
            <div className="bg-blue-900/30 border border-blue-700 backdrop-blur-md p-10 rounded-3xl text-white grid grid-cols-1 md:grid-cols-2 gap-10">
              <div className="text-lg">
                <span className="text-blue-300 font-semibold">Verification Status:</span>{' '}
                {inputData.verification_status ? 'Yes' : 'No'}
              </div>
              <div className="text-lg">
                <span className="text-blue-300 font-semibold">Company URL Present:</span>{' '}
                {inputData.company_url_present ? 'Yes' : 'No'}
              </div>

              {[
                { label: 'Connection Score', value: inputData.connection_score },
                { label: 'Profile Completeness', value: inputData.profile_completeness },
                { label: 'AI Text Score', value: inputData.ai_text_score },
              ].map((stat, idx) => (
                <div key={idx} className="flex flex-col gap-2">
                  <span className="text-xl font-semibold text-blue-300">
                    {stat.label}: {(stat.value * 100).toFixed(0)}%
                  </span>
                  <meter
                    min="0"
                    max="100"
                    value={(stat.value * 100).toFixed(0)}
                    className="w-full h-5"
                  />
                </div>
              ))}
            </div>

            {/* Evaluation Summary */}
            <div className="bg-blue-900/30 border border-blue-700 backdrop-blur-md p-10 rounded-3xl text-blue-300 leading-relaxed">
              <h4 className="text-4xl font-bold mb-4 text-white">Profile Evaluation Summary</h4>
              <p>
                Our system evaluates LinkedIn profiles by examining red flags such as inconsistencies,
                connection counts, profile setup, and history of reports. Using an internal scoring algorithm,
                it provides a scam-likelihood rating to help you decide whether the profile can be trusted.
              </p>
            </div>

            {/* Disclaimer */}
            <div className="bg-yellow-100/10 border-l-8 border-yellow-400 text-yellow-200 backdrop-blur-md p-10 rounded-2xl shadow-md">
              <p className="text-2xl">
                <strong>Disclaimer:</strong> This result is generated on the basis of the parameters mentioned above. If you still have doubts, for deeper verification, you can analyze received messages from the same user.
              </p>
              <button
                onClick={() => navigate('/analyze-text')}
                className="mt-6 px-8 py-4 bg-yellow-500 text-white rounded-full hover:bg-yellow-600 transition"
              >
                Analyze Text from This User
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Analyze;
