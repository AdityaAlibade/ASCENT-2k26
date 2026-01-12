import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useGameStats } from "@/hooks/use-players";
import { RegistrationForm } from "@/components/RegistrationForm";
import { Circle, Triangle, Square, FloatingShapes } from "@/components/ui/GameShapes";
import { ChevronDown, AlertTriangle, Clock, Trophy, ShieldAlert, Video, Volume2, VolumeX } from "lucide-react";
import audioFile from "@assets/Round_And_Round_Mingle_1767983924508.mp3";
import frontManTheme from "@assets/squid_game_1768071980984.mp3";
import frontManImg from "@assets/FM_1768130131807.png";

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

const SystemLoader = ({ onComplete }: { onComplete: () => void }) => {
  useEffect(() => {
    const timer = setTimeout(onComplete, 6000);
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div className="fixed inset-0 z-[200] bg-black flex flex-col items-center justify-center overflow-hidden">
      <div className="vignette" />
      <div className="scanline opacity-10" />
      
      <div className="flex gap-16 md:gap-24 items-center mb-24">
        {/* Circle */}
        <div className="relative">
          <svg className="w-16 h-16 md:w-24 md:h-24">
            <motion.circle
              cx="50%" cy="50%" r="45%"
              fill="none" stroke="white" strokeWidth="2"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 1.5, ease: "linear", delay: 0 }}
            />
          </svg>
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 1, 0] }}
            transition={{ delay: 1.5, duration: 0.5 }}
            className="absolute top-0 right-0 w-2 h-2 bg-primary rounded-full shadow-[0_0_10px_#FF0060]"
          />
        </div>

        {/* Triangle */}
        <div className="relative">
          <svg className="w-16 h-16 md:w-24 md:h-24" viewBox="0 0 100 100">
            <motion.path
              d="M50 15 L85 85 L15 85 Z"
              fill="none" stroke="white" strokeWidth="2"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 1.5, ease: "linear", delay: 1.5 }}
            />
          </svg>
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 1, 0] }}
            transition={{ delay: 3, duration: 0.5 }}
            className="absolute top-0 right-0 w-2 h-2 bg-primary rounded-full shadow-[0_0_10px_#FF0060]"
          />
        </div>

        {/* Square */}
        <div className="relative">
          <svg className="w-16 h-16 md:w-24 md:h-24">
            <motion.rect
              x="10%" y="10%" width="80%" height="80%"
              fill="none" stroke="white" strokeWidth="2"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 1.5, ease: "linear", delay: 3 }}
            />
          </svg>
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 4.5, duration: 0.5 }}
            className="absolute top-0 right-0 w-2 h-2 bg-primary rounded-full shadow-[0_0_10px_#FF0060]"
          />
        </div>
      </div>

      <div className="absolute bottom-12 text-white/40 font-mono text-[10px] uppercase tracking-[0.4em] animate-pulse">
        System Check in Progress
      </div>
    </div>
  );
};


{/* ----------------------------------------------------------------------------------------------------------------- */}


