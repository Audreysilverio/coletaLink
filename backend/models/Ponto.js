import mongoose from "mongoose";

const PontoSchema = new mongoose.Schema({
  nome: { type: String, required: true },
  email: { type: String, required: true },
  telefone: { type: String, required: true },
  tipoResiduo: { type: String, required: true },
  horario: { type: String, required: true },
  site: { type: String }, // opcional

  cep: { type: String, required: true },
  logradouro: { type: String, required: true },
  numero: { type: String, required: true },
  bairro: { type: String, required: true },
  cidade: { type: String, required: true },
  uf: { type: String, required: true },

  latitude: { type: Number },
  longitude: { type: Number },
});

const Ponto = mongoose.model("Ponto", PontoSchema);

export default Ponto;

