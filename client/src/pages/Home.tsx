import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useGameStats } from "@/hooks/use-players";
import { RegistrationForm } from "@/components/RegistrationForm";
import { Circle, Triangle, Square, FloatingShapes } from "@/components/ui/GameShapes";
import { ChevronDown, AlertTriangle, Clock, Trophy, ShieldAlert, Video } from "lucide-react";

const CountdownTimer = () => {
  const [time, setTime] = useState("48:12:09");

  useEffect(() => {
    // Just a visual effect for the demo
    const interval = setInterval(() => {
      const now = new Date();
      const target = new Date();
      target.setHours(23, 59, 59);
      
      const diff = target.getTime() - now.getTime();
      const h = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const m = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const s = Math.floor((diff % (1000 * 60)) / 1000);
      
      setTime(`${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="font-orbitron font-black text-4xl md:text-6xl text-white tracking-widest tabular-nums text-glow">
      {time}
    </div>
  );
};

const IntroOverlay = ({ onComplete }: { onComplete: () => void }) => {
  const [step, setStep] = useState(0);

  useEffect(() => {
    const timer1 = setTimeout(() => setStep(1), 1000);
    const timer2 = setTimeout(() => setStep(2), 2500);
    const timer3 = setTimeout(() => setStep(3), 4000);
    
    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, []);

  return (
    <motion.div 
      className="fixed inset-0 z-[100] bg-black flex flex-col items-center justify-center p-4 overflow-hidden"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1.5, ease: "easeInOut" }}
    >
      {/* Cinematic Background Elements */}
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-32 h-32 border border-white/20 rounded-full animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-32 h-32 border border-white/20 animate-pulse delay-700" />
      </div>

      <div className="max-w-2xl text-center space-y-12 relative z-10">
        <div className="space-y-4">
          <AnimatePresence mode="wait">
            {step >= 1 && (
              <motion.div
                key="welcome"
                initial={{ opacity: 0, scale: 1.1 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 2 }}
              >
                <h1 className="font-orbitron text-4xl md:text-6xl text-white font-black tracking-[0.3em] uppercase drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]">
                  WELCOME.
                </h1>
              </motion.div>
            )}
          </AnimatePresence>
          
          <AnimatePresence mode="wait">
            {step >= 2 && (
              <motion.div
                key="selected"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 1 }}
                className="space-y-4"
              >
                <p className="font-montserrat text-lg md:text-xl text-primary font-bold tracking-[0.4em] uppercase">
                  You have been selected.
                </p>
                <p className="font-montserrat text-sm md:text-base text-white/60 tracking-widest uppercase italic">
                  This is your invitation to the Squid Game.
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {step >= 3 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          >
            <button
              onClick={onComplete}
              className="group relative px-12 py-4 overflow-hidden bg-transparent border border-primary/50 transition-all duration-500 hover:border-primary"
            >
              <div className="absolute inset-0 bg-primary/10 group-hover:bg-primary/20 transition-colors" />
              <div className="absolute -inset-full bg-gradient-to-r from-transparent via-white/10 to-transparent group-hover:animate-[shimmer_2s_infinite] pointer-events-none" />
              <span className="relative font-orbitron font-bold text-primary tracking-[0.3em] group-hover:text-white transition-colors">
                CONTINUE
              </span>
            </button>
          </motion.div>
        )}
      </div>
      
      {/* Surveillance scanline and grain */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-30">
        <div className="scanline" />
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 contrast-150 brightness-50" />
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes shimmer {
          100% { transform: translateX(100%); }
        }
      `}} />
    </motion.div>
  );
};

export default function Home() {
  const [showIntro, setShowIntro] = useState(true);
  const { data: stats } = useGameStats();

  if (showIntro) {
    return <AnimatePresence><IntroOverlay onComplete={() => setShowIntro(false)} /></AnimatePresence>;
  }

  return (
    <div className="min-h-screen bg-black text-white selection:bg-primary selection:text-white overflow-hidden relative">
      <div className="scanline" />
      <div className="vignette" />
      <FloatingShapes />

      {/* Hero Section */}
      <section className="relative h-screen flex flex-col items-center justify-center px-4 z-10">
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-center space-y-6"
        >
          <div className="flex justify-center gap-4 md:gap-8 mb-8">
            <Circle className="w-12 h-12 md:w-20 md:h-20 stroke-white" size={80} />
            <Triangle className="w-12 h-12 md:w-20 md:h-20 stroke-white" size={80} />
            <Square className="w-12 h-12 md:w-20 md:h-20 stroke-white" size={80} />
          </div>

          <h1 className="font-orbitron text-5xl md:text-8xl font-black tracking-tighter text-white mb-2">
            SQUID GAME
          </h1>
          
          <p className="font-montserrat text-lg md:text-2xl text-gray-400 tracking-widest uppercase">
            A Game Where Only the Best Survive
          </p>

          <div className="py-12">
            <p className="text-primary font-bold tracking-widest mb-4 font-mono text-sm">NEXT GAME BEGINS IN</p>
            <CountdownTimer />
          </div>

          <motion.a 
            href="#register"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-block bg-primary text-white font-orbitron font-bold text-xl px-12 py-4 tracking-widest hover:shadow-[0_0_30px_rgba(255,0,96,0.6)] transition-all duration-300 border border-white/20"
          >
            ENTER THE GAME
          </motion.a>

          {stats && (
            <p className="mt-8 font-mono text-sm text-gray-500">
              CURRENT PLAYERS REGISTERED: <span className="text-primary font-bold">{stats.totalPlayers}</span>
            </p>
          )}
        </motion.div>

        <motion.div 
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 opacity-50"
        >
          <ChevronDown className="w-8 h-8" />
        </motion.div>
      </section>

      {/* Info Cards Section */}
      <section className="py-24 px-4 relative z-10 bg-gradient-to-b from-black via-[#0a0a0a] to-black">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Card 1 */}
          <div className="glass-panel p-8 group hover:border-primary/50 transition-colors duration-300">
            <div className="flex justify-between items-start mb-6">
              <Trophy className="w-10 h-10 text-primary" />
              <Circle size={32} color="var(--primary)" />
            </div>
            <h3 className="text-2xl font-bold mb-4 text-white">The Prize</h3>
            <p className="font-montserrat text-gray-400 leading-relaxed">
              45.6 Billion Won awaits the winner. Everything you desire is within reach. Do you have what it takes to seize it?
            </p>
          </div>

          {/* Card 2 */}
          <div className="glass-panel p-8 group hover:border-primary/50 transition-colors duration-300">
            <div className="flex justify-between items-start mb-6">
              <ShieldAlert className="w-10 h-10 text-primary" />
              <Triangle size={32} color="var(--primary)" />
            </div>
            <h3 className="text-2xl font-bold mb-4 text-white">The Rules</h3>
            <ul className="font-montserrat text-gray-400 space-y-2 list-disc list-inside">
              <li>Player must compete in 6 games.</li>
              <li>Players who refuse to play will be eliminated.</li>
              <li className="text-red-500 font-bold">Elimination means death.</li>
            </ul>
          </div>

          {/* Card 3 */}
          <div className="glass-panel p-8 group hover:border-primary/50 transition-colors duration-300">
            <div className="flex justify-between items-start mb-6">
              <Video className="w-10 h-10 text-primary" />
              <Square size={32} color="var(--primary)" />
            </div>
            <h3 className="text-2xl font-bold mb-4 text-white">Surveillance</h3>
            <p className="font-montserrat text-gray-400 leading-relaxed">
              We are always watching. Fairness is absolute. Any attempt to cheat or subvert the rules will result in immediate termination.
            </p>
          </div>

        </div>
      </section>

      {/* Registration Section */}
      <section id="register" className="py-24 px-4 relative z-10">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black mb-4 text-white">PLAYER REGISTRATION</h2>
            <div className="w-24 h-1 bg-primary mx-auto mb-6" />
            <p className="font-montserrat text-gray-400 max-w-2xl mx-auto">
              By submitting this form, you consent to all terms and conditions of the game. 
              Once the game begins, it cannot be stopped.
            </p>
          </div>

          <RegistrationForm />
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-white/10 text-center font-mono text-xs text-gray-600 relative z-10">
        <p>OFFICIAL INVITATION // SQUID GAME // 2025</p>
        <p className="mt-2">UNAUTHORIZED DISTRIBUTION PROHIBITED</p>
      </footer>
    </div>
  );
}
