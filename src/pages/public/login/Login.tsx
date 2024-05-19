import Wave from "../../../components/wave/Wave";
import "./login.css"

import { useContext, useState } from "react";
import { userFetch } from "../../../service/auth";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../../service/AuthContext";


const Login: React.FC = () => {
    
    //Trae funcion login de AuthContext
    const {logIn} = useContext(AuthContext);

    const navigate = useNavigate()

    //Datos ingresados por el usuario
    const [user, setUser] = useState("")
    const [pass, setPass] = useState("")
    const [rememberPass , setRememberPass] = useState(false)
    // console.log(user), console.log(pass), console.log(rememberPass);

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
            console.log(userData)

            //Verifica que esté logeado y que el token no esté vacio
            if (userData.isLogin && userData.token.length != 0 ) {
                //Llama a la funcion login y navega para activar "ProtectedRoutes";
                logIn(userData);
                navigate("/inicio");
            }else{
                alert("No se pudo iniciar sesion, revisa los datos")
                console.log("no se pudo ingresar: " + userData), console.log(userData);
            }
        }catch(e){
            alert("Error verficar los datos")
            console.log("Error al m anejar el Login: " + e);
        }
    }
    //Estructura Login
    return (
        <>
            <Wave pos1="absolute" pos2="absolute" pos3="absolute" />
            <section className="login-container">
                <div className="wrapper">
                    <form action="" onSubmit={handleSubmit}>
                        <h1>Bienvenido</h1>
                        <p className="inicio">Iniciar sesión</p>

                        <div className="input-box">
                            <input 
                                type="text" 
                                placeholder="DNI/CUIT" 
                                onChange={(e)=>setUser(e.target.value)}
                                required
                            />
                            <i className='bx bxs-user'></i>
                        </div>

                        <div className="input-box">
                            <input 
                                type="password" 
                                placeholder="Código" 
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
                            <a href="#">¿Olvidaste el Código?</a>
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