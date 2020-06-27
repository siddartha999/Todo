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
  title: {
    fontFamily: "cursive",
    overflow: "hidden",
    flex: 8,
    wordBreak: "break-word",
  },
  content: {
    display: "flex",
  },
});

const Task = (props) => {
  const taskValue = props.value;
  const classes = useStyles();
  const isStarred = props.isStarred;
  const dispatch = props.dispatch;
  const taskID = props.id;

  const handleToggleStarred = (event) => {
    event.preventDefault();
    dispatch({
      type: "TOGGLE_TASK_STARRED",
      id: taskID,
    });
  };

  return (
    <div className="Task">
      <Card className={classes.root}>
        <CardContent className={classes.content}>
          <Typography className={classes.title}>{taskValue}</Typography>
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
