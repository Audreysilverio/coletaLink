import React from 'react';
import { Routes, Route } from 'react-router-dom';

// Estilos globais
import './globalStyle/globalStyle.scss';

// Componentes fixos
import Header from './components/header/Header';
import Footer from './components/footer/Footer';

// Páginas
import Inicio from './pages/inicio/Inicio';
import QuemSomos from './pages/quemSomos/QuemSomos';
import Informacoes from './pages/informacoes/Informacoes';
import Doar from './pages/doar/Doar';
import Mapa from './pages/mapa/Mapa';
import Buscar from './pages/buscar/Buscar';

export default function App() {
  return (
    <>
      <Header />

      <main id="main-content">
        <Routes>
          <Route path="/" element={<Inicio />} />
          <Route path="/quem-somos" element={<QuemSomos />} />
          <Route path="/informacoes" element={<Informacoes />} />
          <Route path="/doar" element={<Doar />} />
          <Route path="/mapa" element={<Mapa />} />
          <Route path="/buscar" element={<Buscar />} />
        </Routes>
      </main>

      <Footer />
    </>
  );
}
