import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/layout/Layout";
import Home from "./pages/Home";
import MyTournaments from "./pages/MyTournaments";
import MyTeams from "./pages/MyTeams";
import SubscribedTournaments from "./pages/SubscribedTournaments";
import Notifications from "./pages/Notifications";
import Requests from "./pages/Requests";
import Profile from "./pages/Profile";
import TournamentDetails from "./pages/TournamentDetails";
import TournamentBracketView from "./pages/TournamentBracketView";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/my-tournaments" element={<MyTournaments />} />
            <Route path="/my-teams" element={<MyTeams />} />
            <Route path="/subscribed" element={<SubscribedTournaments />} />
            <Route path="/notifications" element={<Notifications />} />
            <Route path="/requests" element={<Requests />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/tournament/:id" element={<TournamentDetails />} />
            <Route path="/tournament/:tournamentId/bracket" element={<TournamentBracketView />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
