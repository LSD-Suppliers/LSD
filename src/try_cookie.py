import asyncio
import os
import json
from scraper import scrape_profile 

async def try_all_cookies(profile_url):
    cookie_dir = "cookies"
    cookie_files = sorted(f for f in os.listdir(cookie_dir) if f.endswith(".json"))

    for cookie_file in cookie_files:
        with open(os.path.join(cookie_dir, cookie_file), "r") as f:
            cookies = json.load(f)

        try:
            print(f"Trying with {cookie_file}...")
            # type : ignore
            profile_data = await scrape_profile(profile_url, cookies)
            
            # Check if we're really logged in (not redirected or blocked)
            if profile_data.get("name"):  # or some other legit field
                return {"status": "success", "data": profile_data}

        except Exception as e:
            print(f"{cookie_file} failed:", str(e))
            continue

    return {"status": "error", "message": "All cookie sessions failed. Try again later."}

if __name__ == "__main__":
    test_url = "https://www.linkedin.com/in/hyplona/"
    result = asyncio.run(try_all_cookies(test_url))
    print(result)
