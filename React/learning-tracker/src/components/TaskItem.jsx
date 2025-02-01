import PropTypes from 'prop-types';
import { useDispatch } from "react-redux";
import { completeTask } from "../redux/tasksSlice";
// import { completeTask } from "../slices/tasksSlice";


const TaskItem = ({ task }) => {
    const dispatch = useDispatch();
    const handleComplete = () => {
        dispatch(completeTask(task.id));
      };

  return (
    <div style={{ border: '1px solid #ccc', padding: '10px', margin: '10px 0' }}>
      <h3>{task.title}</h3>
      <p>{task.description}</p>
      <p>Status: {task.isCompleted ? "✅ Completed" : "⏳ Not Completed"}</p>
      {!task.isCompleted && (
        <button onClick={handleComplete}>Complete</button>
      )}
    </div>
  );
};

TaskItem.propTypes = {
    task: PropTypes.shape({
        id: PropTypes.number,
      title: PropTypes.string.isRequired,
      description: PropTypes.string,
      isCompleted: PropTypes.bool.isRequired,
    }),
  };

export default TaskItem;