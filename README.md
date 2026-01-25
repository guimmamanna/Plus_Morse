# MGC237 - Morse Code Web App

A Flask-powered web app that converts text to Morse, decodes Morse back to text, and plays audio signals. The UI is a responsive frontend built with HTML, CSS, and JavaScript, served by a lightweight Python backend.

## Live usage

Run the Flask app locally or view it live at https://plus-morse.onrender.com/.

## Features

- Text to Morse conversion with punctuation support
- Morse to text decoding
- Audio playback with adjustable speed
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

- Flask serves the UI while conversion logic remains in client-side JavaScript.
- Markup stays in `index.html`, styling in `style.css`, and logic in `script.js`.
- This keeps files focused and easier to maintain or extend.

### 2) Single responsibility and readability

- `toMorse()` converts text only. `fromMorse()` decodes only. Neither touches the DOM.
- UI handlers (`handleConvert`, `handleDecode`, `handleCopy`, `handleClear`) focus on updating the interface.
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

---
