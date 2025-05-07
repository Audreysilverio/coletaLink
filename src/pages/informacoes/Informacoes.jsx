import s from './informacoes.module.scss';
import { FaTrashAlt, FaLeaf, FaIndustry, FaLightbulb } from 'react-icons/fa';

export default function Informacoes() {
  return (
    <main className={s.informacoes}>
      <section className={s.cabecalho}>
        <h2>Por que Reciclar?</h2>
        <p>
          A reciclagem vai muito além da separação de lixo: ela representa um compromisso com o meio ambiente, 
          com o futuro e com a sociedade. Ao reciclar, você contribui para reduzir a poluição, poupar recursos naturais e 
          gerar renda para milhares de famílias que vivem da coleta.
        </p>
      </section>

      <section className={s.beneficios}>
        <div className={s.card}>
          <FaTrashAlt size={40} />
          <h3>Redução de Lixo</h3>
          <p>Menos resíduos em aterros e ruas, mais saúde e qualidade de vida.</p>
        </div>
        <div className={s.card}>
          <FaLeaf size={40} />
          <h3>Preservação Ambiental</h3>
          <p>Menor exploração de recursos naturais como água, árvores e minérios.</p>
        </div>
        <div className={s.card}>
          <FaIndustry size={40} />
          <h3>Economia de Energia</h3>
          <p>Materiais reciclados exigem menos energia na produção de novos itens.</p>
        </div>
        <div className={s.card}>
          <FaLightbulb size={40} />
          <h3>Consciência Coletiva</h3>
          <p>Educa e engaja a sociedade em práticas sustentáveis no dia a dia.</p>
        </div>
      </section>

      <section className={s.legislacao}>
        <h3>Base legal do nosso projeto</h3>
        <p>
          O <strong>ColetaLink</strong> é inspirado e alinhado com os princípios da <strong>Política Nacional de Resíduos Sólidos</strong> (Lei nº 12.305/2010), 
          que estabelece a responsabilidade compartilhada pelo ciclo de vida dos produtos e prioriza a <strong>não geração, redução, reutilização, reciclagem e tratamento dos resíduos sólidos</strong>.
        </p>
        <p>
          Essa legislação representa um marco importante para o Brasil ao reconhecer o papel dos catadores e fomentar práticas sustentáveis que envolvam toda a sociedade, do cidadão comum ao poder público.
        </p>
        <p>
          Ao conectar doadores a catadores por meio da tecnologia, o ColetaLink atua de forma prática e consciente dentro das diretrizes dessa lei, contribuindo para cidades mais limpas, humanas e responsáveis.
        </p>
      </section>

      <section className={s.chamada}>
        <p>
          <strong>Você faz parte dessa transformação!</strong> Separe, doe, recicle — e contribua com um mundo melhor. 🌱
        </p>
      </section>
    </main>
  );
}
