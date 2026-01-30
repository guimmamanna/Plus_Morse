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
const saveFavoriteBtn = document.getElementById("save-favorite-btn");
const shareBtn = document.getElementById("share-btn");
const realtimeToggle = document.getElementById("realtime-toggle");
const downloadAudioBtn = document.getElementById("download-audio-btn");
const visualSignal = document.getElementById("visual-signal");
const tapZone = document.getElementById("tap-zone");
const tapOutput = document.getElementById("tap-output");
const tapStatus = document.getElementById("tap-status");
const tapClearBtn = document.getElementById("tap-clear-btn");
const sosBtn = document.getElementById("sos-btn");
const favoritesPanel = document.getElementById("favorites-panel");
const favoritesList = document.getElementById("favorites-list");
const showFavoritesBtn = document.getElementById("show-favorites-btn");
const clearFavoritesBtn = document.getElementById("clear-favorites-btn");
const practicePanel = document.getElementById("practice-panel");
const showPracticeBtn = document.getElementById("show-practice-btn");
const practiceLetter = document.getElementById("practice-letter");
const practiceInput = document.getElementById("practice-input");
const practiceSubmitBtn = document.getElementById("practice-submit-btn");
const practiceSkipBtn = document.getElementById("practice-skip-btn");
const practiceFeedback = document.getElementById("practice-feedback");
const practiceScore = document.getElementById("practice-score");
const practiceStreak = document.getElementById("practice-streak");
const reversePracticeToggle = document.getElementById("reverse-practice-toggle");
const practiceQuestionText = document.getElementById("practice-question-text");
const frequencyRange = document.getElementById("frequency-range");
const frequencyValue = document.getElementById("frequency-value");
const waveformSelect = document.getElementById("waveform-select");
const morseAnimation = document.getElementById("morse-animation");
const historyPanel = document.getElementById("history-panel");
const historyList = document.getElementById("history-list");
const showHistoryBtn = document.getElementById("show-history-btn");
const clearHistoryBtn = document.getElementById("clear-history-btn");
const statsPanel = document.getElementById("stats-panel");
const showStatsBtn = document.getElementById("show-stats-btn");
const resetStatsBtn = document.getElementById("reset-stats-btn");
const statConversions = document.getElementById("stat-conversions");
const statCharacters = document.getElementById("stat-characters");
const statPractice = document.getElementById("stat-practice");
const statAccuracy = document.getElementById("stat-accuracy");
const shortcutsModal = document.getElementById("shortcuts-modal");
const showShortcutsBtn = document.getElementById("show-shortcuts-btn");
const closeShortcutsBtn = document.getElementById("close-shortcuts-btn");
const exportFavoritesBtn = document.getElementById("export-favorites-btn");
const importFavoritesBtn = document.getElementById("import-favorites-btn");
const importFileInput = document.getElementById("import-file-input");

const MORSE_REVERSE = Object.entries(MORSE_MAP).reduce((acc, [key, value]) => {
  acc[value] = key;
  return acc;
}, {});

