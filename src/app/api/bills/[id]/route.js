import connectDB from '@/lib/mongoose';
import bills from '@/model/bills';
import { NextResponse, NextRequest } from 'next/server'


export async function DELETE(request, {params}) {
    try {
        // necesitamos conectarnos a la db en cada peticion
        connectDB()
        // Como el params contiene el id formateado los extraemos facil
        const dataDelete = await bills.findByIdAndDelete(params.id)

        return NextResponse.json({ message: 'Fue bien se elimino el gasto', dataDelete}, { status: 200 });

    } catch (error) {
        console.log(error)
        return NextResponse.json({ error: 'Error al crear el gasto' }, { status: 500 });

    }

}