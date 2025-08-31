import { useState, useEffect, useRef } from "react";
import { searchFlights, searchDestination } from "../api/amadeus/amadeus";

const FlightsPage = () => {
    const [formData, setFormData] = useState({
        origin: "",
        destination: "",
        departureDate: "",
        returnDate: "",
        adults: 1,
    });

    const [originSuggestions, setOriginSuggestions] = useState([]);
    const [destinationSuggestions, setDestinationSuggestions] = useState([]);
    const [loading, setLoading] = useState(false);
    const [results, setResults] = useState([]);
    const [error, setError] = useState(null);

    const originRef = useRef(null);
    const destinationRef = useRef(null);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // Autocomplete search
    const handleSearchSuggestions = async (field, value) => {
        setFormData({ ...formData, [field]: value });
        if (value.length >= 2) {
            try {
                const suggestions = await searchDestination(value);
                if (field === "origin") setOriginSuggestions(suggestions);
                else setDestinationSuggestions(suggestions);
            } catch (err) {
                console.error("Error fetching suggestions", err);
            }
        } else {
            if (field === "origin") setOriginSuggestions([]);
            else setDestinationSuggestions([]);
        }
    };

    const handleSelectSuggestion = (field, code) => {
        setFormData({ ...formData, [field]: code });
        if (field === "origin") setOriginSuggestions([]);
        else setDestinationSuggestions([]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        setResults([]);

        try {
            const data = await searchFlights(formData);
            setResults(data);
        } catch (err) {
            setError("Failed to fetch flights");
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    // Close suggestions when clicking outside
    useEffect(() => {
        const handleClickOutside = (e) => {
            if (originRef.current && !originRef.current.contains(e.target)) {
                setOriginSuggestions([]);
            }
            if (destinationRef.current && !destinationRef.current.contains(e.target)) {
                setDestinationSuggestions([]);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <div className="min-h-screen bg-gray-50 flex justify-center items-center p-6">
            <div className="bg-white shadow-lg rounded-2xl p-6 w-full max-w-lg">
                <h1 className="text-2xl font-bold text-center mb-6 text-gray-900">Search Flights</h1>

                <form onSubmit={handleSubmit} className="space-y-4">
                    {/* ORIGIN */}
                    <div className="relative" ref={originRef}>
                        <label className="block text-sm font-medium text-gray-900">From (Origin)</label>
                        <input
                            type="text"
                            name="origin"
                            placeholder="e.g. London"
                            value={formData.origin}
                            onChange={(e) => handleSearchSuggestions("origin", e.target.value)}
                            className="mt-1 w-full border border-gray-300 rounded-lg px-3 py-2 
                                       placeholder-gray-500 text-gray-900"
                            required
                        />
                        {originSuggestions.length > 0 && (
                            <ul className="absolute bg-white border rounded-lg mt-1 w-full max-h-40 overflow-y-auto z-10">
                                {originSuggestions.map((s) => (
                                    <li
                                        key={s.code}
                                        className="px-3 py-2 cursor-pointer hover:bg-gray-100 text-gray-900"
                                        onClick={() => handleSelectSuggestion("origin", s.code)}
                                    >
                                        {s.name} ({s.code})
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>

                    {/* DESTINATION */}
                    <div className="relative" ref={destinationRef}>
                        <label className="block text-sm font-medium text-gray-900">To (Destination)</label>
                        <input
                            type="text"
                            name="destination"
                            placeholder="e.g. New York"
                            value={formData.destination}
                            onChange={(e) => handleSearchSuggestions("destination", e.target.value)}
                            className="mt-1 w-full border border-gray-300 rounded-lg px-3 py-2 
                                       placeholder-gray-500 text-gray-900"
                            required
                        />
                        {destinationSuggestions.length > 0 && (
                            <ul className="absolute bg-white border rounded-lg mt-1 w-full max-h-40 overflow-y-auto z-10">
                                {destinationSuggestions.map((s) => (
                                    <li
                                        key={s.code}
                                        className="px-3 py-2 cursor-pointer hover:bg-gray-100 text-gray-900"
                                        onClick={() => handleSelectSuggestion("destination", s.code)}
                                    >
                                        {s.name} ({s.code})
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>

                    {/* DATES */}
                    <div>
                        <label className="block text-sm font-medium text-gray-900">Departure Date</label>
                        <input
                            type="date"
                            name="departureDate"
                            value={formData.departureDate}
                            onChange={handleChange}
                            className="mt-1 w-full border border-gray-300 rounded-lg px-3 py-2 
                                       placeholder-gray-500 text-gray-900"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-900">Return Date</label>
                        <input
                            type="date"
                            name="returnDate"
                            value={formData.returnDate}
                            onChange={handleChange}
                            className="mt-1 w-full border border-gray-300 rounded-lg px-3 py-2 
                                       placeholder-gray-500 text-gray-900"
                        />
                    </div>

                    {/* ADULTS */}
                    <div>
                        <label className="block text-sm font-medium text-gray-900">Adults</label>
                        <input
                            type="number"
                            name="adults"
                            min="1"
                            value={formData.adults}
                            onChange={handleChange}
                            className="mt-1 w-full border border-gray-300 rounded-lg px-3 py-2 
                                       placeholder-gray-500 text-gray-900"
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white rounded-lg py-2 hover:bg-blue-700 transition"
                        disabled={loading}
                    >
                        {loading ? "Searching..." : "Search Flights"}
                    </button>
                </form>

                {error && <p className="text-red-600 mt-4 text-center">{error}</p>}

                {results.length > 0 && (
                    <div className="mt-6">
                        <h2 className="font-semibold text-lg mb-2 text-gray-900">Results:</h2>
                        <ul className="space-y-3">
                            {results.map((offer, idx) => (
                                <li key={idx} className="border p-3 rounded-lg bg-gray-50 text-gray-900">
                                    <p>
                                        <strong>
                                            {offer.itineraries[0]?.segments[0]?.departure?.iataCode} →{" "}
                                            {offer.itineraries[0]?.segments.slice(-1)[0]?.arrival?.iataCode}
                                        </strong>
                                    </p>
                                    <p>Price: {offer.price?.total} {offer.price?.currency}</p>
                                    <p>Airline: {offer.validatingAirlineCodes?.join(", ")}</p>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>
        </div>
    );
};

export default FlightsPage;
