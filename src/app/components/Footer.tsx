import { Link } from "react-router";

export function Footer() {
  return (
    <footer className="relative w-full border-t border-border bg-background" aria-label="Footer">
      <div className="max-w-7xl mx-auto px-6 md:px-10 py-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
          {/* Left — copyright */}
          <span className="font-mono text-xs">&copy;2026 Ganesh kumar.</span>

          {/* Right — nav links */}
          <div className="flex items-center gap-6">
            <Link to="/privacy" className="hover:text-foreground transition-colors duration-200">
              Privacy
            </Link>
            <Link to="/cookies" className="hover:text-foreground transition-colors duration-200">
              Cookies
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
