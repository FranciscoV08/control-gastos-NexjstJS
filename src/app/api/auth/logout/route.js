import { cookies } from 'next/headers';
import { NextResponse, NextRequest } from 'next/server'

// LOGOUT
export async function PUT(request) { 

    // Eliminamos la cookie
    cookies().delete('token');

  return new Response(JSON.stringify({
    message: 'Realizando el LOGOUt'
  }), { status: 200 } );
}