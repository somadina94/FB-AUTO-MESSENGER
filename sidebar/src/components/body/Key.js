import useInput from "../../hooks/userInput";
import { useState } from "react";
import classes from "./Key.module.css";

const Key = () => {
  const [sent, setSent] = useState(false);
  const {
    value: keyInput,
    enteredValueIsValid: keyInputIsValid,
    hasError: keyInputIsInvalid,
    valueInputChangedHandler: keyInputChangedHandler,
    valueInputBlurHandler: keyInputBlurHandler,
  } = useInput((value) => value.trim() !== "");

  let formIsValid = false;
  if (keyInputIsValid) {
    formIsValid = true;
  }

  const uploadHandler = (e) => {
    e.preventDefault();

    const data = {
      key: keyInput,
    };

    const event = new CustomEvent("saveKey", { detail: data });
    window.dispatchEvent(event);

    setSent(true);
  };

  const upload = sent ? "Uploaded" : "Upload";

  const keyInputClasses = keyInputIsInvalid
    ? `${classes.group} ${classes.invalid}`
    : classes.group;
  return (
    <form className={classes.form} onSubmit={uploadHandler}>
      <div className={keyInputClasses}>
        <label>Paste your key and upload</label>
        <input
          type="text"
          placeholder="XXXXXXXXXX"
          onChange={keyInputChangedHandler}
          onBlur={keyInputBlurHandler}
        />
      </div>
      <div className={classes.action}>
        <button type="submit" disabled={!formIsValid}>
          {upload}
        </button>
      </div>
    </form>
  );
};

export default Key;
