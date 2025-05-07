import s from './quemSomos.module.scss';

export default function QuemSomos() {
  return (
    <main className={s.quemSomos}>
      <section className={s.texto}>
        <h2>Quem Somos</h2>

        <p>
          O <strong>ColetaLink</strong> nasceu da inquietação diante do descarte irregular de resíduos e da
          necessidade de valorização do trabalho dos catadores. Criado a partir de um projeto integrador da
          UNIVESP, nosso objetivo é oferecer uma solução digital simples e acessível que una a tecnologia ao cuidado com o meio ambiente e à justiça social.
        </p>

        <p>
          A proposta surgiu a partir da realidade do CEU Leônidas da Silva, na Zona Norte de São Paulo, onde observamos
          acúmulo de entulho, móveis e eletrodomésticos abandonados nas vias públicas. Com base em pesquisa de campo, 
          entrevistas e análise de dados, construímos uma plataforma que <strong>conecta quem deseja descartar corretamente com quem vive da coleta</strong>, promovendo inclusão, renda e sustentabilidade.
        </p>

        <p>
          O ColetaLink é fruto de um esforço coletivo, com base em dados reais, compromisso social e visão de futuro.
          Mais do que um site, somos uma ponte: entre moradores e catadores, entre atitudes e transformação.
        </p>

        <p>
          Se hoje você está aqui lendo isso, é porque também acredita que <strong>cuidar do planeta começa com pequenas ações</strong>.
          A nossa parte está em facilitar o caminho. A sua, é se juntar a nós.
        </p>

        <p className={s.assinatura}>
          <em>Desenvolvido por alunos do Eixo de Computação da Universidade Virtual do Estado de São Paulo – Polo CEU Parque Novo Mundo.</em>
        </p>
      </section>
    </main>
  );
}
