import { useState } from "react";

import classes from "./Ready.module.css";

const Ready = () => {
  const [start, setStart] = useState(false);
  const [pause, setPause] = useState(false);

  const startHandler = () => {
    const event = new CustomEvent("start", { detail: "start" });
    window.dispatchEvent(event);
    setStart(true);
  };

  const pauseHandler = () => {
    const event = new CustomEvent("pause", { detail: "pause" });
    window.dispatchEvent(event);
    setPause(true);
  };

  const startBtn = start ? "Started" : "Start";
  const pauseBtn = pause ? "Paused" : "Pause";

  return (
    <div className={classes.ready}>
      <p>
        Remeber when the page reloads, Buttons return to their Initial state and
        this doesn't mean work is not in progress. Always check last message
        time to confirm work is still in progress
      </p>
      <p>
        Remember to first use the UIDS and MSG'S tabs to upload UIDS and
        MESSAGES before clicking start
      </p>
      <div className={classes.action}>
        <button type="button" disabled={start} onClick={startHandler}>
          {startBtn}
        </button>
        <button type="button" disabled={pause} onClick={pauseHandler}>
          {pauseBtn}
        </button>
      </div>
    </div>
  );
};

export default Ready;
