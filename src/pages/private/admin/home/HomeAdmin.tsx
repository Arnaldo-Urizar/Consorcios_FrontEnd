import { SEO } from "../../../../components/seo/SEO";
import styles from "../../user/home/home.module.css";

import { PiUserListFill } from "react-icons/pi";
import { FaMoneyCheck } from "react-icons/fa";
import { FiUpload } from "react-icons/fi";
import { Link } from "react-router-dom";
import { IoReceiptSharp } from "react-icons/io5";

export default function HomeAdmin() {
  // los iconos se sacan de la siguieente url "https://react-icons.github.io/react-icons/"
  // si quieres agregar otro link solamente crea un nuevo objeto con title, icon y link
  const menu = [
    {
      title: "Usuarios",
      icon: <PiUserListFill />,
      link: "/usuarios",
    },
    {
      title: "Cargar Lecturas",
      icon: <FiUpload />,
      link: "/",
    },
    {
      title: "Generar Facturas",
      icon: <IoReceiptSharp />,
      link: "/",
    },
    {
      title: "Registro de Pagos",
      icon: <FaMoneyCheck />,
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
