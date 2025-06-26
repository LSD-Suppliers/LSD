// routes/scan.js
const express = require("express");
const axios = require("axios");
const router = express.Router();

const apiKey = process.env.VIRUSTOTAL_API_KEY;
// console.log("VirusTotal API Key (should not be undefined):", apiKey);

router.post("/check-url", async (req, res) => {
  const { url } = req.body;

  try {
    // Submit URL for scanning
    const submitRes = await axios.post(
      "https://www.virustotal.com/api/v3/urls",
      new URLSearchParams({ url }),
      {
        headers: {
          "x-apikey": apiKey,
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );

    const scanId = submitRes.data.data.id;

    // Wait 1 second to ensure the scan is processed
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Retrieve scan results
    const resultRes = await axios.get(
      `https://www.virustotal.com/api/v3/analyses/${scanId}`,
      {
        headers: {
          "x-apikey": apiKey,
        },
      }
    );

    const stats = resultRes.data.data.attributes.stats;
    const isMalicious = stats.malicious > 0 || stats.suspicious > 0;

    res.json({ result: isMalicious ? "Not Safe" : "Safe" });
  } catch (error) {
    console.error(error.response?.data || error.message);
    res.status(500).json({ error: "Failed to scan URL" });
  }
});



module.exports = router;
