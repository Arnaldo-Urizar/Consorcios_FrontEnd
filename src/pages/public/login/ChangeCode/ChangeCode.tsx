import Wave from "../../../../components/wave/Wave";
import "./changeCode.css";
import styles from "./changeCode.module.css";

import { useEffect, useState } from "react";
import { useLocation, useNavigate} from "react-router-dom";



const ChangeCode: React.FC = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const [newCode, setNewCode] = useState("");
    const [confirmCode, setConfirmCode] = useState("");
    const [codeChanged, setCodeChanged] = useState(false);

    const [tokenRestorePass, setTokenRestorePass] = useState('');

    useEffect(() => {
        const searchParams = new URLSearchParams(location.search);
        const param = searchParams.get('token');
        console.log("parametro:" , param)
        if (param) {
            setTokenRestorePass(param);
        }
    }, [location.search]);   

    const handleChangeCodeSubmit = async(event: React.FormEvent) => {
        event.preventDefault();
        if (newCode !== confirmCode) {
            alert("La contraseña no coinciden");
            return;
        }else{
            const formData = {
                token: tokenRestorePass,
                newPassword: newCode
            }   
            console.log(formData)
            console.log(formData.token, formData.newPassword)
         
            try{
                const response = await fetch("http://localhost:8080/auth/reset",{  
                    method: "POST",
                    headers: {"Content-Type": "application/json"},
                    body: JSON.stringify(formData)
                })
    
                if(response.ok){
                    const data = await response.json();
                    console.log("datos de repsonse ChangeCode",data)
                    setCodeChanged(true);
                    navigate("/")
                }else{
                    console.log("respuesta fallida")
                    console.log(response)

                    return null;
                }
                
            }catch(e){
                console.error("No se pudo obtener los datos del servidor: " + e);
                console.log(e)
                return null;
            }
        }
    };

    return (
        <>
            <Wave pos1="absolute" pos2="absolute" pos3="absolute" />
            <section className="change-code-container">
                <div className={styles.card}>
                    <div className={styles.card__details}>
                        <h1>Cambiar Contraseña</h1>
                        <strong>
                            Se le solicita que coloque su nueva contraseña
                        </strong>{" "}
                    </div>
                </div>
                <div className="wrapper">
                    {!codeChanged ? (
                        <form onSubmit={handleChangeCodeSubmit}>
                            <h1>Ingresar Nueva Contraseña</h1>
                            <div className="input-box">
                                <input
                                    type="password"
                                    placeholder="Nueva Contraseña"
                                    onChange={(e) => setNewCode(e.target.value)}
                                    required
                                />
                                <i className='bx bxs-lock-alt'></i>
                            </div>
                            <div className="input-box">
                                <input
                                    type="password"
                                    placeholder="Confirmar Nueva Contraseña"
                                    onChange={(e) => setConfirmCode(e.target.value)}
                                    required
                                />
                                <i className='bx bxs-lock-alt'></i>
                            </div>
                            <button type="submit" className="btn">Cambiar Código</button>
                        </form>
                    ) : (
                        <div className={`confirmation-card ${styles.codeConfirmation}`}>
                            <p>Su contraseña ha sido cambiada exitosamente.</p>
                            <button className="btn" onClick={() => navigate("/")}>Volver a Iniciar Sesión</button>
                        </div>
                    )}
                </div>
            </section>
        </>
    );
};

export default ChangeCode;
