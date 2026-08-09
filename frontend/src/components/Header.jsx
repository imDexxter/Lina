import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      data-testid="site-header"
      className={`fixed inset-x-0 top-0 z-40 transition-[background-color,backdrop-filter,border-color] duration-300 ${
        scrolled ? "border-b border-line bg-ink/70 backdrop-blur-xl" : "border-b border-transparent bg-transparent"
      }`}
    >
      <div className="mx-auto flex h-14 w-full max-w-[520px] items-center justify-between px-5">
        <a href="/" data-testid="header-logo" className="font-display text-lg font-bold tracking-tight">
          lina.
        </a>
        <button
          data-testid="header-login-button"
          onClick={() => navigate("/access")}
          className="rounded-full border border-line px-4 py-1.5 text-xs font-medium text-white/80 transition-colors duration-200 hover:bg-white/5 hover:text-white"
        >
          Se connecter
        </button>
      </div>
    </header>
  );
};
