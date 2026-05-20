import { MODES } from "../utils/promptBuilder";

function HistoryItem({ item, onLoad }) {
  const mode = MODES.find(m => m.id === item.mode);
  return (
    <div
      onClick={() => onLoad(item)}
      className="px-3.5 py-3 rounded-xl bg-white/3 border border-white/6 cursor-pointer mb-2 transition-all duration-200 hover:bg-white/7 hover:border-white/12"
    >
      <div className="flex items-center gap-2 mb-1">
        <span className="text-xs text-cyan-400">{mode?.icon}</span>
        <span className="text-xs font-semibold text-cyan-400 uppercase tracking-wider">{mode?.label}</span>
        <span className="text-xs text-zinc-600 ml-auto">{item.time}</span>
      </div>
      <p className="text-xs text-zinc-500 truncate">{item.input.slice(0, 60)}...</p>
    </div>
  );
}

export default function HistoryPanel({ history, onLoad }) {
  return (
    <div className="w-72 min-w-72 bg-white/1 border-r border-white/6 px-4 py-5 overflow-y-auto">
      <p className="text-xs text-zinc-600 tracking-widest uppercase mb-4">Recent Generations</p>
      {history.length === 0 ? (
        <p className="text-xs text-zinc-700 text-center mt-10">No history yet</p>
      ) : (
        history.map(item => <HistoryItem key={item.id} item={item} onLoad={onLoad} />)
      )}
    </div>
  );
}
