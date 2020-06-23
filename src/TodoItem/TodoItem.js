import React, { useState, useContext } from "react";
import "./TodoItem.css";
import { makeStyles } from "@material-ui/core/styles";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import CancelIcon from "@material-ui/icons/Cancel";
import SaveIcon from "@material-ui/icons/Save";
import Checkbox from "@material-ui/core/Checkbox";
import Card from "@material-ui/core/Card";
import { TodoDispatcherContext } from "../Todo/Todo.context";
import TextField from "@material-ui/core/TextField";
import useToggle from "../ReusableHooks/useToggle";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    width: "70%",
    minHeight: "3rem",
    justifyContent: "center",
    alignItems: "center",
    border: "1px solid aliceblue",
    marginBottom: "1rem",
  },
}));

const TodoItem = (props) => {
  const todoItemOriginalValue = props.value;
  const [todoItemValue, setTodoItemValue] = useState(props.value);
  const todoItemId = props.id;
  const classes = useStyles();
  const [isTodoItemSelected, toggleIsTodoItemSelected] = useToggle(false);
  const [isEditMode, toggleIsEditMode] = useToggle(false);
  const todoDispatcher = useContext(TodoDispatcherContext);

  const handleDeleteTodoItem = () => {
    todoDispatcher({ type: "REMOVE_INDIVIDUAL_TODO_ITEM", id: todoItemId });
  };

  const handleEditTodoItem = () => {
    toggleIsEditMode();
  };

  const handleSaveTodoItem = () => {
    todoDispatcher({
      type: "EDIT_TODO_ITEM",
      value: todoItemValue,
      id: todoItemId,
    });
    toggleIsEditMode();
  };

  const handleCancelTodoItemEditMode = () => {
    toggleIsEditMode();
    setTodoItemValue(todoItemOriginalValue);
  };

  const handleTodoItemSelected = () => {
    toggleIsTodoItemSelected();
  };

  const handleChange = (event) => {
    setTodoItemValue(event.target.value);
  };

  const editModeTodoItemJSX = (
    <>
      <div className="TodoItem-value-wrapper">
        <TextField
          id="standard-basic"
          placeholder="Enter Todo..."
          value={todoItemValue}
          onChange={handleChange}
          style={{ width: "80%" }}
        />
      </div>
      <div className="TodoItem-actions-wrapper">
        <SaveIcon className="TodoItem-action" onClick={handleSaveTodoItem} />
        <CancelIcon
          className="TodoItem-action"
          onClick={handleCancelTodoItemEditMode}
        />
      </div>
    </>
  );

  const normalModeTodoItemJSX = (
    <>
      <div className="TodoItem-enable-disable-checkbox-wrapper">
        <Checkbox
          checked={isTodoItemSelected}
          onChange={handleTodoItemSelected}
          inputProps={{ "aria-label": "primary checkbox" }}
        />
      </div>
      <div className="TodoItem-value-wrapper">
        <p>{todoItemValue}</p>
      </div>

      <div className="TodoItem-actions-wrapper">
        <DeleteIcon
          className="TodoItem-action"
          onClick={handleDeleteTodoItem}
        />
        <EditIcon className="TodoItem-action" onClick={handleEditTodoItem} />
      </div>
    </>
  );

  return (
    <Card className={classes.root}>
      {isEditMode ? editModeTodoItemJSX : normalModeTodoItemJSX}
    </Card>
  );
};

export default TodoItem;
