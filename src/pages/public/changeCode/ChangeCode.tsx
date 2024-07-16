import styles from "./changeCode.module.css";
import styleLogin from "../login/login.module.css";
import { useEffect, useState } from "react";
import { useLocation, useNavigate} from "react-router-dom";
import NewPassword from "../../../models/NewPassword";
import { modifyPassword } from "../../../service/requests";

import { Alert } from "../../../components/alert/Alert";

const ChangeCode: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [newCode, setNewCode] = useState("");
  const [confirmCode, setConfirmCode] = useState("");
  const [codeChanged, setCodeChanged] = useState(false);
  const [tokenRestorePass, setTokenRestorePass] = useState("");

  // Estados del Modal
  const [showAlertPassword, setShowAlertPassword] = useState(false);
  const [showAlertSuccess, setShowAlertSuccess] = useState(false);
  const [showAlertServer, setShowAlertServer] = useState(false);
  const [loading, setLoading] = useState(false);

  //Cerrar Modal
  const handleCloseAlert = () => {
    setShowAlertPassword(false);
    setLoading(false);
    setShowAlertServer(false);
  };
  //Cerrar Modal: cambio exitoso de contraseña
  const handleAlertSuccess = () => {
    setShowAlertSuccess(false);
    navigate("/");
  };

  //Obtiene el token de la url
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const param = searchParams.get("token");
    if (param) {
      setTokenRestorePass(param);
    }
  }, [location.search]);

  const validatePassword = (pass1: string, pass2: string) => {
    // Contraseñas deben: coincider, >= 8 digitos y contener numeros
    const minLength = 8;
    const hasNumbers = /\d/; // expresion regular (0-9)
    if (
      pass1 === pass2 &&
      pass1.length >= minLength &&
      hasNumbers.test(pass1)
    ) {
      return true;
    } else {
      return false;
    }
  };

  const handleChangeCodeSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);

        const passwordOk = validatePassword(newCode,confirmCode);
        //Verfica que las contraseñas coincidan
        if (!passwordOk) {    
            setShowAlertPassword(true);
        }else{
            //Crea el objeto con los datos y los envia al servidor
            const formData: NewPassword = {
                token: tokenRestorePass,
                newPassword: newCode
            }   
            try{
                await modifyPassword(formData);
                setCodeChanged(true);
            }catch(e){
                setShowAlertServer(true)
            } finally {
                setLoading(false);
            }
        }
    };

  return (
    <>
      <section className={styles.change_code_container}>
        <div className={styleLogin.wrapper}>
          {!codeChanged ? (
            <form onSubmit={handleChangeCodeSubmit} className={styles.form}>
              <h1>Ingresa tu nueva contraseña</h1>
              <div className={styleLogin.input_box}>
                <input
                  type="password"
                  placeholder="Nueva contraseña"
                  onChange={(e) => setNewCode(e.target.value)}
                  required
                  minLength={8}
                  disabled={loading}
                />
                <i className="bx bxs-lock-alt"></i>
              </div>
              <div className={styleLogin.input_box}>
                <input
                  type="password"
                  placeholder="Repetir nueva contraseña"
                  onChange={(e) => setConfirmCode(e.target.value)}
                  required
                  minLength={8}
                  disabled={loading}
                />
                <i className="bx bxs-lock-alt"></i>
              </div>
              <button
                type="submit"
                className={styleLogin.btn}
                disabled={loading}
              >
                {loading ? "Cargando..." : "Cambiar Contraseña"}
              </button>
            </form>
          ) : (
            <Alert
              title="Modificación existosa"
              description="Tu contraseña se cambió correctamente."
              btn="Volver a iniciar sesión"
              show={codeChanged}
              onClose={handleAlertSuccess}
            ></Alert>
          )}
        </div>
      </section>
      {showAlertPassword && (
        <Alert
          title="Revisa tus contraseñas"
          description="Las contraseñas deben coincidir y contener algún número."
          btn="Aceptar"
          show={showAlertPassword}
          onClose={handleCloseAlert}
        ></Alert>
      )}
      {showAlertServer && (
        <Alert
          title="Ups!"
          description="No se pudo completar la acción. Intentalo más tarde"
          btn="Aceptar"
          show={showAlertServer}
          onClose={handleCloseAlert}
        ></Alert>
      )}
    </>
  );
};

export default ChangeCode;
