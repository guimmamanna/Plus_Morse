# Pulse Morse - Advanced Morse Code Platform

> A feature-rich, modern Morse code converter and learning platform with 16+ unique features

[![Live Demo](https://img.shields.io/badge/demo-live-brightgreen)](https://plus-morse.onrender.com/)
[![Python](https://img.shields.io/badge/python-3.9+-blue.svg)](https://www.python.org/downloads/)
[![Flask](https://img.shields.io/badge/flask-3.0.2-lightgrey.svg)](https://flask.palletsprojects.com/)

## Overview

Pulse Morse goes beyond traditional Morse code converters by offering a comprehensive learning and communication toolkit. With interactive features, practice modes, and advanced customization, it's perfect for beginners learning Morse code and enthusiasts looking for a powerful tool.

**Live Demo:** [https://plus-morse.onrender.com/](https://plus-morse.onrender.com/)

## Features

### Core Conversion

- **Text to Morse** - Convert any text to Morse code instantly
- **Morse to Text** - Decode Morse code back to readable text
- **Real-time Mode** - Convert as you type with live updates
- **Smart Character Handling** - Supports letters, numbers, and punctuation

### Audio & Playback

- **Audio Playback** - Listen to Morse code with Web Audio API
- **Adjustable Speed** - Control WPM (Words Per Minute) from 8-24
- **Sound Customization** - Choose frequency (400-1200 Hz) and waveform type (sine, square, triangle, sawtooth)
- **Download Audio** - Export Morse code as WAV file for offline use
- **Visual Signal** - Animated flashlight effect synchronized with audio
- **Morse Animation** - Real-time animated dots and dashes during playback

### Interactive Learning

- **Interactive Tap Input** - Create Morse code using spacebar or mouse (like a telegraph key)
- **Practice Mode** - Interactive quiz to learn Morse code
  - Score tracking and streak counter
  - Reverse mode (decode Morse → Letter)
  - Adaptive difficulty
- **Statistics Dashboard** - Track your learning progress
  - Total conversions
  - Characters converted
  - Practice questions attempted
  - Accuracy percentage

### Productivity Features

- **Favorites System** - Save frequently used messages
  - Export favorites as JSON
  - Import favorites from backup
- **Conversion History** - Automatically tracks last 20 conversions
- **Keyboard Shortcuts** - Power user productivity
  - `Ctrl + Enter` - Convert
  - `Ctrl + K` - Clear
  - `Ctrl + P` - Play audio
  - `Ctrl + S` - Save favorite
  - `Ctrl + H` - Toggle history
  - `Esc` - Stop audio / Close modals
- **URL Sharing** - Share encoded messages via shareable links
- **Copy to Clipboard** - One-click copy of Morse output

### UI/UX

- **Dark/Light Theme** - Auto-detect system preference with manual toggle
- **Responsive Design** - Works on desktop, tablet, and mobile
- **Modern UI** - Glassmorphic design with smooth animations
- **SOS Quick Button** - Emergency SOS signal with one click
- **Status Feedback** - Real-time color-coded status updates

## Tech Stack

- **Backend:** Flask (Python 3.9+)
- **Frontend:** Vanilla JavaScript, HTML5, CSS3
- **Audio:** Web Audio API
- **Storage:** LocalStorage for persistence
- **Fonts:** Google Fonts (Orbitron, Space Grotesk)

## Project Structure

```text
Plus_Morse/
├── app.py                    # Flask entry point
├── app/
│   ├── __init__.py          # App factory and routes
│   ├── templates/
│   │   └── index.html       # Main UI structure
│   └── static/
│       ├── script.js        # Core logic & features
│       └── style.css        # Styling & animations
├── requirements.txt          # Python dependencies
├── vercel.json              # Vercel deployment config
└── README.md                # This file
```

## Installation & Setup

### Prerequisites

- Python 3.9 or higher
- pip (Python package manager)

### Local Development

1. **Clone the repository**

```bash
git clone https://github.com/yourusername/Plus_Morse.git
cd Plus_Morse
```

2. **Create virtual environment**

```bash
python3 -m venv .venv
source .venv/bin/activate  # On Windows: .venv\Scripts\activate
```

3. **Install dependencies**

```bash
pip install -r requirements.txt
```

4. **Run the application**

```bash
python app.py
```

5. **Open in browser**

```text
http://127.0.0.1:5000
```

## Usage Guide

### Basic Conversion

1. Enter text in the "Text input" field
2. Click "Convert" or press `Ctrl + Enter`
3. Morse code appears in "Morse output"
4. Click "Copy Morse" to copy to clipboard

### Interactive Tap Input

1. Scroll to "Interactive Input" section
2. Click or hold spacebar:
   - Quick tap = DOT (•)
   - Hold = DASH (—)
3. Watch real-time decoding

### Practice Mode

1. Click "Practice Mode" button
2. Answer questions to learn Morse code
3. Toggle "Reverse Mode" for Morse → Letter practice
4. Track your score and streak

### Sound Customization

1. Adjust "Frequency" slider (400-1200 Hz)
2. Select waveform type (Sine, Square, Triangle, Sawtooth)
3. Click "Play Morse output" to hear custom sound

### Keyboard Shortcuts

Press `⌨️ Shortcuts` button to view all available shortcuts.

## Features in Detail

### Audio Download

Export your Morse code as a WAV file:

- Uses OfflineAudioContext for rendering
- Applies custom frequency and waveform settings
- Perfect for presentations, videos, or offline practice

### Statistics Tracking

All stats are stored locally and persist across sessions:

- Conversions and characters are tracked automatically
- Practice mode updates accuracy in real-time
- Reset anytime from the stats panel

### Favorites Management

- Save unlimited favorites with text and Morse
- Export as JSON for backup
- Import to restore or share across devices
- Each favorite includes timestamp

### History System

- Automatically saves last 20 conversions
- Timestamps for each entry
- Quick load functionality
- Clear all option

## Browser Support

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Opera 76+

Web Audio API and modern JavaScript features required.

## Contributing

Contributions are welcome! Here's how:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

MIT License - feel free to use this project for learning or commercial purposes.

## Acknowledgments

- Morse code reference: [International Morse Code](https://en.wikipedia.org/wiki/Morse_code)
- Design inspiration: Modern glassmorphic UI trends
- Toggle switch component from [Uiverse.io](https://uiverse.io/)

## Support

Found a bug or have a feature request? [Open an issue](https://github.com/yourusername/Plus_Morse/issues)

---

Built with ❤️ by MGC237

Live Demo: [https://plus-morse.onrender.com/](https://plus-morse.onrender.com/)
