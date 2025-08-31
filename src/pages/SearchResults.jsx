import { useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { searchFlights, searchHotels } from "../api/amadeus/amadeus"; // adjust import if needed

const SearchResults = () => {
    const [searchParams] = useSearchParams();
    const query = searchParams.get("query"); // e.g. "Paris"

    const [flights, setFlights] = useState([]);
    const [hotels, setHotels] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchResults = async () => {
            try {
                setLoading(true);
                const flightData = await searchFlights(query);
                const hotelData = await searchHotels(query);
                setFlights(flightData || []);
                setHotels(hotelData || []);
            } catch (error) {
                console.error("Error fetching results:", error);
            } finally {
                setLoading(false);
            }
        };

        if (query) fetchResults();
    }, [query]);

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">Results for "{query}"</h1>

            {loading ? (
                <p>Loading...</p>
            ) : (
                <>
                    <section className="mb-8">
                        <h2 className="text-xl font-semibold mb-2">Flights</h2>
                        {flights.length > 0 ? (
                            <ul className="space-y-2">
                                {flights.map((flight, i) => (
                                    <li key={i} className="p-3 border rounded">
                                        {flight.details || "Flight info placeholder"}
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <p>No flights found.</p>
                        )}
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold mb-2">Hotels</h2>
                        {hotels.length > 0 ? (
                            <ul className="space-y-2">
                                {hotels.map((hotel, i) => (
                                    <li key={i} className="p-3 border rounded">
                                        {hotel.details || "Hotel info placeholder"}
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <p>No hotels found.</p>
                        )}
                    </section>
                </>
            )}
        </div>
    );
};

export default SearchResults;
