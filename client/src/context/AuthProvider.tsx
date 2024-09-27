'use client'
import { auth } from "@/firebase/config";
import { useRouter } from "next/navigation";
import React, { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext({});

interface UserData {
  displayName: string | null;
  email: string | null;
  uid: string | number | null;
  photoURL: string | null;
}

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const userouter = useRouter();
  const [userData, setUserData] = useState<UserData | null>(null);

  useEffect(() => {
    const unsubscibed = auth.onAuthStateChanged((user) => {
    //   console.log(user);
      if (user) {
        const { displayName, email, uid, photoURL } = user;
        setUserData({
          displayName,
          email,
          uid,
          photoURL,
        });
        userouter.push("/rooms");
        return;
      }
      userouter.push("/");
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
