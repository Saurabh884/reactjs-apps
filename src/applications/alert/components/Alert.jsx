import React, { useEffect, useState } from "react";
import "./style.css";

const Alert = () => {
  const [alerts, setAlerts] = useState([]);

  const handleAlert = (type, message) => {
    let id = Date.now();
    setAlerts((prev) => [...prev, { id, type, message }]);
    setTimeout(() => {
      removeAlert(id);
    }, 3000);
  };

  console.log(alerts);

  const removeAlert = (id) => {
    setAlerts((prev) => prev.filter((alert) => alert.id !== id));
  };

  useEffect(() => {
    if (alerts.length === 0) return;

    const timer = setTimeout(() => {
      setAlerts((prev) => prev.slice(1));
    }, 3000);

    return () => clearTimeout(timer);
  }, [alerts]);

  return (
    <div className="app-container">
      <h3>Alert app</h3>
      <div className="buttons-container">
        <button onClick={() => handleAlert("success", "Success message")}>
          Success
        </button>
        <button onClick={() => handleAlert("error", "error message")}>
          Error
        </button>
        <button onClick={() => handleAlert("info", "info message")}>
          Info
        </button>
      </div>
      <div className="alert-container">
        {alerts.map((alert) => (
          <div className={`alert-item ${alert.type} `} key={alert.id}>
            <p>{alert.message}</p>
            <button onClick={() => removeAlert(alert.id)} className="cross">
              &times;
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Alert;
