
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import NotFound from "./pages/NotFound";
import AIScribe from "./pages/AIScribe";
import Appointments from "./pages/Appointments";
import AITools from "./pages/AITools";
import AIXray from "./pages/AIXray";
import AITreatment from "./pages/AITreatment";
import AIImaging from "./pages/AIImaging";
import AIReports from "./pages/AIReports";
import AIExercise from "./pages/AIExercise";
import Integration from "./pages/Integration";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/ai-scribe" element={<AIScribe />} />
          <Route path="/appointments" element={<Appointments />} />
          <Route path="/ai-tools" element={<AITools />} />
          <Route path="/ai-xray" element={<AIXray />} />
          <Route path="/ai-treatment" element={<AITreatment />} />
          <Route path="/ai-imaging" element={<AIImaging />} />
          <Route path="/ai-reports" element={<AIReports />} />
          <Route path="/ai-exercise" element={<AIExercise />} />
          <Route path="/integrations" element={<Integration />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
