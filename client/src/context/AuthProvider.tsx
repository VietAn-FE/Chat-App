"use client";
import { auth } from "@/firebase/config";
import { usePathname, useRouter } from "next/navigation";
import React, { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext({});

interface UserData {
  displayName: string;
  email: string | null;
  uid: string | number;
  photoURL: string | null;
}

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const userouter = useRouter();
  const pathname = usePathname();
  const [userData, setUserData] = useState<UserData | {}>({});

  useEffect(() => {
    const unsubscibed = auth.onAuthStateChanged((user) => {
      if (user) {
        const { displayName, email, uid, photoURL } = user;
        setUserData({
          displayName,
          email,
          uid,
          photoURL,
        });
        if (pathname == "/login") {
          userouter.push("/rooms");
        }
        return;
      }else{
        userouter.push("/");
      }
    });
    return () => {
      unsubscibed();
    };
  }, [userouter]);

  return (
    <AuthContext.Provider value={{ userData }}>{children}</AuthContext.Provider>
  );
};

export const useAuthProvider = () => {
  const authProvider = useContext(AuthContext) as { userData: UserData };
  const { userData } = authProvider;
  return { userData };
};

export default AuthProvider;
