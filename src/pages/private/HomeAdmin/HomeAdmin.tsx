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
  // los iconos se sacan de la siguieente url "https://react-icons.github.io/react-icons/"
  // si quieres agregar otro link solamente crea un nuevo objeto con title, icon y link
  const menu = [
    {
      title: "Consumo",
      icon: <HiChartPie />,
      link: "/",
    },
    {
      title: "?????",
      icon: <HiMiniPresentationChartLine />,
      link: "/",
    },
    {
      title: "?????",
      icon: <HiMiniChatBubbleLeftEllipsis />,
      link: "/",
    },
    {
      title: "??????????",
      icon: <HiMiniChartBar />,
      link: "/",
    },
    {
      title: "?????",
      icon: <HiMiniChartBar />,
      link: "/",
    },
    {
      title: "?????",
      icon: <HiMiniChartBar />,
      link: "/",
    },
    {
      title: "?????",
      icon: <HiMiniChartBar />,
      link: "/",
    },
    {
      title: "?????",
      icon: <HiMiniChartBar />,
      link: "/",
    },
  ];
  return (
    <>
      <SEO
        title="Inicio | Consorcio de Agua Santa Maria de Oro"
        description="la pagina de inicio del consorcio de agua santa maria de oro"
        name="Consorcio de Agua Santa Maria De Oro"
        type="Index"
      />
      <div className={styles.content}>
        <section className={styles.menu}>
          {menu.map((item) => (
            <Link key={item.title} to={item.link} className={styles.menu_item}>
              <div className={styles.icon}>{item.icon}</div>
              <div className={styles.menu_title}>
                <h4>{item.title}</h4>
              </div>
            </Link>
          ))}
        </section>
      </div>
    </>
  );
}
