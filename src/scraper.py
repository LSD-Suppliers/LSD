import asyncio
from playwright.async_api import async_playwright
import json

async def scrape_profile(profile_url):
    async with async_playwright() as p:
        browser = await p.chromium.launch(headless=True)
        context = await browser.new_context()

        # Load cookies
        with open('cookies.json', 'r') as f:
            cookies = json.load(f)
        await context.add_cookies(cookies)

        page = await context.new_page()
        await page.goto(profile_url)

        await page.wait_for_selector('section.pv-top-card')

        # Extract details
        name = await page.locator('h1.text-heading-xlarge').inner_text()
        headline = await page.locator('div.text-body-medium.break-words').inner_text()
        connections_text = await page.locator('li span.t-bold').nth(1).inner_text()
        connections = int(connections_text.split()[0].replace('+', '').replace(',', ''))

        # Placeholder check (real detection may need heuristics or LinkedIn API)
        is_verified = 1 if 'verified' in headline.lower() else 0

        # Extract company name
        company = await page.locator('div.pv-text-details__right-panel a').first.inner_text()

        # Extract bio/about
        try:
            await page.click('button[aria-label="More about this profile"]')
            await page.wait_for_selector('section.pv-about-section')
            about = await page.locator('section.pv-about-section p').inner_text()
        except:
            about = ""

        await browser.close()

        return {
            "name": name,
            "headline": headline,
            "company": company,
            "connections": connections,
            "verified": is_verified,
            "about": about
        }

# Test
if __name__ == "__main__":
    profile = asyncio.run(scrape_profile("https://www.linkedin.com/in/sampleprofile"))
    print(profile)
