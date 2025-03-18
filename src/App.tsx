
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { MessageProvider } from "@/contexts/MessageContext";
import Index from "./pages/Index";
import Discover from "./pages/Discover";
import Workfolio from "./pages/Workfolio";
import Messages from "./pages/Messages";
import Deals from "./pages/Deals";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <MessageProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/discover" element={<Discover />} />
            <Route path="/workfolio" element={<Workfolio />} />
            <Route path="/messages" element={<Messages />} />
            <Route path="/deals" element={<Deals />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </MessageProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
