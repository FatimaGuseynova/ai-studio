# ⚡ Prompt Studio — AI Workflow Engine

A sleek, dark-themed React application for transforming text with AI. Supports multiple generation modes, history tracking, and one-click copy/download of results.

---

## 🌐 Architecture Overview

```
┌─────────────────────────────────────────────────────────┐
│                     Frontend (React + Vite)             │
│ App.jsx · ModeSelector · InputArea · OutputCard         │
│ HistoryPanel · promptBuilder.js · api.js                │
└────────────────────────┬────────────────────────────────┘
                         │  HTTP Requests (Fetch API)
                         ▼
┌─────────────────────────────────────────────────────────┐
│              Groq Cloud API                             │
│     https://api.groq.com/openai/v1/chat/completions     │
│                                                         │
│  POST /chat/completions → Generate AI response          │
│  Model: llama-3.3-70b-versatile                         │
└─────────────────────────────────────────────────────────┘
```

---

## 🛠️ Tech Stack

### ⚛️ React & UI
| Tool | Purpose |
|------|---------|
| **React 18** | Core framework — all UI is built as functional components with hooks |
| **useState** | Manages input, output, mode, loading, history, and sidebar state |
| **useEffect** | Loads persisted history from `localStorage` on initial mount |
| **Component architecture** | App → ModeSelector, InputArea, OutputCard, HistoryPanel (fully isolated) |
| **Vite** | Lightning-fast dev server and optimized production build for React |
| **Tailwind CSS** | Utility-first styling — all layouts, colors, and animations |

### ⚙️ AI & API
| Tool | Purpose |
|------|---------|
| **Groq API** | Ultra-fast LLM inference endpoint (OpenAI-compatible) |
| **llama-3.3-70b-versatile** | Open-source model used for all text generation |
| **Fetch API** | Native browser API for HTTP requests — no extra libraries |

---

## 📁 Project Structure

```
project/
│
├── src/
│   ├── App.jsx                  # Root component — state, logic, layout
│   ├── index.css                # Tailwind base import
│   ├── main.jsx                 # React entry point
│   │
│   ├── components/
│   │   ├── ModeSelector.jsx     # Mode toggle buttons (Summarize, LinkedIn, etc.)
│   │   ├── InputArea.jsx        # Text input textarea with char counter
│   │   ├── OutputCard.jsx       # AI result display with copy/save actions
│   │   └── HistoryPanel.jsx     # Sidebar with past generations
│   │
│   └── utils/ & services/
│       ├── promptBuilder.js     # Mode definitions + prompt templates
│       └── api.js               # Groq API call logic
│
└── public/
    ├── react.svg
    └── vite.svg
```

---

## 🔑 Key Files — Detailed Breakdown

### `promptBuilder.js` — Mode Config & Prompt Templates

Defines all available AI modes and maps each to a specific prompt format.

| Mode ID | Label | Description |
|---------|-------|-------------|
| `summarize` | Summarize | Condenses text into 3–5 sentences |
| `linkedin` | LinkedIn Post | Creates professional posts with emojis and hashtags |
| `explain` | Explain Simply | Beginner-friendly explanations with analogies |
| `rewrite` | Pro Rewrite | Polished, professional tone rewrite |
| `bullets` | Bullet Points | Extracts key points as structured bullets |

```js
export function buildPrompt(mode, text) {
  const map = {
    summarize: `Summarize this text clearly and concisely in 3-5 sentences:\n\n${text}`,
    linkedin: `Convert this into a compelling, professional LinkedIn post...\n\n${text}`,
    // ...
  };
  return map[mode] || text;
}
```

---

### `api.js` — AI Service Layer

Single function handling all communication with the Groq API.

```js
export async function callAI(prompt) {
  const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${import.meta.env.VITE_GROQ_KEY}`,
    },
    body: JSON.stringify({
      model: "llama-3.3-70b-versatile",
      max_tokens: 1000,
      messages: [{ role: "user", content: prompt }],
    }),
  });
  const data = await response.json();
  return data.choices?.[0]?.message?.content || "No response generated.";
}
```

---

### `App.jsx` — Root Component

Manages all global state and orchestrates the generation flow.

**Key state:**
- `input` — user's raw text
- `mode` — currently selected generation mode
- `output` — AI-generated result
- `loading` — request in progress flag
- `history` — array of past generations (persisted to `localStorage`)
- `showHistory` — sidebar visibility toggle

**Generation flow:**
1. `buildPrompt(mode, input)` — constructs the mode-specific prompt
2. `callAI(prompt)` — sends request to Groq API
3. Result stored in state + appended to history (max 20 entries)
4. History saved to `localStorage` under key `promptstudio_history`

---

### `ModeSelector.jsx` — Mode Toggle

Renders a row of clickable mode buttons. Active mode is highlighted with a cyan glow effect. Shows the selected mode's description below.

---

### `InputArea.jsx` — Text Input

A resizable `<textarea>` with:
- Live character counter
- Cyan border focus ring
- Monospace font for clean text display

---

### `OutputCard.jsx` — Result Display

Appears only after a generation completes. Features:
- **COPY** button — writes output to clipboard, shows `COPIED ✓` feedback
- **SAVE** button — downloads result as a `.txt` file named `promptstudio_{mode}_{timestamp}.txt`
- Word and character count in the footer
- Animated spinner while loading

---

### `HistoryPanel.jsx` — Session History Sidebar

Slides in from the left when toggled. Displays up to 20 past generations with:
- Mode icon and label
- Truncated input preview (first 60 chars)
- Timestamp
- Click to restore: loads input, mode, and output back into the main view

---

## 🔐 API Key Setup

The Groq API key is loaded from a `.env` file using Vite's environment variable system.

```
# .env
VITE_GROQ_KEY=your_groq_api_key_here
```

Get a free API key at [console.groq.com](https://console.groq.com).

---

## 🚀 Getting Started

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/prompt-studio.git
   cd prompt-studio
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Add your Groq API key**
   ```bash
   echo "VITE_GROQ_KEY=your_key_here" > .env
   ```

4. **Start the dev server**
   ```bash
   npm run dev
   ```
   Vite will open the app automatically in your default browser.

---

---

## 📌 Notes

- History is stored in `localStorage` and persists across page refreshes (up to 20 entries)
- The Generate button is disabled when input is empty or a request is in progress
- All generation modes share the same API call — only the prompt template changes
- Output can be saved as a plain `.txt` file directly from the UI
