// Necesita ser use client
'use client'

// Importo la instancia de axios que cree anteriormente
import axios from '../lib/axios'

import { useContext, createContext, useState, useEffect } from 'react'
import { useAuth } from './AuthContext'

// Inicializamos el creador del contexto y lo exportamos
export const BillsContext = createContext()

// Hook para utilizar el contexto
export const useBills = () => {
    const context = useContext(BillsContext);
    if (!context) {
        throw new Error("No existe el context")
    }
    return context
}

// Crear el proveedor 
export const BillsProvider = ({ children }) => {

    const { isAutenticate } = useAuth()

    const [bills, setBills] = useState()
    const [isComplete, setIsComplete] = useState(false)
    const [amountUser, setAmountUser] = useState(0)

    // Una vez se cree todo el componente quiero traer todos los gastos de este user
    const getBills = async () => {
        try {
            const res = await axios.get("/bills")
            if (!res) {
                throw new Error("No se logro traer los gastos")
            }
            setIsComplete(true)
            setBills(res.data.getAllBills)

        } catch (error) {
            console.log(error)
        }
    }

    // Creamos las facturas desde el client
    // Update Todas las Bills
    const updateBills = async (bill) => {
        try {
            const res = await axios.post("/bills", bill);
            getBills()
        } catch (error) {
            console.log(error)
        }
    }

    // Por ID
    const deletBill = async (id) => {
        try {
            const res = await axios.delete(`/bills/${id}`)
            getBills()
        } catch (error) {
            console.log(error)
        }
    }

    const getBill = async (id) => {
        const res = await axios.get(`/bills/${id}`)
        if (!res) {
            throw new Error("El error es de getBill Por id")
        } else {
            const data = res.data.getBill
            const dateFormat = new Date(data.date).toISOString().split('T')[0];

            const newData = {
                amount: data.amount,
                category: data.category,
                date: dateFormat,
                description: data.description
            }

            return newData
        }
    }

    const updateBill = async (id, bill) => {
        try {
            // console.log(id, bill, "Esto es")
            const res = await axios.patch(`/bills/${id}`, bill)
            getBills()
            return res
        } catch (error) {
            console.log(error)
        }
    }

    // Suma las facturas 
    const formatAmount = () => {
        const res = bills.reduce((acc, bill) => acc + bill.amount, 0);
        setAmountUser(res)
    }

    const formatPesos = (amount) => {
        return new Intl.NumberFormat('es-AR', {
            style: 'currency',
            currency: 'ARS',
        }).format(amount)
    }

    // una vex se cargue todo quiero llamar a todas las facturas
    useEffect(() => {
        if (isAutenticate === true) {
            // console.log("estrue")
            getBills();
        }
    }, [isAutenticate])

    useEffect(() => {
        if (bills && bills.length > 0) {
            formatAmount()
        }
    }, [bills])



    return (
        <BillsContext.Provider value={{
            bills,
            isComplete,
            updateBills,
            amountUser,
            deletBill,
            getBill,
            updateBill,
            formatPesos
        }}>
            {children}
        </BillsContext.Provider>
    )
}
