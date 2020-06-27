import { useReducer, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";

const SESSION_STORAGE_KEY = "tasksList";

const TasksReducer = (initialValue = []) => {
  const [state, dispatch] = useReducer(reducer, initialValue, () => {
    let initValue = [];
    try {
      initValue =
        JSON.parse(sessionStorage.getItem(SESSION_STORAGE_KEY)) || initialValue;
    } catch (e) {
      initValue = initialValue;
    }
    return initValue;
  });

  useEffect(() => {
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
        },
      ];
    case "TOGGLE_TASK_STARRED":
      return state.filter((task) => {
        if (task.id === action.id) {
          task.isStarred = !task.isStarred;
        }
        return task;
      });

    default:
      return 0;
  }
};

export default TasksReducer;