{/* Ddakji Flip Transition Component */}
const DdakjiTransition = ({ onComplete }: { onComplete: () => void }) => {
  const [isFlipped, setIsFlipped] = useState(false);

  const handlePlay = () => {
    setIsFlipped(true);
    
    // Transition after flip animation
    setTimeout(() => {
      onComplete();
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-[150] bg-black flex items-center justify-center overflow-hidden">
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="text-center space-y-12"
      >
        <div className="relative w-64 h-64 mx-auto flex items-center justify-center">
          <motion.div 
            animate={isFlipped ? { 
              rotateY: 180,
              y: [0, -150, 0],
              scale: [1, 1.3, 1]
            } : {}}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            className="w-48 h-48 shadow-2xl relative"
            style={{ transformStyle: "preserve-3d" }}
          >
            {/* Front side (Blue) */}
            <div className="absolute inset-0 bg-blue-600 backface-hidden" />
            {/* Back side (Red) */}
            <div className="absolute inset-0 bg-red-600" style={{ transform: "rotateY(180deg)", backfaceVisibility: "hidden" }} />
          </motion.div>
        </div>
        
        <div className="space-y-8">
          <p className="font-orbitron text-white/10 uppercase tracking-[0.5em] text-xs">SLAP... SLAP... SLAP...</p>
          
          {!isFlipped && (
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              onClick={handlePlay}
              className="px-12 py-4 border border-white/20 font-orbitron text-white tracking-[0.3em] hover:bg-white hover:text-black transition-all"
            >
              PLAY
            </motion.button>
          )}
        </div>
      </motion.div>
    </div>
  );
};


{/* ----------------------------------------------------------------------------------------------------------------- */}

{/* Welcome Intro Overlay Component */}
const IntroOverlay = ({ onComplete }: { onComplete: () => void }) => {
  const [phase, setPhase] = useState<'loader' | 'video' | 'welcome' | 'frontman' | 'conditions'>('loader');
  const [step, setStep] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (phase === 'welcome') {
      const timer1 = setTimeout(() => setStep(1), 1000);
      const timer2 = setTimeout(() => setStep(2), 2500);
      const timer3 = setTimeout(() => setStep(3), 4000);
      return () => {
        clearTimeout(timer1);
        clearTimeout(timer2);
        clearTimeout(timer3);
      };
    }
    // Pause main intro audio during Front Man phase
    if (phase === 'frontman' && audioRef.current) {
      audioRef.current.pause();
    }
  }, [phase]);

  const handleStart = () => {
    if (audioRef.current) {
      audioRef.current.play().catch(e => console.error("Audio playback failed:", e));
    }
    setPhase('frontman');
  };

  if (phase === 'loader') return <SystemLoader onComplete={() => setPhase('video')} />;
  if (phase === 'video') return <DdakjiTransition onComplete={() => setPhase('welcome')} />;

  return (
    <motion.div 
      className="fixed inset-0 z-[100] bg-black flex flex-col items-center justify-center p-4 overflow-hidden"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1.5, ease: "easeInOut" }}
    >
      <audio ref={audioRef} src={audioFile} loop muted={isMuted} />
      
      <button 
        onClick={() => setIsMuted(!isMuted)}
        className="absolute top-8 right-8 z-50 p-2 text-white/40 hover:text-white transition-colors"
      >
        {isMuted ? <VolumeX size={24} /> : <Volume2 size={24} />}
      </button>


