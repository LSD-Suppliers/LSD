// index.js
const { spawn } = require("child_process");
const path = require("path");

function analyzeLinkedInProfile(url) {
  return new Promise((resolve, reject) => {
    const pyProcess = spawn("python", [path.join(__dirname, "main.py")]);

    let resultData = "";
    let errorData = "";

    pyProcess.stdout.on("data", (data) => {
      resultData += data.toString();
    });

    pyProcess.stderr.on("data", (data) => {
      errorData += data.toString();
    });

    pyProcess.on("close", (code) => {
      if (code !== 0 || errorData) {
        reject(errorData || `Python process exited with code ${code}`);
      } else {
        try {
          const parsed = JSON.parse(resultData);
          resolve(parsed);
        } catch (err) {
          reject(`Invalid JSON: ${err.message}`);
        }
      }
    });

    // Send profile URL via stdin
    pyProcess.stdin.write(JSON.stringify({ url }));
    pyProcess.stdin.end();
  });
}
