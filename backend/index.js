require("dotenv").config();
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const { chromium } = require("playwright");
const { spawn } = require("child_process");
const path = require("path");
const scanRoutes = require("./routes/scan");
const { analyzeTextWithOpenRouter } = require("./routes/text");

const app = express();
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());

app.use("/api", scanRoutes);
app.post("/analyze-text", async (req, res) => {
  const { text } = req.body;

  if (!text) {
    return res.status(400).json({ error: "Text is required" });
  }

  try {
    const result = await analyzeTextWithOpenRouter(text);

    // // Print AI response to terminal
    // console.log("AI Response:");
    // console.log(JSON.stringify(result, null, 2));

    res.json({
      scam_score: result.scam_score,
      analysis_summary: result.analysis_summary,
    });
  } catch (err) {
    console.error("Error during text analysis:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});


app.post("/analyze-url", async (req, res) => {
  const { url } = req.body;

  if (!url) return res.status(400).json({ error: "No URL provided" });

  try {
    // Basic Playwright check to validate URL works
    const browser = await chromium.launch({ headless: true });
    const page = await browser.newPage();
    await page.goto(url, { timeout: 60000 });
    await browser.close();

    // Call Python with URL as command-line argument
    const py = spawn("python", ["main.py", url], {
      cwd: path.join(__dirname, "../src") // Make sure Python runs from /src
    });

    let output = "";

    py.stdout.on("data", (data) => {
      output += data.toString();
    });

    py.stderr.on("data", (data) => {
      console.error("Python error:", data.toString());
    });

    py.on("close", () => {
      console.log("Python output:", output);
      try {
        const result = JSON.parse(output);
        console.log("Parsed result:", result);
        if (!result.scam_score) {
          return res.status(400).json({ error: "No scam_score in response", raw: result });
        }
        res.json(result);
      } catch (e) {
        console.error("JSON parse error:", e);
        res.status(500).json({ error: "Invalid JSON from Python", details: output });
      }
    });
  } catch (e) {
    res.status(500).json({ error: e.toString() });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(3000, () => console.log(`Server running on http://localhost:${PORT}`));
