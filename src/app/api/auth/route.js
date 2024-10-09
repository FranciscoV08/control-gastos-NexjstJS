
import { NextResponse, NextRequest } from 'next/server'
// Mi coneccion a la db
import connectDB from '../../../lib/mongoose'
// Mi Schema 
import User from '../../../model/auth'
// Mi generator de token
import generatorToken from '../../../lib/jwt'
// Hashed password
import bcrypt from 'bcrypt'
// Cookies de nexjs
import { cookies } from 'next/headers'
// Mi context
import {useAuth} from '../../../context/AuthContext'

export async function GET(request) { 
  return new Response(JSON.stringify({
    message: 'Hello World'
  }), { status: 200 } );
}
//LOGIN, 
export async function PUT(request) {
    try {
        connectDB()
        const { email, password } = await request.json()
        // Necesitamos validar los datos del usuario que se esta logeando 

        // El finOne recibe un obj para buscar en la db
        const user = await User.findOne({ email })
        // Comparamos el password mediante el hashed / Nos devuelve un boolean
        const passUser = await bcrypt.compare(password, user.password)

        if (user && passUser) {

            const token = generatorToken({ id: user.id });
            // mandamos a la cokkie mediante el paquete de nexjs como respuesta
            const cookieStore = cookies();
            cookieStore.set('token', token)

            return new NextResponse(JSON.stringify({
                message: '', user
            }), { status: 200 });

        } else {
            return new NextResponse(JSON.stringify({
                message: 'No se encontro ninguna cuenta con esos datos '
            }), { status: 400 });
        }
    } catch (error) {
        console.log(error)
    }
}
// REGISTER (Creamos el usuario)
export async function POST(request) {
    try {
        // Conectamos a la db
        connectDB()
        // traemos lo que nos manda el cliente 
        const data = await request.json()

        // Hash del password
        const passwordHashed = await bcrypt.hash(data.password, 10)

        // Creamos mediante el schema como plantilla un nuevo usuario con los datos del cliente  
        const newUser = new User({
            user: data.user,
            password: passwordHashed,
            email: data.email
        })
        const saveUser = await newUser.save();
        // generamos el token para logearnos
        const token = generatorToken({ id: saveUser.id });
        // mandamos a la cokkie mediante el paquete de nexjs como respuesta
        const cookieStore = cookies();
        // 
        cookieStore.set('token', token)

        return new NextResponse(JSON.stringify(saveUser), { status: 200 });
    } catch (error) {
        console.log(error.errmsg, "EL ERROR VIENE DEL REGISTER")
        return new NextResponse(JSON.stringify(error.errmsg), { status: 400 });
    }

}

