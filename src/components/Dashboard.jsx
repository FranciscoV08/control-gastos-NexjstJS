'use client'
import Image from 'next/image'
import { useAuth } from '../context'
import { Card } from './Card/Card'

export const Dashboard = () => {

  const { user, isAutenticate } = useAuth()

  if (isAutenticate) {
    console.log(user)
  }

  return (
    <div className={'my-5'}>
      <div className={"bg-slate-800 shadow-md text-2xl rounded-md py-5"}>
        <h1 className={"pl-5"} >Bienvenido a tu Dashboard <span className="font-bold text-3xl">{user.user}</span></h1>
      </div>
      <section className={"grid md:grid-cols-2  grid-cols-1 gap-5 "}>
        <div className={""}>
          <div class="bg-gray-800 mx-auto my-5 rounded-lg w-2/3 border-white mb-4 shadow-md">
            <div class="flex justify-center items-center space-x-5 h-full font-bold">
              <div>
                <p>Saldo actual</p>
                <h2 class="text-4xl  text-gray-600">50.365$</h2>
                <p>25.365 $</p>
              </div>
              {/* <Image src="https://www.emprenderconactitud.com/img/Wallet.png" alt="wallet" class="h-24 md:h-20 w-38" /> */}
            </div>
          </div>
        </div>
        <div className={""}>
          <Card />
          <Card />
          <Card />
        </div>
      </section>
    </div>
  )
}
