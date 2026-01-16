import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FileText, Download, X, AlertTriangle, ShieldAlert, CheckCircle2, Volume2, VolumeX } from "lucide-react";
import RulesBg from "@assets/Rules_bg.jpg";
import audioFile from "@assets/Round_And_Round_Mingle_1767983924508.mp3";

export default function Rules() {
  const [open, setOpen] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Sync audio state
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = 0.4;
    }
  }, []);

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
    <div className="min-h-screen bg-black pt-32 pb-20 px-6 relative overflow-hidden font-montserrat">
      
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
        {/* Cinematic Overlays */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.8)_100%)]" />
        <div className="absolute inset-0 bg-black/40" />
        <div className="scanline opacity-[0.03]" />
      </div>

      {/* 2. AUDIO ENGINE */}
      <audio ref={audioRef} src={audioFile} loop muted={isMuted} autoPlay />
      <button
        onClick={() => setIsMuted(!isMuted)}
        className="fixed bottom-10 left-10 z-50 p-3 rounded-full border border-red-500/30 bg-black/60 backdrop-blur-md text-red-500 hover:scale-110 transition-all shadow-[0_0_15px_rgba(220,38,38,0.3)]"
      >
        {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} className="animate-pulse" />}
      </button>

      <div className="relative max-w-7xl mx-auto z-10">
        
        {/* HEADER */}
        <header className="text-center mb-24">
          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="inline-flex items-center gap-2 mb-4 px-3 py-1 border border-red-500/30 bg-red-500/5 rounded-sm"
          >
            <ShieldAlert size={14} className="text-red-500 animate-pulse" />
            <span className="text-red-500 font-mono text-[10px] tracking-[0.4em] uppercase">Security Protocol 101</span>
          </motion.div>
          <h1 className="text-6xl md:text-8xl font-black tracking-tighter text-white font-orbitron italic">
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
              "The Organising Committee’s decision is final and binding",
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

      {/* RULEBOOK MODAL */}
      <AnimatePresence>
        {open && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-xl flex items-center justify-center p-4"
          >
            <motion.div 
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              className="bg-neutral-950 w-full max-w-5xl rounded-sm border border-white/10 p-8 relative shadow-2xl"
            >
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-red-600 to-transparent" />
              
              <button
                onClick={() => setOpen(false)}
                className="absolute top-6 right-6 text-white/40 hover:text-white transition-colors"
              >
                <X size={24} />
              </button>

              <div className="flex items-center gap-4 mb-8">
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

              <div className="relative group">
                <iframe
                  src="/ASCENT_RULEBOOK.pdf"
                  className="w-full h-[65vh] bg-neutral-900/50 border border-white/5 rounded-sm"
                />
                <div className="absolute inset-0 pointer-events-none border border-white/5 group-hover:border-white/10 transition-colors" />
              </div>

              <div className="mt-8 flex justify-between items-center">
                <p className="text-[10px] font-mono text-white/20 italic">
                  Decision of the front man is final.
                </p>
                <a
                  href="/ASCENT_RULEBOOK.pdf"
                  download
                  className="flex items-center gap-3 bg-white/5 hover:bg-white/10 border border-white/10 px-6 py-3 rounded-sm text-white font-mono text-[10px] tracking-widest transition-all"
                >
                  <Download size={14} />
                  DOWNLOAD_PDF
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

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