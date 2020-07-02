/**
 * Reducer for creating and removing lists:
 *
 * Lists will be stored in the following format:
 * [{id: "s1ahd2gha1", listTitle: "Groceries"}, {id: "12ag546", listTitle: "Sport items"}]
 *
 * sessionStorage is used to store and retrieved the lists.
 */
import { useReducer, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";

const SESSION_STORAGE_KEY = "lists";

const useListsReducer = (initialValue = []) => {
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
      return [...state, { id: uuidv4(), listTitle: action.inputValue }];
    case "DELETE_LIST_ITEM": //Delete the selected list.
      return state.filter((listItem) => listItem.id !== action.id);
    case "UPDATE_LIST_TITLE": //Update the title of list in-action.
      return state.map((listItem) => {
        if (listItem.id === action.id) {
          //Update the list title.
          listItem.listTitle = action.inputValue;
        }
        return listItem;
      });

    default:
      return state;
  }
};

export default useListsReducer;
