// src/pages/TaskList.jsx

import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getTasks, addTask } from '../redux/tasksSlice';
import TaskItem from '../components/TaskItem';

const TaskList = () => {
  const dispatch = useDispatch();
  const { items: tasks, status, error } = useSelector((state) => state.tasks);

  // Fetch tasks on component mount
  useEffect(() => {
    if (status === 'idle') {
      dispatch(getTasks());
    }
  }, [status, dispatch]);

  // Handle new task creation (for demo purposes)
  const handleAddTask = () => {
    const title = prompt('Enter task title:');
    if (title) {
      dispatch(addTask({ title, description: '', isCompleted: false }));
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>Learning Tasks</h1>
      <button onClick={handleAddTask}>Add New Task</button>
      {status === 'loading' && <p>Loading tasks...</p>}
      {status === 'failed' && <p>Error: {error}</p>}
      {tasks.length > 0 ? (
        tasks.map((task) => <TaskItem key={task.id} task={task} />)
      ) : (
        <p>No tasks available</p>
      )}
    </div>
  );
};

export default TaskList;
