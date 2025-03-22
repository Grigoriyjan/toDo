import { useEffect, useState } from 'react'
import style from './tasks.module.css'
import TaskItem from './TaskItem/TaskItem'

import { getFirestore, collection, getDocs, addDoc,doc, setDoc, deleteDoc } from "firebase/firestore";
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

  

const Tasks = () => {
    const [tasks, setTask] = useState([])

    useEffect(() => {
      const fetchTasks = async () => {
        const querySnapshot = await getDocs(collection(db, "tasks"));
        const tasksData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setTask(tasksData);
      };
    
      fetchTasks();
    }, []);

    async function addData(newData) {
        try {
          // Указываем коллекцию, в которую хотим добавить данные
          const docRef = await addDoc(collection(db, "tasks"), newData);
          newData.id = docRef.id
          setTask([...tasks, newData])
          console.log("Документ добавлен с ID: ", docRef.id);
        } catch (error) {
          console.error("Ошибка при добавлении документа: ", error);
        }
    }

    async function updateTask(taskId, newData, index) {
        try {
            // Указываем путь к документу, который нужно обновить
            const taskRef = doc(db, "tasks", taskId);
        
            // Обновляем данные с опцией merge
            await setDoc(taskRef, newData[index], { task: newData[index].task, isFinished: newData[index].isFinished });
            
            console.log("Документ успешно обновлен!");
          } catch (error) {
            console.error("Ошибка при обновлении документа: ", error);
        }
    }

    async function deleteTask(taskId) {
        try {
          // Указываем путь к документу, который нужно удалить
          const taskRef = doc(db, "tasks", taskId);
      
          // Удаляем документ
          await deleteDoc(taskRef);
      
          console.log("Документ успешно удален!");
        } catch (error) {
          console.error("Ошибка при удалении документа: ", error);
        }
      }
    
    const addTask = () =>{
        const newTasks = {id:'', task:'', isFinished:false}
        addData(newTasks)
        
    }
    const onTaskChange = (event, index) => {
        const newTasks = tasks.map((task, i) => {
          if (i === index) {
            return { ...task, task: event.target.value };
          }
          return task;
        });
        updateTask(newTasks[index].id, newTasks, index)
        setTask(newTasks);
    };
    const setFinished = (index) =>{
        console.log(index);
        
        const newTasks = tasks.map((task, i) => {
            if (i === index) {
              return { ...task, isFinished: !task.isFinished };
            }
            return task;
        });
        updateTask(newTasks[index].id, newTasks, index)
        setTask(newTasks);
    }
    const removeTask = (index) =>{
        deleteTask(tasks[index].id)
        setTask(tasks.filter((_, i) => i !== index))
    }
    return(
        <div className={style.list}>
            {tasks.map((task, index) => (
                <TaskItem
                key={index}
                value={task.task}
                isFinished={task.isFinished}
                handleChange={(event) => onTaskChange(event, index)}
                setFinished={() => setFinished(index)}
                removeTask={() => removeTask(index)}
                />
            ))}
            <button onClick={addTask} className={style.list__add_btn}>+Add task</button>
        </div>
    )
}

export default Tasks