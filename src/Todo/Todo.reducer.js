/**
 * Reducer for the todoList state.
 *
 * Takes care of Addition, Deletion, Changing of Todos.
 */

import { useReducer } from "react";
import { v4 as uuidv4 } from "uuid";

const useTodoReducer = () => {
  const [state, dispatch] = useReducer(todoReducer, []);
  return [state, dispatch];
};

const todoReducer = (state, action) => {
  switch (action.type) {
    case "ADD_TODO_ITEM":
      return [...state, { value: action.value, id: uuidv4() }];
    case "REMOVE_INDIVIDUAL_TODO_ITEM":
      return state.filter((item) => item.id !== action.id);
    case "EDIT_TODO_ITEM":
      return state.filter((item) => {
        if (item.id !== action.id) return item;
        return (item.value = action.value);
      });
    default:
      return 0;
  }
};

export default useTodoReducer;
