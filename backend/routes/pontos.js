import express from "express";
import Ponto from "../models/Ponto.js";

const router = express.Router();


router.get("/", async (req, res) => {
  try {
    const pontos = await Ponto.find();
    res.json(pontos);
  } catch (err) {
    res.status(500).json({ error: "Erro ao buscar pontos" });
  }
});


router.post("/", async (req, res) => {
  try {
    const novoPonto = new Ponto(req.body);
    await novoPonto.save();
    res.status(201).json({ message: "Ponto cadastrado com sucesso!" });
  } catch (err) {
    res.status(500).json({ error: "Erro ao cadastrar ponto" });
  }
});

export default router;
