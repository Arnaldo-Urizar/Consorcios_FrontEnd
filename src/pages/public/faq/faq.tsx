import Cover from "../../../components/cover/cover";
import Footer from "../../../components/footer/Footer";
import Navbar from "../../../components/navbar/Navbar";
import Wave from "../../../components/wave/Wave";
import styles from "./faq.module.css";

const FaqPage = () => {
  return (
    <>
      <Wave pos1="absolute" pos2="absolute" pos3="absolute" />
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
