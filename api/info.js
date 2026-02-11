export default function handler(req, res) {
  const ip =
    req.headers["x-forwarded-for"]?.split(",")[0] ||
    req.socket?.remoteAddress ||
    "Unknown";

  res.status(200).json({
    ip_address: ip,
    user_agent: req.headers["user-agent"] || "Unknown",
    accept_language: req.headers["accept-language"] || "Unknown",
    time_visited: new Date().toISOString()
  });
}
