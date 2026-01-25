const MORSE_MAP = {
  A: ".-",
  B: "-...",
  C: "-.-.",
  D: "-..",
  E: ".",
  F: "..-.",
  G: "--.",
  H: "....",
  I: "..",
  J: ".---",
  K: "-.-",
  L: ".-..",
  M: "--",
  N: "-.",
  O: "---",
  P: ".--.",
  Q: "--.-",
  R: ".-.",
  S: "...",
  T: "-",
  U: "..-",
  V: "...-",
  W: ".--",
  X: "-..-",
  Y: "-.--",
  Z: "--..",
  0: "-----",
  1: ".----",
  2: "..---",
  3: "...--",
  4: "....-",
  5: ".....",
  6: "-....",
  7: "--...",
  8: "---..",
  9: "----.",
  ".": ".-.-.-",
  ",": "--..--",
  "?": "..--..",
  "!": "-.-.--",
  "/": "-..-.",
  "(": "-.--.",
  ")": "-.--.-",
  "&": ".-...",
  ":": "---...",
  ";": "-.-.-.",
  "=": "-...-",
  "+": ".-.-.",
  "-": "-....-",
  "_": "..--.-",
  "\"": ".-..-.",
  "$": "...-..-",
  "@": ".--.-."
};

const textInput = document.getElementById("text-input");
const morseOutput = document.getElementById("morse-output");
const status = document.getElementById("status");
const convertBtn = document.getElementById("convert-btn");
const clearBtn = document.getElementById("clear-btn");
const copyBtn = document.getElementById("copy-btn");
const legendGrid = document.getElementById("legend-grid");
const morseInput = document.getElementById("morse-input");
const textOutput = document.getElementById("text-output");
const decodeStatus = document.getElementById("decode-status");
const decodeBtn = document.getElementById("decode-btn");
const clearDecodeBtn = document.getElementById("clear-decode-btn");
const playOutputBtn = document.getElementById("play-output-btn");
const playInputBtn = document.getElementById("play-input-btn");
const stopAudioBtn = document.getElementById("stop-audio-btn");
const speedRange = document.getElementById("speed-range");
const speedValue = document.getElementById("speed-value");
const themeToggle = document.getElementById("theme-toggle");

const MORSE_REVERSE = Object.entries(MORSE_MAP).reduce((acc, [key, value]) => {
  acc[value] = key;
  return acc;
}, {});

const applyTheme = (mode) => {
  const isDark = mode === "dark";
  document.body.classList.toggle("theme-dark", isDark);
  themeToggle.setAttribute("aria-pressed", String(isDark));
};

const storedTheme = localStorage.getItem("theme");
const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
applyTheme(storedTheme || (prefersDark ? "dark" : "light"));

const buildLegend = () => {
  const entries = Object.entries(MORSE_MAP);
  const fragment = document.createDocumentFragment();

  entries.forEach(([key, value]) => {
    const item = document.createElement("div");
    item.className = "legend-item";

    const label = document.createElement("strong");
    label.textContent = key;

    const code = document.createElement("span");
    code.textContent = value;

    item.append(label, code);
    fragment.appendChild(item);
  });

  legendGrid.appendChild(fragment);
};

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

const setStatus = (message, tone = "neutral") => {
  status.textContent = message;
  status.dataset.tone = tone;
};

const setDecodeStatus = (message, tone = "neutral") => {
  decodeStatus.textContent = message;
  decodeStatus.dataset.tone = tone;
};

const handleConvert = () => {
  const input = textInput.value.trim();
  if (!input) {
    morseOutput.value = "";
    setStatus("Add text to convert.", "warn");
    return;
  }

  const { result, skipped } = toMorse(input);
  morseOutput.value = result;

  if (skipped.length) {
    const unique = Array.from(new Set(skipped)).join(", ");
    setStatus(`Skipped unsupported: ${unique}`, "warn");
  } else {
    setStatus("Converted successfully.", "good");
  }
};

const fromMorse = (input) => {
  const cleaned = input.trim();
  if (!cleaned) {
    return { result: "", skipped: [] };
  }

  const words = cleaned.split(/\s*\/\s*/);
  const decodedWords = [];
  const skipped = [];

  for (const word of words) {
    if (!word.trim()) {
      continue;
    }
    const letters = word.trim().split(/\s+/);
    const decodedLetters = letters.map((code) => {
      if (MORSE_REVERSE[code]) {
        return MORSE_REVERSE[code];
      }
      skipped.push(code);
      return "";
    });
    decodedWords.push(decodedLetters.join(""));
  }

  return { result: decodedWords.join(" "), skipped };
};

