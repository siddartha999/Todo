import React from "react";
import Tasks from "../Tasks/Tasks";
import TasksReducer from "../Tasks/Tasks.reducer";

const Starred = () => {
  const [tasksList, dispatch] = TasksReducer();
  const title = "Starred";

  let starredTasksList;
  //retrieve the starred tasks.
  starredTasksList = tasksList.filter((task) => task.isStarred);

  return (
    <Tasks
      title={title}
      tasksList={starredTasksList}
      dispatch={dispatch}
      starredMode
    />
  );
};

export default Starred;
