# MGC237 - Text to Morse Code Converter

A clean, responsive text-to-Morse converter built with plain HTML, CSS, and JavaScript. The UI is designed for GitHub Pages hosting and focuses on clarity, accessibility, and separation of concerns.

## Live usage

Run the Flask app locally or deploy it with a WSGI host.

## Features

- Text to Morse conversion with punctuation support
- Friendly status feedback for unsupported characters
- Copy-to-clipboard action
- Light/Dark theme toggle with saved preference
- Quick reference grid for Morse symbols
- Responsive layout for mobile and desktop

## Project structure

- `app.py` - Flask entrypoint
- `app/__init__.py` - app factory and routes
- `app/templates/index.html` - UI structure and semantic markup
- `app/static/style.css` - visual design and layout
- `app/static/script.js` - conversion logic and UI behavior
- `.env` - local dev settings (optional)

## How it works (with principles)

### 1) Separation of concerns

- Markup stays in `index.html`, styling in `style.css`, and logic in `script.js`.
- This keeps files focused and easier to maintain or extend.

### 2) Single responsibility and readability

- `toMorse()` converts text only. It does not touch the DOM.
- UI handlers (`handleConvert`, `handleCopy`, `handleClear`) focus on updating the interface.
- The logic is organized into small, named functions so each part is easy to follow.

### 3) Data-driven design

- The Morse alphabet is stored in one source of truth (`MORSE_MAP`).
- The quick reference grid is generated from the same map, so the UI always matches the converter.

### 4) Defensive programming

- Empty input shows a friendly message and prevents confusing output.
- Unsupported characters are skipped and reported so users know what happened.

### 5) Accessibility and usability

- Labels are attached to inputs for screen readers.
- Buttons are sized for touch usage and the layout adapts to small screens.
- Status messages provide feedback after actions.

### 6) Consistent UX

- Word boundaries use `/` to make output easy to read and copy.
- All conversion is uppercase internally for consistent mapping.

## Key logic (excerpt)

```js
const toMorse = (input) => {
  const upper = input.toUpperCase();
  const parts = [];
  const skipped = [];

  for (const char of upper) {
    if (char === " ") {
      parts.push("/");
      continue;
    }

    if (MORSE_MAP[char]) {
      parts.push(MORSE_MAP[char]);
    } else if (char.trim() !== "") {
      skipped.push(char);
    }
  }

  return { result: parts.join(" "), skipped };
};
```

## Run locally

```bash
python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
python app.py
```

Then open `http://127.0.0.1:5000`.

## Deploy

Use any Flask-compatible host (Render, Railway, Fly.io, etc.). For a simple setup, run it behind Gunicorn.

### Render

1. Push this repo to GitHub.
2. New Web Service → connect repo.
3. Build command: `pip install -r requirements.txt`
4. Start command: `gunicorn app:app`

### Railway

1. New Project → Deploy from GitHub.
2. Build command: `pip install -r requirements.txt`
3. Start command: `gunicorn app:app`

### Fly.io

1. Install `flyctl` and run `fly launch`.
2. Set the start command to `gunicorn app:app`.
3. Deploy with `fly deploy`.

### Heroku

1. Create an app: `heroku create`
2. Deploy: `git push heroku main`
3. Ensure the `Procfile` is present with `web: gunicorn app:app`.

## Possible extensions

- Add Morse-to-text decoding
- Add audio playback for dots and dashes
- Add theme presets beyond light/dark

---
