/**
 * Renders all the tasks.
 *
 * Uses TasksReducer to maintain the tasks state at one location.
 *
 * Renders inputForm and individual tasks by passing in the appropriate props.
 */

import React, { useContext } from "react";
import "./Tasks.css";
import TasksReducer from "./Tasks.reducer";
import InputForm from "../InputForm/InputForm";
import Task from "../Task/Task";
import { StarredModeContext } from "../Starred/Starred.context";

const Tasks = (props) => {
  const title = props.title || "Tasks";
  const [tasksList, dispatch] = TasksReducer();
  const isStarredMode = useContext(StarredModeContext);
  let renderList = tasksList;
  if (isStarredMode) {
    //Render only the starred tasks
    //This logic is written here rather than in the dispatcher to avoid
    //an additional call to the dispatcher, which would trigger an infinite-render-loop.
    //tasks(starredMode) -> dispatcher(changes state) -> tasks(starredMode) -> dispatcher(changes state) and so on.....
    renderList = tasksList.filter((task) => task.isStarred);
  }
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
        {renderList.map((task) => (
          <Task
            key={task.id}
            value={task.task}
            isStarred={task.isStarred}
            dispatch={dispatch}
            id={task.id}
          />
        ))}
      </div>
    </div>
  );
};

export default Tasks;
