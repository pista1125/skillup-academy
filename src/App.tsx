import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ScrollToTop } from "./components/ScrollToTop";

import MathPage from "./pages/MathPage";
import ProfilePage from "./pages/ProfilePage";
import NotFound from "./pages/NotFound";

import { AuthProvider } from "./contexts/AuthContext";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
          <ScrollToTop />
          <Routes>
            <Route path="/" element={<MathPage />} />
            <Route path="/:grade" element={<MathPage />} />
            <Route path="/:grade/:topic" element={<MathPage />} />
            <Route path="/:grade/:topic/:activity" element={<MathPage />} />
            <Route path="/eszkozok" element={<MathPage />} />
            <Route path="/eszkozok/:topic" element={<MathPage />} />
            <Route path="/jatekok" element={<MathPage />} />
            <Route path="/jatekok/:topic" element={<MathPage />} />
            <Route path="/profil" element={<ProfilePage />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
