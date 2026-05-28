import { useState, useEffect, useRef } from "react";
import { ChevronDown, Check, Instagram, Youtube, Linkedin, Mail, Code2, Palette, Server, Sparkles } from "lucide-react";
import aboutPhoto from "../../imports/ChatGPT_Image_May_29__2026__01_21_53_AM.png";
import heroBg from "../../imports/IMG_4879.JPG";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";

// ─── Constants ────────────────────────────────────────────────────────────────

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
  { value: "12+", label: "Years Exp" },
  { value: "300+", label: "Projects" },
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

const SERVICE_CARDS = [
  {
    icon: Code2,
    title: "Web Application Development",
    description: "Building scalable, fast, and modern web applications focused on real-world usability and performance.",
    labels: ["Full Stack", "Scalable Systems", "Modern Architecture"],
  },
  {
    icon: Palette,
    title: "Frontend Development & UI Engineering",
    description: "Creating pixel-perfect responsive interfaces with smooth interactions and premium user experiences.",
    labels: ["ReactJS", "Responsive UI", "UX Focused"],
  },
  {
    icon: Server,
    title: "Backend Development & API Integration",
    description: "Developing secure backend systems, APIs, authentication flows, and optimized server-side architecture.",
    labels: ["NodeJS", "REST APIs", "Database Systems"],
  },
  {
    icon: Sparkles,
    title: "AI & Automation Solutions",
    description: "Integrating AI-powered workflows and smart automation systems to improve productivity and digital experiences.",
    labels: ["AI Workflows", "Automation", "Smart Systems"],
  },
];

// ─── Hooks ────────────────────────────────────────────────────────────────────

function useTypingEffect(text: string, speed = 75, repeatInterval = 15000) {
  const [displayed, setDisplayed] = useState("");
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (done || displayed.length >= text.length) {
      setDone(true);
      const resetTimer = setTimeout(() => {
        setDisplayed("");
        setDone(false);
      }, repeatInterval);
      return () => clearTimeout(resetTimer);
    }
    const timer = setTimeout(() => {
      setDisplayed(text.slice(0, displayed.length + 1));
    }, speed);
    return () => clearTimeout(timer);
  }, [displayed, text, speed, done, repeatInterval]);

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

