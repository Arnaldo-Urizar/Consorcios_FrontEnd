import Wave from "../../../components/wave/Wave";
import "./login.css";
import styles from "./login.module.css";

import { useContext, useState } from "react";
import { userFetch } from "../../../service/auth";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../../service/AuthContext";
import JwtDto from "../../../models/JwtDto";

const Login: React.FC = () => {
    const { logIn } = useContext(AuthContext);
    const navigate = useNavigate();

    const [user, setUser] = useState("");
    const [pass, setPass] = useState("");
    const [rememberPass, setRememberPass] = useState(false);
    const [showRecovery, setShowRecovery] = useState(false);
    const [email, setEmail] = useState("");
    const [emailSent, setEmailSent] = useState(false); // State to track if email is sent

    const isValidToken = (resultFetch: JwtDto) => {
        const tokenParts = resultFetch.token.split(".");
        return tokenParts.length === 3;
    };

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();

        const formData = {
            username: user,
            password: pass,
        };
        try {
            const userData = await userFetch(formData);
            console.log(userData);
            if (isValidToken(userData)) {
                logIn(userData);
                navigate("/inicio");
            } else {
                alert("No se pudo iniciar sesion, revisa los datos");
            }
        } catch (e) {
            alert("No se pudo obtener una respuesta");
        }
    };

    const handleEmailSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        // Aca iría la lógica para enviar el correo electrónico
        setEmailSent(true);
    };

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
                            El "Consorcio Vecinal de Agua Potable Santa Maria de Oro" brinda a sus clientes la posibilidad de acceder a sus cuentas de forma remota, a través de un sistema de autenticación. <br /> <br />{" "}
                            <strong>Para acceder a su cuenta, el cliente debe introducir su correo electrónico y contraseña en el campo correspondiente.</strong>{" "}
                            <br /> <br /> Una vez que se han verificado correctamente los datos, el usuario podrá acceder a su perfil personal y obtener información relevante sobre su consumo de agua potable, así como también realizar diversos trámites y gestiones relacionados con su servicio de agua potable.
                        </p>
                    </div>
                </div>
                <div className="wrapper">
                    {!showRecovery ? (
                        <form onSubmit={handleSubmit}>
                            <h1>Bienvenido</h1>
                            <p className="inicio">Iniciar sesión</p>
                            <div className="input-box">
                                <input
                                    type="text"
                                    placeholder="DNI/CUIT"
                                    onChange={(e) => setUser(e.target.value)}
                                    required
                                />
                                <i className='bx bxs-user'></i>
                            </div>
                            <div className="input-box">
                                <input
                                    type="password"
                                    placeholder="Código"
                                    onChange={(e) => setPass(e.target.value)}
                                    required
                                />
                                <i className='bx bxs-lock-alt'></i>
                            </div>
                            <div className="remember-forgot">
                                <label>
                                    <input
                                        onChange={(e) => setRememberPass(e.target.checked)}
                                        type="checkbox"
                                    />Recordar
                                </label>
                                <a href="#" onClick={() => setShowRecovery(true)}>¿Olvidaste el Código?</a>
                            </div>
                            <button type="submit" className="btn">Iniciar</button>
                            <div className="register-link">
                                <p>¿No tienes cuenta? <a href="#">Contratar servicio</a></p>
                            </div>
                        </form>
                    ) : (
                        <form onSubmit={handleEmailSubmit}>
                            {!emailSent ? (
                                <>
                                    <h1>Recuperar Código</h1>
                                    <p className="inicio">Ingrese su correo electrónico</p>
                                    <div className="input-box">
                                        <input
                                            type="email"
                                            placeholder="Correo Electrónico"
                                            onChange={(e) => setEmail(e.target.value)}
                                            required
                                        />
                                        <i className='bx bxs-envelope'></i>
                                    </div>
                                    <button type="submit" className="btn">Enviar</button>
                                    <div className="register-link">
                                        <p>¿Recordaste tu código? <a href="#" onClick={() => setShowRecovery(false)}>Volver a iniciar sesión</a></p>
                                    </div>
                                </>
                            ) : (
                                <div className={`confirmation-card ${styles.emailConfirmation}`}>
                                    <p>Revise su correo electrónico para seguir con el cambio de código.</p>
                                </div>
                            )}
                        </form>
                    )}
                </div>
            </section>
        </>
    );
};

export default Login;
