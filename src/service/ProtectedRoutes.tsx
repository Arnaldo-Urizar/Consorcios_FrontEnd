import { useContext } from "react"
import { Navigate, Outlet } from "react-router-dom"
import { AuthContext } from "./AuthContext";

interface ProtectedRoutesProps {
    allowedRoles: string[];
  }

export const ProtectedRoutes = ({allowedRoles}: ProtectedRoutesProps) => {
    
    //Obtiene el estado actual del usuario
    const {userState} = useContext(AuthContext);
    const {isLogin , role} = userState;

    //Recibe roles definidos en "App.tsx" y compara con rol del estado actual.
    if (!isLogin || !allowedRoles.includes(role)) {
        if(role === "NO_ROLE"){
            return <Navigate to="/" replace />; //Navega cuanado cierra sesion
        }
        return <Navigate to="/inicio" replace />;//Navega al inicio
    }
    //Si coincide los roles, renderiza las paginas indicadas en App.tsx
    return <Outlet />;
}
