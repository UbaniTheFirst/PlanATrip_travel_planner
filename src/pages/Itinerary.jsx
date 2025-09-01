import Navigation from "@/components/Navigation";
import { Trash2, MapPin } from "lucide-react";

// Import images directly
import kyotoImg from "@/assets/kyoto2.jpg";
import boraBoraImg from "@/assets/bora_bora.jpg";
import parisImg from "@/assets/paris.jpg";

const Itinerary = () => {
  // Sample saved destinations - will be managed with state management
  const savedDestinations = [
    {
      id: "1",
      title: "Ancient temples",
      location: "Kyoto, Japan",
      image: kyotoImg,
    },
    {
      id: "2",
      title: "Overwater villas",
      location: "Maldives",
      image: boraBoraImg,
    },
    {
      id: "3",
      title: "Arc de Triomphe",
      location: "Paris, France",
      image: parisImg,
    },
  ];

  const handleRemove = (id) => {
    console.log("Removing destination:", id);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-primary mb-4">My Itinerary</h1>
          <p className="text-muted-foreground text-lg">Saved destinations</p>
        </div>

        {savedDestinations.length === 0 ? (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">✈️</div>
            <h3 className="text-2xl font-semibold text-primary mb-2">
              No destinations saved yet
            </h3>
            <p className="text-muted-foreground mb-8">
              Start exploring and add destinations to your itinerary
            </p>
            <a
              href="/explore"
              className="inline-block px-6 py-3 bg-gradient-to-r from-blue-500 to-teal-400 text-white font-semibold rounded shadow hover:opacity-90 transition"
            >
              Explore Destinations
            </a>
          </div>
        ) : (
          <div className="space-y-6">
            {savedDestinations.map((destination) => (
              <div
                key={destination.id}
                className="overflow-hidden bg-gradient-card border-0 shadow-card hover:shadow-soft transition-all duration-300 rounded"
              >
                <div className="flex flex-col md:flex-row">
                  <div className="md:w-1/3">
                    <img
                      src={destination.image}
                      alt={destination.title}
                      className="w-full h-48 object-cover"
                    />
                  </div>
                  <div className="flex-1 p-6 flex items-center justify-between">
                    <div>
                      <h3 className="text-2xl font-bold text-primary mb-2">
                        {destination.title}
                      </h3>
                      <div className="flex items-center text-muted-foreground">
                        <MapPin className="h-4 w-4 mr-2" />
                        <span>{destination.location}</span>
                      </div>
                    </div>
                    <button
                      onClick={() => handleRemove(destination.id)}
                      className="ml-4 flex items-center px-3 py-1 text-white bg-coral hover:bg-coral/80 rounded text-sm transition"
                    >
                      <Trash2 className="h-4 w-4 mr-2" />
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Itinerary;
