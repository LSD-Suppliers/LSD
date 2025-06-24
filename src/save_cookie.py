import asyncio
from playwright.async_api import async_playwright
import json

async def save_cookies():
    async with async_playwright() as p:
        browser = await p.chromium.launch(headless=False)
        context = await browser.new_context()
        page = await context.new_page()

        print("Opening LinkedIn login page...")
        await page.goto("https://www.linkedin.com/login")
        print("Please log in manually within the browser window.")

        # Wait until user logs in (e.g. by checking for profile menu or home page)
        await page.wait_for_url("https://www.linkedin.com/feed/*", timeout=180000)  # wait max 3 min

        # Save cookies
        file = input("name of file : ")
        cookies = await context.cookies()
        with open(file, "w") as f:
            json.dump(cookies, f)

        print("Cookies saved to cookies.json.")
        await browser.close()

if __name__ == "__main__":
    asyncio.run(save_cookies())
