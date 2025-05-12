import React, { useState, useEffect } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMap,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import styles from "./mapa.module.scss";
import axios from "axios";
import L from "leaflet";
import { useLocation } from "react-router-dom";
import iconeVerde from "../../assets/iconeVerde.png";

const customIcon = new L.Icon({
  iconUrl: iconeVerde,
  iconSize: [40, 45],
  iconAnchor: [20, 45],
  popupAnchor: [0, -40],
});

function MoverMapa({ position }) {
  const map = useMap();
  if (position) map.setView(position, 14);
  return null;
}

export default function Mapa() {
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const cepQuery = query.get("cep");

  const [cep, setCep] = useState("");
  const [mapPosition, setMapPosition] = useState([-23.55052, -46.633308]); // São Paulo padrão
  const [pontos, setPontos] = useState([]);
  const [marcadores, setMarcadores] = useState([]);

  // Centraliza se receber CEP por URL
  useEffect(() => {
    async function centralizarPorCep(cep) {
      try {
        const viaCep = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
        const data = await viaCep.json();

        if (data.erro) {
          console.warn("CEP inválido na URL:", cep);
          return;
        }

        const endereco = `${data.logradouro}, ${data.bairro}, ${data.localidade}, ${data.uf}, Brasil`;
        const geoRes = await fetch(
          `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(endereco)}`,
          {
            headers: {
              "User-Agent": "ColetaLinkApp/1.0 (contato@coletalink.com.br)",
            },
          }
        );
        const geoData = await geoRes.json();

        if (geoData.length > 0) {
          const { lat, lon } = geoData[0];
          setMapPosition([parseFloat(lat), parseFloat(lon)]);
        }
      } catch (err) {
        console.error("Erro ao centralizar pelo CEP da URL:", err);
      }
    }

    if (cepQuery) {
      centralizarPorCep(cepQuery);
    }
  }, [cepQuery]);

  // Busca todos os pontos e converte endereço em coordenadas
  useEffect(() => {
    async function buscarPontos() {
      try {
        const res = await axios.get("https://coletalink-api.onrender.com/pontos");
        setPontos(res.data);

        let localizados = 0;
        let naoLocalizados = 0;

        const marcadoresComCoordenadas = await Promise.all(
          res.data.map(async (ponto) => {
            if (
              !ponto.logradouro ||
              !ponto.numero ||
              !ponto.bairro ||
              !ponto.cidade ||
              !ponto.uf
            ) {
              console.warn("❌ Dados incompletos para geolocalização:", ponto);
              naoLocalizados++;
              return null;
            }

            const endereco = `${ponto.logradouro}, ${ponto.numero}, ${ponto.bairro}, ${ponto.cidade}, ${ponto.uf}, Brasil`;
            const geoRes = await fetch(
              `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(endereco)}`,
              {
                headers: {
                  "User-Agent": "ColetaLinkApp/1.0 (contato@coletalink.com.br)",
                },
              }
            );
            const geoData = await geoRes.json();

            if (geoData.length > 0) {
              localizados++;
              return {
                ...ponto,
                lat: parseFloat(geoData[0].lat),
                lon: parseFloat(geoData[0].lon),
              };
            } else {
              naoLocalizados++;
              console.warn(`❌ Endereço não localizado: ${endereco}`);
              return null;
            }
          })
        );

        console.info(`✅ Pontos localizados: ${localizados}`);
        console.info(`⚠️ Pontos não localizados: ${naoLocalizados}`);

        const filtrados = marcadoresComCoordenadas.filter(Boolean);
        setMarcadores(filtrados);
      } catch (err) {
        console.error("Erro ao buscar pontos:", err);
      }
    }

    buscarPontos();
  }, []);

  // Busca por CEP (manual)
  const handleBuscarCep = async () => {
    if (!cep || cep.length !== 8) {
      alert("Digite um CEP válido com 8 dígitos.");
      return;
    }

    try {
      const viaCep = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
      const data = await viaCep.json();

      if (data.erro) {
        alert("CEP não encontrado.");
        return;
      }

      const endereco = `${data.logradouro}, ${data.bairro}, ${data.localidade}, ${data.uf}, Brasil`;
      const geoRes = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(endereco)}`,
        {
          headers: {
            "User-Agent": "ColetaLinkApp/1.0 (contato@coletalink.com.br)",
          },
        }
      );
      const geoData = await geoRes.json();

      if (geoData.length > 0) {
        const { lat, lon } = geoData[0];
        setMapPosition([parseFloat(lat), parseFloat(lon)]);
      } else {
        alert("Endereço não localizado no mapa.");
      }
    } catch (err) {
      console.error("Erro ao buscar o CEP:", err);
      alert("Erro ao buscar endereço.");
    }
  };

  return (
    <div className={styles.mapaContainer}>
      <h1 className={styles.titulo}>Pontos de Coleta</h1>

      <div className={styles.buscaCep}>
        <input
          type="text"
          placeholder="Digite o CEP (Ex: 01001000)"
          value={cep}
          onChange={(e) => setCep(e.target.value.replace(/\D/g, ""))}
        />
        <button onClick={handleBuscarCep}>Buscar</button>
      </div>

      <MapContainer
        center={mapPosition}
        zoom={12}
        scrollWheelZoom={true}
        className={styles.mapa}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <MoverMapa position={mapPosition} />

        {marcadores.map((ponto, index) => (
          <Marker
            key={index}
            position={[ponto.lat, ponto.lon]}
            icon={customIcon}
          >
            <Popup>
              <strong>{ponto.nome}</strong><br />
              {`${ponto.logradouro}, ${ponto.numero} - ${ponto.bairro}, ${ponto.cidade} - ${ponto.uf}`}<br />
              {ponto.horario}
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}
