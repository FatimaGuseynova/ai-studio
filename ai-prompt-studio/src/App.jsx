import { useState, useEffect } from "react";
import { MODES, buildPrompt } from "./utils/promptBuilder";
import { callAI } from "./services/api";
import ModeSelector from "./components/ModeSelector";
import InputArea from "./components/InputArea";
import OutputCard from "./components/OutputCard";
import HistoryPanel from "./components/HistoryPanel";

export default function App() {
  const [input, setInput] = useState("");
  const [mode, setMode] = useState("summarize");
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);
  const [history, setHistory] = useState([]);
  const [showHistory, setShowHistory] = useState(false);

  const selectedMode = MODES.find(m => m.id === mode);

  useEffect(() => {
    const stored = localStorage.getItem("promptstudio_history");
    if (stored) setHistory(JSON.parse(stored));
  }, []);

  const handleGenerate = async () => {
    if (!input.trim()) return;
    setLoading(true);
    setOutput("");
    try {
      const prompt = buildPrompt(mode, input);
      const result = await callAI(prompt);
      setOutput(result);
      const entry = {
        id: Date.now(),
        mode,
        input,
        output: result,
        time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      };
      const newHistory = [entry, ...history].slice(0, 20);
      setHistory(newHistory);
      localStorage.setItem("promptstudio_history", JSON.stringify(newHistory));
    } catch (e) {
      setOutput("Error connecting to AI. Please try again.");
    }
    setLoading(false);
  };

  const handleLoadHistory = (item) => {
    setInput(item.input);
    setMode(item.mode);
    setOutput(item.output);
    setShowHistory(false);
  };

  return (
    <div className="min-h-screen bg-[#080c14] text-zinc-200 font-mono flex flex-col">

      {/* Ambient glow */}
      <div className="fixed inset-0 pointer-events-none z-0"
        style={{
          background: "radial-gradient(ellipse 80% 50% at 20% 10%, rgba(34,211,238,0.07) 0%, transparent 60%), radial-gradient(ellipse 60% 40% at 80% 80%, rgba(123,97,255,0.07) 0%, transparent 60%)"
        }}
      />

      {/* Navbar */}
      <header className="relative z-10 flex items-center justify-between px-8 py-5 border-b border-white/6 backdrop-blur-xl">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-cyan-400 to-violet-500 flex items-center justify-center text-lg shadow-lg shadow-cyan-400/20">
            ⚡
          </div>
          <div>
            <p className="text-sm font-bold tracking-widest text-white">PROMPT STUDIO</p>
            <p className="text-xs text-zinc-600 tracking-widest">AI WORKFLOW ENGINE</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="text-xs text-zinc-600 bg-white/4 border border-white/6 px-3 py-1.5 rounded-lg">
            {history.length} generations
          </div>
          <button
            onClick={() => setShowHistory(!showHistory)}
            className={`text-xs px-4 py-2 rounded-xl border transition-all duration-200 tracking-wider
              ${showHistory
                ? "bg-white/8 border-white/15 text-zinc-300"
                : "bg-white/4 border-white/6 text-zinc-500 hover:text-zinc-300 hover:bg-white/7"}`}
          >
            HISTORY {showHistory ? "▲" : "▼"}
          </button>
        </div>
      </header>

      {/* Body */}
      <div className="relative z-1 flex flex-1 overflow-hidden">

        {/* Sidebar */}
        {showHistory && <HistoryPanel history={history} onLoad={handleLoadHistory} />}

        {/* Main */}
        <div className="flex-1 px-8 py-8 overflow-y-auto flex flex-col gap-7 max-w-4xl mx-auto w-full">

          <ModeSelector mode={mode} setMode={setMode} />

          <InputArea input={input} setInput={setInput} selectedMode={selectedMode} />

          {/* Generate button */}
          <button
            onClick={handleGenerate}
            disabled={loading || !input.trim()}
            className={`self-start flex items-center gap-2.5 px-7 py-3.5 rounded-xl text-xs font-bold tracking-widest transition-all duration-300
              ${loading || !input.trim()
                ? "bg-white/4 border border-white/6 text-zinc-600 cursor-not-allowed"
                : "bg-gradient-to-r from-cyan-400 to-cyan-300 text-black hover:shadow-lg hover:shadow-cyan-400/25 hover:scale-[1.02] active:scale-[0.98]"}`}
          >
            {loading ? (
              <>
                <span className="w-3.5 h-3.5 border-2 border-black/20 border-t-black rounded-full animate-spin" />
                GENERATING...
              </>
            ) : (
              <>GENERATE</>
            )}
          </button>

          <OutputCard output={output} loading={loading} selectedMode={selectedMode} />

        </div>
      </div>
    </div>
  );
}
