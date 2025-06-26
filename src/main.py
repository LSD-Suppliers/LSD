# main.py
import asyncio
import json
import sys
from model_proc import run_model_pipeline

async def main():
    try:
        input_data = sys.stdin.read()
        profile_input = json.loads(input_data)
        url = profile_input.get("url")
        if not url:
            print(json.dumps({"status": "error", "message": "No URL provided"}))
            return

        result = await run_model_pipeline(url)
        print(json.dumps(result))  # Final JSON output only
    except Exception as e:
        print(json.dumps({"status": "error", "message": str(e)}))

if __name__ == "__main__":
    asyncio.run(main())
