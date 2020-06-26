import { useReducer } from "react";
import { v4 as uuidv4 } from "uuid";

const TasksReducer = (initialValue = []) => {
  const [state, dispatch] = useReducer(reducer, initialValue);
  return [state, dispatch];
};

const reducer = (state, action) => {
  switch (action.type) {
    case "ADD_TASK":
      return [...state, { id: uuidv4(), task: action.inputValue }];
    default:
      return 0;
  }
};

export default TasksReducer;
