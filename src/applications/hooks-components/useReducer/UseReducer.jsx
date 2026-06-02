import React, { useReducer } from "react";

const UseReducer = () => {
  const initialState = {
    count: 0,
  };

  const reducer = (state, action) => {
    switch (action.type) {
      case "increment":
        return { count: state.count + 1 };

      case "decrement":
        return { count: state.count - 1 };

      default:
        return { count: 0 };
    }
  };

  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <div>
      <p>Count:{state.count}</p>
      <button onClick={() => dispatch({ type: "increment" })}>Increment</button>
      <button onClick={() => dispatch({ type: "decrement" })}>Decrement</button>
    </div>
  );
};

export default UseReducer;
