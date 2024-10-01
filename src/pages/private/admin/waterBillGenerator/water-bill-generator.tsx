import { SEO } from "../../../../components/seo/SEO";
import styles from "./waterbill.module.css";

function WaterBillGenerator() {
  return (
    <>
      <SEO
        title="Generador de facturas de agua | Consorcio de Agua Santa Maria de Oro"
        description="la pagina de inicio del consorcio de agua Santa Maria de Oro"
        name="Consorcio de Agua Santa Maria De Oro"
        type="Index"
      />
      <div className={styles.container}>
        <div className={styles.form}>
          <h1>Generador de factura de agua</h1>
          <div className={styles.form_group}>
            <div className={styles.form_clientName}>
              <label htmlFor="clientName">Nombre del cliente</label>
              <input
                type="text"
                id="clientName"
                // onChange={(e) => setClientName(e.target.value)}
                // value={clientName}
                placeholder="Ingrese el nombre del cliente"
              />
            </div>
            <div className={styles.form_clientEmail}>
              <label htmlFor="clientEmail">
                Correo Electrónico del Cliente
              </label>
              <input
                id="clientEmail"
                type="email"
                // value={clientEmail}
                // onChange={(e) => setClientEmail(e.target.value)}
                placeholder="correo@ejemplo.com"
              />
            </div>
            <div className={styles.form_billDate}>
              <label htmlFor="billDate">Fecha de Factura</label>
              <input
                id="billDate"
                type="date"
                // value={billDate}
                // onChange={(e) => setBillDate(e.target.value)}
              />
            </div>
            <div className={styles.form_previousReading}>
              <label htmlFor="previousReading">Lectura Anterior (m³)</label>
              <input
                id="previousReading"
                type="number"
                // value={consumption.previousReading}
                // onChange={(e) => setConsumption({...consumption, previousReading: Number(e.target.value)})}
              />
            </div>
            <div className={styles.form_currentReading}>
              <label htmlFor="currentReading">Lectura Actual (m³)</label>
              <input
                id="currentReading"
                type="number"
                // value={consumption.currentReading}
                // onChange={(e) => setConsumption({...consumption, currentReading: Number(e.target.value)})}
              />
            </div>
          </div>
        </div>

        <div className={styles.factura__table}>
          <h2>Resumen Factura del agua</h2>
          <div className={styles.factura__info}>
            <p>
              <strong>Cliente:</strong> {/*  {clientName} */}
            </p>
            <p>
              <strong>Correo Electrónico:</strong> {/*  {clientEmail} */}
            </p>
            <p>
              <strong>Fecha:</strong> {/* {billDate} */}
            </p>
          </div>
          <table>
            <thead>
              <tr>
                <th>Descripción</th>
                <th>Cantidad (m³)</th>
                <th>Precio por m³</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Consumo de Agua</td>
                <td> 0 {/* {calculateConsumption()}*/} </td>
                <td> $2.50 {/* {consumption.rate.toFixed(2)} */}</td>
                <td>$0.00 {/* {calculateTotal().toFixed(2)} */}</td>
              </tr>
            </tbody>
          </table>
          <div className={styles.factura__total}>
            <p>
              <strong>
                Total a Pagar: $0.00{" "}
                {/* {calculateTotal().toFixed(2)}</strong>*/}{" "}
              </strong>{" "}
            </p>
          </div>
          <div className={styles.factura__buttons}>
            <button
            // onClick={saveToDB}
            >
              Guardar en BD
            </button>
            <button
            // onClick={generatePDF}
            >
              Generar PDF
            </button>
            <button
            // onClick={sendEmail}
            >
              Enviar por Correo
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default WaterBillGenerator;
