# MGC237 - Morse Code Web App

A futuristic Morse code converter built as a Flask web app with a modern, responsive UI.

Live demo: https://plus-morse.onrender.com/

## What it does

- Convert text to Morse (with punctuation support)
- Decode Morse back to text
- Play Morse audio with adjustable speed
- Copy output and get clear status feedback
- Toggle light/dark theme with a saved preference

## Tech stack

- Backend: Flask (Python)
- Frontend: HTML, CSS, JavaScript
- Audio: Web Audio API

## Project structure

- `app.py` - Flask entrypoint
- `app/__init__.py` - app factory and routes
- `app/templates/index.html` - UI structure
- `app/static/style.css` - styling and layout
- `app/static/script.js` - conversion logic and UI behavior

## How it works (short)

- Conversion is data-driven from a single Morse map.
- `toMorse()` and `fromMorse()` handle encoding/decoding only.
- The UI layer handles inputs, status updates, and audio playback.

## Run locally

```bash
python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
python app.py
```

Then open `http://127.0.0.1:5000`.

---
