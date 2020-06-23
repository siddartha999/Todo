import { useState } from "react";

const useToggle = (isTrue = false) => {
  const [toggleState, setToggleState] = useState(isTrue);

  const toggle = () => {
    setToggleState(!toggleState);
  };

  return [toggleState, toggle];
};

export default useToggle;
