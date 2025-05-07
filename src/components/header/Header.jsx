import { useState } from 'react';
import { Link } from 'react-router-dom';
import logo from '../../assets/logoColetaLink.jpeg';
import s from './header.module.scss';

export default function Header() {
  const [menuAberto, setMenuAberto] = useState(false);

  const toggleMenu = () => {
    setMenuAberto(!menuAberto);
  };

  return (
    <header className={s.header}>
      <section className={s.logoHeader}>
        <img src={logo} alt="Logo ColetaLink" />
        <h1>ColetaLink</h1>
      </section>

      <button className={s.menuToggle} onClick={toggleMenu}>
        ☰
      </button>

      <nav className={`${s.navHeader} ${menuAberto ? s.aberto : ''}`}>
        <ul>
          <li><Link className={s.link} to="/" onClick={() => setMenuAberto(false)}>Início</Link></li>
          <li><Link className={s.link} to="/quem-somos" onClick={() => setMenuAberto(false)}>Quem Somos</Link></li>
          <li><Link className={s.link} to="/informacoes" onClick={() => setMenuAberto(false)}>Informações</Link></li>
          <li><Link className={s.link} to="/doar" onClick={() => setMenuAberto(false)}>Doar</Link></li>
          <li><Link className={s.link} to="/mapa" onClick={() => setMenuAberto(false)}>Mapa</Link></li>
          <li><Link className={s.link} to="/buscar" onClick={() => setMenuAberto(false)}>Buscar</Link></li>
        </ul>
      </nav>
    </header>
  );
}
