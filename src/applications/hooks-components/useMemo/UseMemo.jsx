import React, { useMemo, useState } from "react";

const UseMemo = () => {
  const [count, setCount] = useState(0);
  const [input, setInput] = useState("");

  const expensiveCalculation = useMemo(() => {
    console.log("Expensive calculation running");

    for (let i = 0; i < 1000000; i++) {}
    return count * 2;
  }, [count]);

  return (
    <div>
      <h2>Count:{count}</h2>
      <h2>{expensiveCalculation}</h2>
      <button onClick={() => setCount(count + 1)}>Increment</button>
      <div>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
      </div>
    </div>
  );
};

export default UseMemo;
