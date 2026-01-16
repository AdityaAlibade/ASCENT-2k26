import { useRef, useState, useEffect } from "react";
import { Volume2, VolumeX, ShieldAlert, Activity, Lock } from "lucide-react";
import RegiBg from "@assets/regi_bg.jpg";
import FloatingShapes from "../components/FloatingShapes";
import { RegistrationForm } from "@/components/RegistrationForm";
import { motion } from "framer-motion";

export default function Registration() {


  return (
    <main
      className="min-h-screen bg-black text-white relative font-montserrat overflow-x-hidden selection:bg-red-500 selection:text-white"
    >

      {/* 1. CINEMATIC BACKGROUND LAYER */}
      <div className="fixed inset-0 z-0">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-50 scale-110 animate-[pulse_30s_cubic-bezier(0.4,0,0.6,1)_infinite]"
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

        {/* Audio Status Indicator - Removed */}
      </div>

      {/* 3. FLOATING AUDIO CONTROL - LEFT BOTTOM CORNER */}


      {/* 4. CONTENT WRAPPER */}
      <div className="relative z-20 flex flex-col items-center">

        {/* Title Section */}
        <header className="pt-32 pb-16 px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-3 py-1 mb-6 border border-red-500/30 bg-red-500/5 rounded-sm"
          >
            <Lock size={12} className="text-red-500" />
            <span className="text-red-500 font-mono text-[10px] tracking-[0.4em] uppercase">Secured Enlistment</span>
          </motion.div>
          <h1
            className="text-6xl md:text-8xl font-orbitron tracking-tighter font-black text-white mb-4 cursor-pointer"
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

      <FloatingShapes />
    </main>
  );
}