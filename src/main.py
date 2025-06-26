# src/main.py
import asyncio
import json
import sys
from model_proc import run_model_pipeline

async def main():
    try:
        # Read URL from command-line argument
        if len(sys.argv) < 2:
            print(json.dumps({"status": "error", "message": "No URL provided"}))
            return

        url = sys.argv[1]

        result = await run_model_pipeline(url)
        print(json.dumps(result))  # Output JSON
    except Exception as e:
        print(json.dumps({"status": "error", "message": str(e)}))

if __name__ == "__main__":
    asyncio.run(main())
