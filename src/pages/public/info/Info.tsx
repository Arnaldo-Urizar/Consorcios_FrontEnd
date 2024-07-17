import { SEO } from "../../../components/seo/SEO";
import styles from "./info.module.css";
import { Link } from "react-router-dom";

function Info() {
  return (
    <>
      <SEO
        title="Informacion | Consorcio de Agua Santa Maria de Oro"
        description="la pagina de Informacion del consorcio de agua santa maria de oro"
        name="Consorcio de Agua Santa Maria De Oro"
        type="article"
      />
      {/* <div className={styles.title}>
        <h2>
          Consorcio Vecinal <br /> Santa Maria de Oro
        </h2>
      </div>    */}
      <div className={styles.container}>
        <main className={styles.content}>
          <h3>Consorcio Vecinal de Agua Potable Santa Maria de Oro</h3>
          <br />
          <p>
            Bienvenido al Consorcio Vecinal de Agua Potable Santa Maria de Oro,
            donde nos enorgullecemos de brindar a nuestros clientes un servicio
            de agua potable confiable y de alta calidad. Estamos comprometidos a
            mejorar continuamente su experiencia de cliente y ofrecemos varias
            funcionalidades para facilitar el acceso y la gestión de su servicio
            de agua potable.
          </p>
          <br />
          <h4>Acceso a Cuentas Remotas</h4>
          <br />
          <p>
            Nuestro sistema de autenticación basado en el número de cuenta
            asignado a cada usuario permite a nuestros clientes acceder a sus
            cuentas de forma remota en cualquier momento y desde cualquier
            lugar. Para acceder a su cuenta, simplemente introduzca su número de
            cuenta en el campo correspondiente y verifique su identidad.
          </p>
          <br />
          <h4>Información de Consumo de Agua Potable</h4>
          <br />
          <p>
            Una vez que haya iniciado sesión, podrá acceder a su perfil personal
            y obtener información relevante sobre su consumo de agua potable.
            Esto incluye gráficos fáciles de entender que muestran su consumo de
            agua en diferentes períodos de tiempo, lo que le permite identificar
            fácilmente cualquier aumento o disminución en su consumo.
          </p>
          <br />
          <h4>Trámites y Gestiones en Línea</h4>
          <br />
          <p>
            Además de obtener información sobre su consumo de agua, también
            podrá realizar diversos trámites y gestiones relacionados con su
            servicio de agua potable a través de nuestra plataforma en línea.
            Esto incluye la posibilidad de pagar sus facturas en línea, lo que
            le permite ahorrar tiempo y evitar filas en las oficinas del
            consorcio.
          </p>
          <br />
          <h4>Seguimiento de Pagos</h4>
          <br />
          <p>
            Nuestra plataforma en línea también le permite llevar un seguimiento
            más fácil de lo que ha pagado por el agua en los últimos tiempos.
            Puede ver fácilmente sus facturas anteriores y verificar el estado
            de sus pagos, lo que le ayuda a mantenerse al día con sus
            obligaciones financieras.
          </p>

          <br />
          <br />
          <p>
            Si tiene alguna pregunta o comentario, no dude en ponerse en
            contacto con nosotros. Estamos aquí para ayudarlo.
          </p>
          {/* <button className={styles.btn}>Volver</button> */}
          <Link to={"/"} className={styles.btn}>Regresar</Link>
        </main>
      </div>
    </>
  );
}

export default Info;
