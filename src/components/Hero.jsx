import { useState, useEffect } from "react";
import { Search } from "lucide-react";
import heroImage from "@/assets/hero-beach.jpg";

const Hero = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = (e) => {
    e.preventDefault();
    console.log("Searching for:", searchQuery);
  };

  // Fetch airport/city suggestions from Amadeus API
  useEffect(() => {
    const fetchSuggestions = async () => {
      if (searchQuery.length < 3) {
        setSuggestions([]);
        return;
      }

      setLoading(true);

      try {
        const res = await fetch(
          `/api/amadeus/autocomplete?keyword=${encodeURIComponent(searchQuery)}`
        );

        if (!res.ok) {
          throw new Error("Failed to fetch suggestions");
        }

        const data = await res.json();
        setSuggestions(
          data.data?.map((item) => ({
            id: item.id,
            name: `${item.name} (${item.iataCode})`,
          })) || []
        );
      } catch (err) {
        console.error("Autocomplete error:", err);
      } finally {
        setLoading(false);
      }
    };

    const debounce = setTimeout(fetchSuggestions, 400);
    return () => clearTimeout(debounce);
  }, [searchQuery]);

  return (
    <div className="relative h-[70vh] min-h-[600px] flex items-center justify-center">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          src={heroImage}
          alt="Tropical paradise with crystal clear water and wooden pier"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/10 to-black/30" />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 drop-shadow-lg">
          Discover Your Next
          <span className="block text-tropical drop-shadow-lg">Adventure</span>
        </h1>

        <p className="text-xl md:text-2xl text-white/90 mb-12 drop-shadow-md max-w-2xl mx-auto">
          Explore breathtaking destinations, plan perfect trips, and create memories that last forever
        </p>

        {/* Search Bar */}
        <form onSubmit={handleSearch} className="max-w-2xl mx-auto relative">
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-hero rounded-2xl blur opacity-30 group-hover:opacity-50 transition-opacity duration-300" />
            <div className="relative bg-white/95 backdrop-blur-sm rounded-2xl p-2 shadow-hero">
              <div className="flex items-center space-x-2">
                <div className="flex-1 relative">
                  <input
                    type="text"
                    placeholder="Where do you want to go?"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="px-4 py-4 text-lg rounded-lg bg-card shadow-soft w-full 
                      focus:outline-none focus:ring-1 focus:ring-primary/50
                      text-gray-900 placeholder:text-gray-400"
                  />

                  {/* Suggestions dropdown */}
                  {suggestions.length > 0 && (
                    <ul className="absolute left-0 right-0 mt-1 bg-white rounded-lg shadow-lg z-20 max-h-60 overflow-y-auto">
                      {suggestions.map((s) => (
                        <li
                          key={s.id}
                          onClick={() => {
                            setSearchQuery(s.name);
                            setSuggestions([]);
                          }}
                          className="px-4 py-2 text-left cursor-pointer hover:bg-gray-100"
                        >
                          {s.name}
                        </li>
                      ))}
                    </ul>
                  )}

                  {/* Loading state */}
                  {loading && (
                    <div className="absolute left-0 right-0 mt-1 bg-white rounded-lg shadow p-2 text-gray-500 text-sm">
                      Loading...
                    </div>
                  )}
                </div>

                <button
                  type="submit"
                  className="inline-flex items-center justify-center bg-gradient-hero text-white text-lg px-8 py-6 rounded-2xl shadow-soft hover:shadow-hero transition-all duration-300"
                >
                  <Search className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Hero;
