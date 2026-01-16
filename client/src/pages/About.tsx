import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Terminal, Activity, Eye, ShieldCheck, Volume2, VolumeX, Zap, Lock } from "lucide-react";
import AboutBg from "@assets/Merry go round.jpg";
import audioFile from "@assets/Round_And_Round_Mingle_1767983924508.mp3";

export default function TrialsSection() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const containerRef = useRef<HTMLElement | null>(null);
  const [isMuted, setIsMuted] = useState(true);

  // Parallax logic for the content over the fixed background
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const contentY = useTransform(scrollYProgress, [0, 1], [50, -50]);

  return (
    <section ref={containerRef} id="games" className="relative min-h-screen w-full overflow-hidden bg-black py-32 px-6">
      
      {/* 1. FIXED BACKGROUND LAYER */}
      <div className="fixed inset-0 z-0">
        <motion.div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-transform"
          style={{ 
            backgroundImage: `url(${AboutBg})`, 
            filter: 'grayscale(20%) contrast(150%) brightness(0.6)',
            scale: 1.1 
          }}
          animate={{
            scale: [1.05, 1.15, 1.05],
          }}
          transition={{
            duration: 30,
            repeat: Infinity,
            ease: "linear"
          }}
        />
        {/* Cinematic Vignette & Radial Glow */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.9)_100%)]" />
        <div className="absolute inset-0 bg-black/50 backdrop-blur-[2px]" />
      </div>

      {/* 2. AUDIO ENGINE */}
      <audio ref={audioRef} src={audioFile} loop muted={isMuted} autoPlay />
      <button
        onClick={() => setIsMuted(!isMuted)}
        className="fixed bottom-10 left-10 z-50 p-4 rounded-full border border-red-500/30 bg-black/60 backdrop-blur-xl text-red-500 hover:scale-110 transition-all shadow-[0_0_15px_rgba(220,38,38,0.3)]"
      >
        {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} className="animate-pulse" />}
      </button>

      {/* 3. SCROLLABLE CONTENT */}
      <motion.div style={{ y: contentY }} className="max-w-6xl mx-auto relative z-10">
        
        {/* HEADER SECTION */}
        <header className="text-center mb-32">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 mb-6 px-4 py-1 border border-red-600/40 bg-red-600/10 rounded-full"
          >
            <Zap size={14} className="text-red-600 fill-red-600" />
            <span className="text-red-500 font-mono text-[10px] tracking-[0.4em] uppercase font-bold">
              System Breach Detected // Trial Phase
            </span>
          </motion.div>
          
          <h2 className="text-6xl md:text-9xl font-black mb-8 text-white tracking-tighter font-orbitron italic">
            THE <span className="text-red-600 drop-shadow-[0_0_20px_rgba(220,38,38,0.8)]">TRIALS</span>
          </h2>
          
          <p className="font-mono text-white/50 max-w-2xl mx-auto uppercase tracking-[0.2em] text-xs leading-relaxed">
            [MERRY_GO_ROUND.SYS] Initialized... <br />
            Failure to synchronize results in immediate termination.
          </p>
        </header>

        {/* CARDS CONTAINER */}
        <div className="space-y-40">
          
          {/* ROUND 01 */}
          <TrialCard 
            number="○" 
            title="The Entry Game" 
            subtitle="Cognitive Filtering"
            description="A high-pressure 1v1 MCQ simulation. Aptitude, Pseudocode, and Logic. Every second spent adds to your latency penalty."
            color="red"
            stats={["15 Q'S", "30 MINS", "1v1"]}
          />

          {/* ROUND 02 */}
          <TrialCard 
            number="△" 
            title="The Glass Bridge" 
            subtitle="Syntactic Integrity"
            description="Competitive coding on a digital precipice. One syntax error results in immediate disconnection from the server."
            color="cyan"
            stats={["TRACKS", "ALGO", "STRESS"]}
            reversed
          />

          {/* ROUND 03 */}
          <TrialCard 
            number="□" 
            title="The Final Stand" 
            subtitle="Executive Selection"
            description="The Board of Directors awaits. Defend your architecture and survive the psychological pressure of the Front Man."
            color="white"
            stats={["DSA", "SYSTEMS", "HR"]}
          />

        </div>
      </motion.div>
    </section>
  );
}

// Sub-component for clean trial rows
function TrialCard({ number, title, subtitle, description, color, stats, reversed = false }: any) {
  const colors: any = {
    red: "border-red-600 text-red-600 bg-red-600/10 shadow-[0_0_20px_rgba(220,38,38,0.3)]",
    cyan: "border-cyan-500 text-cyan-500 bg-cyan-500/10 shadow-[0_0_20px_rgba(6,182,212,0.3)]",
    white: "border-white text-white bg-white/10 shadow-[0_0_20px_rgba(255,255,255,0.2)]"
  };

  return (
    <motion.div 
      initial={{ opacity: 0, x: reversed ? 50 : -50 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      className={`flex flex-col ${reversed ? 'md:flex-row-reverse' : 'md:flex-row'} items-center gap-12 group`}
    >
      {/* Visual Identity */}
      <div className="flex-1 space-y-6">
        <div className="flex items-center gap-4">
          <div className={`w-20 h-20 border-2 flex items-center justify-center font-orbitron text-3xl font-bold ${colors[color]}`}>
            {number}
          </div>
          <div>
            <h3 className="text-4xl font-black text-white uppercase tracking-tighter">{title}</h3>
            <p className={`font-mono text-[10px] uppercase tracking-[0.3em] opacity-60`}>{subtitle}</p>
          </div>
        </div>
        
        <p className="font-mono text-gray-400 text-sm leading-loose max-w-lg">
          {description}
        </p>

        <div className="flex gap-4">
          {stats.map((s: string) => (
            <span key={s} className="text-[10px] font-mono border border-white/10 px-3 py-1 bg-white/5 text-white/40 uppercase">
              {s}
            </span>
          ))}
        </div>
      </div>

      {/* Decorative Visual Box */}
      <div className="w-full md:w-[400px] h-64 bg-black/40 border border-white/10 relative overflow-hidden backdrop-blur-sm group-hover:border-red-500/40 transition-all">
        <div className="absolute top-2 left-2 font-mono text-[8px] opacity-20 uppercase tracking-widest">
          Auth_Node_0{number === '○' ? '1' : number === '△' ? '2' : '3'}
        </div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className={`w-32 h-32 rounded-full border-dashed border-2 animate-spin-slow opacity-10 ${colors[color]}`} />
          <Eye size={40} className="absolute opacity-20 text-white" />
        </div>
        {/* Scanning Line Effect */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-red-500/5 to-transparent h-20 w-full animate-scan pointer-events-none" />
      </div>
    </motion.div>
  );
}