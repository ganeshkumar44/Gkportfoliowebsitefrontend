import { useState, useEffect, useRef } from "react";
import { Sun, Moon, Menu, X, ChevronDown, Check, Instagram, Youtube, Linkedin, Mail } from "lucide-react";

// ─── Types ────────────────────────────────────────────────────────────────────

interface NavItem {
  label: string;
  href: string;
}

// ─── Constants ────────────────────────────────────────────────────────────────

const NAV_ITEMS: NavItem[] = [
  { label: "Service", href: "#service" },
  { label: "Work", href: "#work" },
  { label: "About Me", href: "#about" },
  { label: "Contact Us", href: "#contact" },
];

const SKILL_TAGS = [
  "UX & Product Design",
  "Design Systems & Ops",
  "AI-Enhanced Workflows",
  "Research & Strategy",
  "Full Stack Development",
  "Cloud Architecture",
];

const EXPERTISE = [
  { index: "01", area: "Frontend", stack: "React · Next.js · TypeScript · Tailwind CSS" },
  { index: "02", area: "Backend", stack: "Node.js · Python · Go · REST · GraphQL" },
  { index: "03", area: "AI / ML", stack: "LangChain · OpenAI · LLM Fine-tuning · RAG" },
  { index: "04", area: "DevOps", stack: "AWS · Docker · Kubernetes · CI/CD · Terraform" },
];

const STATS = [
  { value: "4+", label: "Years Exp" },
  { value: "30+", label: "Projects" },
  { value: "15+", label: "Clients" },
];

const WORK_HIGHLIGHTS = [
  "Scalable Full Stack Applications",
  "Responsive Modern UI Systems",
  "AI-Integrated Web Experiences",
  "API & Backend Architecture",
  "SEO & Performance Optimization",
];

const WORK_SKILLS = [
  "ReactJS",
  "NextJS",
  "TypeScript",
  "Tailwind CSS",
  "NodeJS",
  "PostgreSQL",
  "AI Automation",
  "UI/UX Engineering",
];

const SOCIAL_LINKS = [
  { icon: Instagram, label: "Instagram", href: "https://instagram.com" },
  { icon: Youtube, label: "YouTube", href: "https://youtube.com" },
  { icon: Linkedin, label: "LinkedIn", href: "https://linkedin.com" },
  { icon: Mail, label: "Email", href: "mailto:ganeshkr.in90@gmail.com" },
];

// ─── Hooks ────────────────────────────────────────────────────────────────────

function useScrolled(threshold = 24) {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const handle = () => setScrolled(window.scrollY > threshold);
    window.addEventListener("scroll", handle, { passive: true });
    return () => window.removeEventListener("scroll", handle);
  }, [threshold]);
  return scrolled;
}

function useTypingEffect(text: string, speed = 75) {
  const [displayed, setDisplayed] = useState("");
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (done || displayed.length >= text.length) {
      setDone(true);
      return;
    }
    const timer = setTimeout(() => {
      setDisplayed(text.slice(0, displayed.length + 1));
    }, speed);
    return () => clearTimeout(timer);
  }, [displayed, text, speed, done]);

  return { displayed, done };
}

function useReveal(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true);
      },
      { threshold }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [threshold]);
  return { ref, visible };
}

// ─── Utilities ────────────────────────────────────────────────────────────────

function smoothScrollTo(href: string) {
  const el = document.querySelector(href);
  if (el) el.scrollIntoView({ behavior: "smooth" });
}

// ─── Sub-components ───────────────────────────────────────────────────────────

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

