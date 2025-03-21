import style from '../tasks.module.css'

const TaskItem = ({value,isFinished, handleChange, setFinished, removeTask}) =>{
    return(
        <div className={style.list__item}>
            <button onClick={setFinished} className={`${style.list__complete_btn} ${
                isFinished ? style.completed : style.pending
                }`}>✓️</button>
            <input type='text' rows={1} className={style.list__text_area} value={value} onChange={handleChange}></input>
            <button onClick={removeTask} className={style.list__remove_btn}>X</button>
        </div>
    )
}

export default TaskItem