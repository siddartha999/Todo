/**
 * Renders an input form along with its value as a state.
 * The input form can be customized by passing in the variant required as a prop.
 * Receives the dispatcher as a prop, and calls that with an object containing appropriate arguments.
 */

import React, { useState, useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import { StarredModeContext } from "../Starred/Starred.context";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    "& > *": {
      width: "100%",
    },
  },
}));

const InputForm = (props) => {
  const classes = useStyles();
  const [inputValue, setInputValue] = useState("");
  const dispatch = props.dispatch;
  const variant = props.variant || "outlined";
  const placeholderLabel = props.placeholderLabel || "Enter a value";
  const actionType = props.actionType || "ADD";
  const isStarredMode = useContext(StarredModeContext);

  const handleChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch({
      type: actionType,
      inputValue: inputValue,
      starred: isStarredMode,
    });
    setInputValue("");
  };

  return (
    <form
      className={classes.root}
      noValidate
      autoComplete="off"
      onSubmit={handleSubmit}
    >
      <TextField
        id="outlined-basic"
        label={placeholderLabel}
        variant={variant}
        value={inputValue}
        onChange={handleChange}
      />
    </form>
  );
};

export default InputForm;
