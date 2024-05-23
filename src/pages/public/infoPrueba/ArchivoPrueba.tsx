import { useContext } from "react";
import { AuthContext } from "../../../service/AuthContext";


export const ArchivoPrueba = () => {
  //Trae funcion para cerrar sesión
  const {logOut}= useContext(AuthContext)
  
  return (
    <div>
        <h1>pagina : ArchivoPrueba</h1>
        <h1>Pagina publica.</h1>
        <button onClick={logOut}>cerrar sesion</button>
    </div>
  );
}
