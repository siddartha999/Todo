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
  let tasksList = props.tasksList;
  let dispatch = props.dispatch;
  const [displayTaskDetails, setDisplayTaskDetails] = useState(false);
  const isStarredMode = props.starredMode;
  const listID = props.listID;
  const [selectedTaskID, setSelectedTaskID] = useState(null);

  if (!tasksList || !dispatch) {
    //If the tasksList, dispatch aren't retrieved from props i.e, not in starred or list-mode(for now)
    //retrieve them through the reducer.
    [tasksList, dispatch] = TasksReducer();
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
   * Function to delete the task and update the selected task to
   * the next ID: if it's available or
   * the previous ID: if it's available or
   * close the task-details sidebar.
   */
  const deleteTask = (taskID) => {
    if (tasksList.length === 1) {
      //If there is only-one task, there is no need to display the task-details section.
      setDisplayTaskDetails(false);
      dispatch({ type: "DELETE_TASK", id: taskID });
      return;
    }

    let index = -1;

    //retrieve the index of the task-to-be-deleted.
    for (let task of tasksList) {
      index++;
      if (task.id === taskID) {
        break;
      }
    }

    //update the selectedTaskID accordingly.
    if (index < tasksList.length) {
      if (index + 1 === tasksList.length) {
        //If the last task-item is being deleted, set the selectedTaskID to the previous task.
        index--;
      } else {
        index++;
      }
      setSelectedTaskID(tasksList[index].id);
    }

    dispatch({ type: "DELETE_TASK", id: taskID });
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
      <TaskDetails
        details={taskDetailsObj}
        dispatch={dispatch}
        deleteTask={deleteTask}
        closeTaskDetailsSection={closeTaskDetailsSection}
      />
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
          />
        </div>
        <div className="Tasks-task-list-container">
          {tasksList.map((task) => (
            <Task
              key={task.id}
              details={task}
              dispatch={dispatch}
              displayTaskDetailsSection={displayTaskDetailsSection}
            />
          ))}
        </div>
      </div>
      <div
        className={`Tasks-side-content ${
          !displayTaskDetails ? "no-width" : null
        }`}
      >
        {displayTaskDetails && generateTasksDetailsSidebarJSX()}
      </div>
    </div>
  );
};

export default Tasks;
