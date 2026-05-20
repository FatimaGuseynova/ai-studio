export default function InputArea({ input, setInput, selectedMode }) {
  return (
    <div>
      <div className="flex justify-between items-center mb-2">
        <p className="text-xs text-zinc-500 tracking-widest uppercase">Input Text</p>
        <p className="text-xs text-zinc-600">{input.length} chars</p>
      </div>
      <textarea
        value={input}
        onChange={e => setInput(e.target.value)}
        placeholder="Paste your text here..."
        rows={6}
        className="w-full border border-cyan-400/70 border-white/8 rounded-xl px-4 py-3.5 text-sm text-zinc-300 placeholder-zinc-600 resize-y outline-none transition-all duration-200 focus:border-cyan-400/40 bg-white/5 focus:shadow-[0_0_0_1px_rgba(34,211,238,0.1)] leading-relaxed font-mono"
      />
    </div>
  );
}
