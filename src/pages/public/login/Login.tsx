import Wave from "../../../components/wave/Wave";
import styles from "./login.module.css";
import { useContext, useEffect, useState } from "react";
import { userFetch } from "../../../service/auth";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../../service/AuthContext";
import JwtDto from "../../../models/JwtDto";
import { Link } from "react-router-dom";
import { Alert } from "../../../components/alert/Alert";

const Login: React.FC = () => {
    
    //Trae funcion login de AuthContext
    const {logIn,userState} = useContext(AuthContext);
    const navigate = useNavigate()

    //Evita que vuelva al login cuando ya está autenticado
    useEffect(() => {
        if (userState.isLogin && userState.token != "") {
          navigate("/inicio");
        }
      }, [userState, navigate]);

    //Datos ingresados por el usuario
    const [user, setUser] = useState("");
    const [pass, setPass] = useState("");
    const [rememberPass , setRememberPass] = useState(false);

    //Modales
    const [showAlert, setShowAlert] = useState(false);
    const [showAlertServer, setShowAlertServer] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleCloseAlert = () => {
        setShowAlert(false);
        setShowAlertServer(false);
    };

    //Verificar que el token tenga una estructura válida
    const isValidToken =(resultFetch: JwtDto)=>{
        const tokenParts = resultFetch.token.split(".");
        if(tokenParts.length === 3){
            return true;
        }
        return false;
    }    
      
    // handleSubmit: Se activa cuando el usuario inicia sesion
    const handleSubmit = async(event: React.FormEvent)=>{
        event.preventDefault();
        setLoading(true);

        //Objeto para enviar los datos del usuario
        const formData = {
            username: user,
            password: pass
        }
        try{
            // Envia datos al servidor
            const userData = await userFetch(formData);

            if(isValidToken(userData)){          
                logIn(userData);
                navigate("/inicio"); 
            }else{
                setShowAlert(true);
            }
        }catch(e){
            setShowAlertServer(true);
        } finally {
            setLoading(false);
        }
    }
    return (
        <>
            <Wave pos1="absolute" pos2="absolute" pos3="absolute" />
            <section className={styles.login_container}>

            <div className={styles.card}>
                <div className={styles.card__details}>
                    <h1>
                        Consorcio Vecinal de Agua Potable <br /> "Santa Maria de Oro"
                    </h1>
                    <p>
                        El "Consorcio Vecinal de Agua Potable Santa María de Oro" ofrece
                        a sus usuarios acceso remoto a sus cuentas mediante un sistema de autenticación. 
                        <br /> <br />{" "}
                        <strong>
                            Para ingresar, debe introducir
                            su correo electrónico y contraseña. 
                        </strong>{" "}
                        <br /> <br /> 
                        Tras la verificación de los datos, podrá acceder a su perfil personal,
                        donde encontrará información sobre su consumo de agua y
                        podrá realizar trámites y gestiones relacionados con el servicio.
                    </p>
                </div>
                <Link to={"/info"} className={styles.card__link}>
                    {" "}
                    Más información
                </Link>
            </div>

                <div className={styles.wrapper}>
                    <form action="" onSubmit={handleSubmit}>
                        <h1>Bienvenido</h1>
                        <p className={styles.inicio}>Iniciar sesión</p>

                        <div className={styles.input_box}>
                            <input 
                                type="email" 
                                placeholder="Correo Electrónico" 
                                onChange={(e)=>setUser(e.target.value)}
                                required
                                disabled={loading}
                            />
                            <i className='bx bxs-user'></i>
                        </div>

                        <div className={styles.input_box}>
                            <input 
                                type="password" 
                                placeholder="Contraseña" 
                                onChange={(e)=>setPass(e.target.value)}
                                disabled={loading}
                                required
                            />
                            <i className='bx bxs-lock-alt'></i>
                        </div>

                        <div className={styles.remember_forgot}>
                            <label>
                            <input 
                                onChange={(e)=>setRememberPass(e.target.checked)}
                                type="checkbox"
                                disabled={loading}
                            />Recordar
                            </label>
                            <Link to="/passwordrecovery">¿Olvidaste la contraseña?</Link>
                        </div>

                        <button type="submit" className={styles.btn}  disabled={loading}>{loading ? "Cargando..." : "Ingresar"}</button>
                        <div className={styles.register_link}>
                            <p>¿No tienes cuenta? <a href="#">Contratar servicio</a></p>
                        </div>
                    </form>
                </div>
            </section>
            {showAlert && (
                <Alert
                    title="Revisa tus datos"
                    description="Tu correo o contraseña ingesados son incorrectos."
                    btn="Aceptar"
                    show={showAlert}
                    onClose={handleCloseAlert}
                ></Alert>
            )}    
            {showAlertServer && (
                <Alert
                    title="Ups!"
                    description="No se pudo inciar sesión. Intentalo más tarde"
                    btn="Aceptar"
                    show={showAlertServer}
                    onClose={handleCloseAlert}
                ></Alert>
            )}             
        </>
    )
}

export default Login;
