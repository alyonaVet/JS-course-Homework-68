import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {AppDispatch, RootState} from '../../app/store';
import {fetchTasks, deleteTask} from './ToDoTaskSlice';
import Task from '../../components/Task/Task';

const TaskList: React.FC = () => {
  const tasks = useSelector((state: RootState) => state.todoTask.tasks);
  const dispatch: AppDispatch = useDispatch();


  useEffect(() => {
    dispatch(fetchTasks());
  }, [dispatch]);

  const checkStatus = () => {

  };

  const deleteTaskHandler = async (id:string) => {
    await dispatch(deleteTask(id))
    await dispatch(fetchTasks())
  };

  return (
    <>
      <ul className="list-group">
        {tasks && Object.keys(tasks).length > 0 ? (
          Object.entries(tasks).reverse().map(([id,task]) => (
            <Task
              key={id}
              id={id}
              title={task.title}
              status={task.status}
              onChecked={checkStatus}
              onDelete={()=>deleteTaskHandler(id)}
            />
          ))
        ) : (
          <p className="container mt-5">No tasks yet</p>
        )}
      </ul>
    </>
  );
};

export default TaskList;