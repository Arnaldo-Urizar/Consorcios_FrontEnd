import { useContext } from "react";
import Cover from "../../../components/cover/cover";
import { SEO } from "../../../components/seo/SEO";
import styles from "./faq.module.css";
import { AuthContext } from "../../../service/AuthContext";

import { data } from "../../private/account-summary/faq-data-provisory";


const FaqPage = () => {

  const {userState} = useContext(AuthContext)
  return (
    <>
      <SEO
        title="Preguntas y Respuestas | Consorcio de Agua Santa Maria de Oro"
        description="la pagina de preguntas y respuestas del consorcio de agua Santa Maria de Oro"
        name="Consorcio de Agua Santa Maria De Oro"
        type="FAQ"
      />
      <Cover
        title="Preguntas "
        highlight="frecuentes"
        description="aca te mostraremos y responderemos a las preguntas mas comunes o que mas nos han realizado"
        linkTo={userState.isLogin ? "/inicio" : "/"}
        linkText="Pagina principal"
        imageUrl="src/assets/img/undraw_data_re_80ws.svg"
        imageAlt="image Cover"
      />
      {/* <div className={styles.accordion_container}>
        {Array.from({ length: 10 }).map((_, index) => (
          <div key={index} className={styles.accordion}>
            <details>
              <summary>Pregunta {index}</summary>
              <p>Respuesta "{index}"</p>
            </details>
          </div>
        ))}
      </div> */}
      <div className={styles.accordion_container}>
        {data.map((value, index) => (
          <div key={index} className={styles.accordion}>
            <details>
              <summary>{value.question}</summary>
              <p>{value.response}</p>
            </details>
          </div>
        ))}
      </div>      
    </>
  );
};

export default FaqPage;
