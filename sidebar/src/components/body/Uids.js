import useInput from "../../hooks/userInput";
import { useNavigate } from "react-router-dom";

import classes from "./Uids.module.css";

const Uids = () => {
  const navigate = useNavigate();
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

    navigate("/messages");
    // eslint-disable-next-line no-undef

    // eslint-disable-next-line no-undef
  };

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
        <button type="submit" disabled={!formIsValid}>
          Upload
        </button>
      </div>
    </form>
  );
};

export default Uids;
