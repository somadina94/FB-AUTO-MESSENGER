import { GiLaserWarning } from "react-icons/gi";

import classes from "./Warning.module.css";

const Warning = () => {
  return (
    <div className={classes.warning}>
      <GiLaserWarning className={classes.icon} />
      <p>
        You have the extension open on another tab already. Please close this
        tab ASAP!!!
      </p>
    </div>
  );
};

export default Warning;
