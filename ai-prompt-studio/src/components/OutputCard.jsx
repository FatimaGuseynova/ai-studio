import { useState } from "react";

export default function OutputCard({ output, loading, selectedMode }) {
  const [copied, setCopied] = useState(false);
  const [saved, setSaved] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSave = () => {
    const blob = new Blob([output], { type: "text/plain" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = `promptstudio_${selectedMode?.id}_${Date.now()}.txt`;
    a.click();
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  if (!output && !loading) return null;

  return (
    <div className="rounded-2xl border border-cyan-400/20 bg-white/2 overflow-hidden animate-fadeIn">

      {/* Header */}
      <div className="flex justify-between items-center px-5 py-3 border-b border-cyan-400/10 bg-cyan-400/5">
        <p className="text-xs font-bold tracking-widest text-cyan-400 uppercase">
          {selectedMode?.icon} Output — {selectedMode?.label}
        </p>
        {output && (
          <div className="flex gap-2">
            <button
              onClick={handleCopy}
              className={`px-3 py-1.5 rounded-lg text-xs border transition-all duration-200 font-mono
                ${copied
                  ? "border-cyan-400/50 text-cyan-400 bg-cyan-400/10"
                  : "border-white/10 text-zinc-500 bg-white/4 hover:text-zinc-300 hover:bg-white/8"}`}
            >
              {copied ? "COPIED ✓" : "COPY"}
            </button>
            <button
              onClick={handleSave}
              className={`px-3 py-1.5 rounded-lg text-xs border transition-all duration-200 font-mono
                ${saved
                  ? "border-emerald-400/50 text-emerald-400 bg-emerald-400/10"
                  : "border-white/10 text-zinc-500 bg-white/4 hover:text-zinc-300 hover:bg-white/8"}`}
            >
              {saved ? "SAVED ✓" : "SAVE"}
            </button>
          </div>
        )}
      </div>

      {/* Body */}
      <div className="px-5 py-5 text-sm text-zinc-300 leading-relaxed whitespace-pre-wrap min-h-20 font-mono">
        {loading ? (
          <div className="flex items-center gap-3 text-zinc-600">
            <span className="inline-block w-3 h-3 border-2 border-white/10 border-t-cyan-400 rounded-full animate-spin" />
            Generating response...
          </div>
        ) : output}
      </div>

      {/* Footer */}
      {output && (
        <div className="px-5 py-2.5 border-t border-white/5 text-xs text-zinc-600 font-mono">
          {output.split(" ").length} words · {output.length} chars
        </div>
      )}
    </div>
  );
}
