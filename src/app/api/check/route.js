import { cookies } from 'next/headers';
import { NextResponse, NextRequest } from 'next/server'
import User from '../../../model/auth'
import jwt from 'jsonwebtoken'
import connectDB from '../../../lib/mongoose'

export async function GET(request) {

    try {
        // SIEMPRE CONECTAR PRIMERO LA DB
        connectDB()
        // Aqui verificamos el token del la cookie
        const token = cookies().get('token').value

        // validacion de la cookie
        if (!token) {
            return new NextResponse(JSON.stringify({
                message: 'No existe el token no tiene autorizacion '
            }), { status: 400 });
        }
        // Extraigo el id del jwt
        const { id } = jwt.verify(token, process.env.JWT_SECRET)
        // Buscamos el user en la db
        const user = await User.findById(id)
        // Validamos el user
        if (!user) {
            return new NextResponse(JSON.stringify({
                message: 'No Existe tal usuario en la DB'
            }), { status: 400 });
        }
        return new NextResponse(JSON.stringify(user), { status: 200 });




    } catch (error) {
        console.log(error)
        return new NextResponse(JSON.stringify({
            message: 'Error en la validacion del token '
        }), { status: 400 });
    }
}