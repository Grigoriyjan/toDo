import { useState } from 'react'
import style from './tasks.module.css'
import TaskItem from './TaskItem/TaskItem'

const Tasks = () => {
    const [tasks, setTask] = useState([])
    const addTask = () =>{
        const newTasks = {task:'', isFinished:false}
        setTask([...tasks, newTasks])
    }
    const onTaskChange = (event, index) => {
        const newTasks = tasks.map((task, i) => {
          if (i === index) {
            return { ...task, task: event.target.value };
          }
          return task;
        });
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
        setTask(newTasks);
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
                removeTask={() => setTask(tasks.filter((_, i) => i !== index))}
                />
            ))}
            <button onClick={addTask} className={style.list__add_btn}>+Add task</button>
        </div>
    )
}

export default Tasks