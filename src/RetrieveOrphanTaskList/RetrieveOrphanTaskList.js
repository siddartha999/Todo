import React from "react";
import Tasks from "../Tasks/Tasks";
import TasksReducer from "../Tasks/Tasks.reducer";

const RetrieveOrphanTaskList = () => {
  const [tasksList, dispatch] = TasksReducer();

  //retrieve the orphan-tasks(tasks which do not belong to any list).
  const orphanTaskList = tasksList.filter((task) => !task.listID);

  return <Tasks tasksList={orphanTaskList} dispatch={dispatch} />;
};

export default RetrieveOrphanTaskList;
