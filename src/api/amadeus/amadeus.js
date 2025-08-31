import axios from "axios";

const AMADEUS_API_KEY = import.meta.env.VITE_AMADEUS_API_KEY;
const AMADEUS_API_SECRET = import.meta.env.VITE_AMADEUS_API_SECRET;

// Base URL
const BASE_URL = "https://test.api.amadeus.com";

// Store token in memory
let accessToken = null;
let tokenExpiry = null;

// Get Access Token
async function getAccessToken() {
    if (accessToken && tokenExpiry && new Date() < tokenExpiry) {
        return accessToken; // Reuse if still valid
    }

    try {
        const response = await axios.post(
            `${BASE_URL}/v1/security/oauth2/token`,
            new URLSearchParams({
                grant_type: "client_credentials",
                client_id: AMADEUS_API_KEY,
                client_secret: AMADEUS_API_SECRET,
            })
        );

        accessToken = response.data.access_token;
        tokenExpiry = new Date(Date.now() + response.data.expires_in * 1000);

        return accessToken;
    } catch (error) {
        console.error("Error fetching Amadeus access token:", error.response?.data || error);
        throw error;
    }
}

// ✅ Search Flights
export async function searchFlights({ origin, destination, departureDate, adults }) {
    try {
        const token = await getAccessToken();
        const response = await axios.get(`${BASE_URL}/v2/shopping/flight-offers`, {
            headers: { Authorization: `Bearer ${token}` },
            params: {
                originLocationCode: origin,
                destinationLocationCode: destination,
                departureDate,
                adults,
                currencyCode: "USD",
                max: 10,
            },
        });
        return response.data?.data || [];
    } catch (error) {
        console.error("Error fetching flights:", error.response?.data || error);
        return [];
    }
}

// ✅ Search Hotels (by city code)
export async function searchHotels(cityCode) {
    try {
        const token = await getAccessToken();
        const response = await axios.get(
            `${BASE_URL}/v1/reference-data/locations/hotels/by-city`,
            {
                headers: { Authorization: `Bearer ${token}` },
                params: { cityCode },
            }
        );
        return response.data?.data || [];
    } catch (error) {
        console.error("Error fetching hotels:", error.response?.data || error);
        return [];
    }
}

// ✅ Autocomplete Destination Search
export async function searchDestination(keyword) {
    if (!keyword || keyword.length < 2) return []; // Require min 2 letters
    try {
        const token = await getAccessToken();
        const response = await axios.get(`${BASE_URL}/v1/reference-data/locations`, {
            headers: { Authorization: `Bearer ${token}` },
            params: {
                keyword,
                subType: "CITY,AIRPORT", // allow city + airport searches
                page: { limit: 10 },
            },
        });

        // Normalize to simple array: [{ code: "LON", name: "London, United Kingdom" }]
        return (
            response.data?.data?.map((loc) => ({
                code: loc.iataCode,
                name: `${loc.name}, ${loc.address?.countryName}`,
            })) || []
        );
    } catch (error) {
        console.error("Error fetching destination info:", error.response?.data || error);
        return [];
    }
}
