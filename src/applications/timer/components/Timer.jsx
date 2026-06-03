import React, { useEffect, useState } from "react";

const Timer = () => {
  const [isActive, setIsActive] = useState(false);
  const [timer, setTimer] = useState(0);

  const handleStartStop = () => {
    setIsActive((prev) => !prev);
  };

  const handleReset = () => {
    setTimer(0);
    setIsActive(false);
  };

  useEffect(() => {
    let timer;
    if (isActive) {
      timer = setInterval(() => {
        setTimer((prev) => prev + 1);
      }, 1000);
    }

    return () => clearInterval(timer);
  }, [isActive]);

  const hours = Math.floor(timer / 3600);
  const mins = Math.floor((timer % 3600) / 60);
  const secs = timer % 60;
  return (
    <div>
      <h3>
        {hours}hours{mins}mins{secs}secs
      </h3>
      <button onClick={handleStartStop}>{isActive ? "Stop" : "Start"}</button>
      <button onClick={handleReset}>Reset</button>
    </div>
  );
};

export default Timer;
