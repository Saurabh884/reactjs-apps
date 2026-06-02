import React, { useLayoutEffect, useRef, useState } from "react";

const UseLayoutEffect = () => {
  const [width, setWidth] = useState(0);
  const boxRef = useRef(null);

  useLayoutEffect(() => {
    if (boxRef?.current) {
      setWidth(boxRef?.current?.offsetWidth);
    }
  }, []);

  return (
    <div>
      <div
        ref={boxRef}
        style={{ width: "300px", padding: "10px", backgroundColor: "aqua" }}
      >
        Box element
      </div>
      <p>Width:{width}</p>
    </div>
  );
};

export default UseLayoutEffect;
