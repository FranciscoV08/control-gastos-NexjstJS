'use client';

import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useState } from "react"

export const Login = () => {
  const router = useRouter()
  // Mis estados para guardar los datos: (pasarlo a react-form?)
  const [email, setEmail] = useState()
  const [password, setPassword] = useState()
  // Mi context
  const { login } = useAuth()
  // para redireccionar
  
  const handleSubmit = async (e) => {
    // previene la accion por default
    e.preventDefault()
    // creamos un usuario
    const userLogin = {
      email,
      password
    }

    // Mandamos el user al back para preguntar por el user
    try {
      const res = await login(userLogin);
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
        <h2 className="font-bold text-white text-3xl py-3">Login</h2>
        <form
          onSubmit={handleSubmit}
        >
          <div>
            <input
              type="email"
              className="rounded-md w-full px-4 py-2 my-2"
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <input
              type="password"
              className="rounded-md w-full px-4 py-2 my-2"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
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
