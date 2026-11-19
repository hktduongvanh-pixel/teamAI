// Proxy an toàn: key được giữ trên Vercel hoặc do người dùng gửi qua header, không lưu lại.
const PROVIDERS = {
  openrouter: { base: "https://openrouter.ai/api/v1", env: "OPENROUTER_API_KEY" },
  gemini:     { base: "https://generativelanguage.googleapis.com/v1beta/openai", env: "GEMINI_API_KEY" },
  openai:     { base: "https://api.openai.com/v1", env: "OPENAI_API_KEY" },
  deepseek:   { base: "https://api.deepseek.com", env: "DEEPSEEK_API_KEY" },
  groq:       { base: "https://api.groq.com/openai/v1", env: "GROQ_API_KEY" },
  mistral:    { base: "https://api.mistral.ai/v1", env: "MISTRAL_API_KEY" }
};

module.exports = async (req, res) => {
  if (req.method !== "POST") {
    return res.status(405).json({ error: { message: "Chỉ nhận POST" } });
  }

  const accessCode = process.env.ACCESS_CODE;
  if (!accessCode) {
    return res.status(500).json({ error: { message: "Chưa đặt ACCESS_CODE trên Vercel" } });
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

  const provider = PROVIDERS[body.provider] ? body.provider : "openrouter";
  const cfg = PROVIDERS[provider];
  let apiKey;
  if (provider === "openrouter") {
    apiKey = process.env.OPENROUTER_API_KEY;
  } else {
    const userKey = String(req.headers["x-provider-key"] || "").trim();
    apiKey = userKey || process.env[cfg.env];
  }
  if (!apiKey) {
    return res.status(400).json({ error: { message: "Chưa có API key của " + provider + ". Dán key trong tab Cài đặt hoặc đặt biến " + cfg.env + " trên Vercel" } });
  }

  const payload = { model: body.model, messages: body.messages };
  if (provider === "openrouter" && Array.isArray(body.plugins)) payload.plugins = body.plugins;
  const maxTokens = Number(body.max_tokens);
  if (maxTokens > 0) payload.max_tokens = Math.min(4096, Math.max(64, Math.round(maxTokens)));

  try {
    const upstream = await fetch(cfg.base + "/chat/completions", {
      method: "POST",
      headers: { "Authorization": "Bearer " + apiKey, "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });
    const data = await upstream.json().catch(() => ({}));
    return res.status(upstream.status).json(data);
  } catch (err) {
    return res.status(502).json({ error: { message: "Không gọi được " + provider + ": " + err.message } });
  }
};
