import { useRef, useState, useEffect } from "react";
import { Volume2, VolumeX, ShieldAlert, Activity, Lock } from "lucide-react";
import RegiBg from "@assets/regi_bg.jpg";
import audioFile from "@assets/Round_And_Round_Mingle_1767983924508.mp3";
import FloatingShapes from "../components/FloatingShapes";
import { RegistrationForm } from "@/components/RegistrationForm";
import { motion } from "framer-motion";

export default function Registration() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isMuted, setIsMuted] = useState(false); // Changed to false for better autoplay
  const [audioReady, setAudioReady] = useState(false);

  // Initialize audio with autoplay
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
            console.log("Registration audio autoplay successful");
            setAudioReady(true);
          }
        } catch (error) {
          console.log("Registration audio autoplay blocked:", error);
          
          // Add event listeners to unblock audio on user interaction
          const handleUserInteraction = async () => {
            if (audioRef.current && audioRef.current.paused) {
              try {
                await audioRef.current.play();
                console.log("Registration audio started after user interaction");
                setAudioReady(true);
              } catch (e) {
                console.error("Failed to play registration audio:", e);
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

  return (
    <main 
      className="min-h-screen bg-black text-white relative font-montserrat overflow-x-hidden selection:bg-red-500 selection:text-white"
      onClick={handleUserInteraction}
    >
      
      {/* 1. CINEMATIC BACKGROUND LAYER */}
      <div className="fixed inset-0 z-0">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-50 scale-110 transition-transform duration-[30s] animate-pulse-slow"
          style={{ 
            backgroundImage: `url(${RegiBg})`, 
            filter: 'grayscale(0%) contrast(150%) brightness(100%)' 
          }}
        />
        {/* CRT Scanline & Grain Effect */}
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 pointer-events-none" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.9)_100%)]" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black" />
      </div>

      {/* 2. SECURITY HUD OVERLAYS */}
      <div className="fixed inset-0 z-10 pointer-events-none">
        <div className="scanline opacity-10" />
        
        {/* Adaptive Viewfinder Brackets */}
        <div className="absolute top-8 left-8 w-16 h-16 border-t-2 border-l-2 border-white/20" />
        <div className="absolute top-8 right-8 w-16 h-16 border-t-2 border-r-2 border-white/20" />
        <div className="absolute bottom-8 left-8 w-16 h-16 border-b-2 border-l-2 border-white/20" />
        <div className="absolute bottom-8 right-8 w-16 h-16 border-b-2 border-r-2 border-white/20" />

        {/* Dynamic HUD Data */}
        <div className="absolute top-10 left-12 font-mono text-[9px] text-white/40 tracking-[0.3em] uppercase">
          <div className="flex items-center gap-2 mb-1">
            <span className="w-2 h-2 bg-red-600 rounded-full animate-pulse shadow-[0_0_8px_#dc2626]" />
            <span className="text-white/80">Signal: Encrypted // Node_01</span>
          </div>
          <div className="opacity-50">Dormitory_H1 // {new Date().toISOString().split('T')[0]}</div>
        </div>

        {/* Audio Status Indicator */}
        {!audioReady && (
          <div className="absolute top-10 right-12 animate-pulse">
            <div className="flex items-center gap-2 px-3 py-1 bg-red-900/30 border border-red-700/50 rounded-full">
              <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
              <span className="text-[10px] font-mono text-red-300 tracking-wider">
                AUDIO PENDING...
              </span>
            </div>
          </div>
        )}
      </div>

      {/* 3. FLOATING AUDIO CONTROL - LEFT BOTTOM CORNER */}
      <motion.button
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.5, duration: 0.3 }}
        onClick={toggleAudio}
        className="fixed left-4 bottom-4 z-50 p-3 bg-black/60 backdrop-blur-md border border-white/10 hover:border-red-500/30 rounded-full hover:bg-red-500/10 transition-all group shadow-lg"
        aria-label={isMuted ? "Unmute audio" : "Mute audio"}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <div className="relative">
          {isMuted ? (
            <VolumeX size={18} className="text-white/60 group-hover:text-white" />
          ) : (
            <Volume2 size={18} className="text-red-500 group-hover:text-red-400" />
          )}
          
          {/* Audio wave animation when playing */}
          {!isMuted && audioReady && (
            <div className="absolute -inset-1 flex items-center justify-center">
              <div className="flex items-end justify-center space-x-[2px]">
                {[1, 2, 3, 2, 1].map((height, index) => (
                  <div
                    key={index}
                    className="w-[2px] bg-red-500 rounded-full animate-pulse"
                    style={{
                      height: `${height * 4}px`,
                      animationDelay: `${index * 0.1}s`,
                      animationDuration: '0.8s'
                    }}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
        
        {/* Pulsing ring when audio is playing */}
        {!isMuted && audioReady && (
          <div className="absolute inset-0 rounded-full border border-red-500/30 animate-ping" />
        )}

        {/* Tooltip on hover */}
        <div className="absolute left-full ml-2 top-1/2 -translate-y-1/2 px-2 py-1 bg-black/90 backdrop-blur-sm border border-red-500/20 text-xs font-mono text-white opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap pointer-events-none">
          {isMuted ? "ENABLE AUDIO" : "DISABLE AUDIO"}
          <div className="absolute left-0 top-1/2 -translate-x-1 -translate-y-1/2 w-0 h-0 border-t-[4px] border-t-transparent border-r-[4px] border-r-black/90 border-b-[4px] border-b-transparent" />
        </div>

        {/* Status indicator */}
        <div className={`absolute -top-1 -right-1 w-3 h-3 rounded-full border border-white/20 ${
          !isMuted && audioReady ? 'bg-red-500 animate-pulse' : 
          !isMuted && !audioReady ? 'bg-yellow-500 animate-pulse' : 
          'bg-white/10'
        }`} />
      </motion.button>

      {/* 4. CONTENT WRAPPER */}
      <div className="relative z-20 flex flex-col items-center">
        
        {/* Title Section */}
        <header className="pt-32 pb-16 px-6 text-center">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-3 py-1 mb-6 border border-red-500/30 bg-red-500/5 rounded-sm"
            onClick={handleUserInteraction}
          >
            <Lock size={12} className="text-red-500" />
            <span className="text-red-500 font-mono text-[10px] tracking-[0.4em] uppercase">Secured Enlistment</span>
          </motion.div>
          <h1 
            className="text-6xl md:text-8xl font-orbitron tracking-tighter font-black text-white mb-4 cursor-pointer"
            onClick={handleUserInteraction}
          >
            REGISTRA<span className="text-red-600">TION</span>
          </h1>
          <p className="font-mono text-[10px] text-white/40 uppercase tracking-[0.6em]">
            Sequence 2K26 // Authorized Personnel Only
          </p>
        </header>

        {/* Form Area */}
        <section id="register" className="w-full max-w-4xl px-6 pb-40">
          <div className="relative">
            {/* Animated Glow Border */}
            <div className="absolute -inset-[1px] bg-gradient-to-r from-transparent via-red-500/40 to-transparent blur-sm opacity-50" />
            
            <div 
              className="relative bg-neutral-950/40 backdrop-blur-3xl border border-white/10 p-8 md:p-16 rounded-sm shadow-2xl"
              onClick={handleUserInteraction}
            >
              <div className="mb-12 space-y-4">
                <div className="flex items-center gap-4">
                  <Activity size={20} className="text-red-600" />
                  <h2 className="text-2xl font-bold tracking-widest uppercase">Player Enrollment</h2>
                </div>
                <div className="h-[1px] w-full bg-gradient-to-r from-red-600/50 to-transparent" />
                <p className="text-white/40 text-[11px] font-mono leading-relaxed uppercase tracking-widest">
                  By initializing this uplink, you agree to the binding terms of the trial. 
                  <span className="text-red-500/80"> Withdrawal is not an option once the game begins.</span>
                </p>
              </div>

              <RegistrationForm />
            </div>
          </div>
        </section>

        {/* 5. MINIMALIST INDUSTRIAL FOOTER */}
        <footer className="w-full bg-black/80 backdrop-blur-md border-t border-white/5 py-12 px-6">
          <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8 font-mono text-[9px] tracking-[0.2em] uppercase text-white/30">
            <div className="flex items-center gap-4">
              <ShieldAlert size={18} className="text-red-600 opacity-60" />
              <div className="text-left">
                <p className="text-white/60">Official Protocol // ASCENT 2K26</p>
                <p>System Status: <span className="text-green-500">Secure</span></p>
              </div>
            </div>

            <div className="text-center md:text-right space-y-1">
              <p>Lat: 34.0522° N // Long: 118.2437° W</p>
              <p>© Unauthorized redistribution strictly prohibited</p>
            </div>
          </div>
        </footer>
      </div>

      {/* PERSISTENT ELEMENTS */}
      <audio 
        ref={audioRef} 
        src={audioFile} 
        loop 
        autoPlay 
        preload="auto"
        onCanPlayThrough={() => console.log("Registration audio loaded and ready")}
        onError={(e) => console.error("Registration audio error:", e)}
        onPlay={() => {
          console.log("Registration audio started playing");
          setAudioReady(true);
        }}
      />
      <FloatingShapes />
    </main>
  );
}