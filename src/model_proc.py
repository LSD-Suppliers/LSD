import asyncio
import joblib
import pandas as pd
import numpy as np
from scraper import try_all_cookies

# Loading trained model
model = joblib.load("model.joblib")

# Function to process profile data for model input
def process_profile(data: dict) -> list[float]:
    # 1. Binary: verified
    veri = 1.0 if data["verified"] else 0.0

    # 2. Binary: company link present
    jobpage = 1.0 if data["has_company_link"] else 0.0

    # 3. Normalized connection count (use 500 as cap for normalization)
    max_conn = 500
    conn = min(data["connections"], max_conn) / max_conn

    # 4. Completeness: about + edu + skills
    completeness_parts = [
        data["has_about"],
        data["has_education"],
        data["has_skills"]
    ]
    comp = sum(completeness_parts) / len(completeness_parts)

    return [veri, jobpage, conn, comp]

# Main function
async def run_model_pipeline(profile_url: str) -> dict:
    response = await try_all_cookies(profile_url)

    if response.get("status") != "success":
        return {"status": "fail", "reason": "Scraping failed"}

    raw_data = response["data"]
    features = process_profile(raw_data)
    features_df = pd.DataFrame([features], columns=["verification_status","company_url_present","connection_score","profile_completeness"])
    score = float(model.predict(features_df)[0])
    res = "Scam" if score > 0.60 else "Suspicious" if score > 0.40 else "Genuine"

    # Writing the summary
    name = raw_data.get("name", "This individual")
    verified = "verified" if raw_data.get("verified") else "unverified"
    connections = raw_data.get("connections", 0)
    company_linked = raw_data.get("has_company_link", False)

    company_status = ("has an associated company page, suggesting organizational affiliation" if company_linked else "does not appear to be affiliated with any verifiable company page")

    completeness_features = {
        "About section": raw_data.get("has_about", False),
        "education history": raw_data.get("has_education", False),
     "listed skills": raw_data.get("has_skills", False),
    }
    present_sections = [k for k, v in completeness_features.items() if v]
    missing_sections = [k for k, v in completeness_features.items() if not v]

    if present_sections:
        completeness_summary = (
            f"The profile includes {', '.join(present_sections)}, indicating some degree of completeness."
        )
    else:
        completeness_summary = "The profile lacks all key completeness indicators."

    # Final summary statement
    summary = (
        f"{name} operates a {verified} LinkedIn account with {connections} visible connections and {company_status}. "
        f"{completeness_summary} "
        f"Based on these signals and our model’s inference, this profile is assessed as **{res}** "
        f"with a scam likelihood score of {round(score * 100, 2)}%."
    )


    result = {
        "status": "success",
        "verdict": res,
        "scam_score": round(score*100, 2),
        **raw_data,
        "summary": summary
    }

    return result
