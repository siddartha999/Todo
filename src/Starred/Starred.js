/**
 * Renders the Tasks component in starred-mode i.e, if a task is created in the starred page, it will be automatically
 * marked as starred.
 */

import React from "react";
import Tasks from "../Tasks/Tasks";
import { StarredModeContext } from "./Starred.context";

const Starred = () => {
  return (
    <StarredModeContext.Provider value={true}>
      <Tasks title="Starred Tasks" />
    </StarredModeContext.Provider>
  );
};

export default Starred;
