import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { User, Menu, X } from "lucide-react";

const Navigation = () => {
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="bg-card/80 backdrop-blur-md border-b border-border/50 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link
            to="/"
            className="text-2xl font-bold text-primary hover:text-primary-dark transition-colors"
          >
            PlanATrip
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex space-x-8">
            <Link
              to="/"
              className={`transition-colors ${isActive("/") ? "text-primary font-semibold" : "text-muted-foreground hover:text-primary"
                }`}
            >
              Home
            </Link>
            <Link
              to="/explore"
              className={`transition-colors ${isActive("/explore") ? "text-primary font-semibold" : "text-muted-foreground hover:text-primary"
                }`}
            >
              Explore
            </Link>
            <Link
              to="/itinerary"
              className={`transition-colors ${isActive("/itinerary") ? "text-primary font-semibold" : "text-muted-foreground hover:text-primary"
                }`}
            >
              My Itinerary
            </Link>
          </div>

          {/* Buttons */}
          <div className="flex items-center space-x-4">
            <button className="hidden md:flex px-4 py-2 border border-gray-300 rounded text-sm text-gray-700 hover:bg-gray-100 transition">
              Sign In
            </button>
            <button className="px-4 py-2 text-sm text-white rounded bg-gradient-to-r from-primary to-accent shadow-soft border-0 hover:opacity-90 transition">
              Sign Up
            </button>

            {/* Mobile Toggle */}
            <button
              className="md:hidden p-2 rounded hover:bg-gray-200 transition"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="md:hidden mt-2 space-y-2">
            <Link
              to="/"
              onClick={() => setMenuOpen(false)}
              className={`block px-2 py-1 rounded ${isActive("/") ? "text-primary font-semibold" : "text-muted-foreground hover:text-primary"
                }`}
            >
              Home
            </Link>
            <Link
              to="/explore"
              onClick={() => setMenuOpen(false)}
              className={`block px-2 py-1 rounded ${isActive("/explore") ? "text-primary font-semibold" : "text-muted-foreground hover:text-primary"
                }`}
            >
              Explore
            </Link>
            <Link
              to="/itinerary"
              onClick={() => setMenuOpen(false)}
              className={`block px-2 py-1 rounded ${isActive("/itinerary") ? "text-primary font-semibold" : "text-muted-foreground hover:text-primary"
                }`}
            >
              My Itinerary
            </Link>

            <button className="w-full px-4 py-2 border border-gray-300 rounded text-sm text-gray-700 hover:bg-gray-100 transition">
              Sign In
            </button>
            <button className="w-full px-4 py-2 text-sm text-white rounded bg-gradient-to-r from-primary to-accent shadow-soft border-0 hover:opacity-90 transition">
              Sign Up
            </button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
