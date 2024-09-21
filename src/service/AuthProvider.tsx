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
};
  
  //carga estado inicial del usuario autenticado desde sessionStorage cuando la aplicación se inicia o se recarga
  //si no hay un token guardado usa el estado inicial por defecto
const init = ()=> {
  const token = sessionStorage.getItem('token');
  if(token){
    try{
      const decodedToken = jwtDecode<UserBack>(token);
      return {
        isLogin: true,
        token,
        name: {
          firstName: decodedToken.firstName,
          lastName: decodedToken.lastName
        },
        role: decodedToken.role
      };      
    }catch(e){
      return initialState;
    }
  }
  return initialState
};

// Tipos de acciones
type Action =
  | { type: '[User] LoginAccess', payload: string }
  | { type: '[User] LoginOut' };

  // handleUser maneja las acciones relacionadas con el estado del usuario
const handleUser = (state = initialState, action: Action) => {
    switch (action.type) {
      case '[User] LoginAccess':{
        const decodeResult =  jwtDecode<UserBack>(action.payload); 
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
        const action: Action = {
            type: "[User] LoginAccess",
            payload: resultFetch.token
        };
        sessionStorage.setItem('token', resultFetch.token);
        dispatch(action);
    };

    //Cierra sesion: elimina token y despacha accion para actualizar el estado
    const logOut = ()=>{
        const action : Action = {
            type: "[User] LoginOut",
        };
        sessionStorage.removeItem('token');
        dispatch(action);
    };

    
    useEffect(() => {
      // Actualizar el estado de autenticación.
      const token = sessionStorage.getItem('token');
        if (token) {
          //revisar si la carga que recibe en handleuser es correcta o hay que especificar el token
          dispatch({ type: '[User] LoginAccess', payload: token});
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