import React, { useState, useEffect } from "react";
import "./Lists.css";
import useListsReducer from "./Lists.reducer";
import TasksReducer from "../Tasks/Tasks.reducer";
import InputForm from "../InputForm/InputForm";
import ListCard from "../ListCard/ListCard";

const Lists = () => {
  const [lists, listsDispatch] = useListsReducer([]);
  const [tasksList, tasksDispatch] = TasksReducer();
  const [listDetails, setListDetails] = useState([]);

  useEffect(() => {
    //retrieve individual tasks for every list.
    const details = [];
    for (let list of lists) {
      const listID = list.id;
      const listTitle = list.listTitle;
      let totalTasks = 0;
      let totalSteps = 0;
      let completedTasks = 0;
      let completedSteps = 0;
      let starredTasks = 0;
      for (let task of tasksList) {
        if (task.listID === listID) {
          //Retrieve the tasks and steps info for the list in action.
          totalTasks++;
          //Update the count of completed tasks for a list.
          if (task.isComplete) completedTasks++;
          //Update the steps of tasks os a list.
          totalSteps += task.steps.length;
          //Update the completed steps.
          for (let step of task.steps) {
            if (step.isComplete) completedSteps++;
          }

          //Update the starred tasks of the list.
          if (task.isStarred) starredTasks++;
        }
      }
      //Store the retrieved info.
      details.push({
        id: listID,
        title: listTitle,
        tasks: totalTasks,
        completedTasks: completedTasks,
        steps: totalSteps,
        completedSteps: completedSteps,
        starred: starredTasks,
      });
    }

    setListDetails(details);
  }, [lists]);

  /**
   * Handler to add a list.
   */
  const handleAddList = (inputValue) => {
    listsDispatch({ type: "ADD_LIST_ITEM", inputValue: inputValue });
  };

  const noListsJSX = (
    <div className="Lists-empty-lists">
      <p>No lists available.</p>
    </div>
  );

  const generateListsJSX = () => (
    <div className="Lists-list-items-container">
      {listDetails.map((list) => (
        <div className="Lists-list-item-container" key={list.id}>
          <ListCard
            listItem={list}
            listsDispatch={listsDispatch}
            tasksDispatch={tasksDispatch}
          />
        </div>
      ))}
    </div>
  );

  return (
    <div className="Lists">
      <div className="Lists-input-form-container">
        <InputForm
          placeholderLabel="Add a list"
          variant="outlined"
          submitHandler={handleAddList}
        />
      </div>
      {lists && lists.length ? generateListsJSX() : noListsJSX}
    </div>
  );
};

export default Lists;
