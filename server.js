const express = require("express");
const axios = require("axios");

const app = express();
const PORT = 3000;

app.get("/", async (req, res) => {
    try {
        // Get IP address
        const ip =
            req.headers["x-forwarded-for"]?.split(",")[0] ||
            req.socket.remoteAddress;

        // Get IP info
        const ipInfo = await axios.get(`https://ipapi.co/${ip}/json/`);

        const data = {
            ip: ip,
            location: {
                city: ipInfo.data.city,
                region: ipInfo.data.region,
                country: ipInfo.data.country_name,
                latitude: ipInfo.data.latitude,
                longitude: ipInfo.data.longitude
            },
            isp: ipInfo.data.org,
            browser: req.headers["user-agent"],
            timestamp: new Date().toISOString()
        };

        res.json(data);
    } catch (err) {
        res.status(500).json({ error: "Failed to retrieve data" });
    }
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
