# LinkedIn Scam Detector (LSD)

LSD (LinkedIn Scam Detector) is a project that detects the likelihood of scams or fraudulent behavior on LinkedIn profiles.  
It integrates **machine learning**, **web scraping**, and **session management** into a backend-compatible engine.

---

## Features
- **Machine Learning Engine**: Trained using scikit-learn (Random Forest classifier) to classify LinkedIn profiles as scam or genuine.  
- **Data Preprocessing**: Cleans and structures scraped LinkedIn data for ML model input.  
- **Automated Scraping**: Uses Playwright to fetch structured profile information while handling LinkedIn’s dynamic content.  
- **Cookie/Session Management**: Generates and manages authenticated cookies for scraping.  
- **Model Persistence & Evaluation**: Models are saved with `joblib` and evaluated with metrics like `r2_score`.  
- **Backend Integration**: Outputs predictions in JSON format, consumed by a Node.js backend via `child_process.spawn`.  

---

## Tech Stack
- **Python**: Core logic, ML pipeline, and scraping automation.  
- **scikit-learn**: Random Forest for prediction and model evaluation.  
- **pandas**: Data preprocessing and analysis.  
- **joblib**: Model persistence.  
- **Playwright (Python)**: LinkedIn scraping.  
- **Node.js**: Backend service communicating with the Python engine.  
- **JavaScript (Frontend)**: For the website interface (built by collaborators).  

---

---

## Usage
1. Generate cookies for LinkedIn login and place them in `cookies/`.  
2. Run the scraper to fetch data from a target profile.  
3. Preprocess and feed the data into the ML engine.  
4. Backend consumes the JSON output for integration with the frontend.  

---

## Authors
- **ML and Scraping**: Snow Sadh 
- **Website and Extension Development**: Sneha Jha 

---
