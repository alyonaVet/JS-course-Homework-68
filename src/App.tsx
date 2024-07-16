import AddTaskForm from './components/AddTaskForm/AddTaskForm';
import TaskList from './containers/ToDoTask/TaskList';

const App = () => {
    return (
    <div className="container">
      <AddTaskForm />
      <TaskList />
    </div>
  )
};

export default App;

