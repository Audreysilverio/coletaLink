import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import styles from "./buscar.module.scss";

export default function Buscar() {
  const [pontos, setPontos] = useState([]);
  const [filtroNome, setFiltroNome] = useState("");
  const [filtroCidade, setFiltroCidade] = useState("");
  const [filtroBairro, setFiltroBairro] = useState("");
  const [filtroTipo, setFiltroTipo] = useState("");
  const [resultadoFiltrado, setResultadoFiltrado] = useState([]);

  useEffect(() => {
    async function buscarPontos() {
      try {
        const res = await axios.get("http://localhost:5000/pontos");
        setPontos(res.data);
        setResultadoFiltrado(res.data);
      } catch (error) {
        console.error("Erro ao buscar pontos:", error);
      }
    }

    buscarPontos();
  }, []);

  const handleFiltrar = () => {
    const filtrados = pontos.filter((ponto) => {
      const nomeMatch = ponto.nome?.toLowerCase().includes(filtroNome.toLowerCase());
      const cidadeMatch = ponto.cidade?.toLowerCase().includes(filtroCidade.toLowerCase());
      const bairroMatch = ponto.bairro?.toLowerCase().includes(filtroBairro.toLowerCase());
      const tipoMatch = !filtroTipo || ponto.tipoResiduo?.toLowerCase() === filtroTipo.toLowerCase();

      return nomeMatch && cidadeMatch && bairroMatch && tipoMatch;
    });

    setResultadoFiltrado(filtrados);
  };

  return (
    <div className={styles.buscarLocais}>
      <h1>Buscar Locais de Coleta</h1>

      <div className={styles.filtros}>
        <input
          type="text"
          placeholder="Nome da instituição"
          value={filtroNome}
          onChange={(e) => setFiltroNome(e.target.value)}
        />
        <input
          type="text"
          placeholder="Cidade"
          value={filtroCidade}
          onChange={(e) => setFiltroCidade(e.target.value)}
        />
        <input
          type="text"
          placeholder="Bairro"
          value={filtroBairro}
          onChange={(e) => setFiltroBairro(e.target.value)}
        />
        <select
          value={filtroTipo}
          onChange={(e) => setFiltroTipo(e.target.value)}
        >
          <option value="">Todos os tipos</option>
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
        <button onClick={handleFiltrar}>Buscar</button>
      </div>

      <div className={styles.resultados}>
        {resultadoFiltrado.length === 0 ? (
          <p className={styles.nenhumResultado}>Nenhum local encontrado.</p>
        ) : (
          resultadoFiltrado.map((ponto, index) => (
            <div key={index} className={styles.card}>
              <h2>{ponto.nome}</h2>
              <p><strong>Endereço:</strong> {`${ponto.logradouro}, ${ponto.numero} - ${ponto.bairro}, ${ponto.cidade} - ${ponto.uf}`}</p>
              <p><strong>Horário:</strong> {ponto.horario}</p>
              {ponto.tipoResiduo && (
                <p><strong>Tipo:</strong> {ponto.tipoResiduo}</p>
              )}
              <Link
                to={`/mapa?cep=${ponto.cep}`}
                className={styles.botaoMapa}
              >
                Ver no mapa
              </Link>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
