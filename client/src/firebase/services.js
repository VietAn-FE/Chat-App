import firebase, { db } from "@/firebase/config";
import {
    addDoc,
  collection,
  serverTimestamp,
} from "firebase/firestore";

export const addDocument = async (collectionName, data) => {
  try {
    const docRef = await addDoc(collection(db, collectionName), {
      ...data,
      createdAt: serverTimestamp(), // Sử dụng serverTimestamp
    });
  } catch (e) {
    console.error("Error adding document: ", e);
  }
};
