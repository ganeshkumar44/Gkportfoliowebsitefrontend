import { useState, useEffect } from "react";
import { Outlet, useLocation } from "react-router";
import { Header } from "./Header";
import { Footer } from "./Footer";

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

export function Layout() {
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", isDark);
  }, [isDark]);

  useEffect(() => {
    document.documentElement.classList.add("dark");
  }, []);

  return (
    <div
      className="bg-background text-foreground min-h-screen transition-colors duration-500"
      style={{ fontFamily: "var(--font-body, 'DM Sans', sans-serif)" }}
    >
      <ScrollToTop />
      <Header isDark={isDark} onToggleTheme={() => setIsDark((d) => !d)} />
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
