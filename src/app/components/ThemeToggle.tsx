import { Sun, Moon } from "lucide-react";

export function ThemeToggle({
  isDark,
  onToggle,
}: {
  isDark: boolean;
  onToggle: () => void;
}) {
  return (
    <button
      onClick={onToggle}
      className="fixed bottom-6 right-6 z-50 w-12 h-12 rounded-full flex items-center justify-center shadow-xl border border-border bg-card/80 backdrop-blur-lg hover:scale-110 hover:border-amber-400/50 transition-all duration-300"
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
    >
      {isDark ? (
        <Sun size={17} className="text-amber-400" />
      ) : (
        <Moon size={17} className="text-foreground" />
      )}
    </button>
  );
}