{/* ----------------------------------------------------------------------------------------------------------------- */}


      {/* Cinematic Background Elements */}
      <AnimatePresence>
        {phase === 'frontman' && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.8 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 z-0"
            style={{ 
              backgroundImage: `url(${frontManImg})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              filter: 'brightness(1.1) contrast(1.1) saturate(1.1)'
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
            <div className="absolute inset-0 bg-blue-900/5 mix-blend-screen" />
            <div className="absolute inset-0 bg-purple-900/5 mix-blend-color-dodge" />
          </motion.div>
        )}
      </AnimatePresence>

      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-32 h-32 border border-white/20 rounded-full animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-32 h-32 border border-white/20 animate-pulse delay-700" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150%] h-[150%] bg-[radial-gradient(circle,rgba(255,0,96,0.05)_0%,transparent_70%)]" />
      </div>

      <div className="max-w-2xl text-center relative z-10 h-full flex flex-col items-center justify-center">
        {phase === 'welcome' && (
          <div className="space-y-12">
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
                      This is your invitation to the ASCENT 2k26.
                    </motion.p>
                  </motion.div>
                )}
              </AnimatePresence>

              {step >= 3 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1.5 }}
                  className="pt-12"
                >
                  <button
                    onClick={handleStart}
                    className="group relative px-16 py-5 overflow-hidden bg-transparent border-2 border-primary/30 transition-all duration-700 hover:border-primary hover:shadow-[0_0_30px_rgba(255,0,96,0.4)]"
                  >
                    <div className="absolute inset-0 bg-primary/10 group-hover:bg-primary/20 transition-colors" />
                    <div className="absolute -inset-full bg-gradient-to-r from-transparent via-white/10 to-transparent group-hover:animate-[shimmer_2s_infinite] pointer-events-none" />
                    <span className="relative font-orbitron font-black text-primary tracking-[0.4em] text-xl group-hover:text-white transition-colors">
                      CONFIRM
                    </span>
                  </button>
                </motion.div>
              )}
            </div>
          </div>
        )}

        {phase === 'frontman' && (
          <div className="absolute inset-0 flex items-center justify-center">
            <audio autoPlay loop src={frontManTheme} ref={el => { if(el) el.volume = 0.15; }} />
            <FrontManDialogue onComplete={() => setPhase('conditions')} />
          </div>
        )}

        {phase === 'conditions' && (
          <div className="space-y-12">
            <ConditionsAccept onComplete={onComplete} />
          </div>
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

const FrontManDialogue = ({ onComplete }: { onComplete: () => void }) => {
  const [lineIndex, setLineIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState("");
  const [showButton, setShowButton] = useState(false);

  const lines = [
    "Participants will compete in a series of challenges.",
    "Each round will test intelligence, speed, and composure.",
    "Failure is elimination.",
    "Success moves you forward."
  ];

  useEffect(() => {
    if (lineIndex < lines.length && !showButton) {
      let charIndex = 0;
      setDisplayedText("");
      const targetText = lines[lineIndex];

      const interval = setInterval(() => {
        if (charIndex <= targetText.length) {
          setDisplayedText(targetText.slice(0, charIndex));
          charIndex++;
        } else {
          clearInterval(interval);
          
          const pauseDuration = lineIndex === lines.length - 1 ? 1500 : 2500;
          
          setTimeout(() => {
            if (lineIndex < lines.length - 1) {
              setLineIndex(prev => prev + 1);
            } else {
              // Trigger button show after a brief pause following the last line
              setShowButton(true);
            }
          }, pauseDuration);
        }
      }, 50);

      return () => clearInterval(interval);
    }
  }, [lineIndex, showButton]);

  return (
    <div className="flex flex-col items-center justify-end w-full h-full pb-32 px-4 relative">
      {/* Cinematic Subtitles with consistent typewriter animation */}
      <div className="min-h-[160px] flex items-center justify-center w-full text-center">
        <AnimatePresence mode="wait">
          {!showButton && (
            <motion.p
              key={lineIndex}
              initial={{ opacity: 0, filter: "blur(10px)" }}
              animate={{ opacity: 1, filter: "blur(0px)" }}
              exit={{ opacity: 0, filter: "blur(10px)" }}
              transition={{ duration: 1.2, ease: "easeInOut" }}
              className="font-orbitron text-xl md:text-3xl text-white tracking-[0.25em] uppercase leading-relaxed font-light drop-shadow-[0_0_15px_rgba(255,255,255,0.6)] max-w-4xl"
            >
              {displayedText}
            </motion.p>
          )}
        </AnimatePresence>
      </div>


{/* ----------------------------------------------------------------------------------------------------------------- */}


      {/* Acceptance Button with cinematic reveal animation */}
      <AnimatePresence>
        {showButton && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, filter: "blur(10px)" }}
            animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
            transition={{ 
              duration: 1.5, 
              ease: [0.22, 1, 0.36, 1],
              delay: 0.5
            }}
            className="absolute bottom-32 w-full flex justify-center"
          >
            <button
              onClick={onComplete}
              className="group relative flex items-center justify-center bg-black/80 backdrop-blur-xl border border-white/20 hover:border-white/40 transition-all duration-700 rounded-sm overflow-hidden min-w-[320px] h-20"
            >
              <div className="absolute inset-0 bg-white/0 group-hover:bg-white/5 transition-colors" />
              <span className="relative z-10 font-orbitron font-bold text-white tracking-[0.8em] text-2xl group-hover:text-white transition-all pl-[0.8em]">
                ACCEPT
              </span>
              <div className="absolute inset-x-0 bottom-0 h-[2px] bg-red-600/60" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const ConditionsAccept = ({ onComplete }: { onComplete: () => void }) => {
  const [flashing, setFlashing] = useState(false);

  const handleFinalEnter = () => {
    setFlashing(true);
    setTimeout(() => {
      setFlashing(false);
      onComplete();
    }, 1000);
  };

  return (
    <div className="space-y-12 relative">
      <AnimatePresence>
        {flashing && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] bg-red-600/30 backdrop-blur-sm pointer-events-none"
          />
        )}
      </AnimatePresence>

      <div className="space-y-6">
        <h2 className="font-orbitron text-2xl text-red-600 font-black tracking-widest animate-pulse">WARNING</h2>
        <p className="font-montserrat text-white/60 tracking-widest uppercase text-sm max-w-md mx-auto leading-relaxed">
          By proceeding, you agree to the rules of the game.
        </p>
      </div>

      <motion.button
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        onClick={handleFinalEnter}
        className="group relative px-20 py-6 bg-primary text-white font-orbitron font-black text-2xl tracking-[0.5em] hover:shadow-[0_0_50px_rgba(255,0,96,0.6)] transition-all active:scale-95"
      >
        ENTER THE GAME
      </motion.button>
    </div>
  );
};


{/* ----------------------------------------------------------------------------------------------------------------- */}

{/* Main Home Component */}
import mainBg from "@assets/MAin_background_1768146583042.jpg";

export default function Home() {
  const [showIntro, setShowIntro] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const { data: stats } = useGameStats();

  useEffect(() => {
    if (!showIntro && audioRef.current) {
      audioRef.current.play().catch(e => console.error("Audio playback failed:", e));
    }
  }, [showIntro]);

  if (showIntro) {
    return <AnimatePresence><IntroOverlay onComplete={() => setShowIntro(false)} /></AnimatePresence>;
  }

  return (
    <div className="min-h-screen bg-black text-white selection:bg-primary selection:text-white overflow-hidden relative font-montserrat">
      <audio ref={audioRef} src={audioFile} loop muted={isMuted} />
      
      {/* Background Image with Dark Wash */}
      <div 
        className="fixed inset-0 z-0 bg-cover bg-center bg-no-repeat opacity-60 grayscale-[0.3]"
        style={{ backgroundImage: `url(${mainBg})` }}
      />
      <div className="fixed inset-0 z-1 bg-black/40 pointer-events-none" />
      
      <button 
        onClick={() => setIsMuted(!isMuted)}
        className="fixed top-8 right-8 z-[100] p-2 text-white/40 hover:text-white transition-colors bg-black/20 backdrop-blur-sm"
      >
        {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
      </button>

      <div className="scanline z-10" />
      <div className="vignette z-10" />
      <div className="cctv-overlay z-10" />
      <div className="absolute top-8 left-8 z-50 font-mono text-[10px] opacity-40 uppercase tracking-[0.2em] pointer-events-none">
        REC ● LIVE // CAM_01<br/>
        SQ_DORMITORY_H1
      </div>
      <FloatingShapes />


{/* ----------------------------------------------------------------------------------------------------------------- */}


      {/* Hero Section */}
      <section className="relative h-screen flex flex-col items-center justify-center px-4 z-20">
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
            ASCENT 2k26
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


{/* ----------------------------------------------------------------------------------------------------------------- */}


      {/* The Games Section */}
      <section id="games" className="py-24 px-4 relative z-10">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-6xl font-black mb-4 text-white tracking-widest">THE GAMES</h2>
            <div className="w-32 h-1 bg-primary mx-auto mb-6" />
            <p className="font-montserrat text-white/50 max-w-2xl mx-auto uppercase tracking-widest text-sm">
              Three Days. Three Games. One Winner.
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


{/* ----------------------------------------------------------------------------------------------------------------- */}


      {/* Info Cards Section */}
      <section id="rules" className="py-24 px-4 relative z-10">
        <div className="max-w-6xl mx-auto">

          {/* Section Header */}
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-6xl font-black text-white tracking-widest uppercase">
              The Rules
            </h2>
            <div className="w-24 h-[2px] bg-primary mx-auto mt-6" />
            <p className="mt-6 text-white/ font-mono text-xs tracking-[0.4em] uppercase">
              Compliance is Mandatory
            </p>
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 items-start">

            {/* Left Card – Prize */}
            <div className="arena-card-green p-8 group hover:scale-[1.015] transition-all duration-500">
              <div className="flex justify-between items-start mb-6">
                <Trophy className="w-10 h-10 text-black/40" />
                <Circle size={28} color="#000" opacity={0.3} />
              </div>

              <h3 className="text-2xl font-black mb-4 text-black uppercase tracking-wide">
                The Prize
              </h3>

              <p className="font-montserrat text-black/70 leading-relaxed font-medium text-sm">
                45.6 Billion Won awaits the winner. Everything you desire is within reach.
                Only one survives.
              </p>
            </div>

            {/* Center Card – Rules (Primary) */}
            <div className="arena-card p-10 relative overflow-hidden border-2 border-black/10 hover:scale-[1.02] transition-all duration-500">

              <div className="absolute top-3 right-4 font-mono text-[9px] opacity-20 tracking-widest">
                RULE_BOARD_V1
              </div>

              <div className="flex justify-between items-start mb-8">
                <ShieldAlert className="w-14 h-14 text-red-700 animate-pulse" />
                <Triangle size={42} color="#000" opacity={0.4} />
              </div>

              <h3 className="text-3xl font-black mb-6 text-black tracking-tight border-b border-black/10 pb-3">
                Rules of the Game
              </h3>

              <ul className="font-montserrat text-black/80 space-y-5 font-bold uppercase tracking-wide text-sm">
                <li className="flex gap-3">
                  <span className="text-red-700">●</span>
                  <span>Players must follow instructions without exception.</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-red-700">●</span>
                  <span>Failure in any round results in elimination.</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-red-700">●</span>
                  <span>Fair play is mandatory. Cheating results in removal.</span>
                </li>
              </ul>

              <div className="mt-8 pt-5 border-t border-black/10 flex items-center gap-3">
                <div className="w-2.5 h-2.5 bg-red-700 rounded-full animate-ping" />
                <span className="text-[10px] text-red-800 font-black tracking-widest">
                  FRONT MAN ANNOUNCEMENT
                </span>
              </div>
            </div>

            {/* Right Card – Surveillance */}
            <div className="arena-card-green p-8 group hover:scale-[1.015] transition-all duration-500">
              <div className="flex justify-between items-start mb-6">
                <Video className="w-10 h-10 text-black/40" />
                <Square size={28} color="#000" opacity={0.3} />
              </div>

              <h3 className="text-2xl font-black mb-4 text-black uppercase tracking-wide">
                Surveillance
              </h3>

              <p className="font-montserrat text-black/70 leading-relaxed font-medium text-sm">
                We are always watching. Any attempt to cheat or subvert the system
                results in immediate termination.
              </p>
            </div>

          </div>
        </div>
      </section>



{/* ----------------------------------------------------------------------------------------------------------------- */}


      {/* Prize Section */}
      <section className="py-32 px-4 relative z-10 overflow-hidden">

        {/* Ambient glow */}
        <div className="absolute inset-0 -z-10 flex justify-center">
          <div className="w-[700px] h-[500px] bg-primary/15 blur-[180px]" />
        </div>

        <div className="max-w-5xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="relative p-14 md:p-20
            border border-primary/30
            bg-black/50 backdrop-blur-xl
            overflow-hidden group"
          >

            {/* Subtle pulse */}
            <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />

            <Trophy className="w-20 h-20 text-primary mx-auto mb-10
              drop-shadow-[0_0_30px_rgba(255,0,96,0.6)]" />

            <p className="text-[15px] font-mono tracking-[0.5em] text-white/40 mb-3">
              FINAL REWARD
            </p>

            <h2 className="text-4xl md:text-6xl font-orbitron font-black text-white tracking-[0.4em] mb-10">
              THE PRIZE
            </h2>

            <div className="flex justify-center mb-10">
              <div className="w-32 h-[2px] bg-primary/80" />
            </div>

            <p className="text-3xl md:text-5xl font-black text-white font-orbitron tracking-tight italic mb-6">
              45.6 BILLION WON
            </p>

            <p className="text-white/60 text-xs md:text-sm uppercase tracking-[0.35em] font-mono">
              The reward justifies the risk.
            </p>

            {/* Divider */}
            <div className="my-14 flex justify-center">
              <div className="w-48 h-px bg-white/10" />
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-[10px] font-mono uppercase tracking-widest">
              {[
                "Winner Recognition",
                "Official Certificates",
                "Interview Exposure",
                "Career Advancement",
              ].map((item) => (
                <div
                  key={item}
                  className="p-4 border border-white/15 bg-white/5
                  text-white/50 hover:text-white transition-colors duration-300"
                >
                  {item}
                </div>
              ))}
            </div>

          </motion.div>
        </div>
      </section>


{/* ----------------------------------------------------------------------------------------------------------------- */}


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


{/* ----------------------------------------------------------------------------------------------------------------- */}


      {/* VIP Partners Section */}
      <section className="py-32 px-4 relative z-10 overflow-hidden">

        {/* Ambient menace glow */}
        <div className="absolute inset-0 -z-10 flex justify-center">
          <div className="w-[900px] h-[400px] bg-fuchsia-600/10 blur-[160px]" />
        </div>

        <div className="max-w-6xl mx-auto text-center">

          <p className="text-[15px] font-mono tracking-[0.45em] text-white/70 mb-3">
            ACCESS LEVEL: RESTRICTED
          </p>

          <h2 className="text-xl font-orbitron font-black tracking-[0.6em] text-white/70 mb-16">
            OFFICIAL VIP PARTNERS
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-10">

            {["V.I.P_ALPHA", "V.I.P_BETA", "V.I.P_GAMMA", "V.I.P_DELTA"].map((vip) => (
              <div
                key={vip}
                className="group relative h-16 flex items-center justify-center
                border border-white/15 bg-black/40 backdrop-blur-md
                font-orbitron font-black text-xs tracking-widest text-white/50
                transition-all duration-500
                hover:text-white hover:border-white/40 hover:shadow-[0_0_40px_rgba(255,255,255,0.15)]"
              >

                {/* Scan line */}
                <div className="absolute inset-0 overflow-hidden">
                  <div className="absolute -top-full left-0 w-full h-full bg-white/10 
                    group-hover:top-full transition-all duration-700" />
                </div>

                {vip}

              </div>
            ))}

          </div>
        </div>
      </section>


{/* ----------------------------------------------------------------------------------------------------------------- */}


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


{/* ----------------------------------------------------------------------------------------------------------------- */}


      {/* Control Room Section */}
      <section className="py-32 px-4 relative z-10">
        <div className="max-w-2xl mx-auto text-center relative">

          {/* Ambient glow */}
          <div className="absolute inset-0 -z-10 flex items-center justify-center">
            <div className="w-[600px] h-[300px] bg-red-600/10 blur-[120px]" />
          </div>

          {/* Glass panel */}
          <div className="relative p-1 border border-white/10 bg-black/40 backdrop-blur-md shadow-[0_0_60px_rgba(0,0,0,0.8)]">
            <div className="p-10 border border-white/20 flex flex-col items-center gap-8">

              <Video className="w-12 h-12 text-primary animate-pulse" />

              <h3 className="font-orbitron font-black text-2xl tracking-widest">
                CONTROL ROOM
              </h3>

              {/* Action buttons */}
              <div className="flex flex-col md:flex-row gap-4 w-full">
                <button className="flex-1 bg-white/5 border border-white/20 py-4 
                  font-orbitron font-bold text-xs tracking-widest
                  hover:bg-white hover:text-black transition-all duration-300">
                  CALL SUPPORT
                </button>

                <button className="flex-1 bg-white/5 border border-white/20 py-4 
                  font-orbitron font-bold text-xs tracking-widest
                  hover:bg-white hover:text-black transition-all duration-300">
                  MESSAGE CONTROL
                </button>
              </div>

              {/* Emergency terminal */}
              <div className="pt-10 flex flex-col items-center">
                <button
                  className="w-16 h-16 rounded-full bg-red-600/20 border-4 border-red-600
                  shadow-[0_0_40px_rgba(220,38,38,0.7)]
                  animate-pulse flex items-center justify-center
                  relative overflow-hidden group"
                >
                  <div className="absolute inset-0 bg-red-600/30 group-active:scale-90 transition-transform" />
                  <div className="w-8 h-8 rounded-full bg-red-600 shadow-[0_0_25px_rgba(220,38,38,0.9)]" />
                </button>

                <p className="text-[10px] font-mono text-red-600 mt-4 tracking-[0.35em] font-black">
                  EMERGENCY TERMINAL
                </p>
              </div>

            </div>
          </div>
        </div>
      </section>


{/* ----------------------------------------------------------------------------------------------------------------- */}


      {/* Footer */}
      <footer className="relative z-10 mt-24 border-t border-red-500/20 bg-black/60 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto px-6 py-10 text-center font-mono text-xs tracking-widest text-gray-500">

          <p className="text-red-500/80">
            OFFICIAL INVITATION • ASCENT 2K26
          </p>

          <p className="mt-2 text-white-600">
            CONTROLLED ACCESS • AUTHORIZATION REQUIRED
          </p>

          <div className="my-4 h-px w-32 mx-auto bg-gradient-to-r from-transparent via-red-500/40 to-transparent" />

          <p className="text-white-700">
            UNAUTHORIZED DISTRIBUTION STRICTLY PROHIBITED
          </p>

          <p className="mt-3 text-[10px] text-white-700">
            SYSTEM STATUS: <span className="text-red-500">ACTIVE</span>
          </p>

        </div>
      </footer>

    </div>
  );
}
