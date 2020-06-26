import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    "& > *": {
      width: "80%",
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

  const handleChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch({ type: actionType, inputValue: inputValue });
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
