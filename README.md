# MGC237 - Text to Morse Code Converter

A clean, responsive text-to-Morse converter built with plain HTML, CSS, and JavaScript. The UI is designed for GitHub Pages hosting and focuses on clarity, accessibility, and separation of concerns.

## Live usage

Open `index.html` locally or deploy to GitHub Pages.

## Features

- Text to Morse conversion with punctuation support
- Friendly status feedback for unsupported characters
- Copy-to-clipboard action
- Quick reference grid for Morse symbols
- Responsive layout for mobile and desktop

## Project structure

- `index.html` - UI structure and semantic markup
- `style.css` - visual design and layout
- `script.js` - conversion logic and UI behavior

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
open index.html
```

## Deploy to GitHub Pages

1. Push this folder to a GitHub repo.
2. Go to Settings → Pages.
3. Select the `main` branch and `/root` folder.
4. Save and open the provided URL.

## Possible extensions

- Add Morse-to-text decoding
- Add audio playback for dots and dashes
- Add theme toggles and saved preferences

---

Built for clear UI, simple logic, and easy hosting.
