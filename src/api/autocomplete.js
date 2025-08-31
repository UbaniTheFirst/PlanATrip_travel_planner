export default async function handler(req, res) {
    const { keyword } = req.query;

    try {
        // Get access token
        const tokenRes = await fetch("https://test.api.amadeus.com/v1/security/oauth2/token", {
            method: "POST",
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            body: new URLSearchParams({
                grant_type: "client_credentials",
                client_id: process.env.AMADEUS_API_KEY,
                client_secret: process.env.AMADEUS_API_SECRET,
            }),
        });
        const tokenData = await tokenRes.json();

        // Call Amadeus Locations API
        const resp = await fetch(
            `https://test.api.amadeus.com/v1/reference-data/locations?subType=CITY,AIRPORT&keyword=${keyword}`,
            {
                headers: {
                    Authorization: `Bearer ${tokenData.access_token}`,
                },
            }
        );

        const data = await resp.json();
        res.status(200).json(data);
    } catch (error) {
        console.error("Amadeus autocomplete error:", error);
        res.status(500).json({ error: "Failed to fetch locations" });
    }
}
