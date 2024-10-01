import { NextResponse, NextRequest } from 'next/server'
import connectDB from '../../../lib/mongoose'

export async function GET(request) { 

  connectDB()

  return new NextResponse(JSON.stringify({
    message: 'Hello World'
  }), { status: 200 } );
}