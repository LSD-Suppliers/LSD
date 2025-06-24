import asyncio
from playwright.async_api import async_playwright
import json
import random

async def scrape_profile(profile_url, cookies):
    async with async_playwright() as p:
        browser = await p.chromium.launch(headless=False)
        context = await browser.new_context()

        await context.add_cookies(cookies)

        page = await context.new_page()
        await page.goto(profile_url)

         # Check if we're logged out or hit a captcha
        if "login" in page.url.lower() or "checkpoint" in page.url.lower():
            raise Exception("Cookie expired or blocked.")

        # Extract the name
        try:
           name = await page.locator("h1.text-heading-xlarge").inner_text()
        except:
            try:
                name_raw = await page.locator("div.artdeco-entity-lockup__title").first.text_content()
                name = name_raw.split("(")[0].strip() if name_raw else ""
            except:
                title = await page.title()
                name = title.split(" | ")[0].strip()

        # Extract the connections count
        try:
            conn_text = await page.locator("li.text-body-small span.t-bold").first.text_content()
            conn_text = conn_text.strip() if conn_text else ""
            connections = int(conn_text.replace(",", "").replace("+", "").strip())
        except:
            connections = 0

        # Check for verified profile
        try:
            badge = await page.locator('[aria-label*="Verified"]').first.get_attribute("aria-label")
            verified = "verified" in badge.lower()
        except:
            verified = False

        # Extract about me
        try:
            about = await page.locator("section.pv-about-section span").first.text_content()
            about = about.strip() if about else ""
        except:
            about = ""
        

        return {"name" : name, 
                "connections": connections, 
                "verified": verified, 
                "about": about, 
                "url": profile_url}
        
