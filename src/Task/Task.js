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
    height: "100%",
    border: "1px solid darkolivegreen",
  },
  content: {
    display: "flex",
    alignItems: "center",
    padding: "0 !important",
    height: "100%",
    width: "99%",
    minHeight: "3rem",
  },
  title: {
    fontFamily: "sans-serif",
    overflow: "hidden",
    wordBreak: "break-word",
  },
  subTaskDetail: {
    fontFamily: "serif",
  },
});

const Task = (props) => {
  const taskValue = props.details.task;
  const classes = useStyles();
  const isStarred = props.details.isStarred;
  const dispatch = props.dispatch;
  const taskID = props.details.id;
  const steps = props.details.steps;

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

  /**
   * Generates the total no.of completed steps(if there are any) for the current task.
   */
  const generateCompletedStepsDetails = () => {
    if (steps && steps.length) {
      const completedSteps = steps.filter((step) => step.isComplete).length;
      return (
        <Typography className={classes.subTaskDetail}>
          {completedSteps} of {steps.length}
        </Typography>
      );
    }
    return;
  };

  return (
    <div className="Task">
      <Card className={classes.root}>
        <CardContent className={classes.content}>
          <div
            className="Task-details-wrapper"
            onClick={updateDisplayTaskDetails}
          >
            <div className="Task-name-wrapper">
              <Typography className={classes.title}>{taskValue}</Typography>
            </div>
            <div className="Task-additional-details-wrapper">
              <div className="Task-sub-tasks-details-wrapper">
                {generateCompletedStepsDetails()}
              </div>
            </div>
          </div>

          <div className="Task-icon-wrapper">
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
