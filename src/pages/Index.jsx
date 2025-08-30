import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import DestinationCard from "@/components/DestinationCard";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

// Import destination images
import santoriniImage from "@/assets/santorini.jpg";
import baliImage from "@/assets/bali.jpg";
import amalfiImage from "@/assets/amalfi.jpg";

const Index = () => {
  const featuredDestinations = [
    {
      id: "santorini",
      name: "Santorini",
      country: "Greece",
      description: "Whitewashed cliffs and sunsets that paint the Aegean gold.",
      image: santoriniImage
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
      <Hero />

      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-primary mb-6">
              Featured Destinations
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Discover handpicked destinations that offer unforgettable experiences and breathtaking beauty
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {featuredDestinations.map((destination) => (
              <DestinationCard
                key={destination.id}
                {...destination}
                onViewDetails={handleViewDetails}
              />
            ))}
          </div>

          <div className="text-center">
            <Link to="/explore">
              <button
                className="inline-flex items-center justify-center bg-gradient-hero text-white text-lg px-8 py-6 rounded-lg shadow-soft hover:shadow-hero transition-all duration-300"
                type="button"
              >
                Explore All Destinations
                <ArrowRight className="ml-2 h-5 w-5" />
              </button>
            </Link>
          </div>
        </div>
      </section>

      <section className="py-20 px-4 bg-muted/30">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-primary mb-6">
              Why Choose PlanATrip?
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-6 bg-gradient-hero rounded-full flex items-center justify-center">
                <span className="text-2xl">🌍</span>
              </div>
              <h3 className="text-xl font-semibold text-primary mb-4">Curated Destinations</h3>
              <p className="text-muted-foreground">
                Handpicked destinations with detailed information about attractions, flights, and accommodations.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-6 bg-gradient-hero rounded-full flex items-center justify-center">
                <span className="text-2xl">✈️</span>
              </div>
              <h3 className="text-xl font-semibold text-primary mb-4">Smart Planning</h3>
              <p className="text-muted-foreground">
                Create detailed itineraries with flights, hotels, and activities all in one place.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-6 bg-gradient-hero rounded-full flex items-center justify-center">
                <span className="text-2xl">💫</span>
              </div>
              <h3 className="text-xl font-semibold text-primary mb-4">Unforgettable Experiences</h3>
              <p className="text-muted-foreground">
                Discover hidden gems and must-see attractions with insider tips and recommendations.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
