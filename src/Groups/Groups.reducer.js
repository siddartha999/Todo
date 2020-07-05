/**
 * Reducer for creating and removing Groups:
 *
 * Groups will be stored in the following format:
 * [{id: "s1ahd2gha1", groupTitle: "Groceries"}, {id: "12ag546", groupTitle: "Sport items"}]
 *
 * sessionStorage is used to store and retrieve the Groups.
 */
import { useReducer, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";

const SESSION_STORAGE_KEY = "groups";

const useGroupsReducer = (initialValue = []) => {
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
    case "ADD_GROUP":
      return [...state, { id: uuidv4(), groupTitle: action.inputValue }];
    case "DELETE_GROUP": //Delete the selected group.
      return state.filter((groupItem) => groupItem.id !== action.id);
    case "UPDATE_GROUP_TITLE": //Update the title of the group in-action.
      return state.map((groupItem) => {
        if (groupItem.id === action.id) {
          //Update the title. of the selected group.
          groupItem.groupTitle = action.inputValue;
        }
        return groupItem;
      });

    default:
      return state;
  }
};

export default useGroupsReducer;
