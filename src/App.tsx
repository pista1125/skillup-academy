import { lazy, Suspense } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ScrollToTop } from "./components/ScrollToTop";

import { AuthProvider } from "./contexts/AuthContext";

const MathPage = lazy(() => import("./pages/MathPage"));
const ProfilePage = lazy(() => import("./pages/ProfilePage"));
const AboutPage = lazy(() => import("./pages/AboutPage"));
const PrivacyPage = lazy(() => import("./pages/PrivacyPage"));
const TermsPage = lazy(() => import("./pages/TermsPage"));
const NotFound = lazy(() => import("./pages/NotFound"));

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
          <ScrollToTop />
          <Suspense fallback={null}>
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
            <Route path="/rolunk" element={<AboutPage />} />
            <Route path="/adatkezeles" element={<PrivacyPage />} />
            <Route path="/felhasznalasi-feltetelek" element={<TermsPage />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
          </Suspense>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
