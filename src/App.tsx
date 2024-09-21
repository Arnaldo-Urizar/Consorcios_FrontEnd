import { BrowserRouter, Routes, Route } from "react-router-dom";

import { ProtectedRoutes } from "./service/ProtectedRoutes";
import AuthProvider from "./service/AuthProvider";
import { useContext } from "react";
import { AuthContext } from "./service/AuthContext";

// Componentes
import Login from "./pages/public/login/Login";
import Home from "./pages/private/user/home/Home";
import Navbar from "./components/navbar/Navbar";
import ChangeCode from "./pages/public/changeCode/ChangeCode";
import Passwordrecovery from "./pages/public/passwordRecovery/Passwordrecovery";
import Info from "./pages/public/info/Info";
import FaqPage from "./pages/public/faq/faq";
import AccountSummary from "./pages/private/user/account-summary/account-summary";
import Consumo from "./pages/private/user/consumo/consumo";
import WaveComponent from "./components/wave/Wave";
import Footer from "./components/footer/Footer";
import UserManagment from "./pages/private/admin/userManagement/UserManagement";
import HomeAdmin from "./pages/private/admin/home/HomeAdmin";

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

      <WaveComponent />
      <Routes>
        {/* Rutas sin roles (publicas) */}
        <Route path="/" element={<Login />} />
        <Route path="/changeCode" element={<ChangeCode />} />
        <Route path="/recuperar" element={<Passwordrecovery />} />
        <Route path="/info" element={<Info />} />
        <Route path="/faq" element={<FaqPage />} />

        {/* Rutas administrador Usuario y Aministrador*/}
        <Route element={<ProtectedRoutes allowedRoles={["ROLE_USER", "ROLE_ADMIN"]} />}>
          <Route path="/inicio" element={<Home />} />
          <Route path="/consumo" element={<Consumo />} />
          <Route path="/resumen" element={<AccountSummary />} />
        </Route>
        
        {/* Rutas administrador (privadas) */}
        <Route element={<ProtectedRoutes allowedRoles={["ROLE_ADMIN"]} />}>
          <Route path="/usuarios" element={<UserManagment />} />
          <Route path="/homeAdmin" element={<HomeAdmin />} />
        </Route>
      </Routes>
       <Footer />
    </BrowserRouter>
  );
};
