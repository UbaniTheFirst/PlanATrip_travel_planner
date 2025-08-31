import { useState } from "react";

const Hotels = () => {
    const [city, setCity] = useState("");
    const [checkInDate, setCheckInDate] = useState("");
    const [checkOutDate, setCheckOutDate] = useState("");
    const [results, setResults] = useState([]);

    const handleSearch = async (e) => {
        e.preventDefault();

        try {
            // Step 1: Convert city name to IATA code
            const cityRes = await fetch("http://localhost:5000/api/city-search", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ keyword: city }),
            });

            const cityData = await cityRes.json();
            if (!cityData || !cityData.code) {
                alert("City not found. Try another name.");
                return;
            }

            const cityCode = cityData.code;

            // Step 2: Fetch hotels with IATA city code
            const res = await fetch("http://localhost:5000/api/hotels", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ cityCode, checkInDate, checkOutDate }),
            });

            const data = await res.json();
            console.log("Hotel Results:", data);
            setResults(data);
        } catch (err) {
            console.error("Error fetching hotels:", err);
        }
    };

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4 text-gray-900">Search Hotels</h1>
            <form onSubmit={handleSearch} className="space-y-4">
                <input
                    type="text"
                    placeholder="Enter city name (e.g. New York)"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="border p-2 w-full text-gray-900 placeholder-gray-500"
                />
                <input
                    type="date"
                    value={checkInDate}
                    onChange={(e) => setCheckInDate(e.target.value)}
                    className="border p-2 w-full text-gray-900"
                />
                <input
                    type="date"
                    value={checkOutDate}
                    onChange={(e) => setCheckOutDate(e.target.value)}
                    className="border p-2 w-full text-gray-900"
                />
                <button
                    type="submit"
                    className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
                >
                    Search Hotels
                </button>
            </form>

            {/* Results */}
            <div className="mt-6">
                {results.length > 0 ? (
                    results.map((hotel, idx) => (
                        <div key={idx} className="p-4 border rounded mb-2">
                            <h2 className="font-semibold text-lg">{hotel.name}</h2>
                            <p>{hotel.address}</p>
                        </div>
                    ))
                ) : (
                    <p className="text-gray-600">No results yet.</p>
                )}
            </div>
        </div>
    );
};

export default Hotels;
