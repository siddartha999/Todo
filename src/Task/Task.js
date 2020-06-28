/**
 * Renders the individual Task.
 *
 * Displays the task along with whether it has been starred or not.
 */

import React from "react";
import "./Task.css";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import StarBorderSharpIcon from "@material-ui/icons/StarBorderSharp";
import StarSharpIcon from "@material-ui/icons/StarSharp";

const useStyles = makeStyles({
  root: {
    width: "100%",
    border: "1px solid aliceblue",
    marginBottom: "1rem",
  },
  content: {
    display: "flex",
    paddingBottom: "16px !important",
  },
  title: {
    fontFamily: "sans-serif",
    overflow: "hidden",
    flex: 8,
    wordBreak: "break-word",
  },
});

const Task = (props) => {
  const taskValue = props.details.task;
  const classes = useStyles();
  const isStarred = props.details.isStarred;
  const dispatch = props.dispatch;
  const taskID = props.details.id;

  const handleToggleStarred = (event) => {
    event.preventDefault();
    dispatch({
      type: "TOGGLE_TASK_STARRED",
      id: taskID,
    });
  };

  const updateDisplayTaskDetails = () => {
    //Triggers the display of task-details.
    props.displayTaskDetailsSection(taskID);
  };

  return (
    <div className="Task">
      <Card className={classes.root}>
        <CardContent className={classes.content}>
          <Typography
            className={classes.title}
            onClick={updateDisplayTaskDetails}
          >
            {taskValue}
          </Typography>

          <div className="Task-star-icon-wrapper">
            {isStarred ? (
              <StarSharpIcon onClick={handleToggleStarred} />
            ) : (
              <StarBorderSharpIcon onClick={handleToggleStarred} />
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Task;
