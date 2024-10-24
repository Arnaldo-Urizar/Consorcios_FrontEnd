import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ProtectedRoutes } from "./service/ProtectedRoutes";
import AuthProvider from "./service/AuthProvider";
import { useContext } from "react";
import { AuthContext } from "./service/AuthContext";

// Componentes
import Login from "./pages/public/login/Login";
import Home from "./pages/private/home/Home";
import Navbar from "./components/navbar/Navbar";
import ChangeCode from "./pages/public/changeCode/ChangeCode";
import Passwordrecovery from "./pages/public/passwordRecovery/Passwordrecovery";
import Info from "./pages/public/Info";
import Footer from "./components/footer/Footer";
import UserManagment from "./pages/private/userManagement/UserTable";

export const App = () => {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
};
const AppContent = () => {
  const { userState } = useContext(AuthContext);
  return (
    <BrowserRouter>
      {userState.isLogin && <Navbar />}
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/changeCode" element={<ChangeCode />} />
        <Route path="/passwordrecovery" element={<Passwordrecovery />} />

        {/* Se especifica que roles tienen acceso */}
        <Route element={<ProtectedRoutes allowedRoles={["ROLE_USER", "ROLE_ADMIN"]} />}>
          <Route path="/inicio" element={<Home />} />
          <Route path="/notifications" element={<Info />} />
        </Route>

        <Route element={<ProtectedRoutes allowedRoles={["ROLE_ADMIN"]} />}>
          {/* {Colocar rutas privadas} */}
          <Route path="/usertable" element={<UserManagment />} />

        </Route>
      </Routes>
       <Footer />
    </BrowserRouter>
  );
};
