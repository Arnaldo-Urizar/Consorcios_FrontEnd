import { createContext } from 'react';
import JwtDto from '../models/JwtDto';


interface AuthContextType {
  userState: {
    isLogin: boolean;
    token: string;
    authorities: string[];
  };
  logIn: (user: JwtDto) => void;
  logOut: () => void;
}

// Valor por defecto que tendrá el contexto:
const defaultValue: AuthContextType = {
  userState: {
    isLogin: false,
    token: "",
    authorities: []
  },

  logIn: () => {},
  logOut: () => {}
};

export const AuthContext = createContext<AuthContextType>(defaultValue);