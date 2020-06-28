/**
 * Renders all the tasks.
 *
 * Uses TasksReducer to maintain the tasks state at one location.
 *
 * Renders inputForm and individual tasks by passing in the appropriate props.
 */

import React, { useState } from "react";
import "./Tasks.css";
import TasksReducer from "./Tasks.reducer";
import InputForm from "../InputForm/InputForm";
import Task from "../Task/Task";
import TaskDetails from "../TaskDetails/TaskDetails";

const Tasks = (props) => {
  const title = props.title || "Tasks";
  const [tasksList, dispatch] = TasksReducer([]);
  const [displayTaskDetails, setDisplayTaskDetails] = useState(false);
  const isStarredMode = props.starredMode;
  const listID = props.listID;
  let renderList = tasksList;
  const [selectedTaskID, setSelectedTaskID] = useState(null);

  //Render either starred tasks or tasks belonging to a certain list.
  if (isStarredMode) {
    renderList = tasksList.filter((task) => task.isStarred);
  } else if (listID) {
    renderList = tasksList.filter((task) => task.listID === listID);
  } else {
    //filters the tasks which do not belong to any list.
    renderList = tasksList.filter((task) => !task.listID);
  }

  const displayTaskDetailsSection = (taskID) => {
    //Displays the task-details section.
    setDisplayTaskDetails(true);
    //Update the current selected taskID.
    setSelectedTaskID(taskID);
  };

  const closeTaskDetailsSection = () => {
    //Closes the task-details section.
    setDisplayTaskDetails(false);
  };

  /**
   * Retrieves the details of the task for the task-details page to generate the content.
   */
  const generateTasksDetailsSidebarJSX = () => {
    if (!selectedTaskID) {
      return <p>Failed to load task details!</p>;
    }

    let taskDetailsObj = {};
    for (let task of tasksList) {
      if (task.id === selectedTaskID) {
        taskDetailsObj = task;
        break;
      }
    }

    return (
      <div className="Tasks-side-content">
        <TaskDetails
          details={taskDetailsObj}
          dispatch={dispatch}
          closeTaskDetailsSection={closeTaskDetailsSection}
        />
      </div>
    );
  };

  return (
    <div className="Tasks">
      <div className="Tasks-main-content">
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
            displayAddIcon
          />
        </div>
        <div className="Tasks-task-list-container">
          {renderList.map((task) => (
            <Task
              key={task.id}
              details={task}
              dispatch={dispatch}
              displayTaskDetailsSection={displayTaskDetailsSection}
            />
          ))}
        </div>
      </div>
      {displayTaskDetails && generateTasksDetailsSidebarJSX()}
    </div>
  );
};

export default Tasks;
