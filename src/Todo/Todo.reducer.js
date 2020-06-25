/**
 * Reducer for the todoList state.
 *
 * Each Todo object in the todoList state will be in the following format :
 * EG: {id : 1234, value: 'Walk dog to park', isSelected : false}
 *
 * The following are the possible actions that can be performed on todoList state:
 * Addition of a Todo item.
 * Deletion of an individual Todo item.
 * Deletion of multiple Todo items.
 * Modification a Todo item.
 * Toggling individual Todo item's selection.
 * Toggling all Todo items selection.
 *
 * Finally, todosList state is stored in the sessionStorage object.
 * sessionStorage is preferred to localStorage as the user need not manually clear the data.
 */

import { useReducer, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";

const TODOS_STORAGE_KEY = "todosList";
const INIT_STATE_VALUE = [];

const useTodoReducer = () => {
  const [state, dispatch] = useReducer(todoReducer, INIT_STATE_VALUE, () => {
    //Initializes the state with the list retrieved from the sessionStorage.
    //If the initial list is empty, an empty array [] will be returned.
    let initialState;
    try {
      initialState = JSON.parse(
        window.sessionStorage.getItem(TODOS_STORAGE_KEY) || INIT_STATE_VALUE
      );
    } catch (e) {
      initialState = INIT_STATE_VALUE;
    }
    return initialState;
  });

  //Since useEffect runs after every state update, the latest todosList is stored in the sessionStorage.
  useEffect(() => {
    window.sessionStorage.setItem(TODOS_STORAGE_KEY, JSON.stringify(state));
  }, [state]);
  return [state, dispatch];
};

const todoReducer = (state, action) => {
  switch (action.type) {
    case "ADD_TODO_ITEM":
      return [
        ...state,
        { value: action.value, id: uuidv4(), isSelected: false },
      ];
    case "REMOVE_INDIVIDUAL_TODO_ITEM":
      return state.filter((item) => item.id !== action.id);
    case "REMOVE_MULTIPLE_TODO_ITEMS":
      let newState = [...state];
      for (let id of action.value) {
        newState = newState.filter((item) => item.id !== id);
      }
      return newState;
    case "EDIT_TODO_ITEM":
      return state.filter((item) => {
        if (item.id !== action.id) return item;
        return (item.value = action.value);
      });
    case "TOGGLE_INDIVIDUAL_TODO_ITEM_SELECTION":
      return state.map((item) => {
        if (item.id === action.id) {
          item.isSelected = !item.isSelected;
        }
        return item;
      });
    case "TOGGLE_ALL_TODO_ITEMS_SELECTION":
      return state.map((item) => {
        if (action.isSelect) {
          item.isSelected = true;
        } else {
          item.isSelected = false;
        }
        return item;
      });
    default:
      return 0;
  }
};

export default useTodoReducer;
