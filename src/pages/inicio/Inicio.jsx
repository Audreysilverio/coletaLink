import { FaUsers, FaRecycle, FaHandHoldingHeart, FaGlobeAmericas } from 'react-icons/fa';
import s from './inicio.module.scss';
import { Link } from 'react-router-dom';


export default function Inicio() {
  return (
    <main>
      <section className={s.heroSection}>
        <div className={s.heroContent}>
          <h2>Conectamos doadores e catadores</h2>
          <p>Junte-se ao <strong>ColetaLink</strong> e transforme resíduos em oportunidades para quem mais precisa.</p>
          <Link to="/doar" className={s.ctaButton}>Comece agora</Link>
        </div>
      </section>

      <section className={s.porqueDoarSection}>
        <h2>Por que doar?</h2>
        <p>
          O <strong>ColetaLink</strong> é uma plataforma que facilita o descarte consciente e valoriza o trabalho dos catadores. 
          Com poucos cliques, você colabora com a preservação do meio ambiente e ainda promove inclusão social.
        </p>

        <div className={s.cardGrid}>
          <div className={s.card}>
            <FaUsers size={50} />
            <h3>Conexão Social</h3>
            <p>Unimos comunidades e catadores em um ciclo sustentável.</p>
          </div>
          <div className={s.card}>
            <FaRecycle size={50} />
            <h3>Descarte Consciente</h3>
            <p>Facilitamos a separação e entrega de materiais recicláveis.</p>
          </div>
          <div className={s.card}>
            <FaHandHoldingHeart size={50} />
            <h3>Impacto Real</h3>
            <p>Geramos renda e valorizamos quem atua na base da reciclagem.</p>
          </div>
          <div className={s.card}>
            <FaGlobeAmericas size={50} />
            <h3>Futuro Sustentável</h3>
            <p>Promovemos educação ambiental e economia circular.</p>
          </div>
        </div>
      </section>
    </main>
  );
}
