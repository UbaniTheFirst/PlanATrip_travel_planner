import { useState } from "react";
import Navigation from "@/components/Navigation";
import DestinationCard from "@/components/DestinationCard";
import { Search, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import kyotoImage from "@/assets/kyoto.jpg";
import santoriniImage from "@/assets/santorini.jpg";
import baliImage from "@/assets/bali.jpg";
import amalfiImage from "@/assets/amalfi.jpg";

const Explore = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const destinations = [
    {
      id: "santorini",
      name: "Santorini",
      country: "Greece",
      description: "Whitewashed cliffs and sunsets that paint the Aegean gold.",
      image: santoriniImage
    },
    {
      id: "kyoto",
      name: "Kyoto",
      country: "Japan",
      description: "Ancient temples and traditional Japanese culture.",
      image: kyotoImage
    },
    {
      id: "bali",
      name: "Bali",
      country: "Indonesia",
      description: "Tropical paradise with pristine beaches and rich culture.",
      image: baliImage
    },
    {
      id: "amalfi",
      name: "Amalfi Coast",
      country: "Italy",
      description: "Dramatic coastline with charming villages and Mediterranean views.",
      image: amalfiImage
    }
  ];

  const handleViewDetails = (id) => {
    console.log("View details for destination:", id);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    console.log("Searching for:", searchQuery);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center mb-8">
          <Link to="/">
            <button
              className="mr-4 p-2 rounded-full hover:bg-gray-100 transition"
              type="button"
            >
              <ArrowLeft className="h-5 w-5 text-muted-foreground" />
            </button>
          </Link>
          <h1 className="text-3xl font-bold text-primary">Explore Destinations</h1>
        </div>

        {/* Search Bar */}
        <form onSubmit={handleSearch} className="max-w-xl mb-4">
          <div className="relative flex items-center">
            <input
              type="text"
              placeholder="Search destinations..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1 px-4 py-3 text-base rounded-lg bg-card shadow-soft border border-border/30
                         focus:outline-none focus:ring-1 focus:ring-primary text-gray-900 placeholder:text-gray-400"
            />
            <button
              type="submit"
              className="ml-2 inline-flex items-center justify-center bg-gradient-hero text-white text-base px-6 py-3 rounded-lg shadow-soft hover:shadow-hero transition-all duration-300"
            >
              <Search className="h-5 w-5" />
            </button>
          </div>
        </form>

        {/* Flights & Hotels */}
        <div className="flex space-x-6 mb-8">
          <Link
            to="/flights"
            className="text-blue-600 font-medium hover:underline"
          >
            ✈️ Search Flights
          </Link>
          <Link
            to="/hotels"
            className="text-green-600 font-medium hover:underline"
          >
            🏨 Search Hotels
          </Link>
        </div>

        {/* Destination Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {destinations.map((destination) => (
            <DestinationCard
              key={destination.id}
              {...destination}
              onViewDetails={handleViewDetails}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Explore;
