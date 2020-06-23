import React, { useState, useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import "./TodoInput.css";
import { TodoDispatcherContext } from "../Todo/Todo.context";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
      width: "25ch",
    },
  },
  margin: {
    margin: theme.spacing(1),
  },
}));

const TodoInput = () => {
  const classes = useStyles();
  const [todoValue, setTodoValue] = useState("");
  const todoDispatcher = useContext(TodoDispatcherContext);

  const handleChange = (event) => {
    setTodoValue(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    todoDispatcher({ type: "ADD_TODO_ITEM", value: todoValue });
    setTodoValue("");
  };

  return (
    <div className="TodoInput-wrapper">
      <form
        className={classes.root}
        noValidate
        autoComplete="off"
        onSubmit={handleSubmit}
      >
        <TextField
          id="standard-basic"
          placeholder="Enter Todo..."
          value={todoValue}
          onChange={handleChange}
        />
      </form>
      <Button
        variant="contained"
        size="small"
        color="primary"
        className={classes.margin}
        onClick={handleSubmit}
      >
        Add Todo
      </Button>
    </div>
  );
};

export default TodoInput;
