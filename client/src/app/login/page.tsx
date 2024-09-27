import Image from "next/image";
import LoginForm from "./(ui)/FormLogin";
import { Metadata } from "next";

export const metadata : Metadata = {
    title:'Login',
    description:'Login Page'
}

const Page = () => {  
  return (
    <div className="flex h-screen items-center justify-center">
      <div className="w-1/2 text-center">
        <Image
          src="/images/logo.svg"
          className="m-auto mb-8"
          width={80}
          height={80}
          alt="Chat App"
        />
        <h2 className=" mb-8 text-center text-3xl">
          Connect with your favourite people
        </h2>
        <div className="w-full md:w-1/2 m-auto">
          <LoginForm />
        </div>
      </div>
    </div>
  );
};

export default Page;
