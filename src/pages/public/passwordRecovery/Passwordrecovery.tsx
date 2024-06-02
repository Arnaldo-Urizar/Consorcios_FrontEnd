import React, { useState } from "react";
import { Link } from "react-router-dom";
import Wave from "../../../components/wave/Wave";
import styles from "../login/login.module.css"
import { Alert } from "../../../components/alert/Alert";

const Passwordrecovery: React.FC = () => {
    const [email, setEmail] = useState("");
    const [showConfirmation, setShowConfirmation] = useState(false);

    //Alertas(modal)
    const [showAlert, setShowAlert] = useState(false);
    const [showAlertServer, setShowAlertServer] = useState(false);
    const [loading, setLoading] = useState(false);

    //cierra modal
    const handleCloseAlert = () => {
        setShowConfirmation(false);
        setShowAlert(false)
        setShowAlertServer(false)
    };

    const formData = {
        email
    };

    const handleSubmit = async(event: React.FormEvent) => {
        event.preventDefault();
        setLoading(true);

        try{
            const response = await fetch("http://localhost:8080/auth/forgot",{  
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(formData)
            });

            if(response.ok){
                const data = await response.json();
                if(data.message ===  "Correo electrónico de restablecimiento de contraseña enviado"){
                    setShowConfirmation(true)
                }else{
                    setShowAlert(true)
                }
            }else{
                throw new Error(`Error response fetch: ${response.status}`);
            }
        }catch(e){
            setShowAlertServer(true)
            throw new Error(`Fetch failed: ${e}`);

        } finally {
            setLoading(false);
        }
    }
    return (
        <>
            <Wave pos1="absolute" pos2="absolute" pos3="absolute" />
            <div className={styles.login_container}>
                <div className={styles.card}>
                    <div className={styles.card__details}>
                        <h1>
                            Consorcio Vecinal de Agua Potable <br /> "Santa Maria de Oro"
                        </h1>
                        <p>
                            <strong>
                                Por favor, introduce tu correo electrónico registrado en el Consorcio.
                            </strong>{" "}
                            <br /> <br /> Recibirás un correo electrónico con instrucciones para cambiar tu contraseña. <br /> <br />{" "}
                            <strong>
                                ¿Recordaste tu contraseña?
                            </strong>{" "}
                            <br /> <br /> Si recordaste tu contraseña vuelve al apartado de "Iniciar sesión"
                        </p>
                    </div>
                    <Link to={"/"} className={styles.card__link}>
                        {" "}
                        Volver al Inicio de sesión
                    </Link>
                </div>

                <div className={styles.wrapper}>
                    <h1 className={styles.inicio}>Olvidé mi Contraseña</h1>
                    <form onSubmit={handleSubmit}>
                        <div className={styles.input_box}>
                            <input
                                type="email"
                                placeholder="Correo electrónico"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                disabled={loading}
                            />
                            <i className='bx bx-mail-send'></i>
                        </div>
                        <button type="submit" className={styles.btn} disabled={loading}>{loading ? "Cargando..." : "Cambiar Contraseña"}</button>
                    </form>
                </div>
            </div>
            {showConfirmation && (
                <Alert
                    title="¡Correo Enviado!"
                    description="Revisa tu correo electrónico para establecer una nueva contraseña."
                    btn="Aceptar"
                    show={showConfirmation}
                    onClose={handleCloseAlert}
                ></Alert>
            )}
            {showAlert && (
                <Alert
                    title="Ups!"
                    description="No se pudo completar la acción. Revisa que los datos ingresados sean correctos."
                    btn="Aceptar"
                    show={showAlert}
                    onClose={handleCloseAlert}
                ></Alert>
            )}   
            {showAlertServer && (
                <Alert
                    title="Ups!"
                    description="No se pudo completar la acción. Intentalo más tarde."
                    btn="Aceptar"
                    show={showAlertServer}
                    onClose={handleCloseAlert}
                ></Alert>
            )}              

        </>
    );
};

export default Passwordrecovery;
