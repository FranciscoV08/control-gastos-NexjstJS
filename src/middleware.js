import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'
// como JWT no soporta la red de edge remplazamos este por "jose"
import { jwtVerify } from 'jose'

// VALIDACION PARA RUTAS PROTEGIDAS

export async function middleware(request) {

  // Verifica antes de entrar al dashboard si contiene un token
  // obtenemos el token
  // const token = cookies().get("token");

  // verifica el token en el front 
  // if (!token) { 
  //   // Redireccionamos al login en caso de no tener
  //   return NextResponse.redirect(new URL('/auth/login', request.url));
  // }
  // necesito mandar ese token al back y que me retorne una validacion 

  const token = cookies().get("token")
  // console.log(token)
  // Existen cookies?
  if (token === undefined) {
    return NextResponse.redirect(new URL('/auth/login', request.url));
  }
  try {
    // le damos el token y la firma en el formato que "Jose npm" lo pide que es en formato encode
    const res = await jwtVerify(token.value, new TextEncoder().encode(process.env.JWT_SECRET))
    // console.log(res)
    return NextResponse.next()
  } catch (error) {
    return NextResponse.redirect(new URL('/auth/login', request.url));
  }
}

// aqui se define donde se aplicara
export const config = {
  matcher: '/page/:path*',
}