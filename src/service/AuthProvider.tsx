import {ReactNode, useEffect, useReducer } from "react";
import { AuthContext } from "./AuthContext";
import JwtDto from "../models/JwtDto";
import {jwtDecode} from "jwt-decode";
import UserBack from "../models/UserBack";

//---------gestion del estado de autenticación de un usuario------

//Estado inicial de autenticacion de usuario
const initialState = {
    isLogin: false,
    token: "",
    name: {
      firstName: "",
       lastName: ""
    },
    role: ""
    // role: [] as string[]
};
  
  //carga estado inicial del usuario autenticado desde localStorage cuando la aplicación se inicia o se recarga
  //si no hay un token guardado usa el estado inicial por defecto
  const init = () => {
    const token = sessionStorage.getItem('token');
    return token ? JSON.parse(token) : initialState.token;
  };


//Decodificar carga de token
  const decodePayload =()=>{
    const getToken  = JSON.stringify(sessionStorage.getItem('token'));
    //Payload decodificado es tipo UserBack
    const decodePayload = jwtDecode<UserBack>(getToken);
    return decodePayload
  }

  // handleUser maneja las acciones relacionadas con el estado del usuario
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleUser = (state = initialState, action: any) => {

    switch (action.type) {

      case '[User] LoginAccess':{
        const decodeResult = decodePayload();
        console.log(decodeResult);
        return {
          //Modifica el estado inicial con los datos de inicio de sesion
          ...state,
          isLogin: true,
          token: action.payload,
          name: {
            firstName: decodeResult.firstName,
            lastName: decodeResult.lastName
            },          
          role: decodeResult.role
        };
      } 
      case '[User] LoginOut':{
        return {
          //Modifica el estado inicial con los datos de cerrar sesion
          ...state,
          isLogin: false,
          token: "",
          name: {
            firstName: "",
            lastName: ""
            },          
          role: "NO_ROLE"//
        };
      }  
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
        sessionStorage.setItem('token', JSON.stringify(resultFetch.token));
        dispatch(action);
    };

    //Cierra sesion: elimina token y despacha accion para actualizar el estado
    const logOut = ()=>{
        const action = {
            type: "[User] LoginOut",
        };
        sessionStorage.removeItem('token');
        dispatch(action);
    };

    
    useEffect(() => {
      //Verifica si hay un token en localStorage y, si existe, despacha una acción
      // para actualizar el estado de autenticación.
      const user = sessionStorage.getItem('token');
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