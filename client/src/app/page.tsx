import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="home-page text-center flex items-center justify-center h-screen">
      <div className="w-1/3">
        <h2 className="text-3xl mb-3">Wellcome Chat App</h2>
        <Link href={"/login"} className="btn bg-cyan-600  text-white rounded py-2 px-10 inline-flex">
          Login
        </Link>
      </div>
    </div>
  );
}
