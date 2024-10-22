'use client';

import axios from 'axios'
import { createContext, useContext, useState, useEffect } from 'react'
import Cookie from 'js-cookie'

// Creamos el context
export const AuthContext = createContext()

export const useAuth = () => {
    const context = useContext(AuthContext)
    if(!context){
        throw new Error("No se encuentra el contexto")
    }
    return context
}
// El Proveedor - Provider 
export const AuthProvider = ({ children }) => {
    
    const [user, setUser] = useState({})
    const [isAutenticate, setIsAutenticate] = useState(false)


    
    const login = async (user) => {
        try {            
            const response = await axios.put("/api/auth", user)
            // necesitamos guardar esos datos del usuario
            setUser(response.data.user)
            setIsAutenticate(true)
            // console.log(response.data.user)
            return response
        } catch (error) {
            console.log(error)
        }
    }
    const register = async (user) =>{
        try {
            const resp = await axios.post("/api/auth", user)
            setIsAutenticate(true)
            console.log('Registrando el usuario', resp)
            return resp
        } catch (error) {
            console.log(error)
        }
    }
  // Necesitamos mantener la sesion con la cokie que le mandamos
  useEffect(() => {
    const checkLogin = async () => {
      // Consulta la cokie
      const { token } = Cookie.get();
      if(!token){
        console.log("no existe el token")
        setIsAutenticate(false)
      }
      //Si existe el token
      if (token) {
        const res = await axios.get("/api/check");


        setIsAutenticate(true)
        setUser(res.data)

        // console.log(data)
        // setIsAutenticate(true);
        // setIsLoading(false)
        // setUser(res.data);
      }
    };
    checkLogin();
  }, []);
    

  const logout = () =>{
    Cookie.remove('token')
    setIsAutenticate(false)
  }


    return (
        <AuthContext.Provider value={{
            user,
            setUser,
            login,
            register,
            logout,
            isAutenticate
        }}>
        {children}
        </AuthContext.Provider>
    )
}

