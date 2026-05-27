import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { Link } from "react-router";

interface NavItem {
  label: string;
  href: string;
}

const NAV_ITEMS: NavItem[] = [
  { label: "About Me", href: "#about" },
  { label: "Work", href: "#work" },
  { label: "Service", href: "#service" },
  { label: "Contact Us", href: "#contact" },
];

function useScrolled(threshold = 24) {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const handle = () => setScrolled(window.scrollY > threshold);
    window.addEventListener("scroll", handle, { passive: true });
    return () => window.removeEventListener("scroll", handle);
  }, [threshold]);
  return scrolled;
}

function smoothScrollTo(href: string) {
  const el = document.querySelector(href);
  if (el) el.scrollIntoView({ behavior: "smooth" });
}

function NavLink({
  item,
  onClick,
  mobile = false,
}: {
  item: NavItem;
  onClick: () => void;
  mobile?: boolean;
}) {
  return (
    <a
      href={item.href}
      onClick={(e) => {
        e.preventDefault();
        smoothScrollTo(item.href);
        onClick();
      }}
      className={
        mobile
          ? "block text-base font-medium text-muted-foreground hover:text-foreground transition-colors duration-200 py-1"
          : "relative text-sm font-medium text-muted-foreground hover:text-foreground transition-colors duration-200 group"
      }
    >
      {item.label}
      {!mobile && (
        <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-amber-400 group-hover:w-full transition-all duration-300" />
      )}
    </a>
  );
}

function LangToggle() {
  const [lang, setLang] = useState<"EN" | "HN">("EN");
  return (
    <div
      className="flex items-center bg-secondary rounded-full p-0.5 text-xs font-semibold"
      role="group"
      aria-label="Language selector"
    >
      {(["EN", "HN"] as const).map((l) => (
        <button
          key={l}
          onClick={() => setLang(l)}
          className={`px-3 py-1 rounded-full transition-all duration-200 ${
            lang === l
              ? "bg-amber-400 text-black"
              : "text-muted-foreground hover:text-foreground"
          }`}
          aria-pressed={lang === l}
        >
          {l}
        </button>
      ))}
    </div>
  );
}

export function Header() {
  const scrolled = useScrolled();
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = () => setMenuOpen(false);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-background/75 backdrop-blur-2xl border-b border-border shadow-sm"
          : "bg-transparent"
      }`}
    >
      <nav
        className="max-w-7xl mx-auto px-6 md:px-10 h-16 md:h-[72px] flex items-center justify-between"
        aria-label="Primary navigation"
      >
        {/* Logo */}
        <Link
          to="/"
          className="font-display text-xl md:text-[2rem] font-bold text-foreground tracking-tight hover:opacity-75 transition-opacity duration-200"
          aria-label="Home"
        >
          <span className="text-amber-400">G</span>anesh
          <span className="text-amber-400">.</span>
        </Link>

        {/* Desktop nav + language toggle grouped on right */}
        <div className="hidden md:flex items-center gap-8">
          <nav className="flex items-center gap-8" role="list">
            {NAV_ITEMS.map((item) => (
              <div key={item.label} role="listitem">
                <NavLink item={item} onClick={closeMenu} />
              </div>
            ))}
          </nav>
          <LangToggle />
        </div>

        {/* Mobile hamburger */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden text-foreground p-1.5 rounded-md hover:bg-secondary transition-colors"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
        >
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      {/* Mobile drawer */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ${
          menuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="bg-background/95 backdrop-blur-2xl border-b border-border px-6 py-6 flex flex-col gap-4">
          {NAV_ITEMS.map((item) => (
            <NavLink key={item.label} item={item} onClick={closeMenu} mobile />
          ))}
          <div className="pt-3 border-t border-border flex items-center gap-3">
            <LangToggle />
          </div>
        </div>
      </div>
    </header>
  );
}
