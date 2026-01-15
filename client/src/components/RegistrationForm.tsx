import { motion } from "framer-motion";

export function RegistrationForm() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="flex flex-col items-center justify-center bg-black/80 backdrop-blur-md p-12 border-2 border-primary/20 shadow-[0_0_50px_rgba(0,0,0,0.6)] text-center"
    >
      <h3 className="font-orbitron text-3xl text-white font-black tracking-[0.2em] mb-4">
        PLAYER ENROLLMENT
      </h3>

      <p className="text-white/50 font-montserrat text-sm uppercase tracking-widest max-w-md mb-10">
        Registration is handled externally. You will be redirected to the official enrollment form.
      </p>

      <motion.a
        href="https://forms.gle/AmFmn4jcrYysRaie8"
        target="_blank"
        rel="noopener noreferrer"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="relative overflow-hidden bg-primary px-14 py-4 font-orbitron font-black tracking-[0.3em] text-white transition-all hover:shadow-[0_0_30px_rgba(255,0,96,0.6)]"
      >
        <span className="relative z-10">OPEN FORM</span>
        <div className="absolute inset-0 -translate-x-full hover:translate-x-0 bg-white/20 transition-transform duration-300 ease-out skew-x-12" />
      </motion.a>

      <div className="mt-8 text-[10px] text-white/30 font-mono uppercase">
        Secure External Form • Google Forms
      </div>
    </motion.div>
  );
}
