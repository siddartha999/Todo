import React from "react";
import Tasks from "../Tasks/Tasks";
import useNavSidebarListReducer from "../NavSidebar/NavSidebar.lists.reducer";

const RenderList = (props) => {
  const listID = props.listID;
  let title = "List";
  const [lists] = useNavSidebarListReducer();

  for (let listItem of lists) {
    if (listItem.id === listID) {
      title = listItem.listName;
      break;
    }
  }

  return <Tasks listID={listID} title={title} />;
};

export default RenderList;