const applyTheme = (mode) => {
  const isDark = mode === "dark";
  document.body.classList.toggle("theme-dark", isDark);
  themeToggle.checked = isDark;
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

const playMorse = (morseString, reportStatus) => {
  const cleaned = morseString.trim();
  if (!cleaned) {
    if (reportStatus) {
      reportStatus("Nothing to play.", "warn");
    }
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
playOutputBtn.addEventListener("click", () => playMorse(morseOutput.value, setStatus));
playInputBtn.addEventListener("click", () => playMorse(morseInput.value, setDecodeStatus));
stopAudioBtn.addEventListener("click", stopAudio);
speedRange.addEventListener("input", () => {
  speedValue.textContent = speedRange.value;
});

frequencyRange.addEventListener("input", () => {
  frequencyValue.textContent = frequencyRange.value;
});
themeToggle.addEventListener("change", () => {
  const nextTheme = themeToggle.checked ? "dark" : "light";
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

// ============ REAL-TIME CONVERSION ============
realtimeToggle.addEventListener("change", () => {
  if (realtimeToggle.checked) {
    textInput.addEventListener("input", handleConvert);
  } else {
    textInput.removeEventListener("input", handleConvert);
  }
});

// ============ VISUAL SIGNAL ANIMATION ============
const flashVisualSignal = (duration) => {
  visualSignal.classList.add("flashing");
  setTimeout(() => visualSignal.classList.remove("flashing"), duration);
};

const animateMorseSymbol = (symbol, duration) => {
  const symbolEl = document.createElement("div");
  symbolEl.className = "morse-symbol";
  symbolEl.textContent = symbol === "." ? "•" : "—";
  morseAnimation.appendChild(symbolEl);

  setTimeout(() => {
    symbolEl.classList.add("active");
  }, 10);

  setTimeout(() => {
    symbolEl.classList.remove("active");
    setTimeout(() => symbolEl.remove(), 300);
  }, duration);
};

const playMorseWithVisual = (morseString, reportStatus) => {
  const cleaned = morseString.trim();
  if (!cleaned) {
    if (reportStatus) reportStatus("Nothing to play.", "warn");
    return;
  }

  stopAudio();
  morseAnimation.innerHTML = "";
  audioContext = new AudioContext();

  const wpm = Number(speedRange.value);
  const unit = 1.2 / wpm;
  const frequency = Number(frequencyRange.value);
  const waveform = waveformSelect.value;
  let time = audioContext.currentTime;

  const playTone = (duration, symbol) => {
    const oscillator = audioContext.createOscillator();
    const gain = audioContext.createGain();
    oscillator.frequency.value = frequency;
    oscillator.type = waveform;
    gain.gain.setValueAtTime(0, time);
    gain.gain.linearRampToValueAtTime(0.5, time + 0.01);
    gain.gain.setValueAtTime(0.5, time + duration - 0.02);
    gain.gain.linearRampToValueAtTime(0, time + duration);
    oscillator.connect(gain).connect(audioContext.destination);
    oscillator.start(time);
    oscillator.stop(time + duration);
    activeOscillators.push(oscillator);

    // Visual flash and animation sync
    const delay = (time - audioContext.currentTime) * 1000;
    setTimeout(() => {
      flashVisualSignal(duration * 1000);
      animateMorseSymbol(symbol, duration * 1000);
    }, delay);

    time += duration;
  };

  const addGap = (duration) => {
    time += duration;
  };

  for (const symbol of cleaned) {
    if (symbol === ".") {
      playTone(unit, ".");
      addGap(unit);
    } else if (symbol === "-") {
      playTone(unit * 3, "-");
      addGap(unit);
    } else if (symbol === "/") {
      addGap(unit * 6);
    } else if (symbol === " ") {
      addGap(unit * 2);
    }
  }
};

playOutputBtn.removeEventListener("click", () => playMorse(morseOutput.value, setStatus));
playInputBtn.removeEventListener("click", () => playMorse(morseInput.value, setDecodeStatus));
playOutputBtn.addEventListener("click", () => playMorseWithVisual(morseOutput.value, setStatus));
playInputBtn.addEventListener("click", () => playMorseWithVisual(morseInput.value, setDecodeStatus));

// ============ DOWNLOAD AUDIO ============
const downloadMorseAudio = () => {
  const morseString = morseOutput.value.trim();
  if (!morseString) {
    setStatus("No Morse code to download.", "warn");
    return;
  }

  const offlineContext = new OfflineAudioContext(1, 44100 * 30, 44100);
  const wpm = Number(speedRange.value);
  const unit = 1.2 / wpm;
  const frequency = Number(frequencyRange.value);
  const waveform = waveformSelect.value;
  let time = 0;

  const playTone = (duration) => {
    const oscillator = offlineContext.createOscillator();
    const gain = offlineContext.createGain();
    oscillator.frequency.value = frequency;
    oscillator.type = waveform;
    gain.gain.setValueAtTime(0, time);
    gain.gain.linearRampToValueAtTime(0.5, time + 0.01);
    gain.gain.setValueAtTime(0.5, time + duration - 0.02);
    gain.gain.linearRampToValueAtTime(0, time + duration);
    oscillator.connect(gain).connect(offlineContext.destination);
    oscillator.start(time);
    oscillator.stop(time + duration);
    time += duration;
  };

  const addGap = (duration) => {
    time += duration;
  };

  for (const symbol of morseString) {
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

  offlineContext.startRendering().then((buffer) => {
    const wav = audioBufferToWav(buffer);
    const blob = new Blob([wav], { type: "audio/wav" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "morse-code.wav";
    a.click();
    URL.revokeObjectURL(url);
    setStatus("Audio downloaded successfully.", "good");
  });
};

const audioBufferToWav = (buffer) => {
  const length = buffer.length * buffer.numberOfChannels * 2 + 44;
  const arrayBuffer = new ArrayBuffer(length);
  const view = new DataView(arrayBuffer);
  const channels = [];
  let offset = 0;
  let pos = 0;

  const setUint16 = (data) => {
    view.setUint16(pos, data, true);
    pos += 2;
  };

  const setUint32 = (data) => {
    view.setUint32(pos, data, true);
    pos += 4;
  };

  setUint32(0x46464952); // "RIFF"
  setUint32(length - 8);
  setUint32(0x45564157); // "WAVE"
  setUint32(0x20746d66); // "fmt "
  setUint32(16);
  setUint16(1);
  setUint16(buffer.numberOfChannels);
  setUint32(buffer.sampleRate);
  setUint32(buffer.sampleRate * 2 * buffer.numberOfChannels);
  setUint16(buffer.numberOfChannels * 2);
  setUint16(16);
  setUint32(0x61746164); // "data"
  setUint32(length - pos - 4);

  for (let i = 0; i < buffer.numberOfChannels; i++) {
    channels.push(buffer.getChannelData(i));
  }

  while (pos < length) {
    for (let i = 0; i < buffer.numberOfChannels; i++) {
      let sample = Math.max(-1, Math.min(1, channels[i][offset]));
      sample = sample < 0 ? sample * 0x8000 : sample * 0x7fff;
      view.setInt16(pos, sample, true);
      pos += 2;
    }
    offset++;
  }

  return arrayBuffer;
};

downloadAudioBtn.addEventListener("click", downloadMorseAudio);

// ============ INTERACTIVE TAP INPUT ============
let tapStartTime = 0;
let tapBuffer = [];
let tapText = "";

const DOT_THRESHOLD = 200;

const updateTapDisplay = () => {
  tapOutput.textContent = tapBuffer.join(" ");
  const decoded = fromMorse(tapBuffer.join(" "));
  if (decoded.result) {
    tapText = decoded.result;
    tapStatus.textContent = `Decoded: ${tapText}`;
    tapStatus.dataset.tone = "good";
  }
};

const handleTapStart = () => {
  tapStartTime = Date.now();
  tapZone.classList.add("tapping");
};

const handleTapEnd = () => {
  if (tapStartTime === 0) return;

  const duration = Date.now() - tapStartTime;
  tapStartTime = 0;
  tapZone.classList.remove("tapping");

  if (duration < DOT_THRESHOLD) {
    tapBuffer.push(".");
    flashVisualSignal(100);
  } else {
    tapBuffer.push("-");
    flashVisualSignal(300);
  }

  updateTapDisplay();
};

tapZone.addEventListener("mousedown", handleTapStart);
tapZone.addEventListener("mouseup", handleTapEnd);
tapZone.addEventListener("mouseleave", () => {
  if (tapStartTime > 0) {
    handleTapEnd();
  }
});

tapZone.addEventListener("touchstart", (e) => {
  e.preventDefault();
  handleTapStart();
});

tapZone.addEventListener("touchend", (e) => {
  e.preventDefault();
  handleTapEnd();
});

document.addEventListener("keydown", (e) => {
  if (e.code === "Space" && document.activeElement.tagName !== "TEXTAREA" && document.activeElement.tagName !== "INPUT") {
    e.preventDefault();
    if (tapStartTime === 0) {
      handleTapStart();
    }
  }
});

document.addEventListener("keyup", (e) => {
  if (e.code === "Space" && tapStartTime > 0) {
    e.preventDefault();
    handleTapEnd();
  }
});

tapClearBtn.addEventListener("click", () => {
  tapBuffer = [];
  tapText = "";
  tapOutput.textContent = "";
  tapStatus.textContent = "Tap to start";
  tapStatus.dataset.tone = "neutral";
});

// ============ SOS BUTTON ============
sosBtn.addEventListener("click", () => {
  const sosCode = "... --- ...";
  morseOutput.value = sosCode;
  textInput.value = "SOS";
  setStatus("SOS signal ready!", "good");
  playMorseWithVisual(sosCode, setStatus);
});

// ============ FAVORITES ============
const loadFavorites = () => {
  const favorites = JSON.parse(localStorage.getItem("morseFavorites") || "[]");
  if (favorites.length === 0) {
    favoritesList.innerHTML = '<p class="empty-state">No saved messages yet. Save your frequently used messages!</p>';
    favoritesPanel.style.display = "none";
    return favorites;
  }

  favoritesList.innerHTML = "";
  favorites.forEach((fav, index) => {
    const item = document.createElement("div");
    item.className = "favorite-item";
    item.innerHTML = `
      <div class="favorite-text">
        <strong>${fav.text}</strong>
        <span>${fav.morse}</span>
      </div>
      <div class="favorite-actions">
        <button class="btn-icon" onclick="loadFavorite(${index})" title="Load">📋</button>
        <button class="btn-icon" onclick="deleteFavorite(${index})" title="Delete">🗑️</button>
      </div>
    `;
    favoritesList.appendChild(item);
  });

  return favorites;
};

window.loadFavorite = (index) => {
  const favorites = JSON.parse(localStorage.getItem("morseFavorites") || "[]");
  const fav = favorites[index];
  if (fav) {
    textInput.value = fav.text;
    morseOutput.value = fav.morse;
    setStatus("Favorite loaded.", "good");
  }
};

window.deleteFavorite = (index) => {
  const favorites = JSON.parse(localStorage.getItem("morseFavorites") || "[]");
  favorites.splice(index, 1);
  localStorage.setItem("morseFavorites", JSON.stringify(favorites));
  loadFavorites();
};

saveFavoriteBtn.addEventListener("click", () => {
  const text = textInput.value.trim();
  const morse = morseOutput.value.trim();

  if (!text || !morse) {
    setStatus("Need both text and Morse to save.", "warn");
    return;
  }

  const favorites = JSON.parse(localStorage.getItem("morseFavorites") || "[]");

  if (favorites.some(fav => fav.text === text)) {
    setStatus("Already saved!", "warn");
    return;
  }

  favorites.push({ text, morse, timestamp: Date.now() });
  localStorage.setItem("morseFavorites", JSON.stringify(favorites));
  loadFavorites();
  setStatus("Saved to favorites!", "good");
  favoritesPanel.style.display = "block";
});

showFavoritesBtn.addEventListener("click", () => {
  loadFavorites();
  const isVisible = favoritesPanel.style.display === "block";
  favoritesPanel.style.display = isVisible ? "none" : "block";
  showFavoritesBtn.textContent = isVisible ? "💾 Favorites" : "✕ Close Favorites";
});

clearFavoritesBtn.addEventListener("click", () => {
  if (confirm("Delete all saved favorites?")) {
    localStorage.removeItem("morseFavorites");
    loadFavorites();
    setStatus("All favorites cleared.", "good");
  }
});

// ============ URL SHARING ============
const loadFromURL = () => {
  const params = new URLSearchParams(window.location.search);
  const encoded = params.get("m");
  if (encoded) {
    try {
      const text = atob(encoded);
      textInput.value = text;
      handleConvert();
      setStatus("Message loaded from URL!", "good");
    } catch (e) {
      setStatus("Invalid share link.", "warn");
    }
  }
};

shareBtn.addEventListener("click", async () => {
  const text = textInput.value.trim();
  if (!text) {
    setStatus("Add text to share.", "warn");
    return;
  }

  const encoded = btoa(text);
  const url = `${window.location.origin}${window.location.pathname}?m=${encoded}`;

  try {
    await navigator.clipboard.writeText(url);
    setStatus("Share link copied!", "good");
  } catch (e) {
    prompt("Copy this link:", url);
  }
});

// ============ PRACTICE MODE ============
let practiceState = {
  score: 0,
  streak: 0,
  currentLetter: "",
  currentMorse: ""
};

const generatePracticeQuestion = () => {
  const keys = Object.keys(MORSE_MAP);
  const randomKey = keys[Math.floor(Math.random() * keys.length)];
  practiceState.currentLetter = randomKey;
  practiceState.currentMorse = MORSE_MAP[randomKey];
  practiceLetter.textContent = randomKey;
  practiceInput.value = "";
  practiceFeedback.textContent = "";
  practiceInput.focus();
};

const checkPracticeAnswer = () => {
  const answer = practiceInput.value.trim();
  if (!answer) return;

  if (answer === practiceState.currentMorse) {
    practiceState.score += 10;
    practiceState.streak += 1;
    practiceFeedback.textContent = "✓ Correct!";
    practiceFeedback.className = "practice-feedback correct";
    setTimeout(generatePracticeQuestion, 1000);
  } else {
    practiceState.streak = 0;
    practiceFeedback.textContent = `✗ Wrong! Correct answer: ${practiceState.currentMorse}`;
    practiceFeedback.className = "practice-feedback incorrect";
  }

  practiceScore.textContent = `Score: ${practiceState.score}`;
  practiceStreak.textContent = `Streak: ${practiceState.streak}`;
};

showPracticeBtn.addEventListener("click", () => {
  const isVisible = practicePanel.style.display === "block";
  practicePanel.style.display = isVisible ? "none" : "block";
  showPracticeBtn.textContent = isVisible ? "🎓 Practice Mode" : "✕ Close Practice";

  if (!isVisible) {
    practiceState = { score: 0, streak: 0, currentLetter: "", currentMorse: "" };
    practiceScore.textContent = "Score: 0";
    practiceStreak.textContent = "Streak: 0";
    generatePracticeQuestion();
  }
});

practiceSubmitBtn.addEventListener("click", checkPracticeAnswer);
practiceSkipBtn.addEventListener("click", () => {
  practiceState.streak = 0;
  practiceStreak.textContent = "Streak: 0";
  generatePracticeQuestion();
});

practiceInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    checkPracticeAnswer();
  }
});

// ============ CONVERSION HISTORY ============
const addToHistory = (text, morse) => {
  const history = JSON.parse(localStorage.getItem("morseHistory") || "[]");
  history.unshift({
    text,
    morse,
    timestamp: Date.now()
  });

  // Keep only last 20 items
  if (history.length > 20) {
    history.pop();
  }

  localStorage.setItem("morseHistory", JSON.stringify(history));
};

const loadHistory = () => {
  const history = JSON.parse(localStorage.getItem("morseHistory") || "[]");
  if (history.length === 0) {
    historyList.innerHTML = '<p class="empty-state">No conversion history yet.</p>';
    return;
  }

  historyList.innerHTML = "";
  history.forEach((item, index) => {
    const historyItem = document.createElement("div");
    historyItem.className = "history-item";
    const date = new Date(item.timestamp).toLocaleString();
    historyItem.innerHTML = `
      <div class="history-content">
        <div class="history-text"><strong>${item.text}</strong></div>
        <div class="history-morse">${item.morse}</div>
        <div class="history-date">${date}</div>
      </div>
      <div class="history-actions">
        <button class="btn-icon" onclick="loadHistoryItem(${index})" title="Load">📋</button>
      </div>
    `;
    historyList.appendChild(historyItem);
  });
};

window.loadHistoryItem = (index) => {
  const history = JSON.parse(localStorage.getItem("morseHistory") || "[]");
  const item = history[index];
  if (item) {
    textInput.value = item.text;
    morseOutput.value = item.morse;
    setStatus("History item loaded.", "good");
  }
};

showHistoryBtn.addEventListener("click", () => {
  loadHistory();
  const isVisible = historyPanel.style.display === "block";
  historyPanel.style.display = isVisible ? "none" : "block";
  showHistoryBtn.textContent = isVisible ? "📜 History" : "✕ Close History";
});

clearHistoryBtn.addEventListener("click", () => {
  if (confirm("Clear all conversion history?")) {
    localStorage.removeItem("morseHistory");
    loadHistory();
  }
});

// Update handleConvert to add to history
const originalHandleConvert = handleConvert;
const handleConvertWithHistory = () => {
  const input = textInput.value.trim();
  if (!input) {
    morseOutput.value = "";
    setStatus("Add text to convert.", "warn");
    return;
  }

  const { result, skipped } = toMorse(input);
  morseOutput.value = result;

  // Add to history
  if (result) {
    addToHistory(input, result);
  }

  // Update stats
  updateStats("conversion", input.length);

  if (skipped.length) {
    const unique = Array.from(new Set(skipped)).join(", ");
    setStatus(`Skipped unsupported: ${unique}`, "warn");
  } else {
    setStatus("Converted successfully.", "good");
  }
};

convertBtn.removeEventListener("click", handleConvert);
convertBtn.addEventListener("click", handleConvertWithHistory);

// ============ STATISTICS ============
const updateStats = (type, value = 1) => {
  const stats = JSON.parse(localStorage.getItem("morseStats") || '{"conversions":0,"characters":0,"practiceTotal":0,"practiceCorrect":0}');

  if (type === "conversion") {
    stats.conversions += 1;
    stats.characters += value;
  } else if (type === "practice") {
    stats.practiceTotal += 1;
    if (value === true) {
      stats.practiceCorrect += 1;
    }
  }

  localStorage.setItem("morseStats", JSON.stringify(stats));
  loadStats();
};

const loadStats = () => {
  const stats = JSON.parse(localStorage.getItem("morseStats") || '{"conversions":0,"characters":0,"practiceTotal":0,"practiceCorrect":0}');

  statConversions.textContent = stats.conversions.toLocaleString();
  statCharacters.textContent = stats.characters.toLocaleString();
  statPractice.textContent = stats.practiceTotal.toLocaleString();

  const accuracy = stats.practiceTotal > 0 ? ((stats.practiceCorrect / stats.practiceTotal) * 100).toFixed(1) : 0;
  statAccuracy.textContent = accuracy + "%";
};

showStatsBtn.addEventListener("click", () => {
  loadStats();
  const isVisible = statsPanel.style.display === "block";
  statsPanel.style.display = isVisible ? "none" : "block";
  showStatsBtn.textContent = isVisible ? "📊 Stats" : "✕ Close Stats";
});

resetStatsBtn.addEventListener("click", () => {
  if (confirm("Reset all statistics?")) {
    localStorage.setItem("morseStats", '{"conversions":0,"characters":0,"practiceTotal":0,"practiceCorrect":0}');
    loadStats();
  }
});

// ============ REVERSE PRACTICE MODE ============
let isReversePractice = false;

reversePracticeToggle.addEventListener("change", () => {
  isReversePractice = reversePracticeToggle.checked;
  generatePracticeQuestion();
});

const generatePracticeQuestionUpdated = () => {
  const keys = Object.keys(MORSE_MAP);
  const randomKey = keys[Math.floor(Math.random() * keys.length)];
  practiceState.currentLetter = randomKey;
  practiceState.currentMorse = MORSE_MAP[randomKey];

  if (isReversePractice) {
    practiceQuestionText.textContent = "What letter is this Morse code:";
    practiceLetter.textContent = practiceState.currentMorse;
    practiceInput.placeholder = "Type the letter (e.g., A)";
  } else {
    practiceQuestionText.textContent = "What is the Morse code for:";
    practiceLetter.textContent = randomKey;
    practiceInput.placeholder = "Type the Morse code (e.g., .-)";
  }

  practiceInput.value = "";
  practiceFeedback.textContent = "";
  practiceInput.focus();
};

const checkPracticeAnswerUpdated = () => {
  const answer = practiceInput.value.trim().toUpperCase();
  if (!answer) return;

  let isCorrect = false;

  if (isReversePractice) {
    isCorrect = answer === practiceState.currentLetter;
  } else {
    isCorrect = answer === practiceState.currentMorse;
  }

  if (isCorrect) {
    practiceState.score += 10;
    practiceState.streak += 1;
    practiceFeedback.textContent = "✓ Correct!";
    practiceFeedback.className = "practice-feedback correct";
    updateStats("practice", true);
    setTimeout(generatePracticeQuestionUpdated, 1000);
  } else {
    practiceState.streak = 0;
    const correctAnswer = isReversePractice ? practiceState.currentLetter : practiceState.currentMorse;
    practiceFeedback.textContent = `✗ Wrong! Correct answer: ${correctAnswer}`;
    practiceFeedback.className = "practice-feedback incorrect";
    updateStats("practice", false);
  }

  practiceScore.textContent = `Score: ${practiceState.score}`;
  practiceStreak.textContent = `Streak: ${practiceState.streak}`;
};

showPracticeBtn.removeEventListener("click", () => {});
showPracticeBtn.addEventListener("click", () => {
  const isVisible = practicePanel.style.display === "block";
  practicePanel.style.display = isVisible ? "none" : "block";
  showPracticeBtn.textContent = isVisible ? "🎓 Practice Mode" : "✕ Close Practice";

  if (!isVisible) {
    practiceState = { score: 0, streak: 0, currentLetter: "", currentMorse: "" };
    practiceScore.textContent = "Score: 0";
    practiceStreak.textContent = "Streak: 0";
    generatePracticeQuestionUpdated();
  }
});

practiceSubmitBtn.removeEventListener("click", checkPracticeAnswer);
practiceSubmitBtn.addEventListener("click", checkPracticeAnswerUpdated);

practiceSkipBtn.removeEventListener("click", () => {});
practiceSkipBtn.addEventListener("click", () => {
  practiceState.streak = 0;
  practiceStreak.textContent = "Streak: 0";
  generatePracticeQuestionUpdated();
});

practiceInput.removeEventListener("keypress", () => {});
practiceInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    checkPracticeAnswerUpdated();
  }
});

// ============ EXPORT/IMPORT FAVORITES ============
exportFavoritesBtn.addEventListener("click", () => {
  const favorites = localStorage.getItem("morseFavorites") || "[]";
  const blob = new Blob([favorites], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "morse-favorites.json";
  a.click();
  URL.revokeObjectURL(url);
  setStatus("Favorites exported!", "good");
});

importFavoritesBtn.addEventListener("click", () => {
  importFileInput.click();
});

importFileInput.addEventListener("change", (e) => {
  const file = e.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = (event) => {
    try {
      const imported = JSON.parse(event.target.result);
      if (Array.isArray(imported)) {
        localStorage.setItem("morseFavorites", JSON.stringify(imported));
        loadFavorites();
        setStatus("Favorites imported!", "good");
      } else {
        setStatus("Invalid favorites file.", "warn");
      }
    } catch (e) {
      setStatus("Failed to import favorites.", "warn");
    }
  };
  reader.readAsText(file);
  importFileInput.value = "";
});

// ============ KEYBOARD SHORTCUTS ============
document.addEventListener("keydown", (e) => {
  // Ctrl+Enter: Convert
  if (e.ctrlKey && e.key === "Enter") {
    e.preventDefault();
    handleConvertWithHistory();
  }

  // Ctrl+K: Clear
  if (e.ctrlKey && e.key === "k") {
    e.preventDefault();
    handleClear();
  }

  // Ctrl+P: Play
  if (e.ctrlKey && e.key === "p") {
    e.preventDefault();
    if (morseOutput.value) {
      playMorseWithVisual(morseOutput.value, setStatus);
    }
  }

  // Ctrl+S: Save favorite
  if (e.ctrlKey && e.key === "s") {
    e.preventDefault();
    saveFavoriteBtn.click();
  }

  // Ctrl+H: Toggle history
  if (e.ctrlKey && e.key === "h") {
    e.preventDefault();
    showHistoryBtn.click();
  }

  // Esc: Stop audio / close modals
  if (e.key === "Escape") {
    stopAudio();
    shortcutsModal.style.display = "none";
  }
});

showShortcutsBtn.addEventListener("click", () => {
  shortcutsModal.style.display = "block";
});

closeShortcutsBtn.addEventListener("click", () => {
  shortcutsModal.style.display = "none";
});

shortcutsModal.addEventListener("click", (e) => {
  if (e.target === shortcutsModal) {
    shortcutsModal.style.display = "none";
  }
});

// Initialize
loadFromURL();
loadStats();
buildLegend();
