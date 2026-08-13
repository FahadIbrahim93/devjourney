# 🎨 Visual Content Generation with Hermes Agent

A skill for generating images, banners, and visual assets using AI models available through your existing API keys. No additional setup required.

## Available Backends (All Already Configured)

| Backend | Model | Key Needed | Cost |
|---------|-------|-----------|------|
| **Gemini API** | gemini-2.5-flash-image (Nano Banana) | `GEMINI_API_KEY` ✅ | Free tier (~500/day) |
| **xAI Grok** | grok-imagine | `XAI_API_KEY` ✅ | Pay-per-use |
| **OpenRouter** | google/nano-banana (via OpenRouter) | `OPENROUTER_API_KEY` ✅ | Pay-per-use |
| **FAL.ai** | FLUX.2 / SDXL | `FAL_KEY` ❌ (needed) | From $0.0006/img |

## Quick Test (Gemini)

```bash
# Generate an image using Gemini's built-in image model
# This uses the same GEMINI_API_KEY already in your .env
curl -s -X POST "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-image:generateContent?key=$GEMINI_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{"contents":[{"parts":[{"text":"Describe the image you want in detail"}]}]}'
```

## Enabling FAL.ai (For Hermes `image_generate` Tool)

1. Go to https://fal.ai and create account
2. Copy your FAL_KEY from dashboard
3. Add to your .env: `FAL_KEY=fal-xxxxxxxxx`
4. Restart Hermes — the `image_generate` tool will work

## Design Tool MCPs

- **Figma MCP**: Via Composio — enables Hermes to read/write Figma files
- **Spline**: 3D design API available for product mockups

## Use Cases

- Generate social media banners for all platforms
- Create LinkedIn/X profile headers
- Design product mockups for Marjahans/SnapTrap
- Generate chart illustrations for crypto analysis posts
- Create visual content for newsletter/blog
