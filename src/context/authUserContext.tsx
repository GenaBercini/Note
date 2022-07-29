import React from "react";
import { User } from "firebase/auth";


interface IContext {
    user: User | null;
    setUser: React.Dispatch<React.SetStateAction<User | null>>
}

export const AuthUserContext = React.createContext({} as IContext);