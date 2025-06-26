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
    try {
      const res = await axios.post('http://localhost:3000/analyze-url', {
        url: usernameURL,
      });

      if (res.data && res.data.scam_score !== undefined) {
        setScamScore(res.data.scam_score.toFixed(2));
        setInputData(res.data);
        setAnalyzed(true);
      } else {
        console.error("Invalid response from backend:", res.data);
        alert("Analysis failed. No scam_score received from backend.");
      }
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

  const renderYesNo = (value) => (
    <span className={`px-4 py-2 rounded-full text-white font-semibold text-lg ${value ? 'bg-green-600' : 'bg-red-600'}`}>
      {value ? 'Yes' : 'No'}
    </span>
  );

  const formatConnections = (value) => {
    if (!value || typeof value !== 'number') return 'N/A';
    return value >= 500 ? '500+' : value;
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
          inputData && (
            <div className="space-y-16 text-[22px]">
              {/* Scam Likelihood Box */}
              <div className="bg-blue-900/30 border border-blue-700 backdrop-blur-lg p-10 rounded-3xl shadow-lg flex flex-col items-center gap-6 text-center">
                <img src={getStatusLogo()} alt="Status" className="w-40 drop-shadow-lg" />
                <h3 className="text-5xl font-bold text-blue-300">
                  Scam Likelihood: {scamScore}%
                </h3>
                <p className="text-xl text-white font-medium">
                  Verdict: <span className="text-blue-400">{inputData.verdict}</span>
                </p>
              </div>

              {/* Profile Link & Name */}
              <div className="bg-blue-900/30 border border-blue-700 backdrop-blur-md p-8 rounded-3xl text-blue-300 space-y-4">
                <h4 className="text-3xl font-bold text-white mb-2">Profile Information</h4>
                <p><strong className="text-white">Name:</strong> {inputData.name}</p>
                <p><strong className="text-white">Profile URL:</strong>{' '}
                  <a href={inputData.url} target="_blank" rel="noreferrer" className="underline text-blue-400">
                    {inputData.url}
                  </a>
                </p>
              </div>

              {/* Profile Feature Stats */}
              <div className="bg-blue-900/30 border border-blue-700 backdrop-blur-md p-10 rounded-3xl text-white">
                <h4 className="text-3xl font-bold text-white mb-6">Profile Attributes</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  <div className="flex flex-col gap-2">
                    <span className="text-blue-300 font-semibold">Verified Badge</span>
                    {renderYesNo(inputData.verified)}
                  </div>
                  <div className="flex flex-col gap-2">
                    <span className="text-blue-300 font-semibold">About Section</span>
                    {renderYesNo(inputData.has_about)}
                  </div>
                  <div className="flex flex-col gap-2">
                    <span className="text-blue-300 font-semibold">Education Info</span>
                    {renderYesNo(inputData.has_education)}
                  </div>
                  <div className="flex flex-col gap-2">
                    <span className="text-blue-300 font-semibold">Skills Listed</span>
                    {renderYesNo(inputData.has_skills)}
                  </div>
                  <div className="flex flex-col gap-2">
                    <span className="text-blue-300 font-semibold">Company Link</span>
                    {renderYesNo(inputData.has_company_link)}
                  </div>
                  <div className="flex flex-col gap-2">
                    <span className="text-blue-300 font-semibold">Connections</span>
                    <span className="text-3xl font-bold text-white">
                      {formatConnections(inputData.connections)}
                    </span>
                  </div>
                </div>
              </div>

              {/* About Section */}
              {inputData.about && (
                <div className="bg-blue-900/30 border border-blue-700 backdrop-blur-md p-10 rounded-3xl text-blue-300 leading-relaxed">
                  <h4 className="text-3xl font-bold mb-4 text-white">About</h4>
                  <p>{inputData.about}</p>
                </div>
              )}

              {/* Evaluation Summary */}
              <div className="bg-blue-900/30 border border-blue-700 backdrop-blur-md p-10 rounded-3xl text-blue-300 leading-relaxed">
                <h4 className="text-4xl font-bold mb-4 text-white">Profile Evaluation Summary</h4>
                <p>{inputData.summary}</p>
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
          )
        )}
      </div>
    </div>
  );
};

export default Analyze;
