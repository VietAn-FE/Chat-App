"use client";
import { auth, db } from "@/firebase/config";
import {
  FacebookAuthProvider,
  ProviderId,
  signInWithPopup,
  UserCredential,
} from "firebase/auth";
import { addDoc, collection, doc, getDoc, setDoc } from "firebase/firestore";
import { useRouter } from "next/navigation";

const fbProvider = new FacebookAuthProvider();

const LoginForm = () => {
  const handleFblogin = async () => {
    try {
      const result = await signInWithPopup(auth, fbProvider);
      const user = result.user;

      // Kiểm tra trong cơ sở dữ liệu
      const usersCollectionRef = collection(db, "users");
      const userDocRef = doc(usersCollectionRef, user.uid);
      const userSnapshot = await getDoc(userDocRef);

      if (!userSnapshot.exists()) {
        console.log("Người dùng này là mới!");
        // Lưu thông tin người dùng vào cơ sở dữ liệu
        await setDoc(userDocRef, {
          uid: user.uid,
          displayName: user.displayName,
          email: user.email,
          photoURL: user.photoURL,
          createdAt: new Date(),
        });
      }
    } catch (error) {}
  };

  return (
    <>
      <div className="row mb-4">
        <input
          type="text"
          className="form-input rounded-md border border-gray-200 py-[8px] px-[15px] w-full"
          placeholder="Account"
        />
      </div>
      <div className="row mb-4">
        <input
          type="password"
          className="form-input  rounded-md border border-gray-200 py-[8px] px-[15px] w-full"
          placeholder="Password"
        />
      </div>
      <div className="row mb-4">
        <button className="btn bg-cyan-600  text-white rounded py-2 px-10 inline-flex">
          Login
        </button>
      </div>
      <div className="row mb-4">
        <button
          className="btn bg-cyan-600  text-white rounded py-2 px-10 inline-flex"
          onClick={handleFblogin}
        >
          Login bằng Facebook
        </button>
      </div>
    </>
  );
};

export default LoginForm;
