import { createContext, ReactNode, useState } from "react";

import { api } from "@/services/apiClient";

import { destroyCookie, setCookie, parseCookies} from 'nookies';
import Router from 'next/router';

type AuthContextData = {
    user: UserProps;
    isAuthenticated: boolean;
    signIn : (credentials: SignInProps) => Promise<void>;
    signOut : () => void;
    signUp : (credentials: SignUpProps)=> Promise<void>;
}

type UserProps = {
    id:string;
    name: string;
    email: string;
}

type SignUpProps = {
    name: string;
    email: string;
    password: string;
}

type SignInProps = {
    email: string;
    password: string;
}

type AuthProviderProps = {
    children: ReactNode;
}

export const AuthContext = createContext({} as AuthContextData)

    export function signOut(){
        try{
            destroyCookie(undefined, '@nextauth.token')
            Router.push('/')
        }catch{
            console.log("Erro ao deslogar")
        }
    }

export function AuthProvider({children}: AuthProviderProps){
    
    const [user, setUser] = useState<UserProps>();
    const isAuthenticated = !!user; //controla o login| !!vira boolean

   async function signIn({email, password}: SignInProps){
  try{
    const response = await api.post('/session', {
        email, 
        password
    })

    const { id, name, token } = response.data;

    setCookie(undefined, "@nextauth.token",token, {
        maxAge: 60*60*24*30,
        path: "/" //quais caminhos terao acesso ao cookie
    })

    setUser({
        id, 
        name,
        email,
    })

    api.defaults.headers['autorization'] = `Bearer ${token}`

    Router.push("/dashboard");


  }catch(err){
    console.log("Erro ao fazer o login ", err )
  }
}

    async function signUp({name,email,password}: SignUpProps){
        try {
            const response =await api.post('/users', {
                name,
                email,
                password
            })


    Router.push("/")

        } catch (err) {
            console.log("erro ao cadastrar usuario")
        }
    }
    
    return(
        <AuthContext.Provider value={{user, isAuthenticated, signIn, signOut, signUp}}>
            {children}
        </AuthContext.Provider>
    )
}