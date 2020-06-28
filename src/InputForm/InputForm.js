/**
 * Renders an input form along with its value as a state.
 * The input form can be customized by passing in the variant required as a prop.
 * Receives the dispatcher as a prop, and calls that with an object containing appropriate arguments.
 */

import React, { useState, forwardRef, createRef } from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import AddSharpIcon from "@material-ui/icons/AddSharp";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    alignItems: "center",
    width: "100%",
    "& > *": {
      width: "100%",
    },
    "& .MuiInputBase-root.MuiFilledInput-root.MuiFilledInput-underline.MuiInputBase-formControl": {
      backgroundColor: "rgb(244, 244, 244)",
    },
  },
  addIcon: {
    width: "2rem",
    cursor: "pointer",
  },
}));

const InputForm = forwardRef((props, ref) => {
  const classes = useStyles();
  const [inputValue, setInputValue] = useState(props.initialValue || "");
  const dispatch = props.dispatch;
  const variant = props.variant || "outlined";
  const placeholderLabel = props.placeholderLabel || "";
  const actionType = props.actionType || "ADD";
  const listID = props.listID;
  const isStarredMode = props.isStarredMode;
  const displayAddIcon = props.displayAddIcon;

  if (!ref) {
    ref = createRef();
  }

  const handleChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch({
      type: actionType,
      inputValue: inputValue,
      starred: isStarredMode,
      listID: listID,
      taskID: props.taskID,
    });
    setInputValue("");
  };

  const handleAddIconClicked = () => {
    if (ref) {
      ref.current.focus();
    }
  };

  return (
    <form
      className={classes.root}
      noValidate
      autoComplete="off"
      onSubmit={handleSubmit}
    >
      {displayAddIcon && (
        <AddSharpIcon
          className={classes.addIcon}
          onClick={handleAddIconClicked}
        />
      )}

      <TextField
        id="outlined-basic"
        label={placeholderLabel}
        variant={variant}
        value={inputValue}
        onChange={handleChange}
        inputRef={ref}
      />
    </form>
  );
});

export default InputForm;
