import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { 
  Terminal, 
  Activity, 
  Eye, 
  ShieldCheck, 
  Volume2, 
  VolumeX, 
  Zap, 
  Lock, 
  ShieldAlert,
  Video,
  ChevronRight,
  Clock,
  Users,
  Code,
  Brain,
  Target
} from "lucide-react";
import AboutBg from "@assets/Merry go round.jpg";
import Phase1 from "@assets/Phase_1.jpg";
import Phase2 from "@assets/Phase_2.webp";
import FinalPhase from "@assets/final phase.webp";
import audioFile from "@assets/Round_And_Round_Mingle_1767983924508.mp3";

// Define the color type to fix TypeScript errors
type ColorType = "red" | "cyan" | "white";

export default function TrialsSection() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const containerRef = useRef<HTMLElement | null>(null);
  const [isMuted, setIsMuted] = useState(false);
  const [audioReady, setAudioReady] = useState(false);

  // Parallax with optimized transforms
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const contentY = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const backgroundScale = useTransform(scrollYProgress, [0, 1], [1.05, 1.15]);

  // Optimized audio initialization
  useEffect(() => {
    const initializeAudio = async () => {
      if (!audioRef.current) return;
      
      // Set up audio element
      audioRef.current.volume = 0.4;
      audioRef.current.muted = false;
      audioRef.current.preload = "auto";
      
      // Attempt autoplay
      try {
        await audioRef.current.play();
        setAudioReady(true);
      } catch (error) {
        console.log("Audio autoplay blocked");
        
        // Single event listener for user interaction
        const handleInteraction = async () => {
          if (audioRef.current?.paused) {
            try {
              await audioRef.current.play();
              setAudioReady(true);
            } catch (e) {
              console.error("Audio play failed:", e);
            }
          }
        };
        
        const events = ['click', 'touchstart', 'keydown'];
        const handler = () => {
          handleInteraction();
          events.forEach(e => document.removeEventListener(e, handler));
        };
        
        events.forEach(e => document.addEventListener(e, handler, { once: true }));
      }
    };

    initializeAudio();
  }, []);

  const toggleMute = () => {
    setIsMuted(!isMuted);
    if (audioRef.current) {
      audioRef.current.muted = !isMuted;
    }
  };

  return (
    <section 
      ref={containerRef} 
      id="games" 
      className="relative min-h-screen w-full overflow-hidden bg-black pt-24 md:pt-32 px-4 md:px-8"
    >
      {/* AUDIO ENGINE */}
      <audio 
        ref={audioRef} 
        src={audioFile} 
        loop 
        preload="auto"
        onCanPlayThrough={() => console.log("Audio ready")}
      />
      
      {/* FIXED BACKGROUND with optimized animations */}
      <div className="fixed inset-0 z-0 overflow-hidden">
        <motion.div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ 
            backgroundImage: `url(${AboutBg})`,
            scale: backgroundScale,
            filter: 'grayscale(30%) contrast(120%) brightness(0.7) saturate(1.1)'
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/90 via-black/70 to-black/90" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(0,0,0,0.95)_100%)]" />
        <div className="scanline opacity-[0.02]" />
      </div>

      {/* AUDIO CONTROLS */}
      <button
        onClick={toggleMute}
        className="fixed bottom-8 left-8 z-50 p-3 rounded-full border border-red-500/40 bg-black/80 backdrop-blur-xl text-red-500 hover:scale-110 transition-all duration-300 shadow-[0_0_20px_rgba(220,38,38,0.3)] hover:shadow-[0_0_30px_rgba(220,38,38,0.5)] group"
      >
        {isMuted ? (
          <VolumeX size={22} className="group-hover:rotate-12 transition-transform" />
        ) : (
          <Volume2 size={22} className="group-hover:scale-125 transition-transform" />
        )}
      </button>

      {/* CONTENT */}
      <motion.div 
        style={{ y: contentY }}
        className="max-w-6xl mx-auto relative z-10 pb-32"
      >
        {/* HEADER */}
        <motion.header 
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="text-center mb-24 pt-16"
        >
          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-3 mb-8 px-5 py-2.5 border border-red-600/50 bg-red-600/10 rounded-full backdrop-blur-sm"
          >
            <Zap size={16} className="text-red-500 fill-red-500/30" />
            <span className="text-red-400 font-mono text-xs tracking-[0.3em] uppercase font-bold">
              Trial Phase // System Active
            </span>
          </motion.div>
          
          <h1 className="text-5xl md:text-8xl font-black mb-6 text-white font-orbitron tracking-tighter">
            <span className="text-gray-400">THE </span>
            <span className="text-red-600 drop-shadow-[0_0_30px_rgba(220,38,38,0.8)]">TRIALS</span>
          </h1>
          
          <p className="font-mono text-gray-400 max-w-2xl mx-auto uppercase tracking-[0.15em] text-sm leading-relaxed mb-12">
            Three rounds. One survivor. Your skills will be pushed to their absolute limits.
          </p>
          
          <div className="flex flex-wrap justify-center gap-4 mt-12">
            {["Cognitive", "Technical", "Psychological"].map((tag, i) => (
              <span 
                key={tag}
                className="px-4 py-2 border border-white/10 bg-white/5 rounded-full font-mono text-xs text-gray-300 hover:border-red-500/50 hover:text-white transition-all duration-300"
              >
                {tag}
              </span>
            ))}
          </div>
        </motion.header>

        {/* TRIALS GRID */}
        <div className="grid md:grid-cols-3 gap-8 md:gap-12 mb-32">
          <TrialCard 
            icon={<Brain size={28} />}
            title="Round 1"
            subtitle="The Entry Game"
            description="A high-pressure 1v1 MCQ simulation testing aptitude, pseudocode, and logical reasoning under strict time constraints."
            stats={[
              { icon: <Clock size={14} />, label: "30 mins" },
              { icon: <Users size={14} />, label: "1v1 Format" },
              { icon: <Target size={14} />, label: "15 Questions" }
            ]}
            color="red"
            delay={0.1}
            image={Phase1}
          />

          <TrialCard 
            icon={<Code size={28} />}
            title="Round 2"
            subtitle="The Glass Bridge"
            description="Step onto the Glass Bridge — a coding challenge where every decision matters. Precision and problem-solving will determine whether you cross safely or fall behind."
            stats={[
              { icon: <Clock size={14} />, label: "Tracked" },
              { icon: <Target size={14} />, label: "Algorithm Focus" },
              { icon: <Activity size={14} />, label: "Stress Test" }
            ]}
            color="cyan"
            delay={0.2}
            image={Phase2}
          />

          <TrialCard 
            icon={<ShieldCheck size={28} />}
            title="Round 3"
            subtitle="The Final Stand"
            description="Face the Board of Directors. Defend your architecture and survive the ultimate psychological evaluation."
            stats={[
              { icon: <Users size={14} />, label: "DSA Review" },
              { icon: <Target size={14} />, label: "Project Discussion" },
              { icon: <Activity size={14} />, label: "HR Round" }
            ]}
            color="white"
            delay={0.3}
            image={FinalPhase}
          />
        </div>

        {/* DETAILED SECTIONS WITH IMAGES */}
        <div className="space-y-32">
          <TrialDetailSection 
            number="01"
            title="Cognitive Pressure Test"
            description="The Entry Game filters participants through rapid-fire logical reasoning. Each second spent adds to your latency penalty, forcing split-second decisions under mounting pressure."
            features={[
              "Real-time opponent matching",
              "Adaptive difficulty scaling",
              "Latency-based scoring system",
              "Psychological profiling"
            ]}
            color="red"
            image={Phase1}
          />

          <TrialDetailSection 
            number="02"
            title="Syntactic Integrity Challenge"
            description="The Glass Bridge tests pure coding precision. The server monitors every keystroke, and any deviation from optimal syntax triggers immediate disqualification."
            features={[
              "Live code execution",
              "Memory leak detection",
              "Time complexity analysis",
              "Edge case validation"
            ]}
            color="cyan"
            image={Phase2}
            reversed
          />

          <TrialDetailSection 
            number="03"
            title="Executive Defense"
            description="The Final Stand combines technical mastery with psychological resilience. Defend your solutions while maintaining composure under intense scrutiny."
            features={[
              "Architecture review",
              "Stress interview techniques",
              "Behavioral analysis",
              "Executive presence evaluation"
            ]}
            color="white"
            image={FinalPhase}
          />
        </div>
      </motion.div>

      {/* FOOTER */}
      <footer className="relative z-20 bg-black/90 backdrop-blur-xl border-t border-red-500/20 py-12 px-6 mt-32">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="flex items-center gap-4">
              <div className="relative">
                <ShieldAlert size={32} className="text-red-500" />
                <div className="absolute inset-0 bg-red-500 blur-xl opacity-20" />
              </div>
              <div>
                <p className="font-orbitron font-bold text-white tracking-[0.1em] text-sm">
                  ASCENT 2K26 <span className="text-red-500">//</span> TRIAL PROTOCOL
                </p>
                <p className="font-mono text-[10px] text-gray-400 tracking-[0.2em] uppercase mt-1">
                  System: <span className="text-green-500 font-bold">SECURE</span>
                </p>
              </div>
            </div>

            <div className="text-center md:text-right">
              <p className="font-mono text-xs text-gray-400 tracking-[0.1em] mb-2">
                TERMINAL {new Date().getHours()}:{new Date().getMinutes().toString().padStart(2, '0')}
              </p>
              <p className="text-[10px] text-gray-500 uppercase tracking-[0.3em]">
                © {new Date().getFullYear()} ASCENT COMMITTEE. ALL RIGHTS RESERVED.
              </p>
            </div>
          </div>
        </div>
      </footer>
    </section>
  );
}

