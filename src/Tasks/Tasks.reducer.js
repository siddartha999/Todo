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
      taskItem.steps.push({ step: action.inputValue, id: uuidv4() });
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

    default:
      return state;
  }
};

export default TasksReducer;
