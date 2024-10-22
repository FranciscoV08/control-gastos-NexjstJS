'use client'
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { useAuth } from '../context'

export const Navbar = () => {
    const { user, isAutenticate, logout } = useAuth()

    const pathName = usePathname()
    // Obtenemos el path y validamos el path 
    const pathIs = (path) => path === pathName;

    const router = useRouter()
    const handleLogout = () => {
        logout()
        router.refresh()
    }

    // console.log(isAutenticate)

    return (
        
        isAutenticate ? (
            <div className={" bg-slate-800 shadow-md rounded-md pt-3 pb-2 mt-5"}>
                <h1 className={"pl-5 text-2xl"} >Bienvenido <span className="font-bold text-3xl">{user.user}</span></h1>
                <nav className='flex items-center justify-evenly'>
                    <Link className={`${pathIs("/page/home") && "border-b-4 border-white"} rounded-md px-3 py-2`} href={"/page/home"}>Home</Link>
                    <Link className={`${pathIs("/page/miobjetivo") && "border-b-4 border-white"} rounded-md px-3 py-2`} href={"#"}> Mi objetivo </Link>
                    <Link className={`${pathIs("/page/dashboard") && "border-b-4 border-white"} rounded-md px-3 py-2`} href={"/page/dashboard"}> Dashboard </Link>
                    <button onClick={() => handleLogout()} className='border-b-4 border-red-600 hover:bg-red-500 transition-all rounded-md px-3 py-2'>salir</button>
                </nav>
            </div>
        ) : (
        <div className={" bg-slate-800 shadow-md rounded-md pt-3 pb-2 mt-5"}>
            <h1 className={"pl-5 text-2xl text-center"} >Registrate a <span className="font-bold text-3xl">Tus Finanzas</span></h1>
            <nav className='flex items-center justify-around pt-3'>
                <Link className={`${pathIs("/auth/login") && "border-b-4 border-white"} text-xl font-extrabold rounded-md px-3 py-2`} href={"/auth/login"}>Login</Link>
                <Link className={`${pathIs("/auth/register") && "border-b-4 border-white"} text-xl font-extrabold rounded-md px-3 py-2`} href={"/auth/register"}>Register</Link>
            </nav>
        </div>                    

        )



    )
}
