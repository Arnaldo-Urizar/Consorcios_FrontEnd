import Cover from "../../../components/cover/cover";
import Footer from "../../../components/footer/Footer";
import Navbar from "../../../components/navbar/Navbar";
import { SEO } from "../../../components/seo/SEO";
import styles from "./faq.module.css";

const FaqPage = () => {
  return (
    <>
      <SEO
        title="Preguntas y Respuestas | Consorcio de Agua Santa Maria de Oro"
        description="la pagina de preguntas y respuestas del consorcio de agua Santa Maria de Oro"
        name="Consorcio de Agua Santa Maria De Oro"
        type="FAQ"
      />
      <Navbar />
      <Cover
        title="Preguntas "
        highlight="frecuentes"
        description="aca te mostraremos y responderemos a las preguntas mas comunes o que mas nos han realizado"
        linkTo="/home"
        linkText="Pagina principal"
        imageUrl="src/assets/img/undraw_data_re_80ws.svg"
        imageAlt="image Cover"
      />
      <div className={styles.accordion_container}>
        {Array.from({ length: 10 }).map((_, index) => (
          <div key={index} className={styles.accordion}>
            <details>
              <summary>Pregunta {index}</summary>
              <p>Respuesta "{index}"</p>
            </details>
          </div>
        ))}
      </div>
      <Footer />
    </>
  );
};

export default FaqPage;