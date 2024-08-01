import { useContext, useEffect } from "react";
import Cover from "../../../components/cover/cover";
import styles from "./account-summary.module.css";
import { SEO } from "../../../components/seo/SEO";
import {
  BarChart,
  Bar,
  Rectangle,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";
import { Link } from "react-router-dom";
import { AuthContext } from "../../../service/AuthContext";

const AccountSummary = () => {

  const {userState} = useContext(AuthContext);
  const {name} = userState;

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

  const data = [
    {
      name: "Page A",
      uv: 4000,
      pv: 2400,
      amt: 2400,
    },
    {
      name: "Page B",
      uv: 3000,
      pv: 1398,
      amt: 2210,
    },
    {
      name: "Page C",
      uv: 2000,
      pv: 9800,
      amt: 2290,
    },
    {
      name: "Page D",
      uv: 2780,
      pv: 3908,
      amt: 2000,
    },
    {
      name: "Page E",
      uv: 1890,
      pv: 4800,
      amt: 2181,
    },
    {
      name: "Page F",
      uv: 2390,
      pv: 3800,
      amt: 2500,
    },
    {
      name: "Page G",
      uv: 3490,
      pv: 4300,
      amt: 2100,
    },
  ];

  return (
    <>
      <SEO
        title="Resumen de cuenta | Consorcio de Agua Santa Maria de Oro"
        description="la pagina de Resumen de cuenta del consorcio de agua Santa Maria de Oro"
        name="Consorcio de Agua Santa Maria De Oro"
        type="article"
      />
      {/* <Wave pos1="absolute" pos2="absolute" pos3="absolute" /> */}

      <Cover
        title="Resumen de"
        highlight="cuenta"
        description="Aquí podrás ver el resumen de tu cuenta y obtener información para pagar tus deudas y facturas."
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
            <p>Nombre: {name.firstName} {name.lastName}</p>
            <p>Dirección: [Direccion]</p>
            <p>Número de Cuenta: 123456789</p>
          </div>
          <h4>Información del cliente</h4>
        </div>
        <Link to={"/consumo"} className={`${styles.card} ${styles.consumo}`}>
          <div>
            <p>Consumo del Mes: 15 metros cúbicos</p>
            <p>Tarifa: Tarifa A</p>
            <p>Fecha de Lectura del Medidor: 28/09/2023</p>
          </div>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              width={150}
              height={50}
              data={data}
              margin={{
                top: 40,
                right: 10,
                left: 10,
                bottom: 25,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              {/* <XAxis dataKey="name" stroke="#fff" />
              <YAxis stroke="#fff" />
              <Tooltip />
              <Legend />
              */}
              <Bar
                dataKey="pv"
                fill="#fff"
                activeBar={<Rectangle fill="red" stroke="white" />}
              />
              <Bar
                dataKey="uv"
                fill="#82ca9d"
                activeBar={<Rectangle fill="red" stroke="white" />}
              />
            </BarChart>
          </ResponsiveContainer>
          <h4>CONSUMO DE AGUA</h4>
        </Link>
        <div className={styles.card}>
          <div>
            <p>- Cargos por Consumo: $30.00</p>
            <p>- Cargos Fijos: $10.00</p>
            <p>- Otros Cargos: $5.00</p>
          </div>
          <h4>DETALLES FACTURACIÓN</h4>
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
    </>
  );
};

export default AccountSummary;
