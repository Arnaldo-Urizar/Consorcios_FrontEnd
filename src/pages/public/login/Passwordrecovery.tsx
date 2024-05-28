import React, { useState } from "react";
import { Link } from "react-router-dom";
import Wave from "../../../components/wave/Wave";
import "./login.css";
import styles from "./login.module.css";

const Passwordrecovery: React.FC = () => {
    const [email, setEmail] = useState("");
    const [showConfirmation, setShowConfirmation] = useState(false);

    const formData = {
        email
    }

    const handleSubmit = async(event: React.FormEvent) => {
        event.preventDefault();

        try{
            const response = await fetch("http://localhost:8080/auth/forgot",{  
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(formData)
            })

            // AGREGAR CARGANDO...
            if(response.ok){
                const data = await response.json();
                console.log("se recibió del fetch: ", data.message)
                if(data.message ===  "Correo electrónico de restablecimiento de contraseña enviado"){
                    setShowConfirmation(true)
                }else{
                    console.log("No se pudo confirmar el correo")
                    return null;
                }
            }else{
                console.log("no se pudo obtener los datos del sevidor")
                return null;
            }
        }catch(e){
            console.error("No se pudo obtener los datos del servidor" + e);
            return null;
        }
    }
        // Aca se tendria que implementar la lógica para enviar un correo electrónico de recuperación de contraseña

        /* fetch para enviar correo al back */ 
        // devuelve un mensaje
        // 
        // cerrar vista olvide mi contraeña(ingrse correro) --> devuelve --> "message": "Correo electrónico de restablecimiento de contraseña enviado"

        // revisa gmail --> changeCode/token
        
        // capturar token y nueva contraseña

    return (
        <>
            <Wave pos1="absolute" pos2="absolute" pos3="absolute" />
            <div className="login-container">
                <div className={styles.card}>
                    <div className={styles.card__details}>
                        <h1>
                            Consorcio Vecinal de Agua Potable <br /> "Santa Maria de Oro"
                        </h1>
                        <p>
                            <strong>
                                Se le solicita que coloque su correo electrónico que se le a brindado al Consorsio.
                            </strong>{" "}

                            <br /> <br /> Recibirás un correo electrónico con instrucciones para cambiar su contraseña. <br /> <br />{" "}

                            <strong>
                                ¿Recordaste tu contraseña?
                            </strong>{" "}
                            <br /> <br /> Si lograste recordar tu contraseña vuelve al apartado de "Inicar sesion"

                        </p>
                    </div>
                    <Link to={"/"} className={styles.card__link}>
                        {" "}
                        Volver al Inicar sesion
                    </Link>
                </div>

                <div className="wrapper">
                    <h1 className="inicio">Olvidé mi Contraseña</h1>
                    <form onSubmit={handleSubmit}>
                        <div className="input-box">
                            <input
                                type="email"
                                placeholder="Correo electrónico"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                            <i className='bx bx-mail-send'></i>
                        </div>
                        <button type="submit" className="btn">Cambiar Contraseña</button>
                    </form>

                    {showConfirmation && (
                        <div className={styles.confirmationCard}>
                            <p>Revise su correo electrónico para establecer una nueva contraseña.</p>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
};

export default Passwordrecovery;
