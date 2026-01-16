import { motion } from "framer-motion";
import FormfacadeEmbed from "@formfacade/embed-react";

export function RegistrationForm() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="flex flex-col items-center justify-center bg-black/80 backdrop-blur-md p-10 border-2 border-primary/20 shadow-[0_0_50px_rgba(0,0,0,0.6)] text-center w-full"
    >
      <h3 className="font-orbitron text-3xl text-white font-black tracking-[0.2em] mb-4">
        PLAYER ENROLLMENT
      </h3>

      <p className="text-white/50 font-montserrat text-sm uppercase tracking-widest max-w-md mb-8">
        Complete the registration form below to enter the arena.
      </p>

      {/* REQUIRED TARGET DIV */}
      <div
        id="ff-compose"
        className="w-full max-w-4xl min-h-[900px] rounded-lg"
      />

      {/* FORMFACADE EMBED */}
      <FormfacadeEmbed
        formFacadeURL="https://formfacade.com/include/115295869003669509889/form/1FAIpQLScJK3ep2efxudF_ukChRFwtNDFdW6kHdLm4af-QNxs-oD6vaA/classic.js/?div=ff-compose"
        onSubmitForm={() => console.log("Form submitted")}
      />

      <div className="mt-6 text-[10px] text-white/30 font-mono uppercase">
        Secure Embedded Form • Google Forms
      </div>
    </motion.div>
  );
}
