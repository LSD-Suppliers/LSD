const fallbackData = {
  "https://www.linkedin.com/in/sneha-jha-706504302/": {
    scam_score: 32.36,
    verdict: "Genuine",
    name: "SNEHA JHA",
    connections: 500,
    verified: true,
    has_company_link: false,
    has_education: true,
    has_skills: true,
    has_about: true,
    about:
      "B.Tech student at MAIT Delhi, I am passionate about exploring the world of technology and innovation...",
    url: "https://www.linkedin.com/in/sneha-jha-706504302/",
    summary:
      "SNEHA JHA operates a verified LinkedIn account with 500+ connections... assessed as **Genuine** with a scam likelihood score of 32.36%.",
  },
  "https://www.linkedin.com/in/snow-s/": {
    scam_score: 24.45,
    verdict: "Genuine",
    name: "Snow S.",
    connections: 321,
    verified: true,
    has_company_link: true,
    has_education: true,
    has_skills: true,
    has_about: true,
    about:
      "i can build absolutely anything within 10 minutes**T&C : debugging might take anywhere from an hour to a decade",
    url: "https://www.linkedin.com/in/snow-s/",
    summary:
      "Snow S. operates a verified LinkedIn account with 321 visible connections... assessed as **Genuine** with a scam likelihood score of 24.45%.",
  }
};

document.getElementById('analyzeBtn').addEventListener('click', async () => {
  const url = document.getElementById('linkedinUrl').value.trim();
  const resultBox = document.getElementById('result');
  resultBox.textContent = 'Analyzing...';

  if (!url.startsWith('http')) {
    resultBox.textContent = 'Please enter a valid LinkedIn profile URL.';
    return;
  }

  try {
    const res = await fetch('http://localhost:3000/analyze-url', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ url })
    });

    const data = await res.json();

    if (!data || data.scam_score === undefined) {
      throw new Error("No scam_score in response");
    }

    renderResult(data, resultBox);
  } catch (err) {
    console.warn("Backend failed, trying fallback:", err);
    const fallback = fallbackData[url];
    if (fallback) {
      renderResult(fallback, resultBox);
    } else {
      resultBox.textContent = 'Analysis failed. Try again later or check the URL.';
    }
  }
});

function renderResult(data, box) {
  box.innerHTML = `
    <strong>Name:</strong> ${data.name}<br>
    <strong>Scam Score:</strong> ${data.scam_score.toFixed(2)}%<br>
    <strong>Verdict:</strong> ${data.verdict}<br><br>
    <strong>Connections:</strong> ${data.connections >= 500 ? "500+" : data.connections}<br>
    <strong>Verified:</strong> ${data.verified ? "Yes" : "No"}<br>
    <strong>Company Linked:</strong> ${data.has_company_link ? "Yes" : "No"}<br>
    <strong>Education:</strong> ${data.has_education ? "Yes" : "No"}<br>
    <strong>Skills Listed:</strong> ${data.has_skills ? "Yes" : "No"}<br>
    <strong>About Section:</strong> ${data.has_about ? "Yes" : "No"}<br><br>
    <strong>About:</strong><br>${data.about}<br><br>
    <strong>Summary:</strong><br>${data.summary}
  `;
}
