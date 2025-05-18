import mongoose from 'mongoose';

const pontoColetaSchema = new mongoose.Schema({
  nome: { type: String, required: true },
  email: { type: String, required: true },
  telefone: { type: String, required: true },
  cep: { type: String, required: true },
  logradouro: { type: String, required: true },
  numero: { type: String, required: true },
  bairro: { type: String, required: true },
  cidade: { type: String, required: true },
  uf: { type: String, required: true },
  tipoResiduos: { type: String, required: true },
  horario: { type: String, required: true },
  site: { type: String },
  lat: { type: Number },
  lon: { type: Number },
});

const PontoColeta = mongoose.model('PontoColeta', pontoColetaSchema);

export default PontoColeta;
