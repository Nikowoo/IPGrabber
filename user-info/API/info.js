export default async function handler(req, res) {
    try {
        const ip =
            req.headers["x-forwarded-for"]?.split(",")[0] ||
            req.socket?.remoteAddress ||
            "unknown";
        const ipRes = await fetch(`https://ipapi.co/${ip}/json/`);
        const ipData = await ipRes.json();

        const data = {
            ip: ip,
            location: {
                city: ipData.city,
                region: ipData.region,
                country: ipData.country_name,
                latitude: ipData.latitude,
                longitude: ipData.longitude
            },
            isp: ipData.org,
            browser: req.headers["user-agent"],
            timestamp: new Date().toISOString()
        };

        res.status(200).json(data);
    } catch (err) {
        res.status(500).json({ error: "Failed to retrieve data" });
    }
}
