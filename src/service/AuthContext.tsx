import { createContext } from 'react';
import JwtDto from '../models/JwtDto';


interface AuthContextType {
  userState: {
    isLogin: boolean;
    token: string;
    name: {
      firstName: string;
      lastName: string;
    }
    role: string;
  },
  logIn: (user: JwtDto) => void;
  logOut: () => void;
}

// Valor por defecto que tendrá el contexto:
const defaultValue: AuthContextType = {
  userState: {
    isLogin: false,
    token: "",
    name: {
      firstName: "",
      lastName: ""
    },
    role: ""
  },
  logIn: () => {},
  logOut: () => {}
};

export const AuthContext = createContext<AuthContextType>(defaultValue);