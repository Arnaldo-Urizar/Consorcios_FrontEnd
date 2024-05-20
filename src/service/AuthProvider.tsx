import {ReactNode, useEffect, useReducer } from "react";
import { AuthContext } from "./AuthContext";
import JwtDto from "../models/JwtDto";


//---------gestion del estado de autenticación de un usuario------

//Estado inicial de autenticacion de usuario
const initialState = {
    isLogin: false,
    token: "",
    authorities: []
};
  
  //carga estado inicial del usuario autenticado desde localStorage cuando la aplicación se inicia o se recarga
  //si no hay un token guardado usa el estado inicial por defecto
  const init = () => {
    const token = localStorage.getItem('token');
    return token ? JSON.parse(token) : initialState.token;
  };
  

  // handleUser maneja las acciones relacionadas con el estado del usuario
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleUser = (state = initialState, action: any) => {
    switch (action.type) {
      case '[User] LoginAccess':
        return {
          //Modifica el estado inicial con los datos de inicio de sesion
          ...state,
          isLogin: action.payload.isLogin,
          token: action.payload.token,
          authorities: action.payload.authorities
        };
      case '[User] LoginOut':
        return {
          //Modifica el estado inicial con los datos de cerrar sesion
          ...state,
          isLogin: false,
          token: "",
          authorities: []
        };
      default:
        return state;
    }
  };



const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {

    //El reducer se ejecuta cada vez que se llama a dispatch con una acción
    const [userState, dispatch] = useReducer(handleUser, initialState, init);

    
    //Acciones:

    //Guarda token y despacha accion para actualizar el estado
    const logIn = (resultFetch : JwtDto)=>{ // resultado back (token,login y role)
        const action = {
            type: "[User] LoginAccess",
            payload: resultFetch
        };
        localStorage.setItem('token', JSON.stringify(resultFetch.token));
        dispatch(action);
    };

    //Cierra sesion: elimina token y despacha accion para actualizar el estado
    const logOut = ()=>{
        const action = {
            type: "[User] LoginOut",
        };
        localStorage.removeItem('token');
        dispatch(action);
    };

    
    useEffect(() => {
      //Verifica si hay un token en localStorage y, si existe, despacha una acción
      // para actualizar el estado de autenticación.
      const user = localStorage.getItem('token');
        if (user) {
          const userData = JSON.parse(user);
          //revisar si la carga que recibe en handleuser es correcta o hay que especificar el token
          dispatch({ type: '[User] LoginAccess', payload: userData });
        }
      }, []);

    return(
        // Indica que funcionalidades puede compartir authContext a los hijos
        <AuthContext.Provider value={{logIn,logOut,userState}}>
            {children}
        </AuthContext.Provider>
    );
        
};

export default AuthProvider;