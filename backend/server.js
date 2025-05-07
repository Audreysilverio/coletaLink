import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import PontoColeta from './models/PontoColeta.js';

import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('✅ Conectado ao MongoDB Atlas'))
  .catch(err => console.error('❌ Erro de conexão:', err));

app.post('/doar', async (req, res) => {
  try {
    const novoPonto = new PontoColeta(req.body);
    await novoPonto.save();
    res.status(201).json({ message: 'Ponto de coleta salvo com sucesso!' });
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: 'Erro ao salvar no banco de dados.' });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando em http://localhost:${PORT}`);
});
