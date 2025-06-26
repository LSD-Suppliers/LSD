import React, { useState } from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import genuineImg from "../assets/Genuine.webp";
import susImg from "../assets/Sus.jpg";
import scamImg from "../assets/Scam.webp";

const COLORS = ["#FF5C5C", "#4F9DFF"];

const AnalyzeText = () => {
  const [inputText, setInputText] = useState("");
  const [resultData, setResultData] = useState(null);

  const analyzeText = async () => {
    try {
      const res = await fetch("http://localhost:3000/analyze-text", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text: inputText }),
      });

      const data = await res.json();

      let logo = genuineImg;
      if (data.scam_score > 65) logo = scamImg;
      else if (data.scam_score > 40) logo = susImg;

      setResultData({
        scamLikelihood: data.scam_score,
        analysisSummary: data.analysis_summary,
        logo,
      });
    } catch (error) {
      console.error("Error analyzing text:", error);
    }
  };

  const renderInsightBox = () => {
    const score = resultData.scamLikelihood;

    if (score > 65) {
      return (
        <div className="bg-red-800/30 border border-red-500 rounded-3xl p-10 shadow-xl text-white space-y-4">
          <h3 className="text-2xl font-semibold mb-4 text-red-300 text-center">
            🚨 High Scam Risk Detected
          </h3>
          <ul className="list-disc list-inside text-lg space-y-2">
            <li>Multiple scam indicators identified in this message.</li>
            <li>Highly suspicious tone, platform redirection, and vague details.</li>
            <li>Avoid engaging further and report the sender if possible.</li>
            <li>Never click on embedded links or share personal information.</li>
          </ul>
        </div>
      );
    } else if (score > 40) {
      return (
        <div className="bg-blue-900/30 border border-blue-700 rounded-3xl p-10 shadow-xl text-white space-y-4">
          <h3 className="text-2xl font-semibold mb-4 text-blue-300 text-center">
            ⚠️ Suspicious Behavior Noted
          </h3>
          <ul className="list-disc list-inside text-lg space-y-2">
            <li>Some scam patterns present, but not conclusively fraudulent.</li>
            <li>Proceed with caution—verify sender identity through official channels.</li>
            <li>Look out for urgency, language irregularities, or lack of verifiable details.</li>
          </ul>
        </div>
      );
    } else {
      return (
        <div className="bg-blue-900/30 border border-blue-700 rounded-3xl p-10 shadow-xl text-white space-y-4">
          <h3 className="text-2xl font-semibold mb-4 text-blue-300 text-center">
            ✅ Likely Genuine Message
          </h3>
          <ul className="list-disc list-inside text-lg space-y-2">
            <li>No strong scam indicators found in the text.</li>
            <li>Message appears to be from a credible source.</li>
            <li>Still, remain cautious and verify any offers independently.</li>
          </ul>
        </div>
      );
    }
  };

  return (
    <div className="relative min-h-screen w-full font-['Inter'] text-white">
      <div className="absolute inset-0 bg-black z-0" />
      <div className="relative z-10 px-6 py-16 max-w-6xl mx-auto">
        <div className="bg-blue-900/30 backdrop-blur-lg border border-blue-700 rounded-3xl p-10 shadow-xl space-y-10">
          <h2 className="text-4xl font-bold text-center text-white">
            Analyze Suspicious Text
          </h2>

          <textarea
            rows="6"
            className="w-full p-5 text-lg bg-blue-800/30 text-white placeholder-blue-300 border border-blue-700 rounded-xl shadow-inner focus:outline-none focus:ring-4 focus:ring-blue-500"
            placeholder="Paste suspicious messages received here..."
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
          ></textarea>

          <div className="text-center">
            <button
              onClick={analyzeText}
              className="mt-4 px-8 py-4 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition text-xl font-semibold"
            >
              Analyze
            </button>
          </div>
        </div>

        {resultData && (
          <div className="mt-16 space-y-12">
            <div className="bg-blue-900/30 backdrop-blur-lg border border-blue-700 rounded-3xl p-10 text-center shadow-xl space-y-6">
              <img
                src={resultData.logo}
                alt="Result"
                className="w-36 mx-auto drop-shadow-lg"
              />
              <div className="text-3xl font-bold text-blue-300">
                Scam Likelihood: {resultData.scamLikelihood}%
              </div>
            </div>

            <div className="bg-blue-900/30 backdrop-blur-md border border-blue-700 rounded-3xl p-10 shadow-xl flex flex-col md:flex-row items-center md:items-start md:justify-between space-y-8 md:space-y-0">
              <div className="w-full md:w-1/2 h-72">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      dataKey="value"
                      data={[
                        {
                          name: "Scam",
                          value: resultData.scamLikelihood,
                        },
                        {
                          name: "Safe",
                          value: 100 - resultData.scamLikelihood,
                        },
                      ]}
                      outerRadius={100}
                      label
                    >
                      {COLORS.map((color, index) => (
                        <Cell key={`cell-${index}`} fill={color} />
                      ))}
                    </Pie>
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "#1f2937",
                        borderColor: "#4B5563",
                      }}
                      itemStyle={{ color: "#fff" }}
                    />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>

              <div className="w-full md:w-1/2 text-left space-y-4">
                <h4 className="text-xl font-semibold text-white">
                  Message Analysis Criteria
                </h4>
                <ul className="list-disc list-inside text-lg space-y-2">
                  <li>Evaluation includes tone, language, and platform behavior.</li>
                  <li>Dynamic model estimates risk using learned scam patterns.</li>
                  <li>Visual breakdown helps in identifying risk distribution.</li>
                </ul>

                {/* ✅ Display review bullets here */}
                <div className="mt-6">
                  <h4 className="text-lg font-semibold text-white mb-2">Review Summary:</h4>
                  <ul className="list-disc list-inside space-y-1 text-blue-200 text-base">
                    {resultData.analysisSummary.map((item, idx) => (
                      <li key={idx}>
                        <strong>{item.pattern}:</strong> {item.description}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {renderInsightBox()}
          </div>
        )}
      </div>
    </div>
  );
};

export default AnalyzeText;
