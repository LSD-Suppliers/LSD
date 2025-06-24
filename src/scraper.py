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
        
        # Scroll slowly in steps to trigger all lazy loads
        for _ in range(5):
            await page.mouse.wheel(0, 1000)
            await page.wait_for_timeout(500)  # wait between scrolls
        await page.wait_for_timeout(1000)

        # Dump the HTML for debugging
        '''
        html = await page.content()
        with open("randomdude.html", "w", encoding="utf-8") as f:
            f.write(html)
            return {"name" : "whayo"}
        '''  

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
            tooltip_text = await page.locator("div.artdeco-hoverable-content__content").first.text_content()
            verified = "verification" in tooltip_text.lower()
        except:
            verified = False

        # Check for company page link
        try:
            has_company_link = await page.locator("a[data-field='experience_company_logo'][href*='linkedin.com/company/']").count() > 0
        except:
            has_company_link = False

        # Check for profile completeness - education and skills sections
        try:
            await page.mouse.wheel(0, 3000)
            await page.wait_for_timeout(1000)
            has_education = await page.locator("li:has(span.t-bold):has-text('University')").count() > 0
            if not has_education:
                has_education = await page.locator("section:has(h2:has-text('Education')) li").count() > 0
        except:
            has_education = False

        try:
            await page.mouse.wheel(0, 3000)
            await page.wait_for_timeout(1000)
            has_skills = await page.locator("section:has(h2:has-text('Skills')) li").count() > 0
        except:
            has_skills = False


        # Extract about me
        try:
            await page.mouse.wheel(0, 3000)
            await page.wait_for_timeout(1000)

            about_raw = await page.locator("div[style*='-webkit-line-clamp'] span[aria-hidden='true']").first.text_content()
            about = about_raw.strip() if about_raw else ""
        except:
            about = ""

        # Return the scraped data
        return {"name" : name, 
                "connections": connections, 
                "verified": verified,
                "has_company_link": has_company_link, 
                "has_education": has_education,
                "has_skills": has_skills,
                "about": about,
                "url": profile_url}
        
