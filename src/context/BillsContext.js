// Necesita ser use client
'use client'
import {useContext,createContext, useState, useEffect } from 'react'

// Inicializamos el creador del contexto y lo exportamos
export const BillsContext = createContext()

// Hook para utilizar el contexto
export const useBills = () =>{
    const context = useContext(BillsContext);
    if(!context){
        throw new Error("No existe el context")
    }
    return context
}

// Crear el proveedor 
export const BillsProvider = ({children}) => {

    const [bills, setBills] = useState({})

    

    useEffect(() => {
        console.log("Se cargo todo el componente")
    }, [])
    

    return(
        <BillsContext.Provider value={{
            bills
        }}>
            {children}
        </BillsContext.Provider>
    )
}
