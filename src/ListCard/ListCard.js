import React from "react";
import "./ListCard.css";
import Card from "@material-ui/core/Card";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import EditIcon from "@material-ui/icons/Edit";
import { NavLink } from "react-router-dom";
import CardContent from "@material-ui/core/CardContent";
import InputForm from "../InputForm/InputForm";
import useToggle from "../ReusableHooks/useToggle";
import HistoryIcon from "@material-ui/icons/History";

const useStyles = makeStyles({
  root: {
    width: "100%",
    height: "100%",
    border: "1px solid darkolivegreen",
    display: "flex",
    flexWrap: "wrap",
    textDecoration: "none",
  },
  listDetail: {
    width: "100%",
    fontFamily: "serif",
    minHeight: "2rem",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    wordBreak: "break-all",
  },
  listDetailTitle: {
    width: "75%",
    fontWeight: "bold",
    fontSize: "1.25rem",
    paddingBottom: "0.25rem",
  },
  content: {
    height: "calc(100% - 3rem)",
    padding: "0 !important",
    textDecoration: "none",
  },
});

const ListCard = (props) => {
  const classes = useStyles();
  const list = props.listItem;
  const [isEditMode, toggleIsEditMode] = useToggle(false);
  const dispatch = props.dispatch;

  /**
   * Handler to toggle the list-title edit.
   */
  const handletoggleEditMode = () => {
    toggleIsEditMode();
  };

  /**
   * Handler to modify the list-title.
   */
  const handleModifyListTitle = (inputValue) => {
    dispatch({
      type: "UPDATE_LIST_TITLE",
      inputValue: inputValue,
      id: list.id,
    });
    //Toggle to Normal mode post submit.
    toggleIsEditMode();
  };

  const generateEditModeHeaderJSX = () => {
    return (
      <>
        <div className="ListCard-header-input-wrapper">
          <InputForm
            variant="standard"
            submitHandler={handleModifyListTitle}
            initialValue={list.title}
            active
          />
        </div>
        <div
          className="ListCard-list-item-toggle-edit-icon-wrapper"
          onClick={handletoggleEditMode}
          title="Undo"
        >
          <HistoryIcon />
        </div>
      </>
    );
  };

  const generateDisplayModeHeaderJSX = () => {
    return (
      <>
        <Typography
          className={`${classes.listDetail} ${classes.listDetailTitle}`}
        >
          {list.title}
        </Typography>
        <div
          className="ListCard-list-item-toggle-edit-icon-wrapper"
          onClick={handletoggleEditMode}
          title="Edit"
        >
          <EditIcon />
        </div>
      </>
    );
  };

  return (
    <Card className={classes.root}>
      <div className="ListCard-list-item-title-header">
        {isEditMode
          ? generateEditModeHeaderJSX()
          : generateDisplayModeHeaderJSX()}
      </div>

      <CardContent
        component={NavLink}
        to={`/tasks/${list.id}`}
        exact
        className={classes.content}
      >
        <div className="ListCard-list-item-details-container">
          <Typography className={classes.listDetail}>
            {list.completedTasks} completed of {list.tasks} tasks
          </Typography>
          <Typography className={classes.listDetail}>
            {list.completedSteps} completed of {list.steps} steps
          </Typography>
          <Typography className={classes.listDetail}>
            {list.starred} tasks starred
          </Typography>
        </div>
      </CardContent>
    </Card>
  );
};

export default ListCard;
