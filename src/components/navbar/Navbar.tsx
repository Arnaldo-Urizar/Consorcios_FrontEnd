
import { NavLink } from "react-router-dom";
import { useContext, useState } from "react";
import { AuthContext } from "../../service/AuthContext";
import styles from "./navbar.module.css";


import { CiMenuBurger } from "react-icons/ci";
import { IoCloseOutline, IoNotifications } from "react-icons/io5";
import { AiFillHome } from "react-icons/ai";
import { FaQuestion } from "react-icons/fa";
import { MdAdminPanelSettings } from "react-icons/md";
import { BsPersonFill } from "react-icons/bs";


const Navbar = () => {

    const [menuOpen, setMenuOpen] = useState(false);

    const {userState} = useContext(AuthContext);
    const {logOut}= useContext(AuthContext)

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };
    
    return (
        <div className={styles.navContainer}>
          <div className={styles.nav}>
            <div className={styles.logo}>
              <img
                src="src/assets/img/water_drop_white_24dp.svg"
                alt="Consorcio Vecinal de Agua Potable
              Santa Maria de Oro"
                width={55}
                height={55}
              />
              <p>Consorcio Vecinal de Agua Potable Santa Maria de Oro</p>
            </div>
            <div className={styles.navigation}>
              <ul>
                <li>
                  <NavLink
                    style={({ isActive }) => (isActive ? { opacity: 1 } : {})}
                    to={"/inicio"}
                  >
                    <AiFillHome /> Inicio 
                  </NavLink>
                </li>
                <li>
                  {userState?.role =="ROLE_ADMIN" ? (
                    <NavLink
                      to={"/homepage"}
                      style={({ isActive }) => (isActive ? { opacity: 1 } : {})}
                    >
                      Modo Administrador <MdAdminPanelSettings />
                    </NavLink>
                  ) : (
                    <NavLink
                      to={"/faq"}
                      style={({ isActive }) => (isActive ? { opacity: 1 } : {})}
                    >
                       <FaQuestion /> Preguntas Frecuentes
                    </NavLink>
                  )}
                </li>
                <li>
                  <NavLink
                    to={"notifications"}
                    style={({ isActive }) => (isActive ? { opacity: 1 } : {})}
                  >
                    <IoNotifications /> Notificaciones 
                  </NavLink>
                </li>
                <li>
                  <button className={styles.btn} onClick={logOut}>
                    <BsPersonFill /> Cerrar Sesión 
                  </button>
                </li>
              </ul>
            </div>
            <div className={styles.hamburger}>
              <button onClick={toggleMenu}>
                {" "}
                {menuOpen ? <IoCloseOutline /> : <CiMenuBurger />}{" "}
              </button>
    
              {menuOpen && (
                <div className={styles.open}>
                  <ul>
                    <li>
                      <NavLink
                        to={"/"}
                        style={({ isActive }) => (isActive ? { opacity: 1 } : {})}
                      >
                        <AiFillHome /> Inicio 
                      </NavLink>
                    </li>
                    <li>
                      {userState?.role == "ROLE_ADMIN" ? (
                        <NavLink
                          to={"/homepage"}
                          style={({ isActive }) => (isActive ? { opacity: 1 } : {})}
                        >
                           <MdAdminPanelSettings /> Modo Administrador
                        </NavLink>
                      ) : (
                        <NavLink
                          to={"/faq"}
                          style={({ isActive }) => (isActive ? { opacity: 1 } : {})}
                        >
                          <FaQuestion /> Preguntas Frecuentes 
                        </NavLink>
                      )}
                    </li>
                    <li>
                      {" "}
                      <NavLink
                        to={"notifications"}
                        style={({ isActive }) => (isActive ? { opacity: 1 } : {})}
                      >
                         <IoNotifications /> Notificaciones
                      </NavLink>
                    </li>
                    <li>
                      <button className={styles.btn} onClick={logOut}>
                        <BsPersonFill /> Cerrar Sesión 
                      </button>
                    </li>
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
    );
}

export default Navbar;