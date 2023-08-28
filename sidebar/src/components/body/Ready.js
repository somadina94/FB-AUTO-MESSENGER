import { useState } from "react";

import classes from "./Ready.module.css";

const Ready = () => {
  const [start, setStart] = useState(false);

  const startHandler = () => {
    const event = new CustomEvent("start", { detail: "start" });
    window.dispatchEvent(event);
    setStart(true);
  };

  const pauseHandler = () => {
    const event = new CustomEvent("pause", { detail: "pause" });
    window.dispatchEvent(event);
    setStart(false);
  };

  const message = start ? "Running" : "Ready";

  return (
    <div className={classes.ready}>
      <h2>{message}</h2>
      <div className={classes.action}>
        <button type="button" onClick={startHandler}>
          Start
        </button>
        <button type="button" onClick={pauseHandler}>
          Pause
        </button>
      </div>
    </div>
  );
};

export default Ready;
