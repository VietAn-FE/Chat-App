"use client";
import { useAuthProvider } from "@/context/AuthProvider";
import Image from "next/image";

const InfoUser = () => {
  const { userData } = useAuthProvider();
  const avt = userData?.photoURL || null;
  return (
    <div className="flex p-[15px] justify-between">
      <div className="user flex items-center gap-[10px]">
        {avt ? (
          <figure className="rounded-[50%] bg-[#BCC0C4] flex items-center justify-center overflow-hidden">
            <Image
              width={40}
              height={40}
              src={avt}
              alt={userData.displayName}
            />
          </figure>
        ) : (
          <span className="rounded-[50%] bg-[#BCC0C4] flex items-center justify-center overflow-hidden w-[40px] h-[40px]">
            {userData?.displayName?.slice(0, 1).toUpperCase()}
          </span>
        )}
        <p className="name text-[#fff]">{userData?.displayName || ''}</p>
      </div>
      <div className="logout btn text-[#fff] px-[15px] py-[5px] border rounded-[4px]">Logout</div>
    </div>
  );
};

export default InfoUser;
