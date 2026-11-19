module.exports = async (req, res) => {
  const accessCode = process.env.ACCESS_CODE;
  if (!accessCode) {
    return res.status(500).json({ error: { message: "Chưa đặt ACCESS_CODE trên Vercel" } });
  }
  if (req.headers["x-access-code"] !== accessCode) {
    return res.status(401).json({ error: { message: "Sai mã truy cập" } });
  }

  try {
    const upstream = await fetch("https://openrouter.ai/api/v1/models");
    const json = await upstream.json();
    const ids = (json.data || []).filter(m =>
      m.architecture && (m.architecture.input_modalities || []).includes("image") &&
      m.pricing && Number(m.pricing.prompt) === 0 && Number(m.pricing.completion) === 0
    ).map(m => m.id).sort();
    res.setHeader("Cache-Control", "s-maxage=3600, stale-while-revalidate");
    return res.status(200).json({ ids });
  } catch (err) {
    return res.status(502).json({ error: { message: "Không tải được danh sách: " + err.message } });
  }
};
