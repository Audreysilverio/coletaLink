import express from "express";
import fetch from "node-fetch"; 
import Ponto from "../models/Ponto.js";

const router = express.Router();

// Rota GET: lista todos os pontos
router.get("/", async (req, res) => {
  try {
    const pontos = await Ponto.find();
    res.json(pontos);
  } catch (err) {
    console.error("❌ Erro ao buscar pontos:", err);
    res.status(500).json({ error: "Erro ao buscar pontos" });
  }
});

// Rota POST: cadastra novo ponto com lat/lon via Nominatim
router.post("/", async (req, res) => {
  try {
    const dados = req.body;

    console.log("📥 Dados recebidos:", dados);

    const enderecoCompleto = `${dados.logradouro}, ${dados.numero}, ${dados.bairro}, ${dados.cidade}, ${dados.uf}, Brasil`;

    console.log("📍 Endereço montado:", enderecoCompleto);

    const geoRes = await fetch(
      `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(enderecoCompleto)}`,
      {
        headers: {
          "User-Agent": "ColetaLinkApp/1.0 (contato@coletalink.com.br)",
        },
      }
    );

    const geoData = await geoRes.json();

    const lat = geoData[0]?.lat || null;
    const lon = geoData[0]?.lon || null;

    console.log("🗺️ Coordenadas obtidas:", lat, lon);

    const novoPonto = new Ponto({
      ...dados,
      lat: lat ? parseFloat(lat) : null,
      lon: lon ? parseFloat(lon) : null,
    });

    await novoPonto.save();

    console.log("✅ Ponto salvo no banco:", novoPonto);

    res.status(201).json({
      message: "Ponto cadastrado com sucesso!",
      ponto: novoPonto,
    });
  } catch (err) {
    console.error("❌ Erro ao cadastrar ponto:", err);
    res.status(500).json({ error: "Erro ao cadastrar ponto" });
  }
});

export default router;
