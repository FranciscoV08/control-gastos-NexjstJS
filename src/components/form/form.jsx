'use client'

import { useAuth, useBills } from "@/context"
import { useParams, useRouter } from "next/navigation"
import { useEffect, useState } from "react";

export const form = () => {

    const params = useParams()
    const router = useRouter()

    const { getBill, updateBill } = useBills();
    // State 
    const [stateBill, setStateBill] = useState()
    // State bandera
    const [isloadin, setIsloadin] = useState(false)
    // 

    const handleChange = (e) => {
        const { name, value } = e.target;
        
        setStateBill({
          ...stateBill, // Copia el objeto actual
          [name]: value // Actualiza solo el campo que cambia
        });
    };

    const onSubmit = async (e) => {
        e.preventDefault()
        const res = await updateBill(params.id,stateBill);
        if(res){
            router.push("/page/dashboard")
            router.refresh()
        }
      }

    useEffect(() => {
        const billGet = async () => {

            const res = await getBill(params.id)
            // setStateBill(res.data.getBill)
            if (!res) {
                return
            } else {
                setStateBill(res)
                setIsloadin(true)
            }
        }
        billGet()
    }, [])


    return (

        <div className='w-3/5 mx-auto my-3'>
            {
                !isloadin ? (
                    <h1>Cargando datos...</h1>
                ) : (
                    <form
                        onSubmit={onSubmit} 
                        className={"flex flex-col gap-5 text-black"}>
                        <section className='grid grid-cols-2 text-white'>
                            <div className='flex flex-col w-4/5'>
                                <input
                                    className='bg-gray-700 rounded-md px-3 py-2 my-2 '
                                    name="amount"
                                    type="number"
                                    placeholder="Monto"
                                    onChange={handleChange}
                                    value={stateBill.amount}
                                />

                                <input
                                    className='bg-gray-700 rounded-md px-3 py-2 my-2'
                                    name="date"
                                    type="date"
                                    placeholder="date"
                                    onChange={handleChange}
                                    value={stateBill.date}
                                />
                                <input
                                    className='bg-gray-700 rounded-md px-3 py-2 my-2'
                                    name="category"
                                    type="text"
                                    placeholder="Categoria"
                                    onChange={handleChange}
                                    value={stateBill.category}
                                />
                            </div>
                            <div className='hmax'>
                                <textarea
                                    className='bg-gray-700 rounded-md p-5 h-max'
                                    name="description"
                                    placeholder="description"
                                    onChange={handleChange}
                                    value={stateBill.description}
                                />
                            </div>
                        </section>
                        <button className='bg-gray-50 font-bold text-xl p-2 rounded-md shadow-2xl' type="submit">Editar Gasto</button>
                    </form>
                )
            }
        </div>
    )
}
