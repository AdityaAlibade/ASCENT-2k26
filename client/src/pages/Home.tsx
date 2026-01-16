import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useGameStats } from "@/hooks/use-players";
import { RegistrationForm } from "@/components/RegistrationForm";
import { Circle, Triangle, Square, FloatingShapes } from "@/components/ui/GameShapes";
import { ChevronDown, AlertTriangle, Clock, Trophy, ShieldAlert, Video, Volume2, VolumeX } from "lucide-react";
import audioFile from "@assets/Round_And_Round_Mingle_1767983924508.mp3";
import frontManTheme from "@assets/squid_game_1768071980984.mp3";
import frontManImg from "@assets/FM_1768130131807.png"
import mainBg from "@assets/MAin_background_1768146583042.jpg";

// Store in sessionStorage instead of localStorage for single session only
let introHasPlayed = sessionStorage.getItem("introHasPlayed") === "true";

const CountdownTimer = () => {
  const [time, setTime] = useState("00:00:00:00");

  useEffect(() => {
    const targetDate = new Date("2026-01-29T23:59:00").getTime();

    const interval = setInterval(() => {
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference <= 0) {
        setTime("00:00:00:00");
        clearInterval(interval);
        return;
      }

      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);

      setTime(
        `${days.toString().padStart(2, '0')}:${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
      );
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

const DdakjiTransition = ({ onComplete }: { onComplete: () => void }) => {
  const [isFlipped, setIsFlipped] = useState(false);

  const handlePlay = () => {
    setIsFlipped(true);
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
            <div className="absolute inset-0 bg-blue-600 backface-hidden" />
            <div className="absolute inset-0 bg-red-600" style={{ transform: "rotateY(180deg)", backfaceVisibility: "hidden" }} />
          </motion.div>
        </div>
        
        <div className="space-y-8">
          <p className="font-orbitron text-white/10 uppercase tracking-[0.5em] text-xs">
            SLAP... SLAP... SLAP...
          </p>
          
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

export default function Home() {
  const [showIntro, setShowIntro] = useState(() => {
    // Only show intro if it hasn't been played in this session
    const shouldSkip = sessionStorage.getItem("skipIntro") === "true";
    const introCompleted = sessionStorage.getItem("introCompleted") === "true";
    
    if (shouldSkip || introCompleted) {
      introHasPlayed = true;
      sessionStorage.removeItem("skipIntro");
      return false;
    }
    
    return !introHasPlayed;
  });
  
  const [isMuted, setIsMuted] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const { data: stats } = useGameStats();
  const [open, setOpen] = useState(false);
  const [activeAction, setActiveAction] = useState<string | null>(null);
  
  const handleIntroComplete = () => {
    introHasPlayed = true;
    setShowIntro(false);
    sessionStorage.setItem("introCompleted", "true");
    sessionStorage.setItem("introHasPlayed", "true");
    window.dispatchEvent(new CustomEvent('introComplete'));
    sessionStorage.removeItem("skipIntro");
    
    const scrollToSection = sessionStorage.getItem("scrollToSection");
    if (scrollToSection) {
      setTimeout(() => {
        const element = document.getElementById(scrollToSection);
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
        sessionStorage.removeItem("scrollToSection");
      }, 500);
    }
  };

  const contacts = [
    { name: "Patel Abdul Rahman (President)", phone: "989038583", wa: "989038583" },
    { name: "Sanket Mandwal (Secretary)", phone: "9561590442", wa: "9561590442" },
    { name: "Prathamesh Kshirsagar (Vice President)", phone: "8767745753", wa: "8767745753" }
  ];

  useEffect(() => {
    if (!showIntro && audioRef.current) {
      audioRef.current.play().catch(e => console.error("Audio playback failed:", e));
    }
  }, [showIntro]);

  if (showIntro) {
    return <AnimatePresence><IntroOverlay onComplete={handleIntroComplete} /></AnimatePresence>;
  }

  return (
    <div className="min-h-screen bg-black text-white selection:bg-primary selection:text-white overflow-hidden relative font-montserrat">
      <audio ref={audioRef} src={audioFile} loop muted={isMuted} />
      
      {/* Enhanced Background */}
      <div 
        className="fixed inset-0 z-0 bg-cover bg-center bg-no-repeat opacity-70 grayscale-[0.3]"
        style={{ backgroundImage: `url(${mainBg})` }}
      />
      <div className="fixed inset-0 z-1 bg-gradient-to-b from-black/90 via-black/60 to-black/80 pointer-events-none" />
      
      <button 
        onClick={() => setIsMuted(!isMuted)}
        className="fixed top-8 right-8 z-[100] p-2 text-white/40 hover:text-white transition-colors bg-black/40 backdrop-blur-sm rounded-full border border-white/10"
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

      {/* Hero Section */}
      <section id="hero" className="relative h-screen flex flex-col items-center justify-center px-4 z-20">
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="text-center space-y-6"
        >
          <div className="flex justify-center gap-4 md:gap-8 mb-8">
            <Circle className="w-12 h-12 md:w-20 md:h-20 stroke-white animate-pulse" size={80} />
            <Triangle className="w-12 h-12 md:w-20 md:h-20 stroke-white animate-pulse delay-300" size={80} />
            <Square className="w-12 h-12 md:w-20 md:h-20 stroke-white animate-pulse delay-600" size={80} />
          </div>

          <motion.h1 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 1 }}
            className="font-orbitron text-5xl md:text-9xl font-black tracking-tighter text-white mb-2 text-glow"
          >
            ASCENT <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">2k26</span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 1 }}
            className="font-montserrat text-lg md:text-3xl text-gray-300 tracking-widest uppercase font-bold"
          >
            A Game Where Only the Best Survive
          </motion.p>

          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7, duration: 1 }}
            className="font-montserrat text-sm md:text-lg text-white/70 max-w-2xl mx-auto leading-relaxed tracking-wide"
          >
            This competition will test your intelligence, discipline, and composure
            under pressure. Every decision matters, every second counts.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9, duration: 1 }}
            className="py-12"
          >
            <p className="text-primary font-black tracking-[0.4em] mb-4 font-orbitron text-sm drop-shadow-[0_0_10px_rgba(255,0,96,0.5)]">REGISTRATIONS CLOSE IN</p>
            <CountdownTimer />
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.1, duration: 1 }}
            className="flex flex-col md:flex-row items-center justify-center gap-6 mt-8"
          >
            <motion.a 
              href="#register"
              whileHover={{ scale: 1.05, boxShadow: "0 0 40px rgba(255, 0, 96, 0.6)" }}
              whileTap={{ scale: 0.95 }}
              className="group relative overflow-hidden bg-primary px-12 py-5 font-orbitron font-black text-xl tracking-[0.2em] text-white transition-all"
            >
              <div className="absolute inset-0 bg-white/10 -translate-x-full group-hover:translate-x-0 transition-transform duration-300 ease-out skew-x-12" />
              <span className="relative z-10">ENTER THE GAME</span>
            </motion.a>

            <motion.a 
              href="#rules"
              whileHover={{ scale: 1.05, borderColor: "white", backgroundColor: "rgba(255,255,255,0.1)" }}
              whileTap={{ scale: 0.95 }}
              className="group relative overflow-hidden bg-transparent border-2 border-white/20 px-12 py-5 font-orbitron font-black text-xl tracking-[0.2em] text-white transition-all"
            >
              <span className="relative z-10">VIEW RULES</span>
            </motion.a>

            <motion.a 
              href="#games"
              whileHover={{ scale: 1.05, borderColor: "rgb(36, 159, 156)", backgroundColor: "rgba(36, 159, 156, 0.1)" }}
              whileTap={{ scale: 0.95 }}
              className="group relative overflow-hidden bg-transparent border-2 border-secondary/30 px-12 py-5 font-orbitron font-black text-xl tracking-[0.2em] text-secondary transition-all"
            >
              <span className="relative z-10">THE TRIALS</span>
            </motion.a>
          </motion.div>
        </motion.div>

        <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none opacity-40">
          <div className="absolute inset-0 bg-gradient-to-b from-black via-black/80 to-black" />
          <motion.div 
            animate={{ x: [-20, 20] }}
            transition={{ repeat: Infinity, duration: 20, ease: "linear", repeatType: "mirror" }}
            className="absolute inset-0 scale-110"
          >
             <div className="w-full h-full bg-[linear-gradient(90deg,transparent_0%,rgba(36,159,156,0.05)_50%,transparent_100%)] opacity-30" />
          </motion.div>
          
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

      {/* Prize Section */}
      <section id="prizes" className="py-32 px-4 relative z-10 overflow-hidden">
        <div className="absolute inset-0 -z-10 flex justify-center">
          <div className="w-[700px] h-[500px] bg-primary/20 blur-[180px]" />
        </div>

        <div className="max-w-5xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="relative p-14 md:p-20 border border-primary/30 bg-black/60 backdrop-blur-xl overflow-hidden group"
          >
            <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />

            <Trophy className="w-20 h-20 text-primary mx-auto mb-10 drop-shadow-[0_0_30px_rgba(255,0,96,0.6)] animate-bounce" />

            <p className="text-[15px] font-mono tracking-[0.5em] text-white/40 mb-3 uppercase">
              Placement Simulation Rewards
            </p>

            <h2 className="text-4xl md:text-6xl font-orbitron font-black text-white tracking-[0.4em] mb-10">
              THE <span className="text-primary">REWARDS</span>
            </h2>

            <div className="flex justify-center mb-10">
              <div className="w-32 h-[2px] bg-primary/80" />
            </div>

            <div className="grid md:grid-cols-2 gap-8 mb-12">
              <motion.div 
                whileHover={{ scale: 1.05, borderColor: "rgb(255, 0, 96)" }}
                className="p-6 border border-white/10 bg-black/40 backdrop-blur-sm"
              >
                <p className="text-primary font-orbitron text-sm tracking-widest mb-2">CHAMPION</p>
                <p className="text-2xl font-black text-white font-orbitron">JUNIOR TRACK</p>
                <p className="text-white/40 text-[10px] mt-2 font-mono uppercase">1st & 2nd Year Excellence</p>
              </motion.div>
              <motion.div 
                whileHover={{ scale: 1.05, borderColor: "rgb(255, 0, 96)" }}
                className="p-6 border border-white/10 bg-black/40 backdrop-blur-sm"
              >
                <p className="text-primary font-orbitron text-sm tracking-widest mb-2">CHAMPION</p>
                <p className="text-2xl font-black text-white font-orbitron">SENIOR TRACK</p>
                <p className="text-white/40 text-[10px] mt-2 font-mono uppercase">3rd & 4th Year Mastery</p>
              </motion.div>
            </div>

            <p className="text-white/60 text-xs md:text-sm uppercase tracking-[0.35em] font-mono mb-14">
              The decision of the organizing committee is final.
            </p>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-[10px] font-mono uppercase tracking-widest">
              {[
                "Winner Recognition",
                "Official Certificates",
                "Technical & HR Feedback",
                "Placement Readiness",
              ].map((item) => (
                <motion.div
                  key={item}
                  whileHover={{ scale: 1.05, backgroundColor: "rgba(255,255,255,0.1)" }}
                  className="p-4 border border-white/15 bg-white/5 text-white/50 hover:text-white hover:border-primary/50 transition-all duration-300"
                >
                  {item}
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Schedule Section */}
      <section id="schedule" className="py-24 px-4 relative z-10 bg-transparent border-y border-white/5">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <motion.p 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              className="text-primary font-mono text-[10px] tracking-[0.8em] mb-4 uppercase"
            >
              {"[ MISSION_LOG_S2 ]"}
            </motion.p>
            <h2 className="text-4xl md:text-6xl font-black text-white tracking-widest font-orbitron">
              MISSION <span className="text-primary drop-shadow-[0_0_10px_rgba(255,0,96,0.5)]">SCHEDULE</span>
            </h2>
            <div className="w-16 h-1 bg-secondary mx-auto mt-4" />
          </div>

          <div className="space-y-6">
            {[
              { round: "Round 1", title: "THE ENTRY GAME", date: "Jan 30, 2026", time: "TO BE DETERMINED", symbol: "○" },
              { round: "Round 2", title: "THE GLASS BRIDGE", date: "Jan 30, 2026", time: "TO BE DETERMINED", symbol: "△" },
              { round: "Round 3", title: "THE FINAL STAND", date: "Jan 31, 2026", time: "TO BE DETERMINED", symbol: "□" }
            ].map((item, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                whileHover={{ scale: 1.02, borderColor: "rgba(255, 0, 96, 0.5)" }}
                className="group relative flex items-center gap-6 p-8 bg-black/40 backdrop-blur-xl border border-white/10 hover:border-primary/50 transition-all duration-500 rounded-sm"
              >
                <div className="w-16 h-16 flex flex-col items-center justify-center border border-white/10 font-orbitron group-hover:border-primary transition-colors">
                  <span className="text-xs text-white/30 group-hover:text-primary transition-colors">
                    {item.symbol}
                  </span>
                  <span className="text-xl font-black text-white">
                    0{idx + 1}
                  </span>
                </div>

                <div className="flex-1">
                  <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4 mb-2">
                    <h4 className="font-orbitron font-black text-xl text-white tracking-widest uppercase group-hover:text-primary transition-colors">
                      {item.title}
                    </h4>
                    <span className="hidden md:block text-white/10">{"|"}</span>
                    <span className="text-primary font-mono text-[10px] font-bold tracking-widest">
                      {item.round}
                    </span>
                  </div>
                  
                  <div className="flex items-center gap-4">
                    <p className="font-mono text-xs text-white/40 uppercase tracking-widest">
                      {item.date} <span className="mx-2 text-white/10">{"//"}</span> {item.time}
                    </p>
                  </div>
                </div>

                <div className="flex flex-col items-end gap-2">
                  <div className="w-2 h-2 rounded-full bg-primary animate-pulse shadow-[0_0_10px_#ff003c]" />
                  <span className="text-[8px] font-mono text-white/20 uppercase tracking-[0.3em] [writing-mode:vertical-lr]">
                    SECURED
                  </span>
                </div>

                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 pointer-events-none" />
              </motion.div>
            ))}
          </div>

          <div className="mt-16 text-center opacity-150">
            <p className="text-[13px] font-mono text-white uppercase tracking-[0.5em]">
              {"[ FAILURE TO REPORT ON ASSIGNED DAY RESULTS IN ELIMINATION ]"}
            </p>
          </div>
        </div>
      </section>

      {/* Control Room Section */}
      <section id="control-room" className="py-32 px-4 relative z-10 overflow-hidden">
        <div className="max-w-3xl mx-auto text-center relative">
          <div className="absolute inset-0 -z-10 flex items-center justify-center">
            <div className="w-[600px] h-[300px] bg-primary/10 blur-[120px] animate-pulse" />
          </div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="relative p-[1px] bg-gradient-to-b from-white/20 to-transparent backdrop-blur-2xl shadow-2xl"
          >
            <div className="p-8 md:p-12 bg-black/60 border border-white/5 relative overflow-hidden">
              <div className="flex justify-between items-center mb-10 border-b border-white/10 pb-6">
                <div className="text-left">
                  <h3 className="font-orbitron font-black text-2xl tracking-[0.2em] text-white">
                    CONTROL <span className="text-primary">ROOM</span>
                  </h3>
                  <p className="text-[9px] font-mono text-white/40 uppercase tracking-widest mt-1">
                    {"Secure Channel // CAM_04 // Dormitory_H1"}
                  </p>
                </div>
                <Video className="w-8 h-8 text-primary animate-pulse drop-shadow-[0_0_8px_#FF0060]" />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full mb-8">
                <motion.button 
                  whileHover={{ scale: 1.05 }}
                  onClick={() => setActiveAction(activeAction === 'call' ? null : 'call')}
                  className={`group relative overflow-hidden border py-5 font-orbitron font-bold text-xs tracking-[0.3em] transition-all duration-500 ${
                    activeAction === 'call' ? 'bg-white text-black border-white' : 'bg-white/5 border-white/10 text-white hover:border-primary'
                  }`}
                >
                  <span className="relative z-10">CALL SUPPORT</span>
                  <div className="absolute inset-0 bg-primary/20 translate-y-full group-hover:translate-y-0 transition-transform" />
                </motion.button>

                <motion.button 
                  whileHover={{ scale: 1.05 }}
                  onClick={() => setActiveAction(activeAction === 'message' ? null : 'message')}
                  className={`group relative overflow-hidden border py-5 font-orbitron font-bold text-xs tracking-[0.3em] transition-all duration-500 ${
                    activeAction === 'message' ? 'bg-white text-black border-white' : 'bg-white/5 border-white/10 text-white hover:border-primary'
                  }`}
                >
                  <span className="relative z-10">MESSAGE CONTROL</span>
                  <div className="absolute inset-0 bg-primary/20 translate-y-full group-hover:translate-y-0 transition-transform" />
                </motion.button>
              </div>

              <AnimatePresence>
                {activeAction && (
                  <motion.div 
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="space-y-3 mb-10 overflow-hidden"
                  >
                    <div className="bg-white/5 p-4 border border-white/10">
                      <p className="text-[10px] font-mono text-primary mb-4 tracking-[0.4em] uppercase">
                        {"[ Select_Frequency ]"}
                      </p>
                      <div className="grid gap-2">
                        {contacts.map((contact, idx) => (
                          <a
                            key={idx}
                            href={activeAction === 'call' ? `tel:${contact.phone}` : `https://wa.me/${contact.wa}`}
                            target={activeAction === 'message' ? "_blank" : "_self"}
                            rel="noreferrer"
                            className="flex items-center justify-between p-4 bg-black/40 border border-white/5 hover:border-primary group transition-all"
                          >
                            <div className="text-left">
                              <p className="text-xs font-bold text-white tracking-widest uppercase group-hover:text-primary transition-colors">
                                {contact.name}
                              </p>
                              <p className="text-[10px] font-mono text-white/30">{contact.phone}</p>
                            </div>
                            <div className="text-primary font-mono text-[9px] opacity-0 group-hover:opacity-100 transition-opacity">
                              {"CONNECTING >>"}
                            </div>
                          </a>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              <div className="pt-8 border-t border-white/10 flex flex-col items-center">
                <div className="relative group">
                  <div className="absolute inset-0 bg-red-600 blur-2xl opacity-20 group-hover:opacity-40 transition-opacity" />
                  <div className="w-14 h-14 rounded-full bg-red-600/20 border-2 border-red-600 flex items-center justify-center relative z-10">
                    <div className="w-6 h-6 rounded-full bg-red-600 shadow-[0_0_15px_#ef4444] animate-pulse" />
                  </div>
                </div>
                <p className="text-[9px] font-mono text-red-600 mt-4 tracking-[0.5em] font-black uppercase">
                  Emergency Link Secure
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Enhanced Footer */}
      <footer className="relative z-10 mt-24 border-t border-red-500/20 bg-black/60 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto px-6 py-12 text-center font-mono text-xs tracking-widest">
          <p className="text-red-500/80 mb-2">
            OFFICIAL INVITATION • ASCENT 2K26
          </p>
          <p className="text-white/60 mb-2">
            CONTROLLED ACCESS • AUTHORIZATION REQUIRED
          </p>
          <div className="my-4 h-px w-32 mx-auto bg-gradient-to-r from-transparent via-red-500/40 to-transparent" />
          <p className="text-white/40 mb-2">
            UNAUTHORIZED DISTRIBUTION STRICTLY PROHIBITED
          </p>
          <p className="mt-3 text-[10px] text-white/40">
            SYSTEM STATUS: <span className="text-red-500 font-bold">ACTIVE</span>
          </p>
        </div>
      </footer>
    </div>
  );
}