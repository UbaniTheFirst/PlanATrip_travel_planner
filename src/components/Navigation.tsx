import { Button } from "@/components/ui/button";
import { Link, useLocation } from "react-router-dom";
import { User } from "lucide-react";

const Navigation = () => {
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="bg-card/80 backdrop-blur-md border-b border-border/50 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="text-2xl font-bold text-primary hover:text-primary-dark transition-colors">
            WonderLust
          </Link>
          
          <div className="hidden md:flex space-x-8">
            <Link
              to="/"
              className={`transition-colors ${
                isActive("/") 
                  ? "text-primary font-semibold" 
                  : "text-muted-foreground hover:text-primary"
              }`}
            >
              Home
            </Link>
            <Link
              to="/explore"
              className={`transition-colors ${
                isActive("/explore") 
                  ? "text-primary font-semibold" 
                  : "text-muted-foreground hover:text-primary"
              }`}
            >
              Explore
            </Link>
            <Link
              to="/itinerary"
              className={`transition-colors ${
                isActive("/itinerary") 
                  ? "text-primary font-semibold" 
                  : "text-muted-foreground hover:text-primary"
              }`}
            >
              My Itinerary
            </Link>
          </div>

          <div className="flex items-center space-x-4">
            <Button variant="outline" size="sm" className="hidden md:flex">
              Sign In
            </Button>
            <Button size="sm" className="bg-gradient-hero border-0 shadow-soft">
              Sign Up
            </Button>
            <Button variant="ghost" size="icon" className="md:hidden">
              <User className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;