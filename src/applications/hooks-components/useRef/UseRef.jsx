import React, { useRef } from "react";

const UseRef = () => {
  const inputRef = useRef(null);
  const handleFocus = () => {
    inputRef?.current?.focus();
  };
  return (
    <div>
      <input type="text" placeholder="Enter something" ref={inputRef} />
      <button onClick={handleFocus}>Focus</button>
    </div>
  );
};

export default UseRef;
