import React, { useRef, useEffect } from "react";
import "./GroupCard.css";
import { makeStyles } from "@material-ui/core/styles";
import Accordion from "@material-ui/core/Accordion";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import Autocomplete from "@material-ui/lab/Autocomplete";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Chip from "@material-ui/core/Chip";
import Divider from "@material-ui/core/Divider";
import EditIcon from "@material-ui/icons/Edit";
import DeleteSharpIcon from "@material-ui/icons/DeleteSharp";
import HistoryIcon from "@material-ui/icons/History";
import useToggle from "../ReusableHooks/useToggle";
import InputForm from "../InputForm/InputForm";
import Emitter from "../services/Emitter";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    "& .MuiAccordionSummary-content": {
      width: "100%",
    },
    "& .MuiAccordionSummary-expandIcon.MuiIconButton-edgeEnd": {
      marginRight: 0,
    },
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary,
  },
  icon: {
    verticalAlign: "bottom",
    height: 20,
    width: 20,
  },
  details: {
    alignItems: "center",
  },
  column: {
    flexBasis: "33.33%",
  },
  title: {
    width: "65%",
    padding: "0 0.25rem 0 0.75rem",
    "& p": {
      overflow: "hidden",
      textOverflow: "ellipsis",
      whiteSpace: "nowrap",
    },
  },
  secondaryTitle: {
    width: "40%",
    "& p": {
      overflow: "hidden",
      textOverflow: "ellipsis",
      whiteSpace: "nowrap",
    },
  },
  helper: {
    borderLeft: `2px solid ${theme.palette.divider}`,
    padding: theme.spacing(1, 2),
  },
  link: {
    color: theme.palette.primary.main,
    textDecoration: "none",
    "&:hover": {
      textDecoration: "underline",
    },
  },
  chipContainer: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-evenly",
    width: "100%",
  },
  chip: {
    maxWidth: "100%",
    margin: "0.5rem",
  },
}));

