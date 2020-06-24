import { useState } from "react";

const useToggle = (initialValue = false) => {
  const [toggleState, setToggleState] = useState(initialValue);

  const toggle = () => {
    setToggleState(!toggleState);
  };
  // return toggleState and a function to toggle it.
  return [toggleState, toggle];
};

export default useToggle;
