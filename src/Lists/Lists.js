import React, { useState, useEffect } from "react";
import "./Lists.css";
import useListsReducer from "./Lists.reducer";
import Card from "@material-ui/core/Card";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import TasksReducer from "../Tasks/Tasks.reducer";
import InputForm from "../InputForm/InputForm";
import { NavLink } from "react-router-dom";

const useStyles = makeStyles({
  root: {
    width: "100%",
    height: "100%",
    border: "1px solid darkolivegreen",
    display: "flex",
    flexWrap: "wrap",
    alignContent: "center",
    textDecoration: "none",
  },
  listDetail: {
    width: "100%",
    fontFamily: "serif",
    height: "2rem",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    wordBreak: "break-all",
  },
  listDetailTitle: {
    fontWeight: "bold",
    fontSize: "1.25rem",
    paddingBottom: "1rem",
  },
});

const Lists = () => {
  const classes = useStyles();
  const [lists, listsDispatch] = useListsReducer([]);
  const [tasksList, tasksDispatch] = TasksReducer();
  const [listDetails, setListDetails] = useState([]);

  useEffect(() => {
    //retrieve individual tasks for every list.
    const details = [];
    for (let list of lists) {
      const listID = list.id;
      const listName = list.listName;
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
        name: listName,
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
          <Card
            className={classes.root}
            component={NavLink}
            to={`/tasks/${list.id}`}
            exact
          >
            <Typography
              className={`${classes.listDetail} ${classes.listDetailTitle}`}
            >
              {list.name}
            </Typography>
            <Typography className={classes.listDetail}>
              {list.completedTasks} completed of {list.tasks} tasks
            </Typography>
            <Typography className={classes.listDetail}>
              {list.completedSteps} completed of {list.steps} steps
            </Typography>
            <Typography className={classes.listDetail}>
              {list.starred} tasks starred
            </Typography>
          </Card>
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
