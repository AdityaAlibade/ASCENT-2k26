import { Link, useLocation } from "wouter";
import { useState, useEffect, useCallback, useMemo } from "react";

export default function Navbar() {
  const [location, setLocation] = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [showNavbar, setShowNavbar] = useState(false);

  // Memoized navigation items
  const navItems = useMemo(() => [
    { id: "home", label: "Home", href: "/", type: "link" },
    { id: "trials", label: "The Trials", href: "/about", type: "link" },
    { id: "enlist", label: "Enlist", href: "/registration", type: "link" },
    { id: "rules", label: "Rule Book", href: "/rules", type: "link" },
  ], []);

  // Handle intro completion
  useEffect(() => {
    const introCompleted = sessionStorage.getItem("introCompleted") === "true";
    if (introCompleted) {
      setShowNavbar(true);
    }

    const handleIntroComplete = () => {
      setShowNavbar(true);
      sessionStorage.setItem("introCompleted", "true");
    };

    window.addEventListener('introComplete', handleIntroComplete);
    
    return () => {
      window.removeEventListener('introComplete', handleIntroComplete);
    };
  }, []);

  // Scroll effect with throttle for performance
  useEffect(() => {
    let ticking = false;
    
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setScrolled(window.scrollY > 50);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleASCENTClick = useCallback(() => {
    // Clear the intro completion to restart animation
    sessionStorage.removeItem("introCompleted");
    
    // Clear any other session storage items if needed
    sessionStorage.clear();
    
    // Reload the page to restart from animation
    window.location.href = "/";
  }, []);

  // Do not render the navbar at all if the intro is still playing
  if (!showNavbar) return null;

  // Calculate navbar background based on state
  const navbarBackground = scrolled 
    ? "bg-black/95 backdrop-blur-xl border-b border-red-500/20 shadow-lg shadow-red-900/10"
    : "bg-gradient-to-b from-black/80 via-black/40 to-transparent backdrop-blur-lg";

  return (
    <nav className={`fixed top-0 left-0 w-full z-[9999] transition-all duration-300 ${navbarBackground}`}>
      {/* Surveillance UI Elements */}
      <div className="absolute inset-0 border border-red-500/10 pointer-events-none" />
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-red-500/50 to-transparent animate-pulse" />
      
      {/* Scanline overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(transparent_95%,rgba(239,68,68,0.05)_100%)] bg-[length:100%_3px] pointer-events-none" />
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 sm:py-4 flex items-center justify-between">
        
        {/* Logo/ASCENT Button - Restarts intro */}
        <button
          onClick={handleASCENTClick}
          className="font-orbitron text-xl sm:text-2xl font-black tracking-[0.2em] sm:tracking-[0.3em] text-white flex items-center gap-2 sm:gap-3 group relative py-2 px-3 sm:px-4 border border-white/10 hover:border-red-500/40 transition-all duration-300 hover:shadow-[0_0_20px_rgba(239,68,68,0.3)] bg-black/50 backdrop-blur-sm"
          aria-label="Restart ASCENT intro animation"
          title="Restart ASCENT intro"
        >
          {/* Animated logo elements */}
          <div className="flex gap-1 sm:gap-1.5">
            <div className="w-2 h-2 sm:w-2.5 sm:h-2.5 border border-red-500 rounded-full animate-[ping_2s_cubic-bezier(0,0,0.2,1)_infinite]" />
            <div className="w-2 h-2 sm:w-2.5 sm:h-2.5 border border-red-500 [clip-path:polygon(50%_0%,0%_100%,100%_100%)] group-hover:rotate-180 transition-transform duration-500" />
            <div className="w-2 h-2 sm:w-2.5 sm:h-2.5 border border-red-500 group-hover:rotate-45 transition-transform duration-500" />
          </div>
          
          {/* Animated gradient text */}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-white to-red-500 bg-[length:200%_auto] animate-gradient">
            ASCENT
          </span>
          
          {/* Restart indicator */}
          <div className="relative">
            <span className="absolute inset-0 animate-ping bg-red-600 rounded-full opacity-75" />
            <span className="relative block w-1.5 h-1.5 bg-red-600 rounded-full shadow-[0_0_8px_#ef4444]" />
          </div>

          {/* Tooltip */}
          <div className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 px-3 py-1 bg-black/90 backdrop-blur-sm border border-red-500/20 text-xs font-mono text-white opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap pointer-events-none">
            RESTART INTRO ANIMATION
            <div className="absolute top-full left-1/2 -translate-x-1/2 w-0 h-0 border-l-[6px] border-l-transparent border-t-[6px] border-t-black/90 border-r-[6px] border-r-transparent" />
          </div>
        </button>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-4 lg:gap-8">
          {navItems.map((item) => (
            <div key={item.id} className="relative group">
              <Link href={item.href!}>
                <a className={`px-4 py-2 text-sm font-mono uppercase tracking-[0.3em] transition-all relative overflow-hidden group ${
                  location === item.href 
                    ? "text-red-500 font-bold" 
                    : "text-white/70 hover:text-white hover:bg-white/5"
                }`}>
                  <span className="relative z-10">{item.label}</span>
                  <span className="absolute bottom-0 left-1/2 w-0 h-[1px] bg-red-600 group-hover:w-full group-hover:left-0 transition-all duration-300" />
                  
                  {/* Active page indicator */}
                  {location === item.href && (
                    <span className="absolute -top-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-red-600 rounded-full animate-pulse shadow-[0_0_8px_#ef4444]" />
                  )}
                </a>
              </Link>
            </div>
          ))}
        </div>

        {/* System Status Indicators */}
        <div className="flex items-center gap-3 sm:gap-4">
          <div className="flex items-center gap-2 sm:gap-3 font-mono text-[8px] sm:text-[9px]">
            <div className="flex items-center gap-1.5 sm:gap-2">
              <div className="relative flex h-1.5 w-1.5 sm:h-2 sm:w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-full w-full bg-red-600"></span>
              </div>
              <span className="text-red-500 font-bold tracking-widest whitespace-nowrap">REC ● LIVE</span>
            </div>
            
            <div className="hidden sm:block px-2 sm:px-3 py-1 border border-green-500/30 bg-gradient-to-r from-green-500/5 to-green-500/10 text-green-400 font-bold whitespace-nowrap">
              SYSTEM_ONLINE
            </div>

            {location !== "/" && (
              <div className="hidden lg:block px-2 sm:px-3 py-1 border border-red-500/30 bg-gradient-to-r from-red-500/5 to-red-500/10 text-red-500 font-bold whitespace-nowrap animate-pulse">
                BREACH_DETECTED
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden p-2 border border-white/10 hover:border-red-500/30 transition-colors"
            aria-label="Open menu"
            // Add your mobile menu handler here
          >
            <div className="space-y-1.5">
              <span className="block w-5 h-0.5 bg-white/70" />
              <span className="block w-5 h-0.5 bg-white/70" />
              <span className="block w-5 h-0.5 bg-white/70" />
            </div>
          </button>
        </div>
      </div>

      {/* Animated surveillance scan */}
      <div className="absolute bottom-0 left-0 right-0 h-[1px]">
        <div className="h-full bg-gradient-to-r from-transparent via-red-500/50 to-transparent animate-[navscan_3s_linear_infinite]" />
      </div>
    </nav>
  );
}