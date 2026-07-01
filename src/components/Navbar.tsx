import { useState, useEffect } from "react";

const Navbar = () => {
  const [theme, setTheme] = useState<"light" | "dark">("light");

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);

  const toggleTheme = () => setTheme(theme === "light" ? "dark" : "light");

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-white/80 dark:bg-brand-navy/80 backdrop-blur-md border-b border-black/5 dark:border-white/5 transition-colors duration-500">
      <div className="max-w-[1300px] mx-auto px-6 md:px-12 h-20 flex items-center justify-between">
        {/* Logo */}
        <div className="font-cormorant text-2xl font-bold text-brand-navy dark:text-white cursor-pointer">
          Solomon <span className="text-brand-gold italic">@ 70</span>
        </div>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8 font-space text-sm font-medium text-gray-600 dark:text-gray-300">
          <a href="#" className="hover:text-brand-gold transition-colors">Home</a>
          <a href="#about" className="hover:text-brand-gold transition-colors">About</a>
          <a href="#gallery" className="hover:text-brand-gold transition-colors">Gallery</a>
          <a href="#rsvp" className="hover:text-brand-gold transition-colors">RSVP</a>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-4">
          <button 
            onClick={toggleTheme}
            className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-gray-100 dark:bg-white/10 text-brand-navy dark:text-brand-gold font-space text-xs transition-colors hover:bg-gray-200 dark:hover:bg-white/20"
            aria-label="Toggle Theme"
          >
            {theme === "light" ? "🌙 Dark" : "☀️ Light"}
          </button>
          
          <a 
            href="#rsvp"
            className="hidden md:block bg-brand-gold text-white px-6 py-2 rounded-lg font-space font-bold text-sm hover:shadow-[0_4px_15px_rgba(201,168,76,0.4)] hover:-translate-y-0.5 transition-all"
          >
            RSVP Now
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
