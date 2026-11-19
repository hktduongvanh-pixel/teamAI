// Proxy an toàn: key OpenRouter chỉ nằm trên Vercel, không lộ ra trình duyệt.
module.exports = async (req, res) => {
  if (req.method !== "POST") {
    return res.status(405).json({ error: { message: "Chỉ nhận POST" } });
  }

  const accessCode = process.env.ACCESS_CODE;
  const apiKey = process.env.OPENROUTER_API_KEY;
  if (!accessCode || !apiKey) {
    return res.status(500).json({ error: { message: "Chưa đặt ACCESS_CODE hoặc OPENROUTER_API_KEY trên Vercel" } });
  }
  if (req.headers["x-access-code"] !== accessCode) {
    return res.status(401).json({ error: { message: "Sai mã truy cập" } });
  }

  let body = req.body || {};
  if (typeof body === "string") {
    try { body = JSON.parse(body); } catch (e) { body = {}; }
  }
  if (!body.model || !Array.isArray(body.messages)) {
    return res.status(400).json({ error: { message: "Thiếu model hoặc messages" } });
  }

  const payload = { model: body.model, messages: body.messages };
  if (Array.isArray(body.plugins)) payload.plugins = body.plugins;
  const maxTokens = Number(body.max_tokens);
  if (maxTokens > 0) payload.max_tokens = Math.min(4096, Math.max(64, Math.round(maxTokens)));

  try {
    const upstream = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: { "Authorization": "Bearer " + apiKey, "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });
    const data = await upstream.json().catch(() => ({}));
    return res.status(upstream.status).json(data);
  } catch (err) {
    return res.status(502).json({ error: { message: "Không gọi được OpenRouter: " + err.message } });
  }
};
