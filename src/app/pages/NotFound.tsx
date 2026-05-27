import { Link } from "react-router";

export function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center px-6">
      <div className="text-center">
        <h1 className="font-display text-[clamp(4rem,12vw,8rem)] font-bold text-foreground leading-none tracking-tight mb-4">
          404
        </h1>
        <p className="font-body text-xl md:text-2xl text-muted-foreground mb-8">
          Page not found
        </p>
        <Link
          to="/"
          className="inline-flex items-center gap-2 bg-amber-400 text-black text-sm font-bold tracking-wider uppercase px-7 py-3.5 rounded-full hover:bg-amber-300 transition-all duration-200 hover:scale-105"
        >
          Go Home
        </Link>
      </div>
    </div>
  );
}
