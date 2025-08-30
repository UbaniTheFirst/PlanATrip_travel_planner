import { Heart, MapPin } from "lucide-react";
import { useState } from "react";

const DestinationCard = ({
  id,
  name,
  country,
  description,
  image,
  onViewDetails
}) => {
  const [isFavorited, setIsFavorited] = useState(false);

  return (
    <div className="group overflow-hidden bg-gradient-to-br from-white/90 to-gray-100 border-0 shadow-card hover:shadow-hero transition-all duration-500 transform hover:-translate-y-2 rounded-lg">
      <div className="relative overflow-hidden rounded-t-lg">
        <img
          src={image}
          alt={`${name}, ${country}`}
          className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        <button
          onClick={() => setIsFavorited(!isFavorited)}
          className="absolute top-4 right-4 p-2 rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/30 transition-all duration-300"
        >
          <Heart
            className={`h-5 w-5 ${isFavorited ? "text-coral fill-coral" : "text-white"
              } transition-colors duration-300`}
          />
        </button>

        <div className="absolute bottom-4 left-4 right-4 transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
          <button
            onClick={() => onViewDetails(id)}
            className="w-full px-4 py-2 text-sm text-white rounded bg-gradient-to-r from-primary to-accent shadow-soft border-0 hover:opacity-90 transition"
          >
            Explore Destination
          </button>
        </div>
      </div>

      <div className="p-6">
        <div className="flex items-start justify-between mb-3">
          <div>
            <h3 className="text-2xl font-bold text-primary mb-1">{name}</h3>
            <div className="flex items-center text-muted-foreground">
              <MapPin className="h-4 w-4 mr-1" />
              <span>{country}</span>
            </div>
          </div>
        </div>

        <p className="text-muted-foreground leading-relaxed">
          {description}
        </p>

        <div className="mt-6">
          <button
            onClick={() => onViewDetails(id)}
            className="w-full px-4 py-2 text-sm rounded border border-gray-300 text-gray-700 hover:bg-gradient-to-r from-primary to-accent hover:text-white hover:border-transparent transition-all duration-300"
          >
            View Details
          </button>
        </div>
      </div>
    </div>
  );
};

export default DestinationCard;
