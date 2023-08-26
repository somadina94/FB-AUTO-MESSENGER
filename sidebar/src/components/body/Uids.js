import useInput from "../../hooks/userInput";

import classes from "./Uids.module.css";

const Uids = () => {
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

  const uidInputClasses = uidInputIsInvalid
    ? `${classes.group} ${classes.invalid}`
    : classes.group;
  return (
    <form className={classes.form}>
      <h2>Copy and paste UID'S line by line</h2>
      <div className={uidInputClasses}>
        <textarea
          value={uidInput}
          onChange={uidInputChangedHandler}
          onBlur={uidInputBlurHandler}
        />
      </div>
      <div className={classes.action}>
        <button type="button" disabled={!formIsValid}>
          Upload
        </button>
      </div>
    </form>
  );
};

export default Uids;
