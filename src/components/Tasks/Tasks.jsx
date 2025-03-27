import { useEffect, useState } from 'react'
import style from './tasks.module.css'
import TaskItem from './TaskItem/TaskItem'

import { addData, updateData, deleteData, fetchData } from '../../firebase/firebase'

  

const Tasks = () => {
    const dataBase = 'tasks'
    const [tasks, setTasks] = useState([])

    useEffect(() => {
      fetchData(dataBase)
        .then((data) => setTasks(data))
        .catch((error) => console.error("Ошибка загрузки", error))
    }, []);
    
    const addTask = async () =>{
        const newTask = {task:' ', isFinished:false}
        try {
          const id = await addData(newTask, dataBase)
          setTasks([...tasks, { ...newTask, id }]);
        } catch (error) {
          console.error("Ошибка добавления:", error);
        }
    }
    const updateTask = async (index, newData) => {
      const oldTasks = [...tasks]
      const newTasks = tasks.map((task, i) => 
        i === index ? { ...task, ...newData } : task
      );
      const taskId = newTasks[index].id;
      setTasks(newTasks);
      try {
        await updateData(taskId, newTasks[index], dataBase);
      } catch (error) {
        console.error("Ошибка обновления:", error);
        setTasks(oldTasks)
      }
    };
    
    const handleChange = (event, index) => {
      updateTask(index, { task: event.target.value });
    };

    const setFinished = (index) => {
      updateTask(index, { isFinished: !tasks[index].isFinished });
    };
  
    const removeTask = async (index) =>{
      const taskId = tasks[index].id;
      const oldTasks = tasks;
      try {
        setTasks(tasks.filter((_, i) => i !== index));
        await deleteData(taskId, dataBase);
      } catch (error) {
        console.error("Ошибка удаления", error);
        setTasks(oldTasks);
      }
    }
    return(
        <div className={style.list}>
            {tasks.map((task, index) => (
                <TaskItem
                key={task.id}
                value={task.task}
                isFinished={task.isFinished}
                handleChange={(event) => handleChange(event, index)}
                setFinished={() => setFinished(index)}
                removeTask={() => removeTask(index)}
                />
            ))}
            <button onClick={addTask} className={style.list__add_btn}>+Add task</button>
        </div>
    )
}

export default Tasks