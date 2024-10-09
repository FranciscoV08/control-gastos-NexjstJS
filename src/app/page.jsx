import Link from "next/link";

export default function Home() {
  return (
    <div>
      <h1>Bienvenido a tu finances preferido</h1>
      <Link href={"/auth/login"}>Registrate</Link>
    </div>
  );
}
