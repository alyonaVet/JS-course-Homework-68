import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {AppDispatch, RootState} from '../../app/store';
import {fetchTasks, deleteTask, updateTask, TaskType} from './ToDoTaskSlice';
import Task from '../../components/Task/Task';

const TaskList: React.FC = () => {
  const tasks = useSelector((state: RootState) => state.todoTask.tasks);
  const dispatch: AppDispatch = useDispatch();


  useEffect(() => {
    dispatch(fetchTasks());
  }, [dispatch]);

  const deleteTaskHandler = async (id: string) => {
    await dispatch(deleteTask(id));
    await dispatch(fetchTasks());
  };

  const checkTaskHandler = async (id: string, task: TaskType) => {
    await dispatch(updateTask({taskId: id, task: task}));
    await dispatch(fetchTasks());
  };

  return (
    <>
      <ul className="list-group mt-4">
        {tasks && Object.keys(tasks).length > 0 ? (
          Object.entries(tasks).reverse().map(([id, task]) => (
            <Task
              key={id}
              id={id}
              title={task.title}
              status={task.status}
              onChecked={() => checkTaskHandler(id, task)}
              onDelete={() => deleteTaskHandler(id)}
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