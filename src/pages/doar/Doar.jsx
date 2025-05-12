import { useState } from 'react';
import axios from 'axios';
import s from './doar.module.scss';

export default function Doar() {
  const [form, setForm] = useState({
    nome: '',
    email: '',
    telefone: '',
    cep: '',
    logradouro: '',
    numero: '',
    bairro: '',
    cidade: '',
    uf: '',
    tipoResiduo: '',
    horario: '',
    site: '',
  });

  const [mensagem, setMensagem] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const buscarEndereco = async () => {
    if (form.cep.length < 8) return;

    try {
      const response = await axios.get(`https://viacep.com.br/ws/${form.cep}/json/`);
      if (response.data.erro) {
        setMensagem('CEP não encontrado.');
        return;
      }

      setForm((prev) => ({
        ...prev,
        logradouro: response.data.logradouro || '',
        bairro: response.data.bairro || '',
        cidade: response.data.localidade || '',
        uf: response.data.uf || ''
      }));
      setMensagem('');
    } catch (error) {
      setMensagem('Erro ao buscar o CEP.');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Formulário enviado:', form);

    try {
      await axios.post('https://coletalink-api.onrender.com/pontos', form);
      setMensagem('Solicitação enviada com sucesso!');
      setForm({
        nome: '',
        email: '',
        telefone: '',
        cep: '',
        logradouro: '',
        numero: '',
        bairro: '',
        cidade: '',
        uf: '',
        tipoResiduo: '',
        horario: '',
        site: '',
      });
    } catch (err) {
      console.error(err);
      setMensagem('Erro ao enviar. Tente novamente.');
    }
  };

  return (
    <main className={s.doarContainer}>
      <h2>Divulgue seu perfil como ponto de coleta</h2>
      <p>Preencha os dados abaixo para fazer parte da nossa rede de parceiros.</p>

      <form className={s.formulario} onSubmit={handleSubmit}>
        <label>
          Nome*
          <input type="text" name="nome" value={form.nome} onChange={handleChange} required />
        </label>

        <label>
          E-mail para contato*
          <input type="email" name="email" value={form.email} onChange={handleChange} required />
        </label>

        <label>
          Telefone / WhatsApp*
          <input type="tel" name="telefone" value={form.telefone} onChange={handleChange} required />
        </label>

        <div className={s.cepBusca}>
          <label>
            CEP*
            <input
              type="text"
              name="cep"
              value={form.cep}
              onChange={handleChange}
              onBlur={buscarEndereco}
              required
            />
          </label>
          <button type="button" onClick={buscarEndereco}>
            Buscar
          </button>
        </div>

        <label>
          Rua / Logradouro*
          <input type="text" name="logradouro" value={form.logradouro} onChange={handleChange} required />
        </label>

        <label>
          Número*
          <input type="text" name="numero" value={form.numero} onChange={handleChange} required />
        </label>

        <label>
          Bairro*
          <input type="text" name="bairro" value={form.bairro} onChange={handleChange} required />
        </label>

        <label>
          Cidade*
          <input type="text" name="cidade" value={form.cidade} onChange={handleChange} required />
        </label>

        <label>
          Estado (UF)*
          <input type="text" name="uf" value={form.uf} onChange={handleChange} required />
        </label>

        <label>
          Tipo de resíduo*
          <select name="tipoResiduo" value={form.tipoResiduo} onChange={handleChange} required>
            <option value="">Selecione o tipo</option>
            <option value="papel">Papel</option>
            <option value="plástico">Plástico</option>
            <option value="eletrônico">Eletrônico</option>
            <option value="metal">Metal</option>
            <option value="vidro">Vidro</option>
            <option value="sofá">Sofá</option>
            <option value="movéis">Movéis</option>
            <option value="eletrodoméstico">Eletrodoméstico</option>
            <option value="orgânico">Orgânico</option>
          </select>
        </label>

        <label>
          Horário de expediente*
          <input type="text" name="horario" value={form.horario} onChange={handleChange} required />
        </label>

        <label>
          Site (opcional)
          <input type="url" name="site" value={form.site} onChange={handleChange} />
        </label>

        <button type="submit" className={s.botaoEnviar}>Enviar solicitação</button>

        {mensagem && <p style={{ marginTop: '1rem', fontWeight: 'bold' }}>{mensagem}</p>}
      </form>
    </main>
  );
}
