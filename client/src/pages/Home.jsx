// src/pages/Home.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/LSD.webp";
import textIcon from "../assets/Text.webp";
import urlIcon from "../assets/Url.webp";
import userIcon from "../assets/User.webp";
import reportIcon from "../assets/Report.png";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div
      className="min-h-screen bg-cover bg-center relative flex flex-col items-center justify-start px-6 py-12 font-['Inter']"
      style={{ backgroundImage: "url('/your-bg-image.jpg')" }}
    >
      {/* Welcoming blue gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-700 via-blue-600 to-blue-500 opacity-80 z-0"></div>

      <div className="relative z-10 w-full max-w-7xl flex flex-col items-center text-center text-white">
        <img src={logo} alt="Main Logo" className="w-52 mb-10 drop-shadow-xl" />

        <h1 className="text-6xl font-extrabold drop-shadow-lg mb-4">
          LinkedIn Scam Detonator
        </h1>

        <p className="text-2xl italic font-light text-blue-200 mb-12 max-w-3xl">
          Exposing Digital Deception
        </p>

        {/* Info Box */}
        <div className="bg-blue-200/10 backdrop-blur-md border border-blue-300 rounded-3xl px-14 py-12 shadow-2xl mb-20 text-lg leading-relaxed text-blue-100 w-full max-w-6xl">
          <p>
            Linkedin Scam Detonator is a verification tool designed to analyze the trustworthiness of Linkedin accounts
          </p>
          <p className="mt-6">
            Receive a data driven report of red flags in an account's behaviour or messaging pattern
          </p>
          <p className="mt-6">
            Evaluate whether shared links are safe or malicious and report confirmed scammers
          </p>
        </div>

        {/* Feature Cards */}
        <div className="flex flex-wrap justify-center gap-10 mb-24">
          {[
            {
              title: "Analyze by Profile URL",
              desc: "Check suspicious accounts via LinkedIn user URL",
              icon: userIcon,
              link: "/analyze",
            },
            {
              title: "Analyze Messages",
              desc: "Scan received messages for scam indicators",
              icon: textIcon,
              link: "/analyze-text",
            },
            {
              title: "Analyze Links",
              desc: "Verify if shared URLs are safe or malicious",
              icon: urlIcon,
              link: "/analyze-url",
            },
            {
              title: "Report an Account",
              desc: "Submit details of suspicious profiles to alert others",
              icon: reportIcon,
              link: "/report-account",
            },
          ].map((card, idx) => (
            <div
              key={idx}
              onClick={() => navigate(card.link)}
              className="w-72 h-80 bg-blue-200/10 hover:bg-blue-200/20 backdrop-blur-lg border border-blue-300 rounded-2xl p-6 flex flex-col items-center justify-center text-center cursor-pointer transition-all duration-300 hover:scale-105 shadow-xl"
            >
              <img src={card.icon} alt={card.title} className="w-20 h-20 mb-6 drop-shadow-lg" />
              <h3 className="text-2xl font-semibold text-white mb-3">{card.title}</h3>
              <p className="text-lg text-blue-200">{card.desc}</p>
            </div>
          ))}
        </div>

        {/* Footer */}
        <footer className="w-full border-t border-blue-300 pt-10 pb-6 text-blue-200 text-lg text-center">
          <p>
            Crafted with care and curiosity by <strong className="text-white">Sneha</strong> and <strong className="text-white">Snow</strong> — two passionate developers committed to creating a safer digital world.
          </p>
          <p className="mt-2 italic">
            Suspect and Scan — Detect before it's too late.
          </p>
        </footer>
      </div>
    </div>
  );
};

export default Home;
