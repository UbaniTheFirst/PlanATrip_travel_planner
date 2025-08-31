// pages/api/searchFlights.js

export default async function handler(req, res) {
    if (req.method !== "POST") {
        return res.status(405).json({ error: "Method not allowed" });
    }

    const { origin, destination, departureDate, returnDate } = req.body;

    if (!origin || !destination || !departureDate) {
        return res.status(400).json({ error: "Missing required fields" });
    }

    try {
        // 1. Get access token
        const tokenResponse = await fetch("https://test.api.amadeus.com/v1/security/oauth2/token", {
            method: "POST",
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            body: new URLSearchParams({
                grant_type: "client_credentials",
                client_id: process.env.AMADEUS_API_KEY,
                client_secret: process.env.AMADEUS_API_SECRET,
            }),
        });

        if (!tokenResponse.ok) {
            const errData = await tokenResponse.text();
            return res.status(500).json({ error: "Failed to get access token", details: errData });
        }

        const tokenData = await tokenResponse.json();
        const accessToken = tokenData.access_token;

        // 2. Call Amadeus Flight Offers Search API
        const url = new URL("https://test.api.amadeus.com/v2/shopping/flight-offers");
        url.searchParams.append("originLocationCode", origin);
        url.searchParams.append("destinationLocationCode", destination);
        url.searchParams.append("departureDate", departureDate);
        if (returnDate) url.searchParams.append("returnDate", returnDate);
        url.searchParams.append("adults", "1");
        url.searchParams.append("max", "5");

        const flightResponse = await fetch(url.toString(), {
            headers: { Authorization: `Bearer ${accessToken}` },
        });

        if (!flightResponse.ok) {
            const errData = await flightResponse.text();
            return res.status(500).json({ error: "Failed to fetch flights", details: errData });
        }

        const flights = await flightResponse.json();

        // If Amadeus returns no data
        if (!flights.data || flights.data.length === 0) {
            return res.status(200).json({ message: "No flights found", data: [] });
        }

        return res.status(200).json(flights);

    } catch (error) {
        console.error("Unexpected error in searchFlights API:", error);
        return res.status(500).json({ error: "Internal server error" });
    }
}
