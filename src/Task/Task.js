import React from "react";
import "./Task.css";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import StarBorderSharpIcon from "@material-ui/icons/StarBorderSharp";

const useStyles = makeStyles({
  root: {
    minWidth: 275,
    border: "1px solid aliceblue",
    marginBottom: "1rem",
  },
  title: {
    color: "black",
    fontFamily: "cursive",
    width: "95%",
  },
  content: {
    display: "flex",
  },
});

const Task = (props) => {
  const taskValue = props.value;
  const classes = useStyles();

  return (
    <div className="Task">
      <Card className={classes.root}>
        <CardContent className={classes.content}>
          <Typography className={classes.title} color="textSecondary">
            {taskValue}
          </Typography>
          <StarBorderSharpIcon />
        </CardContent>
      </Card>
    </div>
  );
};

export default Task;
