import { db } from "@/firebase/config";
import {
  collection,
  collectionGroup,
  getDocs,
  onSnapshot,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import { useEffect, useState } from "react";

const useFirestore = (collectionName: string, condition: any) => {
  const [documents, setDocuments] = useState<any>([]);
  useEffect(() => {

    if (!condition || !condition.compareValue) {
      return; // Nếu không có điều kiện, thoát
    }

    const collectionRef = collection(db, collectionName);
    console.log(collectionName,condition)

    const q = query(
      collectionRef,
      orderBy("createdAt"),
      where(condition.fieldName, condition.operator, condition.compareValue),
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const docs = snapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      })) as any[]; // Ép kiểu cho đúng với DocumentData
      setDocuments(docs);
    });

    // Cleanup listener khi component unmount
    return () => {
      unsubscribe();
    };
  }, [collectionName, condition]);
  
  return documents;
};

export default useFirestore;