function SkillTag({ label, delay = 0 }: { label: string; delay?: number }) {
  const { ref, visible } = useReveal(0.1);
  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
      }`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      <span className="group inline-flex items-center gap-2 border border-border px-5 py-2.5 rounded-full text-sm font-medium text-muted-foreground hover:text-foreground hover:border-amber-400/60 hover:bg-amber-400/5 transition-all duration-300 cursor-default select-none">
        <span className="w-1.5 h-1.5 rounded-full bg-amber-400 opacity-70 group-hover:opacity-100 group-hover:scale-150 transition-all duration-300" />
        {label}
      </span>
    </div>
  );
}

function ExpertiseRow({
  item,
  delay = 0,
}: {
  item: (typeof EXPERTISE)[number];
  delay?: number;
}) {
  const { ref, visible } = useReveal(0.1);
  return (
    <div
      ref={ref}
      className={`flex items-start gap-5 py-4 border-b border-border group hover:border-amber-400/30 transition-all duration-500 ${
        visible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-6"
      }`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      <span className="text-xs text-amber-400 font-mono font-semibold mt-0.5 w-8 shrink-0 tabular-nums">
        {item.index}
      </span>
      <div>
        <div className="text-sm font-semibold text-foreground group-hover:text-amber-400 transition-colors duration-200">
          {item.area}
        </div>
        <div className="text-xs text-muted-foreground mt-0.5 leading-relaxed">{item.stack}</div>
      </div>
    </div>
  );
}

function SocialButton({
  icon: Icon,
  label,
  href,
  delay = 0,
}: {
  icon: React.ElementType;
  label: string;
  href: string;
  delay?: number;
}) {
  const { ref, visible } = useReveal(0.1);
  return (
    <a
      ref={ref}
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className={`group relative w-14 h-14 md:w-16 md:h-16 rounded-2xl flex items-center justify-center bg-card/40 backdrop-blur-sm border border-border hover:border-amber-400/60 hover:bg-amber-400/5 transition-all duration-300 hover:scale-110 ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
      }`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      <Icon size={20} className="text-muted-foreground group-hover:text-amber-400 transition-colors duration-200" />
      <div className="absolute inset-0 rounded-2xl bg-amber-400/0 group-hover:bg-amber-400/5 transition-colors duration-300" />
    </a>
  );
}

// ─── Sections ─────────────────────────────────────────────────────────────────

function Header() {
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
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="font-display text-xl md:text-[2rem] font-bold text-foreground tracking-tight hover:opacity-75 transition-opacity duration-200"
          aria-label="Scroll to top"
        >
          <span className="text-amber-400">G</span>anesh
          <span className="text-amber-400">.</span>
        </button>

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

function HeroSection() {
  const { displayed, done } = useTypingEffect("Ganesh Kumar", 90);
  const [mounted, setMounted] = useState(false);
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 120);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    // Check initial theme
    setIsDark(document.documentElement.classList.contains('dark'));

    // Watch for theme changes
    const observer = new MutationObserver(() => {
      setIsDark(document.documentElement.classList.contains('dark'));
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class'],
    });

    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="home"
      className="relative w-full h-screen overflow-hidden flex items-end justify-center"
      aria-label="Hero banner — Ganesh Kumar, FullStack Developer and AI"
    >
      {/* Background image */}
      <div className={isDark ? "absolute inset-0 bg-zinc-950" : "absolute inset-0 bg-zinc-100"}>
        <img
          src={
            isDark
              ? "https://images.unsplash.com/photo-1763128516808-785e80c1dd68?w=1920&h=1080&fit=crop&auto=format"
              : "https://images.unsplash.com/photo-1644581204918-2b8903afcc8b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1920"
          }
          alt={
            isDark
              ? "Developer working at multiple monitors in a dark cinematic environment"
              : "Professional portrait with soft lighting and minimal background"
          }
          className="w-full h-full object-cover object-center opacity-35 scale-105"
          loading="eager"
        />
      </div>

      {/* Gradient overlays — cinematic vignette */}
      {isDark ? (
        <>
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/55 to-black/10" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-transparent to-black/50" />
        </>
      ) : (
        <>
          <div className="absolute inset-0 bg-gradient-to-t from-white via-white/60 to-white/15" />
          <div className="absolute inset-0 bg-gradient-to-r from-white/40 via-transparent to-white/40" />
        </>
      )}

      {/* Grain texture */}
      <div
        className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          backgroundSize: "300px 300px",
        }}
      />

      {/* Ambient amber glow at bottom */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-48 bg-amber-500/10 blur-3xl rounded-full pointer-events-none" />

      {/* Hero content — bottom-center */}
      <div
        className={`relative z-10 text-center px-6 pb-28 md:pb-36 w-full max-w-5xl mx-auto transition-all duration-1000 ease-out ${
          mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}
      >
        {/* Role pill */}
        <div className={`inline-flex items-center gap-2 rounded-full px-4 py-1.5 mb-6 border ${isDark ? "border-white/15" : "border-black/15"}`}>
          <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
          <span className={`text-xs font-semibold tracking-[0.2em] uppercase ${isDark ? "text-white/60" : "text-[#444444]"}`}>
            Available for work
          </span>
        </div>

        {/* H1 — typed name */}
        <h1 className={`font-display text-[clamp(3.5rem,12vw,9rem)] font-bold leading-none tracking-tight mb-5 ${isDark ? "text-white" : "text-[#111111]"}`}>
          {displayed}
          <span
            className={`inline-block w-[0.06em] h-[0.82em] bg-amber-400 ml-1 align-middle ${
              done ? "animate-pulse" : "animate-none opacity-100"
            }`}
          />
        </h1>

        {/* Role */}
        <p className={`font-body text-sm md:text-base font-medium tracking-[0.3em] uppercase mb-2 ${isDark ? "text-white/50" : "text-[#444444]"}`}>
          FullStack Developer{" "}
          <span className="text-amber-400 font-bold">&amp;</span> AI
        </p>

        {/* Location */}
        <p className={`font-body text-xs md:text-sm tracking-[0.25em] uppercase ${isDark ? "text-white/30" : "text-[#666666]"}`}>
          Based in Delhi, India
        </p>

        {/* CTAs */}
        <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
          <a
            href="#service"
            onClick={(e) => {
              e.preventDefault();
              smoothScrollTo("#service");
            }}
            className="inline-flex items-center gap-2 bg-amber-400 text-black text-sm font-bold tracking-wider uppercase px-7 py-3.5 rounded-full hover:bg-amber-300 transition-all duration-200 hover:scale-105 hover:shadow-[0_0_30px_rgba(212,163,88,0.4)]"
          >
            View Services
          </a>
          <a
            href="#about"
            onClick={(e) => {
              e.preventDefault();
              smoothScrollTo("#about");
            }}
            className={`inline-flex items-center gap-2 border text-sm font-medium tracking-wider uppercase px-7 py-3.5 rounded-full transition-all duration-200 ${isDark ? "border-white/20 text-white/70 hover:border-amber-400/40 hover:text-white" : "border-black/20 text-[#444444] hover:border-amber-400/60 hover:text-[#111111]"}`}
          >
            About Me
          </a>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className={`absolute bottom-7 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 ${isDark ? "text-white/30" : "text-[#888888]"}`}>
        <span className="text-[10px] tracking-[0.25em] uppercase font-semibold">Scroll</span>
        <div className="relative w-px h-10 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-white/50 to-transparent animate-[scroll-line_1.8s_ease-in-out_infinite]" />
        </div>
        <ChevronDown size={14} className="animate-bounce" />
      </div>
    </section>
  );
}

