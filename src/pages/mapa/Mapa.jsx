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
import { useLocation } from "react-router-dom";

import L from "leaflet";
import iconeVerde from "../../assets/iconeVerde.png";

const customIcon = new L.Icon({
  iconUrl: iconeVerde,
  iconSize: [40, 45],
  iconAnchor: [20, 45],
  popupAnchor: [0, -40],
});

function MoverMapa({ position }) {
  const map = useMap();
  if (position) map.setView(position, 16);
  return null;
}

export default function Mapa() {
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const queryLat = query.get("lat");
  const queryLng = query.get("lng");

  const [cep, setCep] = useState("");
  const [mapPosition, setMapPosition] = useState(
    queryLat && queryLng
      ? [parseFloat(queryLat), parseFloat(queryLng)]
      : [-23.55052, -46.633308] // posição padrão
  );
  const [pontos, setPontos] = useState([]);

  useEffect(() => {
    async function buscarPontos() {
      try {
        const res = await axios.get("http://localhost:5000/pontos");
        setPontos(res.data);
      } catch (err) {
        console.error("Erro ao buscar pontos:", err);
      }
    }

    buscarPontos();
  }, []);

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

      const endereco = `${data.logradouro}, ${data.bairro}, ${data.localidade}, ${data.uf}`;
      const geoRes = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(endereco)}`
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

        {/* Pontos do banco */}
        {pontos.map((ponto, index) => (
          <Marker
            key={index}
            position={[ponto.latitude, ponto.longitude]}
            icon={customIcon}
          >
            <Popup>
              <strong>{ponto.nome}</strong><br />
              {ponto.endereco}<br />
              {ponto.horario}
            </Popup>
          </Marker>
        ))}

        {/* Marcador do CEP buscado ou da query string */}
        {(cep || (queryLat && queryLng)) && (
          <Marker position={mapPosition} icon={customIcon}>
            <Popup>Local selecionado</Popup>
          </Marker>
        )}
      </MapContainer>
    </div>
  );
}
