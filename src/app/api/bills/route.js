import { NextResponse, NextRequest } from 'next/server'
import connectDB from '../../../lib/mongoose'
import Bills from '../../../model/bills'
import { cookies } from 'next/headers';
import jwt from 'jsonwebtoken'

// TRAE TODAS LAS TAREAS DEL ID DEL USER
export async function GET(request) { 

    try {
        connectDB()
        const token = cookies().get('token').value;
        const user = jwt.verify(token, process.env.JWT_SECRET)
        // Consulta a la db y traenos todos los gastos que coincidane en su argumento userId con el que tenemos en el client
        const getAllBills = await Bills.find({userId: user.id})

        // console.log()

        return NextResponse.json({ message: 'se trajo todos', getAllBills }, { status: 200 });
    } catch (error) {
        console.log(error)
        return NextResponse.json({ error: 'Error al traer todos los gasto' }, { status: 500 });
    }
    
  return new Response(JSON.stringify({
    message: 'Hello World'
  }), { status: 200 } );
}
// CREA LAS TAREAS
export async function POST(request) {
    try {
        connectDB()
        const data = await request.json();
        console.log(data)
        const token = cookies().get('token').value;
        const user = jwt.verify(token, process.env.JWT_SECRET)
        // console.log(user.id)

        const newBills = new Bills({
            amount: data.amount,
            description: data.description,
            category: data.category,
            userId: user.id
        })
        const saveBills = await newBills.save()
        console.log(saveBills)

        return NextResponse.json({ error: 'Fue bien', saveBills}, { status: 200 });

    } catch (error) {
        console.log(error)
        return NextResponse.json({ error: 'Error al crear el gasto' }, { status: 500 });

    }



}
