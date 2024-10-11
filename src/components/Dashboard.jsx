'use client'
import Image from 'next/image'
import { useAuth, useBills } from '../context'
import { Card } from './Card/Card'
import { useState } from 'react'
import Link from 'next/link'

export const Dashboard = () => {

  const { user, isAutenticate } = useAuth()
  const { bills, isComplete, updateBills, amountUser } = useBills()

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

    console.log(newBill)
  }

  // Si esta autenticado quiero que me muestres todos los gasto


  return (
    <div className={'my-5'}>
      <div className={" bg-slate-800 shadow-md rounded-md py-5"}>
        <h1 className={"pl-5 text-2xl"} >Bienvenido a tu Dashboard <span className="font-bold text-3xl">{user.user}</span></h1>
        <nav className='flex items-center justify-around'>
          <Link className='border-b-4 border-blue-600-600 rounded-md px-3 py-2' href={"#"}> Mi Objetivo </Link>
          <Link className='border-b-4 border-blue-600-600 rounded-md px-3 py-2' href={"#"}> Dashboard </Link>
          <button className='border-b-4 border-red-600 hover:bg-red-500 transition-all rounded-md px-3 py-2'>Logoout</button>
        </nav>
      </div>

      <section className={"grid md:grid-cols-2  grid-cols-1 gap-5 "}>
        <div className={""}>
          <div className="bg-gray-800 mx-auto my-5 rounded-lg w-2/3 border-white mb-4 shadow-md">
            <div className="flex flex-col justify-center items-center space-x-5 h-full font-bold">
                <p> Actualmente tienes</p>
                <h2 className="text-4xl">{amountUser}$</h2>
                <p>25.365 $</p>
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
