import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { insertPlayerSchema, type InsertPlayer } from "@shared/schema";
import { useCreatePlayer } from "@/hooks/use-players";
import { motion, AnimatePresence } from "framer-motion";
import { Loader2, CheckCircle2 } from "lucide-react";
import { useState } from "react";
import { Circle, Square, Triangle } from "./ui/GameShapes";

export function RegistrationForm() {
  const { mutate, isPending } = useCreatePlayer();
  const [ticketData, setTicketData] = useState<{ name: string; number: number } | null>(null);

  const form = useForm<InsertPlayer>({
    resolver: zodResolver(insertPlayerSchema),
    defaultValues: {
      name: "",
      college: "",
      academicYear: "",
      department: "",
      email: "",
      phone: "",
    },
  });

  const onSubmit = (data: InsertPlayer) => {
    mutate(data, {
      onSuccess: (response) => {
        // Assume response has playerNumber (it matches schema type Player)
        setTicketData({
          name: response.name,
          number: (response as any).playerNumber, 
        });
      },
      onError: (error) => {
        // In a real app we'd toast here, but simple alert for now per instructions
        alert(error.message);
      }
    });
  };

  if (ticketData) {
    return (
      <div className="max-w-md mx-auto">
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="bg-[#d2b48c] text-black p-8 rounded-sm shadow-2xl relative overflow-hidden border-4 border-black/10 rotate-1"
          style={{ backgroundImage: "url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0IiBoZWlnaHQ9IjQiPgo8cmVjdCB3aWR0aD0iNCIgaGVpZ2h0PSI0IiBmaWxsPSIjZjRmNGY0IiBmaWxsLW9wYWNpdHk9IjAuMiIvPgo8L3N2Zz4=')" }}
        >
          {/* Card texture/stamp */}
          <div className="absolute top-4 right-4 border-4 border-red-700 text-red-700 font-bold text-xl px-2 py-1 rotate-[-15deg] opacity-80 font-orbitron">
            ACCEPTED
          </div>

          <div className="flex justify-center space-x-4 mb-6 text-black/80">
            <Circle size={24} color="#000" />
            <Triangle size={24} color="#000" />
            <Square size={24} color="#000" />
          </div>

          <div className="text-center space-y-4">
            <h3 className="font-orbitron text-xl uppercase tracking-widest text-black/60">Player Identification</h3>
            
            <div className="py-8">
              <span className="block text-sm font-montserrat font-bold uppercase tracking-wider mb-2">Player Number</span>
              <span className="font-orbitron text-6xl font-black text-black">
                {String(ticketData.number).padStart(3, '0')}
              </span>
            </div>

            <div className="border-t-2 border-black/20 pt-4 mt-4">
              <p className="font-montserrat font-bold text-lg">{ticketData.name}</p>
              <p className="text-sm font-montserrat mt-1">Status: <span className="text-green-800 font-bold">Active</span></p>
            </div>
          </div>
          
          <div className="mt-8 text-xs text-center font-mono opacity-60">
            DO NOT LOSE THIS CARD.<br/>
            PRESENT UPON ARRIVAL.
          </div>
        </motion.div>
        
        <div className="mt-8 text-center">
          <button 
            onClick={() => window.location.reload()}
            className="text-white/50 hover:text-white underline font-montserrat text-sm"
          >
            Register Another Player
          </button>
        </div>
      </div>
    );
  }

  return (
    <motion.form
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      onSubmit={form.handleSubmit(onSubmit)}
      className="space-y-6 bg-black/50 backdrop-blur-sm p-8 border border-white/10 relative"
    >
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary via-purple-500 to-secondary" />
      
      <div className="space-y-2 mb-8">
        <h3 className="font-orbitron text-2xl text-white tracking-wider">Player Application</h3>
        <p className="text-white/60 font-montserrat text-sm">Complete all fields accurately. False information results in elimination.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="text-xs uppercase tracking-widest text-primary font-bold">Full Name</label>
          <input
            {...form.register("name")}
            className="w-full bg-black/40 border border-white/20 px-4 py-3 text-white focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary transition-all font-montserrat"
            placeholder="John Doe"
          />
          {form.formState.errors.name && (
            <span className="text-red-500 text-xs">{form.formState.errors.name.message}</span>
          )}
        </div>

        <div className="space-y-2">
          <label className="text-xs uppercase tracking-widest text-primary font-bold">College</label>
          <input
            {...form.register("college")}
            className="w-full bg-black/40 border border-white/20 px-4 py-3 text-white focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary transition-all font-montserrat"
            placeholder="University Name"
          />
          {form.formState.errors.college && (
            <span className="text-red-500 text-xs">{form.formState.errors.college.message}</span>
          )}
        </div>

        <div className="space-y-2">
          <label className="text-xs uppercase tracking-widest text-primary font-bold">Academic Year</label>
          <input
            {...form.register("academicYear")}
            className="w-full bg-black/40 border border-white/20 px-4 py-3 text-white focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary transition-all font-montserrat"
            placeholder="3rd Year"
          />
          {form.formState.errors.academicYear && (
            <span className="text-red-500 text-xs">{form.formState.errors.academicYear.message}</span>
          )}
        </div>

        <div className="space-y-2">
          <label className="text-xs uppercase tracking-widest text-primary font-bold">Department</label>
          <input
            {...form.register("department")}
            className="w-full bg-black/40 border border-white/20 px-4 py-3 text-white focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary transition-all font-montserrat"
            placeholder="Computer Science"
          />
          {form.formState.errors.department && (
            <span className="text-red-500 text-xs">{form.formState.errors.department.message}</span>
          )}
        </div>

        <div className="space-y-2">
          <label className="text-xs uppercase tracking-widest text-primary font-bold">Email</label>
          <input
            {...form.register("email")}
            type="email"
            className="w-full bg-black/40 border border-white/20 px-4 py-3 text-white focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary transition-all font-montserrat"
            placeholder="email@example.com"
          />
          {form.formState.errors.email && (
            <span className="text-red-500 text-xs">{form.formState.errors.email.message}</span>
          )}
        </div>

        <div className="space-y-2">
          <label className="text-xs uppercase tracking-widest text-primary font-bold">Phone</label>
          <input
            {...form.register("phone")}
            className="w-full bg-black/40 border border-white/20 px-4 py-3 text-white focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary transition-all font-montserrat"
            placeholder="09123456789"
          />
          {form.formState.errors.phone && (
            <span className="text-red-500 text-xs">{form.formState.errors.phone.message}</span>
          )}
        </div>
      </div>

      <div className="pt-6">
        <button
          type="submit"
          disabled={isPending}
          className="w-full group relative overflow-hidden bg-primary px-8 py-4 font-orbitron font-bold tracking-widest text-white transition-all hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <span className="relative z-10 flex items-center justify-center gap-2">
            {isPending ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" /> PROCESSING...
              </>
            ) : (
              <>SUBMIT APPLICATION</>
            )}
          </span>
          <div className="absolute inset-0 -translate-x-full group-hover:translate-x-0 bg-white/20 transition-transform duration-300 ease-out skew-x-12" />
        </button>
      </div>

      <div className="flex justify-between items-center text-[10px] text-white/30 font-mono uppercase mt-4">
        <span>Form ID: #SQ-2025-REG</span>
        <span>Secured Connection</span>
      </div>
    </motion.form>
  );
}
