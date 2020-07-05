import React from "react";
import "./Groups.css";
import InputForm from "../InputForm/InputForm";
import useGroupsReducer from "./Groups.reducer";
import useListsReducer from "../Lists/Lists.reducer";
import GroupCard from "../GroupCard/GroupCard";

const Groups = () => {
  const [groups, groupsDispatch] = useGroupsReducer([]);
  const [lists, listsDispatch] = useListsReducer();

  /**
   * Handler to add a group.
   */
  const handleAddGroup = (inputValue) => {
    groupsDispatch({ type: "ADD_GROUP", inputValue: inputValue });
  };

  const noGroupsJSX = (
    <div className="Lists-empty-lists">
      <p>No groups available.</p>
    </div>
  );

  const generateGroupsJSX = () => (
    <div className="Groups-group-items-container">
      {groups.map((groupItem) => (
        <div className="Groups-group-item-container" key={groupItem.id}>
          <GroupCard
            groupsDispatch={groupsDispatch}
            listsDispatch={listsDispatch}
            groupItem={groupItem}
            lists={lists}
          />
        </div>
      ))}
    </div>
  );

  return (
    <div className="Groups">
      <div className="Groups-input-form-container">
        <InputForm
          placeholderLabel="Add a group"
          variant="outlined"
          submitHandler={handleAddGroup}
        />
      </div>
      {groups && groups.length ? generateGroupsJSX() : noGroupsJSX}
    </div>
  );
};

export default Groups;
