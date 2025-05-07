import s from './footer.module.scss'
import iconeFacebook from '../../assets/iconeFacebook.png'
import iconeTwitter from '../../assets/iconeTwitter.png'
import iconeYyoutube from '../../assets/iconeYoutube.png'
import iconeLinkedin from '../../assets/iconeLinkedin.png'
import iconeInstagram from '../../assets/iconeInstagram.png'

export default function Footer(){
    return(
        <footer className={s.footer}>
            <section className={s.contatosFooter}>
                
                <nav>
                    <a href=""><img src={iconeFacebook} alt="Imagem branca da ícone do Facebook" /></a>
                    <a href=""><img src={iconeTwitter} alt="Imagem branca da ícone do Twitter" /></a>
                    <a href=""><img src={iconeYyoutube} alt="Imagem branca da ícone do YouTube" /></a>
                    <a href=""><img src={iconeLinkedin} alt="Imagem branca da ícone do Linkedin" /></a>
                    <a href=""><img src={iconeInstagram} alt="Imagem branca da ícone do Instagram" /></a>
                </nav>
            </section>
            <section className={s.copyright}>
                <p> © ColetaLink 2025 - Todos os direitos reservados</p>
            </section>
        </footer>
    )
}