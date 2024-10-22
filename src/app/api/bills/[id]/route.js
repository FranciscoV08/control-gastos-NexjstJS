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

export async function PATCH(request, {params}) {
    try {
        // necesitamos conectarnos a la db en cada peticion
        connectDB()
        // Como el params contiene el id formateado los extraemos facil
        // const dataDelete = await bills.findByIdAndDelete(params.id)
        
        const res = await request.json()
        const updateBill = await bills.findByIdAndUpdate(params.id, res, { new:true} )
        console.log(updateBill)
        return NextResponse.json({ message: 'Fue bien se edito el gasto', updateBill}, { status: 200 });

    } catch (error) {
        console.log(error)
        return NextResponse.json({ error: 'Error al crear el gasto' }, { status: 500 });

    }

}
// RAG (SNIPET)
export async function GET(request, {params}) { 
    try {
        // necesitamos conectarnos a la db en cada peticion
        connectDB()
        // Como el params contiene el id formateado los extraemos facil
        const getBill = await bills.findById(params.id)
        // console.log(getBill)
        
        // const res = await request.json()
        return NextResponse.json({ message: 'Fue bien se edito el gasto', getBill}, { status: 200 });

    } catch (error) {
        console.log(error)
        return NextResponse.json({ error: 'Error al crear el gasto' }, { status: 500 });

    }
}