import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Heart, MapPin } from "lucide-react";
import { useState } from "react";

interface DestinationCardProps {
  id: string;
  name: string;
  country: string;
  description: string;
  image: string;
  onViewDetails: (id: string) => void;
}

const DestinationCard = ({ 
  id, 
  name, 
  country, 
  description, 
  image, 
  onViewDetails 
}: DestinationCardProps) => {
  const [isFavorited, setIsFavorited] = useState(false);

  return (
    <Card className="group overflow-hidden bg-gradient-card border-0 shadow-card hover:shadow-hero transition-all duration-500 transform hover:-translate-y-2">
      <div className="relative overflow-hidden">
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
            className={`h-5 w-5 ${
              isFavorited 
                ? "text-coral fill-coral" 
                : "text-white"
            } transition-colors duration-300`} 
          />
        </button>

        <div className="absolute bottom-4 left-4 right-4 transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
          <Button
            onClick={() => onViewDetails(id)}
            className="w-full bg-gradient-hero border-0 shadow-soft"
          >
            Explore Destination
          </Button>
        </div>
      </div>

      <CardContent className="p-6">
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
          <Button
            variant="outline"
            onClick={() => onViewDetails(id)}
            className="w-full hover:bg-gradient-hero hover:text-white hover:border-transparent transition-all duration-300"
          >
            View Details
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default DestinationCard;