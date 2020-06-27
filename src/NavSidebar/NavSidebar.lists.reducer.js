/**
 * Reducer for creating and removing tasks:
 *
 * Lists will be stored in the following format:
 * [{id: "s1ahd2gha1", taskName: "Groceries"}, {id: "12ag546", taskName: "Sport items"}]
 *
 * sessionStorage is used to store and retrieved the tasks.
 */
import { useReducer, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";

const SESSION_STORAGE_KEY = "lists";

const useNavSidebarListReducer = (initialValue = []) => {
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
    case "ADD_LIST_ITEM":
      return [...state, { id: uuidv4(), listName: action.inputValue }];
    case "REMOVE_LIST_ITEM":
      return state.filter((task) => task.id !== action.id);
    default:
      return state;
  }
};

export default useNavSidebarListReducer;
