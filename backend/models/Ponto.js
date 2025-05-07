import mongoose from "mongoose";

const PontoSchema = new mongoose.Schema({
  nome: String,
  endereco: String,
  horario: String,
  latitude: Number,
  longitude: Number,
});

const Ponto = mongoose.model("Ponto", PontoSchema);

export default Ponto;