const GroupCard = (props) => {
  const classes = useStyles();
  const [isEditMode, toggleIsEditMode] = useToggle(false);
  const groupsDispatch = props.groupsDispatch;
  const listsDispatch = props.listsDispatch;
  const tasksDispatch = props.tasksDispatch;
  const group = props.groupItem;
  const lists = props.lists;
  const selectedLists = useRef([]);

  /**
   * Filtering out the list options.
   * The list should not be displayed in the drop-down if it is already added to the group.
   */
  const filterOptions = (options) => {
    return options.filter((listItem) => listItem.groupID !== group.id);
  };

  /**
   * Handler to toggle the group-title edit.
   */
  const handleToggleEditMode = (event) => {
    event.stopPropagation(); //To prevent the expander from expanding.
    toggleIsEditMode();
  };

  /**
   * Handler to delete the group, along with its contained lists and tasks.
   */
  const handleDeleteGroup = () => {
    groupsDispatch({ type: "DELETE_GROUP", id: group.id });
    //Collect the ID's of lists to be deleted.
    const deletedListIds = new Set();
    for (let list of lists) {
      if (list.groupID === group.id) {
        //Add the to-be deleted list id's to the set.
        deletedListIds.add(list.id);
      }
    }
    listsDispatch({ type: "DELETE_LISTS_OF_A_GROUP", groupID: group.id });
    //Delete the tasks pertaining to the lists in the set.
    tasksDispatch({
      type: "DELETE_TASKS_OF_MULTIPLE_LISTS",
      deletedListIds: deletedListIds,
    });
  };

  /**
   * Handler to confirm the deletion of the group.
   */
  const handleDeleteGroupClicked = (event) => {
    event.stopPropagation(); //To prevent the expander from expanding.
    Emitter.emit("DISPLAY_CONFIRMATION_DIALOG", {
      content: ` "${group.groupTitle}" will be deleted permanently along with its lists.`,
      handler: handleDeleteGroup,
    });
  };

  /**
   * Handler to modify the title of the group.
   */
  const handleModifyGroupTitle = (inputValue) => {
    groupsDispatch({
      type: "UPDATE_GROUP_TITLE",
      id: group.id,
      inputValue: inputValue,
    });
    //Toggle to Normal mode post submit.
    toggleIsEditMode();
  };

  /**
   * Handler to submit the selected lists.
   * @param {*} event
   */
  const handleListsSubmitted = (event) => {
    const selectedListIds = new Set(); //Preferred a Set due to performance issues.
    for (let list of selectedLists.current) {
      //Inserting the Id's of lists in to the set.
      selectedListIds.add(list.id);
    }
    listsDispatch({
      type: "ADD_LISTS_TO_GROUP",
      selectedListIds: selectedListIds,
      groupID: group.id,
    });
    //clear the selected list.
    selectedLists.current = [];
    //clear the autocomplete field.
    document.querySelector(".MuiAutocomplete-clearIndicatorDirty").click();
  };

  /**
   * Handler to update the selected lists based on the user's action.
   * @param {*} currentSelectedListArray - the current selected lists to be added.
   */
  const handleListSelectionChanged = (event, currentSelectedListArray) => {
    selectedLists.current = currentSelectedListArray;
  };

  /**
   * Handler to remove the list from the group.
   */
  const handleRemoveListClicked = (event) => {
    const listID = event.target.parentElement.parentElement.getAttribute("id");
    listsDispatch({
      type: "REMOVE_LIST_FROM_GROUP",
      listID: listID,
    });
  };

  /**
   * Renders the header for the normal-mode.
   */
  const generateDisplayModeHeaderJSX = () => {
    return (
      <>
        <div className={classes.title}>
          <Typography className={classes.heading}>
            {group.groupTitle}
          </Typography>
        </div>
        <div className="GroupCard-header-actions-container">
          <div
            className="GroupCard-header-toggle-edit-icon-wrapper"
            onClick={handleToggleEditMode}
            title="Edit"
          >
            <EditIcon />
          </div>

          <div
            className="GroupCard-header-delete-group-icon-wrapper"
            onClick={handleDeleteGroupClicked}
            title="Delete"
          >
            <DeleteSharpIcon />
          </div>
        </div>
      </>
    );
  };

  /**
   * Renders the header for the edit-mode.
   */
  const generateEditModeHeaderJSX = () => {
    return (
      <>
        <div className="GroupCard-header-input-wrapper">
          <InputForm
            variant="standard"
            submitHandler={handleModifyGroupTitle}
            initialValue={group.groupTitle}
            active
          />
        </div>
        <div
          className="GroupCard-header-undo-icon-wrapper"
          onClick={handleToggleEditMode}
          title="Undo"
        >
          <HistoryIcon />
        </div>
      </>
    );
  };

  return (
    <div className={classes.root}>
      <Accordion TransitionProps={{ unmountOnExit: true }}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1c-content"
          id="panel1c-header"
        >
          {isEditMode
            ? generateEditModeHeaderJSX()
            : generateDisplayModeHeaderJSX()}
        </AccordionSummary>
        <Divider />
        <div className="GroupCard-add-lists-container">
          <div className="GroupCard-add-lists-type-ahead-container">
            <Autocomplete
              multiple
              id="tags-outlined"
              options={lists}
              getOptionLabel={(option) => option.listTitle}
              filterOptions={filterOptions}
              onChange={handleListSelectionChanged}
              clearOnEscape
              renderInput={(params) => (
                <TextField
                  {...params}
                  variant="outlined"
                  placeholder="Select lists"
                />
              )}
            />
          </div>
          <div className="GroupCard-add-lists-button-container">
            <Button
              variant="contained"
              color="primary"
              size={"small"}
              onClick={handleListsSubmitted}
            >
              ADD
            </Button>
          </div>
        </div>
        <Divider />

        <AccordionDetails className={classes.details}>
          <div className={classes.chipContainer}>
            {
              //Filter the lists of the current group, and render them.
              lists
                .filter((listItem) => listItem.groupID === group.id)
                .map((option) => {
                  return (
                    <Chip
                      className={classes.chip}
                      key={option.id}
                      label={option.listTitle}
                      id={option.id}
                      onDelete={handleRemoveListClicked}
                    />
                  );
                })
            }
          </div>
        </AccordionDetails>
      </Accordion>
    </div>
  );
};

export default GroupCard;
