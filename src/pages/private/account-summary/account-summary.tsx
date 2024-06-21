import { useEffect } from "react";
import Cover from "../../../components/cover/cover";
import Navbar from "../../../components/navbar/Navbar";
import Wave from "../../../components/wave/Wave";
import styles from "./account-summary.module.css";
import Footer from "../../../components/footer/Footer";
import { SEO } from "../../../components/seo/SEO";

const AccountSummary = () => {
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      for (const card of document.getElementsByClassName(styles.card)) {
        const rect = card.getBoundingClientRect(),
          x = e.clientX - rect.left,
          y = e.clientY - rect.top;

        (card as HTMLElement).style.setProperty("--mouse-x", `${x}px`);
        (card as HTMLElement).style.setProperty("--mouse-y", `${y}px`);
      }
    };

    const cardsContainer = document.getElementById("cards");
    if (cardsContainer) {
      cardsContainer.onmousemove = handleMouseMove;
    }

    return () => {
      if (cardsContainer) {
        cardsContainer.onmousemove = null;
      }
    };
  }, []);

  return (
    <>
      <SEO
        title="Resumen de cuenta | Consorcio de Agua Santa Maria de Oro"
        description="la pagina de Resumen de cuenta del consorcio de agua Santa Maria de Oro"
        name="Consorcio de Agua Santa Maria De Oro"
        type="article"
      />
      <Wave pos1="absolute" pos2="absolute" pos3="absolute" />
      <Navbar />
      <Cover
        title="Resumen de"
        highlight="cuenta"
        description="Te mostraremos el resumen de tu cuenta y te brindaremos datos y informacion para pagar tus deudas o tus facturas."
        linkTo="/faq"
        linkText="Preguntas Frecuentes"
        imageUrl="src/assets/img/undraw_data_re_80ws.svg"
        imageAlt="image Cover"
      />
      <div id="cards" className={styles.account}>
        <div className={`${styles.guardia} ${styles.card}`}>
          <h3>Servicio de Guardia</h3>
          <p>[numero de telefono]</p>
        </div>
        <div className={styles.card}>
          <div>
            <p>Nombre: [nombre/apellido]</p>
            <p>Dirección: [Direccion]</p>
            <p>Número de Cuenta: 123456789</p>
          </div>
          <h4>Informacion del cliente</h4>
        </div>
        <div className={styles.card}>
          <div>
            <p>Consumo del Mes: 15 metros cúbicos</p>
            <p>Tarifa: Tarifa A</p>
            <p>Fecha de Lectura del Medidor: 28/09/2023</p>
          </div>
          <h4>CONSUMO DE AGUA</h4>
        </div>
        <div className={styles.card}>
          <div>
            <p>- Cargos por Consumo: $30.00</p>
            <p>- Cargos Fijos: $10.00</p>
            <p>- Otros Cargos: $5.00</p>
          </div>
          <h4>DETALLES DE FACTURACIÓN</h4>
        </div>
        <div className={styles.card}>
          <div>
            <p>- Saldo Anterior: $20.00</p>
            <p>- Cargos Pendientes: $45.00</p>
            <p>- Pagos Anteriores: -$15.00</p>
            <p>- Deuda Total: $50.00</p>
          </div>
          <h4>DEUDA PENDIENTE</h4>
        </div>
        <div className={styles.card}>
          <div>
            <p>- Total Actual: $95.00</p>
            <p>- Fecha de Vencimiento: 15/10/2023</p>
          </div>
          <h4>TOTAL A PAGAR</h4>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default AccountSummary;
