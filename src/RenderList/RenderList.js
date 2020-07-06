import React from "react";
import Tasks from "../Tasks/Tasks";
import useListsReducer from "../Lists/Lists.reducer";
import TasksReducer from "../Tasks/Tasks.reducer";
import { Redirect } from "react-router-dom";

const RenderList = (props) => {
  const listID = props.listID;
  let title;
  const [lists] = useListsReducer();
  const [tasksList, dispatch] = TasksReducer();

  //retrieve the name of List.
  for (let listItem of lists) {
    if (listItem.id === listID) {
      title = listItem.listTitle;
      break;
    }
  }

  //Re-directing to tasks page if the specified list isn't available.
  if (!title) {
    return <Redirect to="/tasks" />;
  }

  let currentListTasks = [];

  //retrieve the tasks pertaining to the current-list.
  currentListTasks = tasksList.filter((task) => task.listID === listID);

  return (
    <Tasks
      listID={listID}
      title={title}
      tasksList={currentListTasks}
      dispatch={dispatch}
    />
  );
};

export default RenderList;
