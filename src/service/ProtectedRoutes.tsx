import { useContext } from "react"
import { Navigate, Outlet } from "react-router-dom"
import { AuthContext } from "./AuthContext";

interface ProtectedRoutesProps {
    allowedRoles: string[];
  }

export const ProtectedRoutes = ({allowedRoles}: ProtectedRoutesProps) => {
    console.log("Tipo de rol recibido: " + allowedRoles);
    
    //Obtiene el estado actual del usuario
    const {userState} = useContext(AuthContext);
    const {isLogin , authorities} = userState;

    //Recibe roles definidos en "App.tsx" y compara con rol del estado actual.
    if (!isLogin || !authorities.some(role => allowedRoles.includes(role))) {
        return <Navigate to="/" replace />;//Navega al inicio
    }
    //Si coincide los roles, renderiza las paginas indicadas en App.tsx
    return <Outlet />;
}
