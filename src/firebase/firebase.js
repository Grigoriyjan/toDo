import { getFirestore, collection, getDocs, addDoc,doc, deleteDoc, updateDoc } from "firebase/firestore";
import { initializeApp } from "firebase/app";

const firebaseConfig = {
    apiKey: "AIzaSyCh6GBHtW4w7h_YPpSHiLUiQgQd8bTsDns",
    authDomain: "tasks-443a6.firebaseapp.com",
    projectId: "tasks-443a6",
    storageBucket: "tasks-443a6.firebasestorage.app",
    messagingSenderId: "668443635193",
    appId: "1:668443635193:web:a1dcb81557623e78306128",
    measurementId: "G-EKTMHP7S2C"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export const fetchData = async (dataType) => {
    const querySnapshot = await getDocs(collection(db, dataType));
    const tasksData = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    return tasksData
};

export async function addData(newData, dataType) {
    try {
      const docRef = await addDoc(collection(db, dataType), newData);
      console.log("Документ добавлен с ID: ", docRef.id);
      return docRef.id
    } catch (error) {
      console.error("Ошибка при добавлении документа: ", error);
      throw error
    }
}

export async function updateData(dataId, newData,dataType) {
    try {
        const taskRef = doc(db, dataType, dataId);
        await updateDoc(taskRef, newData);
        console.log("Документ успешно обновлен!");
      } catch (error) {
        console.error("Ошибка при обновлении документа: ", error);
        throw error
    }
}

export async function deleteData(dataId, dataType) {
    try {
      const taskRef = doc(db, dataType, dataId);
      await deleteDoc(taskRef);
      console.log("Документ успешно удален!");
    } catch (error) {
      console.error("Ошибка при удалении документа: ", error);
      throw error
    }
}