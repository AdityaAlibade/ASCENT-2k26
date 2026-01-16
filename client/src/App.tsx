import { Switch, Route } from "wouter";
import { QueryClientProvider } from "@tanstack/react-query";

import { queryClient } from "./lib/queryClient";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";

// UI Components
import Navbar from "@/components/Navbar";

// Pages
import Home from "@/pages/Home";
import About from "@/pages/About";
import Registration from "@/pages/Registration";
import Rules from "@/pages/Rules";
import NotFound from "@/pages/not-found";

/**
 * Main Router Component
 * Handles the logic for rendering different pages based on the URL.
 */
function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/about" component={About} />
      <Route path="/registration" component={Registration} />
      <Route path="/rules" component={Rules} />
      {/* Fallback for unknown routes */}
      <Route component={NotFound} />
    </Switch>
  );
}

/**
 * Root App Component
 * Wraps the application in necessary providers and sets the global layout.
 */
import { AudioProvider, useAudio } from "@/context/AudioContext";
import { Volume2, VolumeX } from "lucide-react";

const AudioControl = () => {
  const { isMuted, toggleMute, isPlaying } = useAudio();

  // Optionally hide if not playing, but usually good to have control.
  // We can hide it until music starts if desired, but user didn't specify.
  // Keeping it visible allows pre-muting.
  // Also matching the style from Home.tsx

  if (!isPlaying) return null; // Logic choice: Only show when music is active/supposed to be active? 
  // Actually, if "Enter the game" hasn't been clicked, isPlaying is false.
  // So the button won't show on Home intro. Use wants seamless.
  // Let's show it only when playing (meaning "Enter the game" was clicked).

  return (
    <button
      onClick={toggleMute}
      className="fixed bottom-10 left-10 z-[100] p-3 text-white/40 hover:text-white transition-colors bg-black/20 backdrop-blur-sm rounded-full border border-white/10 hover:border-primary/50 group"
    >
      {isMuted ? (
        <VolumeX size={20} className="group-hover:scale-110 transition-transform" />
      ) : (
        <Volume2 size={20} className="group-hover:scale-110 transition-transform" />
      )}
    </button>
  );
};

/**
 * Root App Component
 * Wraps the application in necessary providers and sets the global layout.
 */
function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AudioProvider>
        <TooltipProvider>
          {/* Navbar is placed outside Router so it persists across all pages */}
          <Navbar />

          {/* Main content wrapper to handle page structure */}
          <main className="min-h-screen bg-black overflow-x-hidden selection:bg-red-500/30 selection:text-white">
            <Router />
          </main>

          <AudioControl />

          {/* Global UI Feedback elements */}
          <Toaster />
        </TooltipProvider>
      </AudioProvider>
    </QueryClientProvider>
  );
}

export default App;