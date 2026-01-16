import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  FileText, 
  Download, 
  X, 
  AlertTriangle, 
  ShieldAlert, 
  CheckCircle2, 
  Volume2, 
  VolumeX 
} from "lucide-react";
import RulesBg from "@assets/Rules_bg.jpg";
import audioFile from "@assets/Round_And_Round_Mingle_1767983924508.mp3";

// Sub-component for individual Rule Cards
function RuleCard({ title, rules, isPrimary, variants, icon }: any) {
  return (
    <motion.div variants={variants} className="relative p-1 transition-all duration-500 group">
      <div className={`h-full p-8 md:p-10 border ${isPrimary ? 'border-red-600 bg-red-600/10 shadow-[0_0_30px_rgba(220,38,38,0.2)]' : 'border-white/10 bg-white/[0.02]'} backdrop-blur-md`}>
        <div className="flex items-center gap-4 mb-8">
          {icon}
          <h3 className={`text-xl font-bold tracking-tighter uppercase ${isPrimary ? 'text-white' : 'text-white/80'}`}>
            {title}
          </h3>
        </div>
        <ul className="space-y-6">
          {rules.map((rule: string, i: number) => (
            <li key={i} className="flex gap-4 items-start group/li">
              <span className={`mt-1.5 w-1.5 h-1.5 shrink-0 rotate-45 ${isPrimary ? 'bg-red-500' : 'bg-white/20 group-hover/li:bg-red-500'} transition-colors`} />
              <p className="text-xs font-mono text-gray-400 leading-relaxed group-hover/li:text-white transition-colors">
                {rule}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </motion.div>
  );
}

export default function Rules() {
  const [open, setOpen] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [audioReady, setAudioReady] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Audio Configuration with autoplay
  useEffect(() => {
    const initializeAudio = async () => {
      if (audioRef.current) {
        try {
          // Set audio properties
          audioRef.current.volume = 0.4;
          audioRef.current.muted = false;
          audioRef.current.preload = "auto";
          
          // Load the audio
          audioRef.current.load();
          
          // Try to play automatically
          const playPromise = audioRef.current.play();
          
          if (playPromise !== undefined) {
            await playPromise;
            console.log("Rules audio autoplay successful");
            setAudioReady(true);
          }
        } catch (error) {
          console.log("Rules audio autoplay blocked:", error);
          
          // Add event listeners to unblock audio on user interaction
          const handleUserInteraction = async () => {
            if (audioRef.current && audioRef.current.paused) {
              try {
                await audioRef.current.play();
                console.log("Rules audio started after user interaction");
                setAudioReady(true);
              } catch (e) {
                console.error("Failed to play rules audio:", e);
              }
            }
          };

          // Add multiple event listeners
          const events = ['click', 'touchstart', 'keydown', 'mousemove', 'scroll'];
          
          events.forEach(eventType => {
            document.addEventListener(eventType, handleUserInteraction, { 
              once: true,
              passive: true 
            });
          });

          return () => {
            events.forEach(eventType => {
              document.removeEventListener(eventType, handleUserInteraction);
            });
          };
        }
      }
    };

    initializeAudio();
  }, []);

  // Toggle mute function
  const toggleAudio = () => {
    setIsMuted(!isMuted);
    if (audioRef.current) {
      audioRef.current.muted = !isMuted;
    }
  };

  // Handle user interaction to unblock audio
  const handleUserInteraction = async () => {
    if (audioRef.current && audioRef.current.paused) {
      try {
        await audioRef.current.play();
        setAudioReady(true);
      } catch (error) {
        console.log("Audio play failed on interaction:", error);
      }
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  return (
    <div 
      className="min-h-screen bg-black pt-32 pb-0 px-6 relative overflow-hidden font-montserrat"
      onClick={handleUserInteraction}
    >
      
      {/* 1. CINEMATIC BACKGROUND LAYER */}
      <div className="fixed inset-0 z-0">
        <motion.div 
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 10, repeat: Infinity, repeatType: "mirror" }}
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-40"
          style={{ 
            backgroundImage: `url(${RulesBg})`, 
            filter: 'grayscale(30%) contrast(120%) brightness(0.7)' 
          }}
        />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.8)_100%)]" />
        <div className="absolute inset-0 bg-black/40" />
        <div className="scanline opacity-[0.03]" />
      </div>

      {/* 2. AUDIO ENGINE */}
      <audio 
        ref={audioRef} 
        src={audioFile} 
        loop 
        autoPlay 
        preload="auto"
        onCanPlayThrough={() => console.log("Rules audio loaded and ready")}
        onError={(e) => console.error("Rules audio error:", e)}
        onPlay={() => {
          console.log("Rules audio started playing");
          setAudioReady(true);
        }}
      />
      
      {/* Audio Status Indicator */}
      {!audioReady && (
        <div className="fixed top-4 right-4 z-50 animate-pulse">
          <div className="flex items-center gap-2 px-3 py-1 bg-red-900/30 border border-red-700/50 rounded-full">
            <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
            <span className="text-[10px] font-mono text-red-300 tracking-wider">
              AUDIO PENDING...
            </span>
          </div>
        </div>
      )}

      <button
        onClick={toggleAudio}
        className="fixed bottom-10 left-10 z-50 p-3 rounded-full border border-red-500/30 bg-black/60 backdrop-blur-md text-red-500 hover:scale-110 transition-all shadow-[0_0_15px_rgba(220,38,38,0.3)] group"
      >
        {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} className="animate-pulse" />}
        
        {/* Tooltip */}
        <div className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 px-2 py-1 bg-black/90 backdrop-blur-sm border border-red-500/20 text-[10px] font-mono text-white opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap pointer-events-none">
          {isMuted ? "UNMUTE AUDIO" : "MUTE AUDIO"}
        </div>
      </button>

      <div className="relative max-w-7xl mx-auto z-10">
        
        {/* HEADER */}
        <header className="text-center mb-24">
          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="inline-flex items-center gap-2 mb-4 px-3 py-1 border border-red-500/30 bg-red-500/5 rounded-sm"
            onClick={handleUserInteraction}
          >
            <ShieldAlert size={14} className="text-red-500 animate-pulse" />
            <span className="text-red-500 font-mono text-[10px] tracking-[0.4em] uppercase">Security Protocol 101</span>
          </motion.div>
          <h1 
            className="text-6xl md:text-8xl font-black tracking-tighter text-white font-orbitron italic cursor-pointer"
            onClick={handleUserInteraction}
          >
            EVENT <span className="text-transparent bg-clip-text bg-gradient-to-b from-white to-white/20">RULES</span>
          </h1>
          <div className="h-1 w-24 bg-red-600 mx-auto mt-4 shadow-[0_0_15px_#dc2626]" />
        </header>

        {/* RULES GRID */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          <RuleCard 
            title="Participation & Authority" 
            variants={cardVariants}
            icon={<CheckCircle2 className="text-red-500" size={20} />}
            rules={[
              "Participation implies full acceptance of all ASCENT rules",
              "The Organising Committee's decision is final and binding",
              "No appeals, objections, or re-evaluations permitted",
              "Valid college ID is mandatory for participation"
            ]} 
          />

          <RuleCard 
            title="Conduct & Discipline" 
            variants={cardVariants}
            isPrimary
            icon={<AlertTriangle className="text-white" size={20} />}
            rules={[
              "Cheating or misconduct leads to immediate disqualification",
              "Arguing with coordinators is strictly prohibited",
              "Unauthorized tools or assistance are banned",
              "All instructions must be followed without exception"
            ]} 
          />

          <RuleCard 
            title="Attendance & Integrity" 
            variants={cardVariants}
            icon={<CheckCircle2 className="text-red-500" size={20} />}
            rules={[
              "Presence is mandatory on qualification days",
              "Failure to report on time results in elimination",
              "Pairings and evaluations are non-negotiable",
              "Any violation at any stage leads to total ban"
            ]} 
          />
        </motion.div>

        {/* MODAL TRIGGER */}
        <div className="mt-24 flex flex-col items-center gap-6">
          <p className="font-mono text-[10px] text-white/30 tracking-[0.3em] uppercase">Complete documentation below</p>
          <button
            onClick={() => setOpen(true)}
            className="group relative px-12 py-5 bg-white text-black font-orbitron font-black text-sm tracking-[0.2em] transition-all hover:bg-red-600 hover:text-white"
          >
            <div className="absolute inset-0 border border-white translate-x-1 translate-y-1 group-hover:translate-x-0 group-hover:translate-y-0 transition-transform" />
            ACCESS OFFICIAL RULEBOOK
          </button>
        </div>
      </div>

      {/* 3. CORRECTED CINEMATIC FOOTER */}
      <footer className="w-full bg-black/90 backdrop-blur-md border-t border-red-500/20 py-16 px-6 mt-32 relative overflow-hidden z-20">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-px bg-gradient-to-r from-transparent via-red-600/50 to-transparent" />
        
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-10">
          {/* Identity */}
          <div className="flex items-center gap-5 group">
            <div className="relative">
              <ShieldAlert size={28} className="text-red-600 animate-pulse" />
              <div className="absolute inset-0 bg-red-600 blur-lg opacity-20 group-hover:opacity-40 transition-opacity" />
            </div>
            <div className="text-left space-y-1">
              <p className="font-orbitron font-black text-white tracking-[0.2em] text-sm">
                OFFICIAL PROTOCOL <span className="text-red-600">//</span> ASCENT 2K26
              </p>
              <p className="font-mono text-[10px] text-white/40 tracking-[0.3em] uppercase">
                System Status: <span className="text-green-500 animate-pulse">● SECURE_ACTIVE</span>
              </p>
            </div>
          </div>

          {/* Metadata */}
          <div className="text-center md:text-right font-mono text-[9px] tracking-[0.2em] uppercase text-white/30 space-y-1">
            <p className="text-white/50">Location: 21.1458° N // 79.0882° E</p>
            <p>Terminal: {new Date().getHours()}:{new Date().getMinutes().toString().padStart(2, '0')} // GMT+5:30</p>
            <p className="text-[8px] opacity-50">© {new Date().getFullYear()} ASCENT ADMIN PANEL. ALL RIGHTS RESERVED.</p>
          </div>
        </div>
      </footer>

      {/* RULEBOOK MODAL - FIXED TO APPEAR ABOVE NAVBAR */}
      <AnimatePresence>
        {open && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[9998] bg-black/90 backdrop-blur-xl"
              onClick={() => setOpen(false)}
            />
            
            {/* Modal Content */}
            <motion.div
              initial={{ scale: 0.9, y: 20, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.9, y: 20, opacity: 0 }}
              className="fixed inset-0 z-[9999] flex items-center justify-center p-4 pointer-events-none"
            >
              <div className="bg-neutral-950 w-full max-w-5xl max-h-[90vh] rounded-sm border border-white/10 relative shadow-2xl overflow-y-auto pointer-events-auto">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-red-600 to-transparent" />
                
                <button
                  onClick={() => setOpen(false)}
                  className="absolute top-6 right-6 z-50 text-white/40 hover:text-white transition-colors p-2 hover:bg-white/10 rounded-sm"
                >
                  <X size={24} />
                </button>

                <div className="flex items-center gap-4 mb-8 p-8 pb-0">
                  <FileText className="text-red-600" />
                  <div>
                    <h3 className="text-white font-orbitron font-bold tracking-widest uppercase">
                      ASCENT_PROTOCOL_v2.0.pdf
                    </h3>
                    <p className="text-white/30 text-[9px] font-mono tracking-widest uppercase">
                      Security Level: Restricted Access // {new Date().getFullYear()}
                    </p>
                  </div>
                </div>

                <div className="p-8 pt-4">
                  <div className="relative group">
                    <iframe
                      src="/ASCENT_RULEBOOK.pdf"
                      className="w-full h-[65vh] bg-neutral-900/50 border border-white/5 rounded-sm"
                      title="ASCENT Rulebook PDF"
                    />
                  </div>

                  <div className="mt-8 flex justify-between items-center">
                    <p className="text-[10px] font-mono text-white/20 italic">
                      Decision of the front man is final.
                    </p>
                    <a
                      href="/ASCENT_RULEBOOK.pdf"
                      download
                      className="flex items-center gap-3 bg-white/5 hover:bg-white/10 border border-white/10 px-6 py-3 rounded-sm text-white font-mono text-[10px] tracking-widest transition-all"
                      onClick={handleUserInteraction}
                    >
                      <Download size={14} />
                      DOWNLOAD_PDF
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}