function ServiceCard({
  card,
  delay = 0,
}: {
  card: (typeof SERVICE_CARDS)[number];
  delay?: number;
}) {
  const { ref, visible } = useReveal(0.1);
  const Icon = card.icon;

  return (
    <div
      ref={ref}
      className={`group relative p-8 rounded-2xl bg-card/40 backdrop-blur-sm border border-border hover:border-amber-400/60 hover:bg-amber-400/5 transition-all duration-500 hover:scale-[1.02] ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
      }`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      <div className="w-12 h-12 rounded-xl bg-amber-400/10 flex items-center justify-center mb-5 group-hover:bg-amber-400/20 transition-colors duration-300">
        <Icon size={24} className="text-amber-400" />
      </div>

      <h3 className="font-display text-xl md:text-2xl font-bold text-foreground mb-3 group-hover:text-amber-400 transition-colors duration-300">
        {card.title}
      </h3>

      <p className="text-sm text-muted-foreground leading-relaxed mb-5">
        {card.description}
      </p>

      <div className="flex flex-wrap gap-2">
        {card.labels.map((label) => (
          <span
            key={label}
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-secondary/50 text-muted-foreground border border-border/50"
          >
            <span className="w-1 h-1 rounded-full bg-amber-400" />
            {label}
          </span>
        ))}
      </div>

      <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-amber-400/0 via-amber-400/0 to-amber-400/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
    </div>
  );
}

// ─── Sections ─────────────────────────────────────────────────────────────────

function HeroSection() {
  const { displayed, done } = useTypingEffect("Ganesh Kumar", 90);
  const [mounted, setMounted] = useState(false);
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 120);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    setIsDark(document.documentElement.classList.contains('dark'));

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
      <div className={isDark ? "absolute inset-0 bg-zinc-950" : "absolute inset-0 bg-zinc-100"}>
        <img
          src={heroBg}
          alt="Hero background"
          className="w-full h-full object-cover object-center opacity-35 scale-105"
          loading="eager"
        />
      </div>

      {isDark ? (
        <>
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/55 to-black/10" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-transparent to-black/50" />
        </>
      ) : (
        <>
          <div className="absolute inset-0 bg-gradient-to-t from-white via-white/60 to-white/[0.06]" />
          <div className="absolute inset-0 bg-gradient-to-r from-white/25 via-transparent to-white/25" />
        </>
      )}

      <div
        className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          backgroundSize: "300px 300px",
        }}
      />

      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-48 bg-amber-500/10 blur-3xl rounded-full pointer-events-none" />

      <div
        className={`relative z-10 text-center px-6 pb-[150px] w-full max-w-5xl mx-auto transition-all duration-1000 ease-out ${
          mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}
      >
        <div className={`inline-flex items-center gap-2 rounded-full px-4 py-1.5 mb-6 border ${isDark ? "border-white/15" : "border-black/15"}`}>
          <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
          <span className={`text-xs font-semibold tracking-[0.2em] uppercase ${isDark ? "text-white/60" : "text-[#444444]"}`}>
            Available for work
          </span>
        </div>

        <h1 className={`font-display text-[clamp(3.5rem,12vw,9rem)] font-bold leading-none tracking-tight mb-5 ${isDark ? "text-white" : "text-[#111111]"}`}>
          {displayed}
          <span
            className={`inline-block w-[0.06em] h-[0.82em] bg-amber-400 ml-1 align-middle ${
              done ? "animate-pulse" : "animate-none opacity-100"
            }`}
          />
        </h1>

        <p className={`font-body text-sm md:text-base font-medium tracking-[0.3em] uppercase mb-2 ${isDark ? "text-white/50" : "text-[#444444]"}`}>
          FullStack AI Enhanced Developer - Travel{" "}
          <span className="text-amber-400 font-bold">&amp;</span> Creativity
        </p>

        <p className={`font-body text-xs md:text-sm tracking-[0.25em] uppercase ${isDark ? "text-white/30" : "text-[#666666]"}`}>
          Based in Delhi, India
        </p>

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
      <div className="absolute top-1/2 right-0 -translate-y-1/2 w-[500px] h-[500px] bg-amber-400/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div className="order-2 lg:order-1">
            <p className="font-mono text-xs font-semibold text-amber-400 tracking-[0.3em] uppercase mb-6">
              Technology & Experiences
            </p>

            <div ref={titleRef}>
              <h2
                className={`font-display text-[clamp(2.5rem,5vw,4.5rem)] font-bold text-foreground leading-[1.08] tracking-tight mb-6 transition-all duration-1000 ${
                  titleVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                }`}
              >
                Crafting Digital Experiences{" "}
                <span className="text-amber-400">Inspired by Real Life</span>
              </h2>
            </div>

            <div ref={contentRef}>
              <p
                className={`font-body text-base md:text-[1.05rem] text-muted-foreground leading-[1.75] transition-all duration-1000 ${
                  contentVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                }`}
                style={{ transitionDelay: "100ms" }}
              >
                I'm <span className="text-foreground font-semibold">Ganesh</span> — a Full Stack
                Developer who loves creating modern digital experiences, but honestly, my world is
                not limited to just coding.
                <br />
                <br />
                I enjoy traveling, exploring new places, gaming, and creating content around the
                things I experience and enjoy. Some of my best ideas actually come while traveling,
                walking through new streets, meeting new people, or simply spending time away from
                the screen.
                <br />
                <br />
                For me, life is all about balance between technology and experiences. I love
                building things online, but I equally enjoy living moments offline too.
                <br />
                <br />
                Whether it's creating websites, exploring a new destination, playing games, or
                working on creative ideas late at night — I'm always driven by curiosity and the
                excitement of learning something new.
              </p>
            </div>
          </div>

          <div
            ref={imageRef}
            className={`order-1 lg:order-2 relative group transition-all duration-1000 ${
              imageVisible ? "opacity-100 scale-100" : "opacity-0 scale-95"
            }`}
          >
            <div className="relative aspect-[4/5] rounded-3xl overflow-hidden">
              <ImageWithFallback
                src={aboutPhoto}
                alt="Portrait of Ganesh Thakur, Full Stack Developer"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-br from-amber-400/10 via-transparent to-transparent opacity-40" />
            </div>
            <div className="absolute inset-0 rounded-3xl shadow-[0_25px_60px_-15px_rgba(212,163,88,0.25)] group-hover:shadow-[0_30px_70px_-15px_rgba(212,163,88,0.35)] transition-shadow duration-700" />
          </div>
        </div>
      </div>
    </section>
  );
}

function TravelVideoSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;

      const rect = sectionRef.current.getBoundingClientRect();
      const sectionHeight = sectionRef.current.offsetHeight;
      const viewportHeight = window.innerHeight;

      const progress = Math.max(0, Math.min(1, -rect.top / (sectionHeight - viewportHeight)));
      setScrollProgress(isNaN(progress) ? 0 : progress);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const overlays = [
    { text: "Exploring Beyond Screens", start: 0.1, end: 0.3 },
    { text: "Inspired By Real Experiences", start: 0.4, end: 0.6 },
    { text: "Stories From Roads & Ideas", start: 0.7, end: 0.9 },
  ];

  const getOverlayOpacity = (start: number, end: number) => {
    const fadeIn = 0.05;
    const fadeOut = 0.05;
    const progress = scrollProgress || 0;

    if (progress < start) return 0;
    if (progress < start + fadeIn) {
      const opacity = (progress - start) / fadeIn;
      return isNaN(opacity) ? 0 : opacity;
    }
    if (progress < end - fadeOut) return 1;
    if (progress < end) {
      const opacity = (end - progress) / fadeOut;
      return isNaN(opacity) ? 0 : opacity;
    }
    return 0;
  };

  const safeProgress = scrollProgress || 0;
  const videoScale = 1 + safeProgress * 0.1;

  return (
    <section
      ref={sectionRef}
      className="relative w-full overflow-hidden"
      style={{ height: "600px" }}
      aria-label="Travel and experiences"
    >
      <div className="sticky top-0 left-0 w-full h-screen overflow-hidden">
        <div
          className="absolute inset-0 transition-transform duration-300 ease-out"
          style={{ transform: `scale(${isNaN(videoScale) ? 1 : videoScale})` }}
        >
          <video
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover"
            poster="https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=1920&h=1080&fit=crop&auto=format"
            loading="lazy"
          >
            <source
              src="https://cdn.pixabay.com/video/2022/11/09/138794-769997073_large.mp4"
              type="video/mp4"
            />
          </video>
        </div>

        <div className="absolute inset-0 bg-black/40 dark:bg-black/50" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/30" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-black/40" />

        <div
          className="absolute inset-0 opacity-[0.03] pointer-events-none"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
            backgroundSize: "300px 300px",
          }}
        />

        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          {overlays.map((overlay, i) => {
            const opacity = getOverlayOpacity(overlay.start, overlay.end);
            const translateY = isNaN(opacity) ? 0 : (1 - opacity) * 20;
            return (
              <div
                key={i}
                className="absolute inset-0 flex items-center justify-center px-6"
                style={{
                  opacity: isNaN(opacity) ? 0 : opacity,
                  transform: `translateY(${translateY}px)`,
                  transition: "opacity 0.3s ease-out, transform 0.3s ease-out",
                }}
              >
                <h3 className="font-display text-[clamp(2.5rem,6vw,5rem)] font-bold text-white leading-none tracking-tight text-center max-w-4xl">
                  {overlay.text}
                </h3>
              </div>
            );
          })}
        </div>

        <div
          className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-64 bg-amber-500/20 blur-[100px] rounded-full pointer-events-none"
          style={{ opacity: 0.3 + (scrollProgress || 0) * 0.4 }}
        />
      </div>
    </section>
  );
}

function WorkSection() {
  const { ref: headRef, visible: headVisible } = useReveal(0.2);
  const { ref: bodyRef, visible: bodyVisible } = useReveal(0.2);
  const { ref: statsRef, visible: statsVisible } = useReveal(0.15);

  return (
    <section
      id="work"
      className="relative w-full min-h-screen flex items-center py-28 md:py-36 overflow-hidden bg-[#efefef] dark:bg-background"
      aria-label="Work and projects"
    >
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-[500px] h-[500px] bg-amber-400/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-28 items-start">
          <div>
            <p className="font-mono text-xs font-semibold text-amber-400 tracking-[0.3em] uppercase mb-6">
              Skill Set
            </p>

            <div ref={headRef}>
              <h2
                className={`font-display text-[clamp(2.8rem,6vw,5.5rem)] font-bold text-foreground leading-[1.05] tracking-tight transition-all duration-1000 ${
                  headVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                }`}
              >
                Building Digital Experiences That{" "}
                <em className="text-amber-400 not-italic">Actually Matter</em>
              </h2>
            </div>

            <div ref={bodyRef}>
              <p
                className={`font-body mt-8 text-base md:text-[1.05rem] text-muted-foreground leading-[1.75] max-w-lg transition-all duration-1000 ${
                  bodyVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                }`}
                style={{ transitionDelay: "150ms" }}
              >
                I specialize in building scalable, high-performance web applications that solve
                real-world problems. From pixel-perfect responsive UIs to robust backend
                architectures, I bring a full-stack perspective to every project. My work is
                driven by modern technologies, AI-powered workflows, and a relentless focus on
                performance optimization and user experience.
              </p>
            </div>

            <div
              className={`mt-12 w-14 h-px bg-amber-400/70 transition-all duration-1000 ${
                bodyVisible ? "opacity-100 scale-x-100" : "opacity-0 scale-x-0"
              } origin-left`}
              style={{ transitionDelay: "300ms" }}
            />

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

          <div>
            <p className="font-mono text-xs font-semibold text-muted-foreground tracking-[0.25em] uppercase mb-7">
              What I Build
            </p>

            <div>
              {WORK_HIGHLIGHTS.map((item, i) => (
                <div
                  key={item}
                  className={`flex items-start gap-5 py-4 border-b border-border group hover:border-amber-400/30 transition-all duration-500 ${
                    bodyVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-6"
                  }`}
                  style={{ transitionDelay: `${i * 80}ms` }}
                >
                  <span className="text-xs text-amber-400 font-mono font-semibold mt-0.5 w-8 shrink-0 tabular-nums">
                    0{i + 1}
                  </span>
                  <div className="text-sm font-semibold text-foreground group-hover:text-amber-400 transition-colors duration-200">
                    {item}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-12">
              <p className="font-mono text-xs font-semibold text-muted-foreground tracking-[0.25em] uppercase mb-6">
                Tech Stack
              </p>
              <div className="flex flex-wrap gap-2.5">
                {WORK_SKILLS.map((skill, i) => (
                  <SkillTag key={skill} label={skill} delay={i * 70} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ServicesSection() {
  const { ref: titleRef, visible: titleVisible } = useReveal(0.2);
  const { ref: descRef, visible: descVisible } = useReveal(0.2);
  const { ref: cardsRef, visible: cardsVisible } = useReveal(0.15);

  return (
    <section
      id="service"
      className="relative w-full min-h-screen flex items-center py-28 md:py-36 overflow-hidden bg-[#f5f4f0] dark:bg-[#161616]"
      aria-label="Services and expertise"
    >
      <div className="absolute top-1/2 right-0 -translate-y-1/2 w-[500px] h-[500px] bg-amber-400/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-10 w-full">
        <div className="max-w-3xl mx-auto text-center mb-16 md:mb-20">
          <p className="font-mono text-xs font-semibold text-muted-foreground tracking-[0.3em] uppercase mb-6">
            What I Can Help You Build
          </p>

          <div ref={titleRef}>
            <h2
              className={`font-display text-[clamp(2.5rem,6vw,4.5rem)] font-bold text-foreground leading-[1.08] tracking-tight mb-6 transition-all duration-1000 ${
                titleVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
              }`}
            >
              Creating Modern Digital Products With{" "}
              <span className="text-amber-400">Performance, Design & Intelligence</span>
            </h2>
          </div>

          <div ref={descRef}>
            <p
              className={`font-body text-base md:text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto transition-all duration-1000 ${
                descVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
              style={{ transitionDelay: "150ms" }}
            >
              I build scalable digital products that combine thoughtful design with robust
              engineering. Every project is powered by AI-enhanced workflows, performance-focused
              development, and a deep commitment to creating user-centered experiences that solve
              real problems.
            </p>
          </div>
        </div>

        <div ref={cardsRef}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            {SERVICE_CARDS.map((card, i) => (
              <ServiceCard key={card.title} card={card} delay={i * 100} />
            ))}
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
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-amber-400/[0.02] to-transparent pointer-events-none" />
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

// ─── Main Export ──────────────────────────────────────────────────────────────

export function Home() {
  return (
    <>
      <HeroSection />
      <AboutSection />
      <TravelVideoSection />
      <WorkSection />
      <ServicesSection />
      <ContactSection />

      <style>{`
        @keyframes scroll-line {
          0% { transform: translateY(-100%); opacity: 1; }
          100% { transform: translateY(200%); opacity: 0; }
        }
      `}</style>
    </>
  );
}