function ServicesSection() {
  const { ref: headRef, visible: headVisible } = useReveal(0.2);
  const { ref: bodyRef, visible: bodyVisible } = useReveal(0.2);
  const { ref: statsRef, visible: statsVisible } = useReveal(0.15);

  return (
    <section
      id="service"
      className="relative w-full min-h-screen flex items-center py-28 md:py-36 overflow-hidden bg-[#f5f4f0] dark:bg-[#161616]"
      aria-label="Services and expertise"
    >
      {/* Amber ambient glow */}
      <div className="absolute top-1/2 right-0 -translate-y-1/2 w-[500px] h-[500px] bg-amber-400/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-28 items-start">

          {/* Left column — headline + body + stats */}
          <div>
            <p className="font-mono text-xs font-semibold text-amber-400 tracking-[0.3em] uppercase mb-6">
              What I Do
            </p>

            <div ref={headRef}>
              <h2
                className={`font-display text-[clamp(2.8rem,6vw,5.5rem)] font-bold text-foreground leading-[1.05] tracking-tight transition-all duration-1000 ${
                  headVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                }`}
              >
                Here&apos;s what I{" "}
                <em className="text-amber-400 not-italic">actually</em>
                {" "}do
              </h2>
            </div>

            <div ref={bodyRef}>
              <p
                className={`font-body mt-8 text-base md:text-[1.05rem] text-muted-foreground leading-[1.75] max-w-lg transition-all duration-1000 ${
                  bodyVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                }`}
                style={{ transitionDelay: "150ms" }}
              >
                I architect and ship scalable full-stack applications — from meticulously
                crafted interfaces to resilient cloud-native backends. My workflow is{" "}
                <span className="text-foreground font-medium">AI-enhanced</span>, my
                designs are user-obsessed, and my code is built to last. I bridge engineering
                precision with product thinking using React, Node.js, Python, and modern
                distributed infrastructure.
              </p>
            </div>

            {/* Divider line */}
            <div
              className={`mt-12 w-14 h-px bg-amber-400/70 transition-all duration-1000 ${
                bodyVisible ? "opacity-100 scale-x-100" : "opacity-0 scale-x-0"
              } origin-left`}
              style={{ transitionDelay: "300ms" }}
            />

            {/* Stats */}
            <div ref={statsRef} className="mt-8 flex gap-10 md:gap-14">
              {STATS.map((s, i) => (
                <div
                  key={s.label}
                  className={`transition-all duration-700 ${
                    statsVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
                  }`}
                  style={{ transitionDelay: `${400 + i * 100}ms` }}
                >
                  <div className="font-display text-3xl md:text-4xl font-bold text-foreground">
                    {s.value}
                  </div>
                  <div className="font-body text-xs text-muted-foreground tracking-[0.2em] uppercase mt-1">
                    {s.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right column — skill tags + expertise list */}
          <div>
            <p className="font-mono text-xs font-semibold text-muted-foreground tracking-[0.25em] uppercase mb-7">
              Core Competencies
            </p>

            {/* Skill tags */}
            <div className="flex flex-wrap gap-2.5">
              {SKILL_TAGS.map((tag, i) => (
                <SkillTag key={tag} label={tag} delay={i * 70} />
              ))}
            </div>

            {/* Expertise list */}
            <div className="mt-12">
              <p className="font-mono text-xs font-semibold text-muted-foreground tracking-[0.25em] uppercase mb-6">
                Tech Stack
              </p>
              <div>
                {EXPERTISE.map((item, i) => (
                  <ExpertiseRow key={item.index} item={item} delay={i * 80} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function WorkSection() {
  const { ref: titleRef, visible: titleVisible } = useReveal(0.2);
  const { ref: contentRef, visible: contentVisible } = useReveal(0.2);
  const { ref: imageRef, visible: imageVisible } = useReveal(0.15);

  return (
    <section
      id="work"
      className="relative w-full min-h-screen flex items-center py-28 md:py-36 overflow-hidden bg-[#efefef] dark:bg-background"
      aria-label="Work and projects"
    >
      {/* Ambient glow */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-[500px] h-[500px] bg-amber-400/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">

          {/* Left — Showcase Image */}
          <div
            ref={imageRef}
            className={`relative group transition-all duration-1000 ${
              imageVisible ? "opacity-100 scale-100" : "opacity-0 scale-95"
            }`}
          >
            <div className="relative aspect-[4/5] rounded-3xl overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwyfHxtb2Rlcm4lMjB3ZWIlMjBkZXZlbG9wbWVudCUyMHdvcmtzcGFjZSUyMHNldHVwJTIwZGVza3xlbnwxfHx8fDE3Nzk0MjkzMTh8MA&ixlib=rb-4.1.0&q=80&w=1080"
                alt="Modern web development workspace with code on screen"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              {/* Glow overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-amber-400/20 via-transparent to-transparent opacity-60" />
            </div>
            {/* Shadow effect */}
            <div className="absolute inset-0 rounded-3xl shadow-[0_25px_60px_-15px_rgba(212,163,88,0.25)] group-hover:shadow-[0_30px_70px_-15px_rgba(212,163,88,0.35)] transition-shadow duration-700" />
          </div>

          {/* Right — Content */}
          <div>
            <div ref={titleRef}>
              <h2
                className={`font-display text-[clamp(2.5rem,5vw,4.5rem)] font-bold text-foreground leading-[1.08] tracking-tight mb-6 transition-all duration-1000 ${
                  titleVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                }`}
              >
                Building Digital Experiences That{" "}
                <span className="text-amber-400">Actually Matter</span>
              </h2>
            </div>

            <div ref={contentRef}>
              <p
                className={`font-body text-base md:text-[1.05rem] text-muted-foreground leading-[1.75] mb-10 transition-all duration-1000 ${
                  contentVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                }`}
                style={{ transitionDelay: "100ms" }}
              >
                I specialize in building scalable, high-performance web applications that solve
                real-world problems. From pixel-perfect responsive UIs to robust backend
                architectures, I bring a full-stack perspective to every project. My work is
                driven by modern technologies, AI-powered workflows, and a relentless focus on
                performance optimization and user experience.
              </p>

              {/* Professional list */}
              <ul
                className={`space-y-3 mb-10 transition-all duration-1000 ${
                  contentVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                }`}
                style={{ transitionDelay: "200ms" }}
              >
                {WORK_HIGHLIGHTS.map((item, i) => (
                  <li
                    key={item}
                    className="flex items-start gap-3 group"
                    style={{ transitionDelay: `${250 + i * 50}ms` }}
                  >
                    <div className="mt-1 w-5 h-5 rounded-full bg-amber-400/10 flex items-center justify-center shrink-0">
                      <Check size={12} className="text-amber-400" />
                    </div>
                    <span className="text-sm font-medium text-foreground/90 group-hover:text-amber-400 transition-colors duration-200">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>

              {/* Skill tags */}
              <div
                className={`flex flex-wrap gap-2 transition-all duration-1000 ${
                  contentVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                }`}
                style={{ transitionDelay: "450ms" }}
              >
                {WORK_SKILLS.map((skill, i) => (
                  <span
                    key={skill}
                    className="inline-flex items-center gap-1.5 border border-border px-4 py-1.5 rounded-full text-xs font-medium text-muted-foreground hover:text-foreground hover:border-amber-400/60 hover:bg-amber-400/5 transition-all duration-300 cursor-default"
                  >
                    <span className="w-1 h-1 rounded-full bg-amber-400" />
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function AboutSection() {
  const { ref: titleRef, visible: titleVisible } = useReveal(0.2);
  const { ref: contentRef, visible: contentVisible } = useReveal(0.2);
  const { ref: imageRef, visible: imageVisible } = useReveal(0.15);

  return (
    <section
      id="about"
      className="relative w-full min-h-screen flex items-center py-28 md:py-36 overflow-hidden bg-[#f5f4f0] dark:bg-[#161616]"
      aria-label="About Ganesh Thakur"
    >
      {/* Ambient glow */}
      <div className="absolute top-1/2 right-0 -translate-y-1/2 w-[500px] h-[500px] bg-amber-400/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">

          {/* Left — Content */}
          <div className="order-2 lg:order-1">
            <div ref={titleRef}>
              <h2
                className={`font-display text-[clamp(2.5rem,5vw,4.5rem)] font-bold text-foreground leading-[1.08] tracking-tight mb-6 transition-all duration-1000 ${
                  titleVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                }`}
              >
                More Than Just{" "}
                <span className="text-amber-400">Another Developer</span>
              </h2>
            </div>

            <div ref={contentRef}>
              <p
                className={`font-body text-base md:text-[1.05rem] text-muted-foreground leading-[1.75] transition-all duration-1000 ${
                  contentVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                }`}
                style={{ transitionDelay: "100ms" }}
              >
                I'm <span className="text-foreground font-semibold">Ganesh Thakur</span>, a
                Computer Science graduate and Full Stack Developer with a passion for creating
                digital products that make an impact. My journey in tech is fueled by curiosity —
                whether it's exploring the latest in AI, diving into game development, or
                discovering new cities while traveling.
                <br />
                <br />
                I believe the best solutions come from blending design intuition with engineering
                rigor. When I'm not writing code or architecting systems, you'll find me gaming,
                exploring creative ideas, or dreaming up the next big thing. I'm a problem solver
                at heart, and I love turning complex challenges into elegant, scalable solutions.
              </p>
            </div>
          </div>

          {/* Right — Portrait Image */}
          <div
            ref={imageRef}
            className={`order-1 lg:order-2 relative group transition-all duration-1000 ${
              imageVisible ? "opacity-100 scale-100" : "opacity-0 scale-95"
            }`}
          >
            <div className="relative aspect-[4/5] rounded-3xl overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1558730234-d8b2281b0d00?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwzfHxwcm9mZXNzaW9uYWwlMjBkZXZlbG9wZXIlMjBwb3J0cmFpdCUyMHN0dWRpbyUyMGxpZ2h0aW5nfGVufDF8fHx8MTc3OTQyOTMxOHww&ixlib=rb-4.1.0&q=80&w=1080"
                alt="Portrait of Ganesh Thakur, Full Stack Developer"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              {/* Soft lighting overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-amber-400/10 via-transparent to-transparent opacity-40" />
            </div>
            {/* Shadow effect */}
            <div className="absolute inset-0 rounded-3xl shadow-[0_25px_60px_-15px_rgba(212,163,88,0.25)] group-hover:shadow-[0_30px_70px_-15px_rgba(212,163,88,0.35)] transition-shadow duration-700" />
          </div>
        </div>
      </div>
    </section>
  );
}

function ContactSection() {
  const { ref: titleRef, visible: titleVisible } = useReveal(0.2);
  const { ref: contentRef, visible: contentVisible } = useReveal(0.2);

  return (
    <section
      id="contact"
      className="relative w-full min-h-screen flex items-center justify-center py-28 md:py-36 overflow-hidden"
      aria-label="Contact information"
    >
      {/* Radial gradient background */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-amber-400/[0.02] to-transparent pointer-events-none" />

      {/* Central glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-amber-400/10 blur-[150px] rounded-full pointer-events-none" />

      <div className="relative z-10 max-w-4xl mx-auto px-6 md:px-10 w-full text-center">
        <div ref={titleRef}>
          <h2
            className={`font-display text-[clamp(3.5rem,8vw,7rem)] font-bold text-foreground leading-none tracking-tight mb-6 transition-all duration-1000 ${
              titleVisible ? "opacity-100 scale-100" : "opacity-0 scale-95"
            }`}
          >
            Let&apos;s <span className="text-amber-400">Connect</span>
          </h2>
        </div>

        <div ref={contentRef}>
          <p
            className={`font-body text-base md:text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto mb-14 transition-all duration-1000 ${
              contentVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
            style={{ transitionDelay: "150ms" }}
          >
            Whether you're looking to collaborate on a project, need help with AI-powered
            solutions, or just want to chat about tech and creative ideas — I'd love to hear
            from you.
          </p>

          {/* Social links */}
          <div
            className={`flex items-center justify-center gap-4 md:gap-5 transition-all duration-1000 ${
              contentVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
            style={{ transitionDelay: "300ms" }}
          >
            {SOCIAL_LINKS.map((social, i) => (
              <SocialButton
                key={social.label}
                icon={social.icon}
                label={social.label}
                href={social.href}
                delay={350 + i * 60}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="relative w-full border-t border-border bg-background" aria-label="Footer">
      <div className="max-w-7xl mx-auto px-6 md:px-10 py-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
          {/* Left */}
          <div className="flex items-center gap-6">
            <a
              href="#"
              className="hover:text-foreground transition-colors duration-200"
            >
              Cookies
            </a>
            <a
              href="#"
              className="hover:text-foreground transition-colors duration-200"
            >
              Privacy
            </a>
          </div>

          {/* Right */}
          <div className="font-mono text-xs">
            <a
              href="mailto:ganeshkr.in90@gmail.com"
              className="hover:text-amber-400 transition-colors duration-200"
            >
              ganeshkr.in90@gmail.com
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

function ThemeToggle({
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

// ─── App root ─────────────────────────────────────────────────────────────────

export default function App() {
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", isDark);
  }, [isDark]);

  // Ensure dark class is set on first render
  useEffect(() => {
    document.documentElement.classList.add("dark");
  }, []);

  return (
    <div
      className="bg-background text-foreground min-h-screen transition-colors duration-500"
      style={{ fontFamily: "var(--font-body, 'DM Sans', sans-serif)" }}
    >
      <Header />
      <main>
        <HeroSection />
        <ServicesSection />
        <WorkSection />
        <AboutSection />
        <ContactSection />
      </main>
      <Footer />
      <ThemeToggle isDark={isDark} onToggle={() => setIsDark((d) => !d)} />

      {/* Global scroll-line keyframe */}
      <style>{`
        @keyframes scroll-line {
          0% { transform: translateY(-100%); opacity: 1; }
          100% { transform: translateY(200%); opacity: 0; }
        }
      `}</style>
    </div>
  );
}
