LinkedIn Scam Detonator
LinkedIn Scam Detonator is a proactive security tool designed to identify and flag potentially scam or suspicious activities on LinkedIn. With the rise in impersonation and scam attempts targeting job seekers and professionals, this platform helps verify account authenticity, assess shared links, evaluate message intent and allows users to report scammed accounts, offering users an added layer of trust and safety.

Problem Statement
LinkedIn, while being the leading professional networking platform, is increasingly being exploited by scammers and impersonators. Young professionals and job seekers are often approached by fake recruiters or malicious actors, with no concrete way to verify:

If a LinkedIn account is legitimate

If a shared URL is safe

If a received message carries malicious intent

Solution: LinkedIn Scam Detonator
This tool offers an end-to-end system for identifying and reporting suspicious LinkedIn activity by combining data scraping, machine learning, and trusted external APIs.

Key Features
Account Verification

Input a LinkedIn account profile URL

The system analyzes the profile's publicly available data and determines the scam likelihood using a supervised machine learning model

Text Message Analysis

Analyze unsolicited messages to detect suspicious or scam-related intent

Uses the ChatGPT API for sentiment and intent classification based on text patterns

Link Safety Check

Evaluate whether a shared link is safe or potentially harmful

Integration with the VirusTotal API for real-time URL scanning and threat reports


Scammer Reporting System

Users can report known scammers by submitting profile links and evidence

Reports are reviewed and moderated to prevent misuse

Tech Stack
Frontend : React.js, Tailwind CSS, JavaScript
Backend : Node.js, Express.js
Machine Learning : Python, CatBoost, XGBoost
Web Scraping : Selenium, BeautifulSoup
URL Analysis : VirusTotal API
Text Analysis : ChatGPT API
Version Control : Git & GitHub

How It Works (Workflow)
User Input: Account URL / Link / Message

Scraping Module: Collects profile data via automated scraping (Selenium + BS4)

ML Engine: Classifies trust score using trained XGBoost and CatBoost models

URL Check: Queries VirusTotal API for domain safety

Message Intent: ChatGPT API analyzes the tone and flags scam-like behavior

Report Submission: Optional step to submit a scam report for manual review

Future Enhancements
Browser extension for real-time LinkedIn browsing protection

Community moderation dashboard

Scammer database API for public consumption

Spam text summarizer for faster message reviews

Use Cases
Job seekers verifying recruiter authenticity

Users checking links shared via unsolicited DMs

Security teams running background checks before outreach

Reporting impersonators to warn others
