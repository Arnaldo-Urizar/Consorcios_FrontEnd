import Wave from "../../../components/wave/Wave";
import "./login.css"
import styles from "./login.module.css";

import { useContext, useState } from "react";
import { userFetch } from "../../../service/auth";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../../service/AuthContext";
import JwtDto from "../../../models/JwtDto";

import { Link } from "react-router-dom";
const Login: React.FC = () => {
    
    //Trae funcion login de AuthContext
    const {logIn} = useContext(AuthContext);
    const navigate = useNavigate()

    //Datos ingresados por el usuario
    const [user, setUser] = useState("");
    const [pass, setPass] = useState("");
    const [rememberPass , setRememberPass] = useState(false);


    // Verificar que el token tenga una estructura válida
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
                alert("No se pudo iniciar sesion, revisa los datos")
            }
        }catch(e){
            alert("No se pudo obtener una respuesta")
        }
    }
    //Estructura Login
    return (
        <>
            <Wave pos1="absolute" pos2="absolute" pos3="absolute" />
            <section className="login-container">

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


                <div className="wrapper">
                    <form action="" onSubmit={handleSubmit}>
                        <h1>Bienvenido</h1>
                        <p className="inicio">Iniciar sesión</p>

                        <div className="input-box">
                            <input 
                                type="text" 
                                placeholder="Nombre de Usuario" 
                                onChange={(e)=>setUser(e.target.value)}
                                required
                            />
                            <i className='bx bxs-user'></i>
                        </div>

                        <div className="input-box">
                            <input 
                                type="password" 
                                placeholder="Contraseña" 
                                onChange={(e)=>setPass(e.target.value)}
                                required
                            />
                            <i className='bx bxs-lock-alt'></i>
                        </div>

                        <div className="remember-forgot">
                            <label>
                            <input 
                                onChange={(e)=>setRememberPass(e.target.checked)}
                                type="checkbox"
                            />Recordar
                            </label>
                            <Link to="/Passwordrecovery">¿Olvidaste la contraseña?</Link>
                        </div>

                        <button type="submit" className="btn">Iniciar</button>
                        <div className="register-link">
                            <p>¿No tienes cuenta? <a href="#">Contratar servicio</a></p>
                        </div>
                    </form>
                </div>
            </section>
        </>
    )
}

export default Login;
