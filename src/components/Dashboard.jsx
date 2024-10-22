'use client'
import { useAuth, useBills } from '../context'
import { Card } from './Card/Card'
import { useState } from 'react'


export const Dashboard = () => {

  const { user, isAutenticate } = useAuth()
  const { bills, isComplete, updateBills, amountUser, formatPesos } = useBills()
  
  const [newBill, setNewBill] = useState({
    amount: 0,
    description: "",
    date: "",
    category: ""
  })

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewBill((prevState) => ({
      ...prevState,
      [name]: value,
    }))

  }
  const onSubmit = async (e) => {
    e.preventDefault()
    const res = await updateBills(newBill);
  }

  
  // Si esta autenticado quiero que me muestres todos los gasto


  return (
    <div className={'my-5'}>
      <section className={"grid md:grid-cols-2  grid-cols-1 gap-5 "}>
        <div className={""}>
          <div className="bg-gray-800 mx-auto my-5 rounded-lg w-2/3 border-white mb-4 shadow-md">
            <div className="flex flex-col justify-center items-center space-x-5 h-full font-bold">
                <p> Actualmente en <span className='text-red-500'>Gastos</span> tienes:</p>
                <h2 className="text-4xl text-red-400">{formatPesos(amountUser)} <span className='text-sm'>ARS</span> </h2>
                <p>Antes tenias: <span className='text-green-500'> 400.000 $</span></p>
            </div>
          </div>

          <div className={"bg-gray-800 p-3 rounded-lg"}>

            <h2 className='font-bold text-2xl pb-5'>Agrega un gasto</h2>

            <form onSubmit={onSubmit} className={"flex flex-col gap-5 text-black"}>
              <section className='grid grid-cols-2 text-white'>
                <div className='flex flex-col w-4/5'>
                  <input
                    className='bg-gray-700 rounded-md px-3 py-2 my-2 '
                    name="amount"
                    type="number"
                    placeholder="Monto"
                    onChange={handleChange}
                  />

                  <input
                    className='bg-gray-700 rounded-md px-3 py-2 my-2'
                    name="date"
                    type="date"
                    placeholder="date"
                    onChange={handleChange}
                  />
                  <input
                    className='bg-gray-700 rounded-md px-3 py-2 my-2'
                    name="category"
                    type="text"
                    placeholder="Categoria"
                    onChange={handleChange}
                  />
                </div>
                <div className='hmax'>
                  <textarea
                    className='bg-gray-700 rounded-md p-5 h-max'
                    name="description"
                    placeholder="description"
                    onChange={handleChange}
                  />
                </div>
              </section>
              <button className='bg-gray-50 font-bold text-xl p-2 rounded-md shadow-2xl' type="submit">Crear Gasto</button>
            </form>
          </div>
        </div>

        <div className={"bg-gray-800 p-5 my-3 rounded-lg h-screen overflow-y-auto"}>
          <h2 className=" text-3xl font-bold ">Tus Gastos</h2>
          {
            isComplete ? (
              bills.map(bill => (
                <Card key={bill._id} bill={bill} />
              ))
            ) : (
              <h1>Cargando...</h1>
              
            )
          }
        </div>
      </section>
    </div>
  )
}
