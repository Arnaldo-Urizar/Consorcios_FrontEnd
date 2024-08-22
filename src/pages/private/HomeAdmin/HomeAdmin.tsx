import { SEO } from "../../../components/seo/SEO";
import styles from "./homeadmin.module.css";
import {
  HiChartPie,
  HiMiniChartBar,
  HiMiniChatBubbleLeftEllipsis,
  HiMiniPresentationChartLine,
} from "react-icons/hi2";

import { Link } from "react-router-dom";

export default function HomeAdmin() {
  return (
    <>
      <SEO
        title="Inicio | Consorcio de Agua Santa Maria de Oro"
        description="la pagina de inicio del consorcio de agua santa maria de oro"
        name="Consorcio de Agua Santa Maria De Oro"
        type="Index"
      />
      <div className={styles.content}>
        {/* <h2>
            Bienvenido {`${user?.firstName}  ${user?.lastName}`}. Estamos aquí para ofrecerte una experiencia de calidad.
          </h2> */}
        <section className={styles.menu}>
          <Link to={"/consumo"} className={styles.menu_item}>
            <div className={styles.icon}>
              <HiMiniChartBar />
            </div>
            <div className={styles.menu_title}>
              <h4>Consumo</h4>
            </div>
          </Link>
          <Link to={"/facturas"} className={styles.menu_item}>
            <div className={styles.icon}>
              <HiMiniPresentationChartLine />
            </div>
            <div className={styles.menu_title}>
              <h4>Facturas</h4>
            </div>
          </Link>{" "}
          <Link to={"/resumen"} className={styles.menu_item}>
            <div className={styles.icon}>
              <HiChartPie />
            </div>
            <div className={styles.menu_title}>
              <h4>Resumen</h4>
            </div>
          </Link>{" "}
          <Link to={"/notifications"} className={styles.menu_item}>
            <div className={styles.icon}>
              <HiMiniChatBubbleLeftEllipsis />
            </div>
            <div className={styles.menu_title}>
              <h4>Notificaciones</h4>
            </div>
          </Link>
        </section>
      </div>
    </>
  );
}
