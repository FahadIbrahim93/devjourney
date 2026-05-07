import requests
resp = requests.post(
    "https://opencode.ai/zen/v1/chat/completions",
    headers={"Authorization": "Bearer sk-83OjII9v7mGzxUHV0QBHcUNAlZp4GXCdFdgC0QJuuyqbOMP4Lirk1goXmBG7DVm9", "Content-Type": "application/json"},
    json={"model": "nemotron-3-super-free", "messages": [{"role": "user", "content": "hi"}], "max_tokens": 10}
)
print(resp.status_code)
print(resp.text)