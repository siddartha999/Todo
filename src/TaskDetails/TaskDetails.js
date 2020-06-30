import React from "react";
import "./TaskDetails.css";
import Card from "@material-ui/core/Card";
import InputForm from "../InputForm/InputForm";
import { makeStyles } from "@material-ui/core/styles";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import DeleteSharpIcon from "@material-ui/icons/DeleteSharp";
import CloseIcon from "@material-ui/icons/Close";
import RadioButtonUncheckedIcon from "@material-ui/icons/RadioButtonUnchecked";
import CheckCircleOutlineIcon from "@material-ui/icons/CheckCircleOutline";
import Emitter from "../services/Emitter";

const useStyles = makeStyles((theme) => ({
  headerTitle: {
    height: "5rem",
    width: "90%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  contentSteps: {
    width: "90%",
    paddingBottom: "1rem",
    minHeight: "7rem",
    display: "flex",
    flexWrap: "wrap",
  },
  footer: {
    width: "90%",
    height: "100%",
    display: "flex",
    justifyContent: "space-between",
  },
  exitIcon: {
    cursor: "pointer",
  },
}));

const TaskDetails = (props) => {
  const classes = useStyles();
  const taskName = props.details.task;
  const taskID = props.details.id;
  const steps = props.details.steps || [];
  const dispatch = props.dispatch;

  const handleExitIconClicked = () => {
    props.closeTaskDetailsSection();
  };

  /**
   * This function will be passed to the confirmation dialog as a success handler.
   * This function will be executed after the user confirms his action.
   * Dispatch isn't called here directly because, the next selectedTaskID needs to be evaluated, which
   * should take place in the "Tasks" component, as it stores the list of all the tasks.
   */
  const handleDeleteTaskIconClicked = () => {
    props.deleteTask(taskID);
  };

  /**
   * Handler to delete the task.
   *Emits an event to the confirmation dialog, to confirm the user's action.
   */
  const handleDeleteIconClicked = () => {
    Emitter.emit("DISPLAY_CONFIRMATION_DIALOG", {
      content: `"${taskName}" will be deleted permanently.`,
      handler: handleDeleteTaskIconClicked,
    });
  };

  /**
   * Handler to delete a step of a task.
   */
  const handleDeleteStepClicked = (event) => {
    const stepID = event.target.getAttribute("value");
    dispatch({
      type: "DELETE_STEP",
      taskID: taskID,
      stepID: stepID,
    });
  };

  /**
   * Handler to toggle the completion status of a step.
   */
  const handleToggleComplete = (event) => {
    const stepID = event.target.getAttribute("value");
    dispatch({
      type: "TOGGLE_STEP_COMPLETION",
      taskID: taskID,
      stepID: stepID,
    });
  };

  return (
    <div className="TaskDetails">
      <div className="TaskDetails-header-section">
        <Card className={classes.headerTitle}>
          <div className="TaskDetails-header-title-wrapper">
            <InputForm
              variant="standard"
              actionType="UPDATE_TASK_NAME"
              dispatch={dispatch}
              taskID={taskID}
              initialValue={taskName}
              placeholderLabel="Update task"
              noReset
            />
          </div>
        </Card>
      </div>

      <div className="TaskDetails-content-section">
        <Card className={classes.contentSteps}>
          <div className="TaskDetails-content-steps-container">
            {steps.map((stepItem) => (
              <div
                className="TaskDetails-content-step-container"
                key={stepItem.id}
              >
                <div className="TaskDetails-toggle-completed-icon-container">
                  {stepItem.isComplete ? (
                    <CheckCircleOutlineIcon
                      onClick={handleToggleComplete}
                      value={stepItem.id}
                    />
                  ) : (
                    <RadioButtonUncheckedIcon
                      onClick={handleToggleComplete}
                      value={stepItem.id}
                    />
                  )}
                </div>

                <div className="TaskDetails-content-step-input-container">
                  <InputForm
                    variant="standard"
                    actionType="UPDATE_STEP"
                    dispatch={dispatch}
                    taskID={taskID}
                    initialValue={stepItem.step}
                  />
                </div>
                <div
                  className="TaskDetails-content-step-remove-icon-container"
                  title="Delete step"
                >
                  <CloseIcon
                    onClick={handleDeleteStepClicked}
                    value={stepItem.id}
                  />
                </div>
              </div>
            ))}
          </div>
          <div className="TaskDetails-content-add-step-container">
            <InputForm
              variant="standard"
              placeholderLabel="Add step"
              actionType="ADD_STEP"
              dispatch={dispatch}
              taskID={taskID}
              displayAddIcon
            />
          </div>
        </Card>
      </div>

      <div className="TaskDetails-footer-actions-section">
        <Card className={classes.footer}>
          <div className="TaskDetails-footer-action-wrapper TaskDetails-footer-close-action">
            <ExitToAppIcon
              className={classes.exitIcon}
              onClick={handleExitIconClicked}
            />
          </div>
          <div className="TaskDetails-footer-action-wrapper TaskDetails-footer-delete-action">
            <DeleteSharpIcon
              className={classes.exitIcon}
              onClick={handleDeleteIconClicked}
            />
          </div>
        </Card>
      </div>
    </div>
  );
};

export default TaskDetails;
