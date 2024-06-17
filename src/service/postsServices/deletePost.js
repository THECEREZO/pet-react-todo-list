import { doc, deleteDoc, getFirestore } from "firebase/firestore";
const db = getFirestore()

export const DeletePostService = async (id) => {
    await deleteDoc(doc(db, "posts", id));
    console.log('post delete')
}