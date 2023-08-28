import useInput from "../../hooks/userInput";
import { useState } from "react";

import classes from "./Uids.module.css";

const Uids = () => {
  const [sent, setSent] = useState(false);
  const {
    value: uidInput,
    enteredValueIsValid: uidInputIsValid,
    hasError: uidInputIsInvalid,
    valueInputChangedHandler: uidInputChangedHandler,
    valueInputBlurHandler: uidInputBlurHandler,
  } = useInput((value) => value.trim() !== "");

  let formIsValid = false;
  if (uidInputIsValid) {
    formIsValid = true;
  }

  const uploadHandler = (e) => {
    e.preventDefault();

    const uidsArray = uidInput
      .split("\n")
      .filter((line) => line.trim() !== "")
      .map((line) => line.trim());

    const data = {
      uids: uidsArray,
      uidsLength: uidsArray.length,
      uidsCounter: 0,
    };

    const event = new CustomEvent("saveUidsEvent", { detail: data });
    window.dispatchEvent(event);

    setSent(true);
  };

  const upload = sent ? "Uploaded" : "Upload";

  const uidInputClasses = uidInputIsInvalid
    ? `${classes.group} ${classes.invalid}`
    : classes.group;
  return (
    <form className={classes.form} onSubmit={uploadHandler}>
      <h2>Copy and paste UID'S line by line</h2>
      <div className={uidInputClasses}>
        <textarea
          value={uidInput}
          onChange={uidInputChangedHandler}
          onBlur={uidInputBlurHandler}
        />
      </div>
      <div className={classes.action}>
        <button type="submit" disabled={!formIsValid || sent}>
          {upload}
        </button>
      </div>
    </form>
  );
};

export default Uids;
