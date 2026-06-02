import React from "react";

const Child = React.memo(({ handleClick }) => {
  console.log("Child component re-rendered");
  return (
    <div>
      <h3>I am child</h3>
      <button onClick={handleClick}>Click</button>
    </div>
  );
});

export default Child;
