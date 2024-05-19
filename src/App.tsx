import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ProtectedRoutes } from "./service/ProtectedRoutes";
import AuthProvider from "./service/AuthProvider";

import Login from "./pages/public/login/Login";
import { Info } from "./pages/public/infoPrueba/Info";
import { ArchivoPrueba } from "./pages/public/infoPrueba/ArchivoPrueba";
import Home from "./pages/public/infoPrueba/home";

export const App = () => {

    return (
        <AuthProvider>
            <BrowserRouter>
                <Routes>
                    <Route path="/login" element={<Login />} />
                    {/* Se especifica que roles tienen acceso */}

                    <Route element={<ProtectedRoutes allowedRoles={["ROLE_USER"]} />}>
                        <Route path="/inicio" element={<Home />} />
                        <Route path="/prueba" element={<ArchivoPrueba/>} />
                    </Route>
                    
                    <Route element={<ProtectedRoutes allowedRoles={["ROLE_ADMIN"]} />}> 
                        <Route path="/info" element={<Info />} />
                    </Route>
                </Routes>
            </BrowserRouter>
        </AuthProvider>
    )
}
