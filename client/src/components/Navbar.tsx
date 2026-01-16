import { Link, useLocation } from "wouter";
import { useState, useEffect } from "react";

export default function Navbar() {
  const [location, setLocation] = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [showNavbar, setShowNavbar] = useState(false);

  useEffect(() => {
    // 1. Initial check: If intro was already completed in this session, show navbar
    const introCompleted = sessionStorage.getItem("introCompleted") === "true";
    if (introCompleted) {
      setShowNavbar(true);
    }

    // 2. Listen for the custom 'introComplete' event from your IntroOverlay
    const handleIntroComplete = () => {
      setShowNavbar(true);
      sessionStorage.setItem("introCompleted", "true");
    };

    window.addEventListener('introComplete', handleIntroComplete);

    // 3. Handle scroll effect for background transparency
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    
    return () => {
      window.removeEventListener('introComplete', handleIntroComplete);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleHomeClick = () => {
    // Ensure we don't show the intro again when clicking the logo
    sessionStorage.setItem("introCompleted", "true");
    setLocation("/");
  };

  const scrollToSection = (id: string) => {
    if (location !== "/") {
      setLocation("/");
      // Wait for navigation to home page before scrolling
      setTimeout(() => {
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      }, 100);
    } else {
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  // Do not render the navbar at all if the intro is still playing
  if (!showNavbar) return null;

  return (
    <nav className={`fixed top-0 left-0 w-full z-[9999] transition-all duration-500 ${
      scrolled ? "bg-black/90 backdrop-blur-xl border-b border-red-500/20" : "bg-black/20 backdrop-blur-md"
    }`}>
      {/* CCTV Border & Scanline Effect */}
      <div className="absolute inset-0 border border-red-500/5 pointer-events-none" />
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-red-500/40 to-transparent" />
      
      <div className="relative max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        
        {/* Logo Section */}
        <button
          onClick={handleHomeClick}
          className="font-orbitron text-2xl font-black tracking-[0.3em] text-white flex items-center gap-3 group relative py-2 px-4 border border-white/5 hover:border-red-500/30 transition-all"
        >
          <div className="flex gap-1.5">
            <div className="w-2.5 h-2.5 border border-red-500 rounded-full" /> {/* Circle */}
            <div className="w-2.5 h-2.5 border border-red-500 [clip-path:polygon(50%_0%,0%_100%,100%_100%)]" /> {/* Triangle */}
            <div className="w-2.5 h-2.5 border border-red-500" /> {/* Square */}
          </div>
          
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-white to-red-500">
            ASCENT
          </span>
          <div className="w-1.5 h-1.5 bg-red-600 rounded-full animate-pulse shadow-[0_0_8px_#ef4444]" />
        </button>

        {/* Navigation Links */}
        <div className="hidden md:flex gap-6 text-[10px] font-mono uppercase tracking-[0.4em]">
          {[
            { label: "Home", action: () => scrollToSection('hero') },
            { label: "The Trials", href: "/About" },
            { label: "Enlist", href: "/registration" },
            { label: "Rule Book", href: "/rules" },
          ].map((item) => (
            <div key={item.label} className="relative group">
              {item.action ? (
                <button
                  onClick={item.action}
                  className="px-4 py-2 text-white/50 hover:text-white transition-all hover:bg-white/5"
                >
                  {item.label}
                </button>
              ) : (
                <Link href={item.href!}>
                  <a className={`px-4 py-2 transition-all hover:bg-white/5 ${
                    location === item.href ? "text-red-500" : "text-white/50 hover:text-white"
                  }`}>
                    {item.label}
                  </a>
                </Link>
              )}
              <div className={`absolute bottom-0 left-0 h-[1px] bg-red-600 transition-all duration-300 ${
                location === item.href ? "w-full" : "w-0 group-hover:w-full"
              }`} />
            </div>
          ))}
        </div>

        {/* System Status Indicators */}
        <div className="flex items-center gap-4 font-mono text-[9px]">
          <div className="flex items-center gap-2">
            <div className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-red-600"></span>
            </div>
            <span className="text-red-500 font-bold tracking-widest">REC ● LIVE</span>
          </div>
          
          <div className="hidden sm:block px-3 py-1 border border-green-500/20 bg-green-500/5 text-green-400 font-bold">
            SYSTEM_ONLINE
          </div>

          {location !== "/" && (
            <div className="px-3 py-1 border border-red-500/30 bg-red-500/10 text-red-500 animate-pulse font-bold">
              BREACH_DETECTED
            </div>
          )}
        </div>
      </div>

      {/* Surveillance Scan Effect */}
      <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-red-500/30 to-transparent animate-[navscan_3s_linear_infinite]" />
      
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes navscan {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
      `}} />
    </nav>
  );
}