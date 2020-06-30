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
import Switch from "@material-ui/core/Switch";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import useToggle from "../ReusableHooks/useToggle";

const Tasks = (props) => {
  const title = props.title || "Tasks";
  let tasksList = props.tasksList;
  let dispatch = props.dispatch;
  const [displayTaskDetails, setDisplayTaskDetails] = useState(false);
  const isStarredMode = props.starredMode;
  const listID = props.listID;
  const [selectedTaskID, setSelectedTaskID] = useState(null);
  const [displayCompletedTasks, toggleDisplayCompletedTasks] = useToggle(false);

  if (!tasksList || !dispatch) {
    //If the tasksList, dispatch aren't retrieved from props i.e, not in starred or list-mode(for now)
    //retrieve them through the reducer.
    [tasksList, dispatch] = TasksReducer();
  }

  //If the mode is set to display the completed tasks.
  if (displayCompletedTasks) {
    //filtering out the completed tasks.
    tasksList = tasksList.filter((task) => task.isComplete);
  } else {
    //filtering out the pending tasks.
    tasksList = tasksList.filter((task) => !task.isComplete);
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
   * Handler to add a task.
   */
  const handleAddTask = (inputValue) => {
    dispatch({
      type: "ADD_TASK",
      inputValue: inputValue,
      starred: isStarredMode,
      listID: listID,
      isComplete: displayCompletedTasks,
    });
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

  /**
   * Handler to toggle the display between completed and non-completed tasks.
   */
  const handleToggleDisplayCompletedTasks = () => {
    toggleDisplayCompletedTasks();
    //Closing the task-details section, in case if it is open, as the current selected
    //task will be present either in pending or completed state, but not both.
    //Therefore, to prevent misleading the user, during toggle, the task-details
    //section will be closed.
    setDisplayTaskDetails(false);
  };

  return (
    <div className="Tasks">
      <div className="Tasks-main-content">
        <div className="Tasks-main-content-header">
          <div className="Tasks-title-container">
            <p>{title}</p>
          </div>
          <div className="Tasks-header-toggle-display-completed-tasks-container">
            <FormControlLabel
              control={
                <Switch
                  checked={displayCompletedTasks}
                  onChange={handleToggleDisplayCompletedTasks}
                  size="small"
                />
              }
              label="Completed tasks"
            />
          </div>
        </div>

        <div className="Tasks-input-task-form-container">
          <InputForm
            placeholderLabel="Add a task"
            actionType="ADD_TASK"
            variant="outlined"
            submitHandler={handleAddTask}
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
