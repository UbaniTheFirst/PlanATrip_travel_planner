// api/city-search.js
import express from "express";
import fetch from "node-fetch";
import { getAccessToken } from "./amadeus/amadeus.js";

const router = express.Router();

router.post("/", async (req, res) => {
    const { keyword } = req.body;
    try {
        const token = await getAccessToken();
        const response = await fetch(
            `https://test.api.amadeus.com/v1/reference-data/locations?subType=CITY&keyword=${keyword}`,
            { headers: { Authorization: `Bearer ${token}` } }
        );

        const data = await response.json();
        if (data.data && data.data.length > 0) {
            res.json({ code: data.data[0].iataCode });
        } else {
            res.json({ code: null });
        }
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

export default router;
