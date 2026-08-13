#!/usr/bin/env python3
"""
Free AI Image Generator — Uses Gemini API (FREE, ~500 images/day)
No setup needed. Uses your existing GEMINI_API_KEY from .env
"""

import requests, json, os, base64, sys
from pathlib import Path

# Load GEMINI_API_KEY from .env
env_path = Path("H:/DevJourney/.env")
if env_path.exists():
    for line in env_path.read_text().splitlines():
        if line.startswith("GEMINI_API_KEY="):
            API_KEY = line.split("=", 1)[1].strip()
            break
else:
    API_KEY = os.getenv("GEMINI_API_KEY")

if not API_KEY:
    print("❌ GEMINI_API_KEY not found. Add it to .env or set as environment variable.")
    sys.exit(1)

def generate_image(prompt, output_path="output.png"):
    """Generate an image using Gemini API (FREE)."""
    url = f"https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-image:generateContent?key={API_KEY}"
    
    payload = {
        "contents": [{
            "parts": [{"text": prompt}]
        }],
        "generationConfig": {
            "temperature": 1,
            "candidateCount": 1
        }
    }
    
    print(f"🎨 Generating: {prompt[:60]}...")
    response = requests.post(url, json=payload)
    
    if response.status_code == 429:
        print("⏳ Rate limited. Waiting 15 seconds...")
        import time
        time.sleep(15)
        response = requests.post(url, json=payload)
    
    if response.status_code == 200:
        data = response.json()
        # Extract image data from response
        candidates = data.get("candidates", [])
        if candidates:
            parts = candidates[0].get("content", {}).get("parts", [])
            for part in parts:
                if "inlineData" in part:
                    img_data = base64.b64decode(part["inlineData"]["data"])
                    Path(output_path).write_bytes(img_data)
                    print(f"✅ Image saved: {output_path}")
                    return output_path
        print("⚠️  No image data in response. Full response:")
        print(json.dumps(data, indent=2)[:500])
    else:
        print(f"❌ Error {response.status_code}: {response.text[:300]}")
    return None

if __name__ == "__main__":
    prompt = sys.argv[1] if len(sys.argv) > 1 else "A dark navy banner with gold text 'Hope Theory', professional minimal design"
    output = sys.argv[2] if len(sys.argv) > 2 else "hopetheory_banner.png"
    generate_image(prompt, output)
