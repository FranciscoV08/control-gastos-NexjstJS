import Link from "next/link";

export default function Home() {
  return (
    <div className="text-center">
      <h1 className="text-3xl font-bold my-5">¡Bienvenido a tu finances preferido.!!</h1>
      <p className="text-2xl">Puedes <span className="font-bold text-3xl">iniciar sesion</span> o si no tienes cuenta <span className="font-bold text-3xl">registrarte</span> para ayudarte con tus finanzas</p>
    </div>
  );
}
