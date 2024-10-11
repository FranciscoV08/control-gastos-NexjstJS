// Necesita ser use client
'use client'

// Importo la instancia de axios que cree anteriormente
import axios from '../lib/axios'

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

    const [bills, setBills] = useState()
    const [isComplete, setIsComplete] = useState(false)
    const [amountUser, setAmountUser] = useState(0)
    
    // Una vez se cree todo el componente quiero traer todos los gastos de este user
    const getBills = async () =>{
        try {
            const res = await axios.get("/bills")
            if(!res){
                throw new Error("No se logro traer los gastos")
            }

            setIsComplete(true)
            setBills(res.data.getAllBills)
        } catch (error) {
            console.log(error)
        }
    }
    // una vex se cargue todo quiero llamar a todas las facturas
    useEffect(()  => {
        getBills();
    }, [])
    useEffect(() => {
      if (bills && bills.length > 0) {
        formatAmount()
      }
    }, [bills])
    
    const formatAmount = () =>{
        const res = bills.reduce( (acc, bill) => acc + bill.amount, 0);
        console.log(res)
        setAmountUser(res)
    }

    
    // Creamos las facturas desde el client
    const updateBills = async (bill) =>{
        try {
            const res = await axios.post("/bills",bill);

            getBills()
        } catch (error) {
            console.log(error)
        }
    }


    return(
        <BillsContext.Provider value={{
            bills,
            isComplete,
            updateBills,
            amountUser,
        }}>
            {children}
        </BillsContext.Provider>
    )
}
