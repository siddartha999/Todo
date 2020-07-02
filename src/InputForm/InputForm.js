/**
 * Renders an input form along with its value as a state.
 * The input form can be customized by passing in the variant required as a prop.
 * Receives the dispatcher as a prop, and calls that with an object containing appropriate arguments.
 */

import React, { useState, forwardRef, createRef, useEffect } from "react";
import "./InputForm.css";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import AddSharpIcon from "@material-ui/icons/AddSharp";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    alignItems: "flex-end",
    width: "100%",
    "& > *": {
      width: "100%",
    },
    "& .MuiInputBase-root.MuiFilledInput-root.MuiFilledInput-underline.MuiInputBase-formControl": {
      backgroundColor: "rgb(244, 244, 244)",
    },
    "& textarea.MuiInputBase-input.MuiInput-input.MuiInputBase-inputMultiline.MuiInput-inputMultiline": {
      height: "",
    },
  },
  addIcon: {
    width: "2rem",
    cursor: "pointer",
    paddingBottom: "0.25rem",
  },
}));

const InputForm = forwardRef((props, ref) => {
  const classes = useStyles();
  const [inputValue, setInputValue] = useState("");
  const variant = props.variant || "outlined";
  const placeholderLabel = props.placeholderLabel || "";
  const displayAddIcon = props.displayAddIcon;
  const additionalInfo = props.additionalInfo;
  const isActive = props.active;
  const isMultiline = props.multiline;

  useEffect(() => {
    //Initialized the input value here because the value is persisted in-between the re-renders
    //which isn't ideal because it displays the same value every-time, which is incorrect.
    //For eg: While navigating through task-details one after the other, the task name
    //will be shown the same, because the state is already initialized, which is absolutely incorrect.
    setInputValue(props.initialValue);
  }, [props.initialValue]);

  if (!ref) {
    ref = createRef();
  }

  const handleChange = (event) => {
    setInputValue(event.target.value);
  };

  useEffect(() => {
    //If the inputForm is to be focussed during the mounting stage.
    if (isActive && ref) {
      ref.current.focus();
    }
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    //Trigger the submit handler along with the corresponding arguments.
    props.submitHandler(inputValue, additionalInfo);
    if (!props.noReset) {
      setInputValue("");
    }
  };

  const handleAddIconClicked = () => {
    if (ref) {
      ref.current.focus();
    }
  };

  const generateSubmitButtonJSX = () => {
    return (
      <div
        className={`InputForm-multiline-submit-button-wrapper ${props.callerComponent}`}
      >
        <Button
          variant="contained"
          color="primary"
          size={props.submitButtonSize || "small"}
          onClick={handleSubmit}
        >
          Submit
        </Button>
      </div>
    );
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
        value={inputValue || ""}
        onChange={handleChange}
        inputRef={ref}
        multiline={isMultiline}
      />

      {isMultiline && generateSubmitButtonJSX()}
    </form>
  );
});

export default InputForm;