// Interface for TrialCard props
interface TrialCardProps {
  icon: React.ReactNode;
  title: string;
  subtitle: string;
  description: string;
  stats: Array<{ icon: React.ReactNode; label: string }>;
  color: ColorType;
  delay?: number;
  image: string;
}

function TrialCard({ icon, title, subtitle, description, stats, color, delay = 0, image }: TrialCardProps) {
  const colorClasses: Record<ColorType, string> = {
    red: "border-red-500/30 bg-gradient-to-br from-black to-red-950/20 hover:border-red-500/60",
    cyan: "border-cyan-500/30 bg-gradient-to-br from-black to-cyan-950/20 hover:border-cyan-500/60",
    white: "border-white/20 bg-gradient-to-br from-black to-gray-900/20 hover:border-white/40"
  };

  const textColors: Record<ColorType, string> = {
    red: "text-red-400",
    cyan: "text-cyan-400",
    white: "text-gray-300"
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay }}
      whileHover={{ y: -8, transition: { duration: 0.2 } }}
      className={`relative p-8 rounded-2xl border backdrop-blur-sm ${colorClasses[color]} transition-all duration-300 cursor-default group overflow-hidden`}
    >
      {/* Card Background Image */}
      <div className="absolute inset-0 overflow-hidden opacity-10 group-hover:opacity-15 transition-opacity duration-500">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat scale-105 group-hover:scale-110 transition-transform duration-700"
          style={{ backgroundImage: `url(${image})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-br from-black via-transparent to-black" />
      </div>
      
      <div className="absolute inset-0 bg-gradient-to-br from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      
      <div className="relative z-10">
        <div className={`mb-6 p-3 rounded-lg bg-white/5 w-fit ${textColors[color]}`}>
          {icon}
        </div>
        
        <h3 className="text-2xl font-bold text-white mb-2 font-orbitron">{title}</h3>
        <p className={`text-sm font-semibold mb-4 ${textColors[color]} uppercase tracking-[0.1em]`}>
          {subtitle}
        </p>
        
        <p className="text-gray-400 text-sm leading-relaxed mb-8">
          {description}
        </p>
        
        <div className="space-y-3">
          {stats.map((stat, idx) => (
            <div key={idx} className="flex items-center gap-3 text-sm">
              <span className={`${textColors[color]} opacity-70`}>
                {stat.icon}
              </span>
              <span className="text-gray-300">{stat.label}</span>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

// Interface for TrialDetailSection props
interface TrialDetailSectionProps {
  number: string;
  title: string;
  description: string;
  features: string[];
  color: ColorType;
  image: string;
  reversed?: boolean;
}

function TrialDetailSection({ number, title, description, features, color, image, reversed = false }: TrialDetailSectionProps) {
  const colorClasses: Record<ColorType, string> = {
    red: "text-red-400 border-red-500/20",
    cyan: "text-cyan-400 border-cyan-500/20",
    white: "text-gray-300 border-white/20"
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: reversed ? 50 : -50 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
      className={`flex flex-col ${reversed ? 'md:flex-row-reverse' : 'md:flex-row'} items-center gap-12 md:gap-20`}
    >
      <div className="flex-1">
        <div className="flex items-center gap-4 mb-8">
          <div className={`text-5xl font-black font-orbitron opacity-20 ${colorClasses[color]}`}>
            {number}
          </div>
          <div>
            <h3 className="text-3xl md:text-4xl font-bold text-white mb-2">{title}</h3>
            <div className={`w-16 h-1 ${colorClasses[color].replace('text', 'bg')} bg-opacity-50`} />
          </div>
        </div>
        
        <p className="text-gray-300 text-lg leading-relaxed mb-10 max-w-2xl">
          {description}
        </p>
        
        <div className="grid sm:grid-cols-2 gap-4">
          {features.map((feature, idx) => (
            <div key={idx} className="flex items-center gap-3 group">
              <ChevronRight size={16} className={`${colorClasses[color]} opacity-70 group-hover:translate-x-1 transition-transform`} />
              <span className="text-gray-300 group-hover:text-white transition-colors">{feature}</span>
            </div>
          ))}
        </div>
      </div>
      
      <div className="flex-1">
        <div className={`relative h-64 md:h-80 rounded-xl overflow-hidden border ${colorClasses[color]} bg-black/30 backdrop-blur-sm group`}>
          {/* Main Image */}
          <div 
            className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-80 group-hover:opacity-90 transition-opacity duration-500"
            style={{ backgroundImage: `url(${image})` }}
          />
          
          {/* Overlay Effects */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/60" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/30 via-transparent to-black/30" />
          
          {/* Animated Border Effects */}
          <div className="absolute inset-0 border-2 border-transparent group-hover:border-white/20 transition-all duration-500" />
          
          {/* Floating Elements */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-48 h-48 rounded-full border-dashed border-2 animate-spin-slow opacity-20" 
                 style={{ animationDuration: '20s' }} />
            <Eye size={48} className="absolute opacity-20 text-white group-hover:opacity-40 transition-opacity" />
          </div>
          
          {/* Scan Line Effect */}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/10 to-transparent h-20 w-full animate-scan pointer-events-none" />
          
          {/* Node Label */}
          <div className="absolute bottom-4 left-4 font-mono text-xs opacity-60 uppercase tracking-widest bg-black/50 px-3 py-1 rounded-full border border-white/10">
            Node_{number}
          </div>
          
          {/* Hover Glow Effect */}
          <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-transparent group-hover:via-white/5 transition-all duration-500" />
        </div>
      </div>
    </motion.div>
  );
}