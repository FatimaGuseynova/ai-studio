import { MODES } from "../utils/promptBuilder";

export default function ModeSelector({ mode, setMode }) {
  const selectedMode = MODES.find(m => m.id === mode);
  return (
    <div>
      <p className="text-xs text-zinc-500 tracking-widest uppercase mb-3">Select Mode</p>
      <div className="flex flex-wrap gap-2">
        {MODES.map(m => (
          <button
            key={m.id}
            onClick={() => setMode(m.id)}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold tracking-wide border transition-all duration-200
              ${mode === m.id
                ? "border-cyan-400/50 bg-cyan-400/10 text-cyan-300 shadow-[0_0_12px_rgba(34,211,238,0.15)]"
                : "border-white/8 bg-white/4 text-zinc-500 hover:text-zinc-300 hover:bg-white/8 hover:border-white/15"}`}
          >
            <span className="text-sm">{m.icon}</span>
            <span>{m.label}</span>
          </button>
        ))}
      </div>
      {selectedMode && (
        <p className="mt-2 text-xs text-cyan-400/50">→ {selectedMode.desc}</p>
      )}
    </div>
  );
}
