import React from "react";
import "./Tasks.css";
import TasksReducer from "./Tasks.reducer";
import InputForm from "../InputForm/InputForm";
import Task from "../Task/Task";

const Tasks = (props) => {
  const title = props.title || "Tasks";
  const [tasksList, dispatch] = TasksReducer([]);

  return (
    <div className="Tasks">
      <div className="Tasks-title-container">
        <p>{title}</p>
      </div>
      <div className="Tasks-add-task-form-container">
        <InputForm
          dispatch={dispatch}
          placeholderLabel="Add a task"
          actionType="ADD_TASK"
          variant="outlined"
        />
      </div>
      <div className="Tasks-task-list-container">
        {tasksList.map((task) => (
          <Task key={task.id} value={task.task} />
        ))}
      </div>
    </div>
  );
};

export default Tasks;
