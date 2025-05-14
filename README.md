# 🎭 Mood Detector App

An interactive face expression recognition web app built with **React**, **face-api.js**, and a splash of fun! Detect your mood live from the webcam, watch the screen react, and even save your mood badge selfie.

---

## ✨ Features

- 🧠 Real-time facial expression detection via webcam
- 🎨 Mood-specific effects: confetti, rain, fire, floating ghosts, and more
- 🖼 Emoji parade and mood overlays
- 📸 One-click mood badge selfie capture
- 📋 Click-to-copy emojis
- 💻 Fully responsive UI
- 🧪 Ideal for brownbag talks, demos, or just goofing off with friends

---

## 🚀 Demo

> [Live Demo](https://mood-detector-omega.vercel.app/)

---

## 🛠 Tech Stack

- [React](https://reactjs.org/)
- [face-api.js](https://github.com/justadudewhohacks/face-api.js)
- [Vite](https://vitejs.dev/)
- HTML5 Canvas, Webcam API, and CSS animations

---

## 🧩 Components

- `App.jsx` – Main app logic and state handling
- `CameraControls.jsx` – Start/stop camera, detect mood, save selfie
- `MoodDisplay.jsx` – Shows the current detected mood
- `MoodEffects.jsx` – Displays mood-based visual effects
- `EmojiParade.jsx` – Displays mood-relevant emojis you can copy
- `moodEmojis.js` – Emoji data by emotion

---

## 📸 How It Works

1. Loads models (`face-api.js`) for face detection and emotion classification.
2. Starts webcam and captures video.
3. On click, detects expressions and identifies the strongest emotion.
4. Displays matching visual effect and emojis.
5. Optionally, captures a screenshot with the detected mood label.

---

## 📦 Installation

```bash
git clone https://github.com/yourusername/mood-detector.git
cd mood-detector
npm install
npm run dev
````

> ⚠️ Make sure to place the `models/` directory from [face-api.js](https://github.com/justadudewhohacks/face-api.js) in your `public/` folder:

```
public/
└── models/
    ├── face_expression_model-weights_manifest.json
    └── ...
```

---

## 🧪 Testing

* Ensure camera access is allowed by the browser.
* Try different facial expressions!

---

## 📁 Project Structure

```
src/
├── components/
│   ├── CameraControls.jsx
│   ├── MoodDisplay.jsx
│   ├── MoodEffects.jsx
│   └── EmojiParade.jsx
├── utils/
│   └── moodEmojis.js
├── App.jsx
├── App.css
├── main.jsx
```

## 📜 License

MIT — free to use, remix, and deploy. If you make something fun with it, let me know!