const handleDecode = () => {
  const input = morseInput.value.trim();
  if (!input) {
    textOutput.value = "";
    setDecodeStatus("Add Morse to decode.", "warn");
    return;
  }

  const { result, skipped } = fromMorse(input);
  textOutput.value = result;

  if (skipped.length) {
    const unique = Array.from(new Set(skipped)).join(", ");
    setDecodeStatus(`Skipped unknown codes: ${unique}`, "warn");
  } else {
    setDecodeStatus("Decoded successfully.", "good");
  }
};

const handleClear = () => {
  textInput.value = "";
  morseOutput.value = "";
  setStatus("Ready.");
  textInput.focus();
};

const handleClearDecode = () => {
  morseInput.value = "";
  textOutput.value = "";
  setDecodeStatus("Waiting for Morse.");
  morseInput.focus();
};

const handleCopy = async () => {
  if (!morseOutput.value) {
    setStatus("Nothing to copy yet.", "warn");
    return;
  }

  try {
    await navigator.clipboard.writeText(morseOutput.value);
    setStatus("Morse copied to clipboard.", "good");
  } catch (error) {
    setStatus("Clipboard permission blocked.", "warn");
  }
};

let audioContext = null;
let activeOscillators = [];

const stopAudio = () => {
  activeOscillators.forEach((oscillator) => {
    try {
      oscillator.stop();
    } catch (error) {
      // No-op if already stopped.
    }
  });
  activeOscillators = [];
  if (audioContext) {
    audioContext.close();
    audioContext = null;
  }
};

const playMorse = (morseString) => {
  const cleaned = morseString.trim();
  if (!cleaned) {
    setStatus("Nothing to play yet.", "warn");
    return;
  }

  stopAudio();
  audioContext = new AudioContext();

  const wpm = Number(speedRange.value);
  const unit = 1.2 / wpm;
  const frequency = 700;
  let time = audioContext.currentTime;

  const playTone = (duration) => {
    const oscillator = audioContext.createOscillator();
    const gain = audioContext.createGain();
    oscillator.frequency.value = frequency;
    oscillator.type = "sine";
    gain.gain.setValueAtTime(0, time);
    gain.gain.linearRampToValueAtTime(0.5, time + 0.01);
    gain.gain.setValueAtTime(0.5, time + duration - 0.02);
    gain.gain.linearRampToValueAtTime(0, time + duration);
    oscillator.connect(gain).connect(audioContext.destination);
    oscillator.start(time);
    oscillator.stop(time + duration);
    activeOscillators.push(oscillator);
    time += duration;
  };

  const addGap = (duration) => {
    time += duration;
  };

  for (const symbol of cleaned) {
    if (symbol === ".") {
      playTone(unit);
      addGap(unit);
    } else if (symbol === "-") {
      playTone(unit * 3);
      addGap(unit);
    } else if (symbol === "/") {
      addGap(unit * 6);
    } else if (symbol === " ") {
      addGap(unit * 2);
    }
  }
};

convertBtn.addEventListener("click", handleConvert);
clearBtn.addEventListener("click", handleClear);
copyBtn.addEventListener("click", handleCopy);
decodeBtn.addEventListener("click", handleDecode);
clearDecodeBtn.addEventListener("click", handleClearDecode);
playOutputBtn.addEventListener("click", () => playMorse(morseOutput.value));
playInputBtn.addEventListener("click", () => playMorse(morseInput.value));
stopAudioBtn.addEventListener("click", stopAudio);
speedRange.addEventListener("input", () => {
  speedValue.textContent = speedRange.value;
});
themeToggle.addEventListener("click", () => {
  const nextTheme = document.body.classList.contains("theme-dark") ? "light" : "dark";
  localStorage.setItem("theme", nextTheme);
  applyTheme(nextTheme);
});

textInput.addEventListener("input", () => {
  if (!textInput.value.trim()) {
    morseOutput.value = "";
    setStatus("Ready.");
  }
});

morseInput.addEventListener("input", () => {
  if (!morseInput.value.trim()) {
    textOutput.value = "";
    setDecodeStatus("Waiting for Morse.");
  }
});

buildLegend();
