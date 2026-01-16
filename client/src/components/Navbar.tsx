import { Link } from "wouter";

export default function Navbar() {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <nav className="fixed top-0 left-0 w-full z-[100] bg-black/40 backdrop-blur-xl border-b border-white/5">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        
        {/* Logo */}
        <Link href="/">
          <a className="font-orbitron text-2xl font-black tracking-[0.3em] text-white flex items-center gap-2 group">
            <div className="w-2 h-2 bg-primary group-hover:animate-ping" />
            ASCENT
          </a>
        </Link>

        {/* Navigation Links */}
        <div className="hidden md:flex gap-10 text-[10px] font-mono uppercase tracking-[0.4em] text-white/50">
          <button 
            onClick={() => scrollToSection('hero')} 
            className="hover:text-primary transition-colors cursor-pointer"
          >
            Home
          </button>
          <Link href="/About">
            <a className="hover:text-white transition-colors">THE TRIALS</a>
          </Link>
          <Link href="/registration">
            <a className="hover:text-white transition-colors">Enlist</a>
          </Link>
          <Link href="/rules">
            <a className="hover:text-white transition-colors">Rule Book</a>
          </Link>
        </div>

        {/* Mobile Status Indicator */}
        <div className="flex items-center gap-2 font-mono text-[9px] text-green-500/60">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
          </span>
          SYSTEM_ONLINE
        </div>
      </div>
    </nav>
  );
}