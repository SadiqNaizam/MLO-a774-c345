import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner"; // Assuming Sonner is used for different toast types
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Import Pages
import MainApplicationPage from "./pages/MainApplicationPage";
import NotFound from "./pages/NotFound"; // Assuming NotFound.tsx exists in src/pages/

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner /> {/* If you use Sonner for notifications */}
      <BrowserRouter>
        <Routes>
          {/* Main application page as the index route */}
          <Route path="/" element={<MainApplicationPage />} />
          
          {/* Other routes could be added here if the application expands */}
          {/* e.g., <Route path="/settings" element={<SettingsPage />} /> */}

          {/* Catch-all route for 404 Not Found */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;