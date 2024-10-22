'use client'


import { useState } from "react"
// Mi contex
import { useAuth } from "@/context/AuthContext"
import { useRouter } from "next/navigation"

export const Register = () => {

  const router = useRouter()

    const [user, setUser] = useState()
    const [password, setPassword] = useState()
    const [email, setEmail] = useState()

    const {register} = useAuth()

    const handleSubmit = async (e)=>{
        e.preventDefault()

        const newUser = {
            user,
            password,
            email
        }
        try {          
          const res = await register(newUser)
          // rediccionamos 
          if (res) {
            router.push("/page/dashboard")
          }
          // router.push("/page/home");
          // console.log(res);
        } catch (error) {
          console.log(error)
        }
    }

  return (
    <div className=" text-zinc-900 h-screen flex items-center justify-center">
    <div className=" bg-zinc-800 max-w-md px-10 py-5 rounded-md">
      <h2 className="font-bold text-white text-3xl py-3">Register</h2>
      <form
        onSubmit={handleSubmit}
      >
        <div>
          <input
            type=""
            className="rounded-md w-full px-4 py-2 my-2"
            placeholder="user"
            onChange={(e) => setUser(e.target.value) }
          />
        </div>
        <div>
          <input
            type="email"
            className="rounded-md w-full px-4 py-2 my-2"
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value) }
          />
        </div>
        <div>
          <input
            type="password"
            className="rounded-md w-full px-4 py-2 my-2"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value) }
          />
        </div>

        <div className="flex justify-between text-white my-5 ">
          <button className="bg-blue-600 p-2 rounded-md " type="submit">
            Enviar
          </button>
          {/* <button type="submit">Register..?</button> */}
        </div>

        {/* <h2 className="text-red-500">Se produjo un error en....</h2> */}
      </form>
    </div>
  </div>
  )
}
