import { collection, getDocs, getFirestore } from "firebase/firestore";
const db = getFirestore();

export const setPosts = {
    data: []
}

export const readPostService = async () => {
    const setData = []
    const querySnapshot = await getDocs(collection(db, "posts"));
    querySnapshot.forEach((doc) => {
        setData.push({el: doc.data(), id: doc.id})
    });
    setPosts.data = setData
    console.log(setPosts.data)
}