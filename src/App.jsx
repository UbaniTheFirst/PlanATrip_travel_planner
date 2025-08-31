import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Explore from "./pages/Explore";
import Itinerary from "./pages/Itinerary";
import Hotels from "./pages/Hotels";
import NotFound from "./pages/NotFound";
import FlightsPage from "./pages/FlightsPage"; // ✅ Secure Flights page

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/explore" element={<Explore />} />
        <Route path="/itinerary" element={<Itinerary />} />
        <Route path="/flights" element={<FlightsPage />} /> {/* ✅ Secure flights page */}
        <Route path="/hotels" element={<Hotels />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  </QueryClientProvider>
);

export default App;
