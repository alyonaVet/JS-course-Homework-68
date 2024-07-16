import {useDispatch, useSelector} from 'react-redux';
import React, {ChangeEvent, useState} from 'react';
import {AppDispatch, RootState} from '../../app/store';
import {addTask, fetchTasks} from '../../containers/ToDoTask/ToDoTaskSlice';

const TaskForm: React.FC = () => {
  const [task, setTask] = useState('');
  const tasksLoading = useSelector((state: RootState) => state.todoTask.loading);

  const dispatch: AppDispatch = useDispatch();

  const onTaskChange = (event: ChangeEvent<HTMLInputElement>) => {
    setTask((prevTask) => {
      prevTask = event.target.value;
      return prevTask;
    });
  };

  const onFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await dispatch(addTask(task));
    await dispatch(fetchTasks());
    setTask('');
  };

  return (
    <div className="container mt-5">
      <h4>{tasksLoading ? 'Loading...' : 'Add new task'}</h4>
      <form className="row mt-3 align-items-center" onSubmit={onFormSubmit}>
        <div className="col-6">
          <input
            type="text"
            name="task"
            id="task"
            className="form-control"
            required
            onChange={onTaskChange}
            value={task}
            placeholder="New task"
          />
        </div>
        <div className="col-auto">
          <button type="submit" className="btn btn-primary px-3">Add</button>
        </div>
      </form>
    </div>
  );
};

export default TaskForm;