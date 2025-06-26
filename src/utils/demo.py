import asyncio
from scraper import scrape_profile
from model_proc import run_model_pipeline

async def test_cookie():
    profile_url = input("Enter LinkedIn profile URL: ")
    cookie_file = "cookies/cookie_b2.json"

    import json
    with open(cookie_file, 'r') as f:
        cookies = json.load(f)

    result = await run_model_pipeline(profile_url)
    print(result)

asyncio.run(test_cookie())
