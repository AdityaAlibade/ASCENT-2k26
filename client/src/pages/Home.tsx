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
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150%] h-[150%] bg-[radial-gradient(circle,rgba(255,0,96,0.05)_0%,transparent_70%)]" />
      </div>

      <div className="max-w-2xl text-center space-y-12 relative z-10">
        <div className="space-y-4">
          <AnimatePresence mode="wait">
            {step >= 1 && (
              <motion.div
                key="welcome"
                initial={{ opacity: 0, scale: 1.1, filter: "blur(10px)" }}
                animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                transition={{ duration: 2 }}
              >
                <h1 className="font-orbitron text-4xl md:text-7xl text-white font-black tracking-[0.4em] uppercase drop-shadow-[0_0_20px_rgba(255,255,255,0.4)]">
                  WELCOME.
                </h1>
              </motion.div>
            )}
          </AnimatePresence>
          
          <AnimatePresence mode="wait">
            {step >= 2 && (
              <motion.div
                key="selected"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 1.5, ease: "easeOut" }}
                className="space-y-6"
              >
                <p className="font-montserrat text-xl md:text-2xl text-primary font-bold tracking-[0.5em] uppercase text-glow-primary">
                  You have been selected.
                </p>
                <motion.p 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.5, duration: 2 }}
                  className="font-montserrat text-base md:text-lg text-white/60 tracking-[0.2em] uppercase italic"
                >
                  This is your invitation to the Squid Game.
                </motion.p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {step >= 3 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.5 }}
          >
            <button
              onClick={onComplete}
              className="group relative px-16 py-5 overflow-hidden bg-transparent border-2 border-primary/30 transition-all duration-700 hover:border-primary hover:shadow-[0_0_30px_rgba(255,0,96,0.4)]"
            >
              <div className="absolute inset-0 bg-primary/10 group-hover:bg-primary/20 transition-colors" />
              <div className="absolute -inset-full bg-gradient-to-r from-transparent via-white/10 to-transparent group-hover:animate-[shimmer_2s_infinite] pointer-events-none" />
              <span className="relative font-orbitron font-black text-primary tracking-[0.4em] text-xl group-hover:text-white transition-colors">
                CONTINUE
              </span>
            </button>
          </motion.div>
        )}
      </div>
      
      {/* Surveillance scanline and grain */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-40">
        <div className="scanline" />
        <div className="vignette" />
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-30 contrast-150 brightness-50" />
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
    <div className="min-h-screen bg-black text-white selection:bg-primary selection:text-white overflow-hidden relative font-montserrat">
      <div className="scanline" />
      <div className="vignette" />
      <div className="cctv-overlay" />
      <div className="absolute top-8 left-8 z-50 font-mono text-[10px] opacity-40 uppercase tracking-[0.2em] pointer-events-none">
        REC ● LIVE // CAM_01<br/>
        SQ_DORMITORY_H1
      </div>
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

          <h1 className="font-orbitron text-5xl md:text-9xl font-black tracking-tighter text-white mb-2 text-glow">
            SQUID GAME
          </h1>
          
          <p className="font-montserrat text-lg md:text-3xl text-gray-400 tracking-widest uppercase font-bold">
            A Game Where Only the Best Survive
          </p>

          <p className="font-montserrat text-sm md:text-lg text-white/60 max-w-2xl mx-auto leading-relaxed tracking-wide">
            This competition will test your intelligence, discipline, and composure
            under pressure.
          </p>

          <div className="py-12">
            <p className="text-primary font-black tracking-[0.4em] mb-4 font-orbitron text-sm">NEXT GAME BEGINS IN</p>
            <CountdownTimer />
          </div>

          <div className="flex flex-col md:flex-row items-center justify-center gap-6 mt-8">
            <motion.a 
              href="#register"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="group relative overflow-hidden bg-primary px-12 py-5 font-orbitron font-black text-xl tracking-[0.2em] text-white transition-all hover:shadow-[0_0_30px_rgba(255,0,96,0.6)]"
            >
              <div className="absolute inset-0 bg-white/10 -translate-x-full group-hover:translate-x-0 transition-transform duration-300 ease-out skew-x-12" />
              <span className="relative z-10">ENTER THE GAME</span>
            </motion.a>

            <motion.a 
              href="#rules"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="group relative overflow-hidden bg-transparent border-2 border-white/20 px-12 py-5 font-orbitron font-black text-xl tracking-[0.2em] text-white transition-all hover:border-white hover:bg-white/5"
            >
              <span className="relative z-10">VIEW RULES</span>
            </motion.a>

            <motion.a 
              href="#games"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="group relative overflow-hidden bg-transparent border-2 border-secondary/30 px-12 py-5 font-orbitron font-black text-xl tracking-[0.2em] text-secondary transition-all hover:border-secondary hover:bg-secondary/5"
            >
              <span className="relative z-10">THE GAMES</span>
            </motion.a>
          </div>

          {stats && (
            <div className="mt-12 flex items-center justify-center gap-4 font-mono text-sm">
              <span className="w-2 h-2 rounded-full bg-red-600 animate-pulse" />
              <span className="text-gray-500 uppercase tracking-widest">
                PLAYER ENROLLMENT STATUS: <span className="text-primary font-bold">{stats.totalPlayers}</span> / 456
              </span>
            </div>
          )}
        </motion.div>

        {/* Background Atmosphere Simulation */}
        <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none opacity-40">
          <div className="absolute inset-0 bg-gradient-to-b from-black via-black/80 to-black" />
          {/* Simulated dormitory corridor pan */}
          <motion.div 
            animate={{ x: [-20, 20] }}
            transition={{ repeat: Infinity, duration: 20, ease: "linear", repeatType: "mirror" }}
            className="absolute inset-0 scale-110"
          >
             <div className="w-full h-full bg-[linear-gradient(90deg,transparent_0%,rgba(36,159,156,0.05)_50%,transparent_100%)] opacity-30" />
          </motion.div>
          
          {/* Simulated guards walking in distance */}
          <motion.div
            animate={{ x: ["-100%", "200%"] }}
            transition={{ repeat: Infinity, duration: 40, ease: "linear" }}
            className="absolute bottom-1/4 left-0 w-8 h-24 flex flex-col items-center opacity-20 filter blur-[2px]"
          >
            <div className="w-6 h-6 bg-primary rounded-full mb-1" />
            <div className="w-4 h-16 bg-primary rounded-sm" />
          </motion.div>
        </div>

        <motion.div 
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 opacity-50"
        >
          <ChevronDown className="w-8 h-8" />
        </motion.div>
      </section>

      {/* The Games Section */}
      <section id="games" className="py-24 px-4 relative z-10">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-6xl font-black mb-4 text-white tracking-widest">THE GAMES</h2>
            <div className="w-32 h-1 bg-primary mx-auto mb-6" />
            <p className="font-montserrat text-white/50 max-w-2xl mx-auto uppercase tracking-widest text-sm">
              Six Days. Six Games. One Winner.
            </p>
          </div>

          <div className="space-y-12">
            {/* Game 1 */}
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="group relative flex flex-col md:flex-row gap-8 bg-white/5 border-l-4 border-primary p-8 hover:bg-white/10 transition-all duration-500"
            >
              <div className="md:w-1/3 space-y-4">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full border-2 border-primary flex items-center justify-center font-orbitron font-bold text-primary">01</div>
                  <h3 className="text-2xl font-black text-white">THE FIRST SELECTION</h3>
                </div>
                <p className="font-montserrat text-gray-400 text-sm leading-relaxed">
                  Inspired by Red Light Green Light. A test of absolute discipline and reflex. 
                  Movement during a red signal results in immediate elimination.
                </p>
              </div>
              <div className="flex-1 h-48 bg-black/40 relative overflow-hidden flex items-center justify-center">
                {/* Silhouette Animation Simulation */}
                <div className="flex gap-4">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <motion.div
                      key={i}
                      animate={{ 
                        opacity: [1, 1, 0.2, 1],
                        backgroundColor: i === 3 ? ["#fff", "#fff", "#ff003c", "#ff003c"] : ["#fff", "#fff", "#fff", "#fff"]
                      }}
                      transition={{ repeat: Infinity, duration: 4, delay: i * 0.5 }}
                      className="w-8 h-20 bg-white opacity-40 rounded-t-lg"
                    />
                  ))}
                </div>
                <div className="absolute top-4 right-4 text-[10px] font-mono text-red-500 animate-pulse">ELIMINATION DETECTED</div>
              </div>
            </motion.div>

            {/* Game 2 */}
            <motion.div 
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="group relative flex flex-col md:flex-row-reverse gap-8 bg-white/5 border-r-4 border-secondary p-8 hover:bg-white/10 transition-all duration-500"
            >
              <div className="md:w-1/3 space-y-4">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 border-2 border-secondary flex items-center justify-center font-orbitron font-bold text-secondary rotate-45"><span className="-rotate-45">02</span></div>
                  <h3 className="text-2xl font-black text-white">THE TEST</h3>
                </div>
                <p className="font-montserrat text-gray-400 text-sm leading-relaxed">
                  Technical aptitude and problem-solving under extreme duress. 
                  Navigate the terminal. Decrypt the sequence. Survive the system.
                </p>
                <div className="pt-4">
                   <p className="text-[10px] font-mono text-secondary mb-1 uppercase tracking-widest">Survival Rate</p>
                   <div className="w-full h-2 bg-white/10">
                     <motion.div 
                       initial={{ width: 0 }}
                       whileInView={{ width: "32%" }}
                       transition={{ duration: 2 }}
                       className="h-full bg-secondary shadow-[0_0_10px_rgba(36,159,156,0.5)]" 
                     />
                   </div>
                   <p className="text-[10px] font-mono text-secondary text-right mt-1">32.4%</p>
                </div>
              </div>
              <div className="flex-1 h-48 bg-black/60 font-mono p-4 text-[10px] overflow-hidden relative">
                <div className="text-secondary opacity-70 space-y-1">
                  <p>&gt; INITIALIZING SURVIVAL_PROTOCOL...</p>
                  <p>&gt; DECRYPTING SEED_067...</p>
                  <p>&gt; [WARNING] BUFFER OVERFLOW DETECTED</p>
                  <p>&gt; ATTEMPTING RECOVERY [45%]</p>
                  <p className="animate-pulse">_</p>
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent pointer-events-none" />
              </div>
            </motion.div>

            {/* Game 3 */}
            <motion.div 
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="group relative flex flex-col md:flex-row gap-8 bg-white/5 border-b-4 border-white/20 p-8 hover:bg-white/10 transition-all duration-500"
            >
              <div className="md:w-1/3 space-y-4">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 border-2 border-white flex items-center justify-center font-orbitron font-bold text-white">03</div>
                  <h3 className="text-2xl font-black text-white">THE FINAL DECISION</h3>
                </div>
                <p className="font-montserrat text-gray-400 text-sm leading-relaxed">
                  An interrogation of character. The spotlight is on you. 
                  The Front Man watches. Every word could be your last.
                </p>
              </div>
              <div className="flex-1 h-48 bg-black relative flex items-center justify-center overflow-hidden">
                {/* Interrogation Spotlight Effect */}
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.1)_0%,transparent_50%)]" />
                <motion.div 
                   animate={{ opacity: [0.1, 0.3, 0.1] }}
                   transition={{ repeat: Infinity, duration: 3 }}
                   className="w-24 h-40 bg-white/10 rounded-full blur-xl"
                />
                <div className="absolute top-0 left-0 w-full h-full border border-white/5 pointer-events-none" />
                <div className="font-orbitron text-white/20 text-4xl font-black">?</div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Info Cards Section */}
      <section id="rules" className="py-24 px-4 relative z-10 bg-gradient-to-b from-black via-[#0a0a0a] to-black">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Card 1 */}
          <div className="arena-card-green p-8 group hover:scale-[1.02] transition-transform duration-500 cursor-pointer">
            <div className="flex justify-between items-start mb-6">
              <Trophy className="w-10 h-10 text-black/40" />
              <Circle size={32} color="#000" opacity={0.3} />
            </div>
            <h3 className="text-2xl font-black mb-4 text-black">The Prize</h3>
            <p className="font-montserrat text-black/70 leading-relaxed font-medium">
              45.6 Billion Won awaits the winner. Everything you desire is within reach. Do you have what it takes to seize it?
            </p>
          </div>

          {/* Card 2 */}
          <div className="arena-card p-10 group hover:scale-[1.02] transition-transform duration-500 cursor-pointer relative overflow-hidden">
            <div className="absolute top-0 right-0 p-2 font-mono text-[8px] opacity-20 uppercase tracking-widest">
              RULE_BOARD_V1
            </div>
            <div className="flex justify-between items-start mb-8">
              <ShieldAlert className="w-12 h-12 text-red-700 animate-pulse" />
              <Triangle size={40} color="#000" opacity={0.4} />
            </div>
            <h3 className="text-3xl font-black mb-6 text-black tracking-tighter border-b-2 border-black/10 pb-2">RULES OF THE GAME</h3>
            <ul className="font-montserrat text-black/80 space-y-6 font-bold uppercase tracking-wide text-sm">
              <li className="flex gap-3">
                <span className="text-red-700">●</span>
                <span>Rule 1: Players must follow instructions without exception.</span>
              </li>
              <li className="flex gap-3">
                <span className="text-red-700">●</span>
                <span>Rule 2: Failure in any round results in elimination.</span>
              </li>
              <li className="flex gap-3">
                <span className="text-red-700">●</span>
                <span>Rule 3: Fair play is mandatory. Cheating results in immediate removal.</span>
              </li>
            </ul>
            <div className="mt-8 pt-4 border-t border-black/5 flex items-center gap-2">
               <div className="w-3 h-3 bg-red-700 rounded-full animate-ping" />
               <span className="text-[10px] text-red-800 font-black tracking-widest">FRONT MAN ANNOUNCEMENT</span>
            </div>
          </div>

          {/* Card 3 */}
          <div className="arena-card-green p-8 group hover:scale-[1.02] transition-transform duration-500 cursor-pointer">
            <div className="flex justify-between items-start mb-6">
              <Video className="w-10 h-10 text-black/40" />
              <Square size={32} color="#000" opacity={0.3} />
            </div>
            <h3 className="text-2xl font-black mb-4 text-black">Surveillance</h3>
            <p className="font-montserrat text-black/70 leading-relaxed font-medium">
              We are always watching. Fairness is absolute. Any attempt to cheat or subvert the rules will result in immediate termination.
            </p>
          </div>

        </div>
      </section>

      {/* Prize Section */}
      <section className="py-24 px-4 relative z-10 bg-black">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            className="relative p-12 border-4 border-primary/20 bg-primary/5 overflow-hidden group"
          >
            {/* Spotlight Reveal Simulation */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(255,0,96,0.2)_0%,transparent_70%)] opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
            
            <Trophy className="w-20 h-20 text-primary mx-auto mb-8 drop-shadow-[0_0_20px_rgba(255,0,96,0.5)]" />
            <h2 className="text-4xl md:text-6xl font-black text-white mb-6 tracking-widest">THE PRIZE</h2>
            <div className="w-24 h-1 bg-primary mx-auto mb-8" />
            
            <div className="space-y-6">
              <p className="text-3xl md:text-5xl font-black text-white font-orbitron tracking-tighter italic">
                45.6 BILLION WON
              </p>
              <p className="font-montserrat text-white/70 text-lg md:text-xl uppercase tracking-[0.2em] font-bold">
                "The reward is worth the risk."
              </p>
            </div>

            <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4 text-[10px] font-mono text-white/40 uppercase tracking-widest">
              <div className="p-4 border border-white/10">Winner Recognition</div>
              <div className="p-4 border border-white/10">Certificates</div>
              <div className="p-4 border border-white/10">Interview Exp</div>
              <div className="p-4 border border-white/10">Career Advance</div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Schedule Section */}
      <section className="py-24 px-4 relative z-10 bg-[#050505] border-y border-white/5">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-black text-white tracking-widest">MISSION SCHEDULE</h2>
            <div className="w-16 h-1 bg-secondary mx-auto mt-4" />
          </div>

          <div className="space-y-8">
            {[
              { game: "Game 1", date: "Jan 15, 2026", time: "09:00 AM", desc: "The First Selection" },
              { game: "Game 2", date: "Jan 16, 2026", time: "10:30 AM", desc: "The Test" },
              { game: "Final Game", date: "Jan 20, 2026", time: "12:00 PM", desc: "The Final Decision" }
            ].map((item, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                className="flex items-center gap-6 p-6 bg-white/5 border border-white/10 hover:border-secondary/50 transition-colors group"
              >
                <div className="w-16 h-16 flex items-center justify-center border-2 border-white/20 font-orbitron font-black text-white/40 group-hover:border-secondary group-hover:text-secondary transition-colors">
                  {idx + 1}
                </div>
                <div className="flex-1">
                  <h4 className="font-orbitron font-black text-xl text-white tracking-wide">{item.game}: {item.desc}</h4>
                  <p className="font-mono text-xs text-white/40 mt-1 uppercase tracking-widest">{item.date} // {item.time}</p>
                </div>
                <div className="w-3 h-3 rounded-full bg-white/10 group-hover:bg-secondary group-hover:shadow-[0_0_10px_rgba(36,159,156,0.8)]" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Sponsors Section */}
      <section className="py-24 px-4 relative z-10">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-xl font-black text-white/20 tracking-[0.5em] mb-12">OFFICIAL VIP PARTNERS</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-12 opacity-30 grayscale hover:grayscale-0 transition-all duration-1000">
            <div className="h-12 bg-white/10 rounded-sm flex items-center justify-center font-orbitron font-black text-xs">V.I.P_ALPHA</div>
            <div className="h-12 bg-white/10 rounded-sm flex items-center justify-center font-orbitron font-black text-xs">V.I.P_BETA</div>
            <div className="h-12 bg-white/10 rounded-sm flex items-center justify-center font-orbitron font-black text-xs">V.I.P_GAMMA</div>
            <div className="h-12 bg-white/10 rounded-sm flex items-center justify-center font-orbitron font-black text-xs">V.I.P_DELTA</div>
          </div>
        </div>
      </section>

      {/* Registration Section */}
      <section id="register" className="py-24 px-4 relative z-10">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-6xl font-black mb-4 text-white tracking-widest drop-shadow-[0_0_15px_rgba(255,0,96,0.3)]">PLAYER ENROLLMENT</h2>
            <div className="w-32 h-1 bg-primary mx-auto mb-6" />
            <p className="font-montserrat text-white/40 max-w-2xl mx-auto uppercase tracking-widest text-xs font-bold leading-relaxed">
              By submitting this form, you consent to all terms and conditions of the game. 
              Once the game begins, it cannot be stopped.
            </p>
          </div>

          <RegistrationForm />
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-24 px-4 relative z-10 bg-black">
        <div className="max-w-2xl mx-auto text-center">
          <div className="p-1 border border-white/10 bg-white/5 backdrop-blur-sm">
            <div className="p-8 border border-white/20 flex flex-col items-center gap-8">
               <Video className="w-12 h-12 text-primary animate-pulse" />
               <h3 className="font-orbitron font-black text-2xl tracking-widest">CONTROL ROOM</h3>
               
               <div className="flex flex-col md:flex-row gap-4 w-full">
                 <button className="flex-1 bg-white/5 border border-white/20 py-4 font-orbitron font-bold text-xs tracking-widest hover:bg-white hover:text-black transition-all">
                   CALL SUPPORT
                 </button>
                 <button className="flex-1 bg-white/5 border border-white/20 py-4 font-orbitron font-bold text-xs tracking-widest hover:bg-white hover:text-black transition-all">
                   MESSAGE CONTROL
                 </button>
               </div>

               <div className="pt-8">
                 <button className="w-16 h-16 rounded-full bg-red-600/20 border-4 border-red-600 flex items-center justify-center group relative overflow-hidden">
                    <div className="absolute inset-0 bg-red-600 opacity-20 group-active:scale-95 transition-transform" />
                    <div className="w-8 h-8 rounded-full bg-red-600 shadow-[0_0_20px_rgba(220,38,38,0.8)]" />
                 </button>
                 <p className="text-[10px] font-mono text-red-600 mt-4 tracking-[0.3em] font-black">EMERGENCY TERMINAL</p>
               </div>
            </div>
          </div>
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
