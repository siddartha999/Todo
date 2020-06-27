/**
 * Renders all the tasks.
 *
 * Uses TasksReducer to maintain the tasks state at one location.
 *
 * Renders inputForm and individual tasks by passing in the appropriate props.
 */

import React from "react";
import "./Tasks.css";
import TasksReducer from "./Tasks.reducer";
import InputForm from "../InputForm/InputForm";
import Task from "../Task/Task";

const Tasks = (props) => {
  const title = props.title || "Tasks";
  const [tasksList, dispatch] = TasksReducer([]);
  const isStarredMode = props.starredMode;
  const listID = props.listID;
  let renderList = tasksList;

  //Render either starred tasks or tasks belonging to a certain list.
  if (isStarredMode) {
    renderList = tasksList.filter((task) => task.isStarred);
  } else if (listID) {
    renderList = tasksList.filter((task) => task.listID === listID);
  } else {
    //filters the tasks which do not belong to any list.
    renderList = tasksList.filter((task) => !task.listID);
  }
  return (
    <div className="Tasks">
      <div className="Tasks-title-container">
        <p>{title}</p>
      </div>
      <div className="Tasks-input-task-form-container">
        <InputForm
          dispatch={dispatch}
          listID={listID}
          placeholderLabel="Add a task"
          actionType="ADD_TASK"
          variant="outlined"
          isStarredMode={isStarredMode}
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
