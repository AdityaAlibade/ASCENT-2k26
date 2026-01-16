import { Switch, Route } from "wouter";
import { QueryClientProvider } from "@tanstack/react-query";

import { queryClient } from "./lib/queryClient";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";

// UI Components
import Navbar from "@/components/Navbar";
import CharacterCursor from "./components/CharacterCursor";

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
function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <CharacterCursor/>
        {/* Navbar is placed outside Router so it persists across all pages */}
        <Navbar />
        
        {/* Main content wrapper to handle page structure */}
        <main className="min-h-screen bg-black overflow-x-hidden selection:bg-red-500/30 selection:text-white">
          <Router />
        </main>

        {/* Global UI Feedback elements */}
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;