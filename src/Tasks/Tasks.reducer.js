import { useReducer, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";

const SESSION_STORAGE_KEY = "tasksList";

const TasksReducer = (initialValue = []) => {
  const [state, dispatch] = useReducer(reducer, initialValue, () => {
    //Retrieving the cached list from the sessionStorage.
    let initValue;
    try {
      initValue =
        JSON.parse(sessionStorage.getItem(SESSION_STORAGE_KEY)) || initialValue;
    } catch (e) {
      initValue = initialValue;
    }
    return initValue;
  });

  useEffect(() => {
    //As useEffect gets executed every-time after the state is changed, makes it an ideal
    //place to update the sessionStorage with the latest state.
    sessionStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(state));
  }, [state]);

  return [state, dispatch];
};

const reducer = (state, action) => {
  switch (action.type) {
    case "ADD_TASK":
      return [
        ...state,
        {
          id: uuidv4(),
          isComplete: action.isComplete,
          task: action.inputValue,
          isStarred: action.starred || false,
          listID: action.listID,
          steps: [],
          note: "",
        },
      ];

    case "DELETE_TASK":
      return state.filter((task) => task.id !== action.id);

    case "TOGGLE_TASK_STARRED":
      return state.filter((task) => {
        if (task.id === action.id) {
          task.isStarred = !task.isStarred;
        }
        return task;
      });

    case "TOGGLE_TASK_COMPLETION": //Toggles the completion status of a task.
      return state.filter((task) => {
        if (task.id === action.taskID) {
          //If the current task is the task in action, toggle its completion status.
          task.isComplete = !task.isComplete;
        }
        return task;
      });

    case "ADD_STEP":
      let taskItem;
      for (let task of state) {
        if (task.id === action.taskID) {
          taskItem = task;
          break;
        }
      }
      if (!taskItem.steps) {
        //In-case the steps property isn't initialized.
        taskItem.steps = [];
      }
      taskItem.steps.push({
        step: action.inputValue,
        id: uuidv4(),
        isComplete: false,
      });
      return [...state];

    case "UPDATE_TASK_NAME":
      return state.map((task) => {
        if (task.id === action.taskID) {
          //Update the value of task.
          task.task = action.inputValue;
        }
        return task;
      });

    case "DELETE_STEP":
      return state.map((task) => {
        if (task.id === action.taskID) {
          let index = -1;
          for (let step of task.steps) {
            index++;
            if (step.id === action.stepID) {
              //Find the index of the step to be deleted.
              break;
            }
          }
          //Delete the step from the steps-list.
          task.steps.splice(index, 1); //Remove 1 element at the index position.
        }
        return task;
      });

    case "TOGGLE_STEP_COMPLETION": //Toggles the completion status of a step.
      return state.map((task) => {
        if (task.id === action.taskID) {
          //If the current task is the task in action.
          for (let step of task.steps) {
            if (step.id === action.stepID) {
              //Toggle the step's completion status.
              step.isComplete = !step.isComplete;
              break;
            }
          }
        }
        return task;
      });

    case "UPDATE_STEP":
      return state.map((task) => {
        if (task.id === action.taskID) {
          //If the current task is the task in action.
          for (let step of task.steps) {
            if (step.id === action.stepID) {
              //Update the step.
              step.step = action.inputValue;
              break;
            }
          }
        }
        return task;
      });

    case "DELETE_TASKS_OF_A_LIST": //Deletes the tasks pertaining to the selected list.
      return state.filter((task) => task.listID !== action.listID);

    case "DELETE_TASKS_OF_MULTIPLE_LISTS": //Deletes the tasks of multiple lists i.e, in the case multiple lists are deleted.
      return state.filter((task) => !action.deletedListIds.has(task.listID));

    case "UPDATE_TASK_NOTE": //Updates the note of a  task.
      return state.map((task) => {
        if (task.id === action.taskID) {
          task.note = action.inputValue.trim();
        }
        return task;
      });

    default:
      return state;
  }
};

export default TasksReducer;
