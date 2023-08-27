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

  const uploadHandler = (e) => {
    e.preventDefault();

    const uidsArray = uidInput
      .split("\n")
      .filter((line) => line.trim() !== "")
      .map((line) => line.trim());
    // eslint-disable-next-line no-undef
    chrome.storage.local.set(
      {
        uids: uidsArray,
      },
      function () {
        console.log("Uids uploaded successfully");
      }
    );
    // eslint-disable-next-line no-undef
    chrome.storage.local.set({ uidsLength: uidsArray.length }, function () {
      console.log("Uids length uploaded successfully");
    });

    // eslint-disable-next-line no-undef
    chrome.storage.local.set({ uidsCounter: 0 }, function () {
      console.log("Uids Counter uploaded successfully");
    });
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
