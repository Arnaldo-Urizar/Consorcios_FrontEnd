import {
  FaFacebookSquare,
  FaWhatsappSquare,
  FaInstagramSquare,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import styles from "./footer.module.css";

function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.container__footer}>
        <div className={styles.box__footer}>
          <div className={styles.logo}>
            <img src="src/assets/img/water_drop_sky.svg" alt="logo" />
          </div>
          <div className={styles.terms}>
            Cada gota refleja nuestro firme compromiso con la comunidad, como un
            pilar en esta tierra donde la excelencia es nuestra corriente
            constante.
          </div>
        </div>

        <div className={styles.box__footer}>
          <h2>Dirección</h2>
          <Link to="#">Provincia: Mendoza</Link>
          <Link to="#">Departamento: Rivadavia</Link>
          <Link to="#">Distrito: Santa María de Oro</Link>
          <Link
            to="https://www.google.com/maps/place/CLUB+SANTA+MARIA/@-33.207028,-68.4245363,321m/data=!3m1!1e3!4m6!3m5!1s0x967e59fc88ce3c3f:0xb1ff918bf093f8fe!8m2!3d-33.207201!4d-68.423545!16s%2Fg%2F11jsw09_j1?entry=ttu"
            target="_blank"
          >
            Calle: Villanueva | Ver Ubicacion
          </Link>
        </div>

        <div className={styles.box__footer}>
          <h2>Compañia</h2>
          <Link to="#">Acerca de</Link>
          <Link to="#">Trabajos</Link>
          <Link to="/faq">Preguntas frecuentes</Link>
          <Link to="#">Servicios</Link>
        </div>

        <div className={styles.box__footer}>
          <h2>Redes Sociales</h2>
          <Link
            to="https://www.facebook.com/people/Consorcio-de-agua-potable-Santa-Maria-de-Oro/100058813477291/"
            target="_blank"
          >
            <FaFacebookSquare /> Facebook
          </Link>
          <Link to="#">
            <FaWhatsappSquare /> Whatsapp
          </Link>
          <Link to="#">
            <FaInstagramSquare />
            Instagram
          </Link>
        </div>
      </div>

      <div className={styles.box__copyright}>
        <hr />
        <p>
          Todos los derechos reservados © 2023 <b>LucraCompany</b>
        </p>
      </div>
    </footer>
  );
}

export default Footer;
