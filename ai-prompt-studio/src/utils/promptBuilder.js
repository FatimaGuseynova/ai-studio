export const MODES = [
  { id: "summarize", label: "Summarize", color: "#00f5d4", desc: "Condense any text" },
  { id: "linkedin", label: "LinkedIn Post", color: "#7b61ff", desc: "Professional social content" },
  { id: "explain", label: "Explain Simply", color: "#ff6b6b", desc: "Beginner-friendly language" },
  { id: "rewrite", label: "Pro Rewrite", color: "#ffd166", desc: "Elevate your writing" },
  { id: "bullets", label: "Bullet Points", color: "#09da6a", desc: "Structured key points" },
];

export function buildPrompt(mode, text) {
  const map = {
    summarize: `Summarize this text clearly and concisely in 3-5 sentences:\n\n${text}`,
    linkedin: `Convert this into a compelling, professional LinkedIn post with emojis and hashtags:\n\n${text}`,
    explain: `Explain this in simple, beginner-friendly language. Use analogies if helpful:\n\n${text}`,
    rewrite: `Rewrite this text in a polished, professional tone while preserving the core message:\n\n${text}`,
    bullets: `Convert this text into clear, concise bullet points highlighting the key information:\n\n${text}`,
  };
  return map[mode] || text;
}
