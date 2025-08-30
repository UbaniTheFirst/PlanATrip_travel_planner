import Navigation from "@/components/Navigation";
import DestinationCard from "@/components/DestinationCard";
import { Search, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import kyotoImage from "@/assets/kyoto.jpg";
import santoriniImage from "@/assets/santorini.jpg";
import baliImage from "@/assets/bali.jpg";
import amalfiImage from "@/assets/amalfi.jpg";

const Explore = () => {
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
        <div className="max-w-2xl mb-8">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
            <input
              type="text"
              placeholder="Where do you want to go?"
              className="pl-12 pr-4 py-4 text-lg rounded-lg bg-card shadow-soft border border-border/50 w-full focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
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
