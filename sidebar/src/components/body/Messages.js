import useInput from "../../hooks/userInput";

import classes from "./Messages.module.css";

const Messages = () => {
  const {
    value: message1Input,
    enteredValueIsValid: message1InputIsValid,
    hasError: message1InputIsInvalid,
    valueInputChangedHandler: message1InputChangedHandler,
    valueInputBlurHandler: message1InputBlurHandler,
  } = useInput((value) => value.trim() !== "");

  const {
    value: message2Input,
    enteredValueIsValid: message2InputIsValid,
    hasError: message2InputIsInvalid,
    valueInputChangedHandler: message2InputChangedHandler,
    valueInputBlurHandler: message2InputBlurHandler,
  } = useInput((value) => value.trim() !== "");

  const {
    value: message3Input,
    enteredValueIsValid: message3InputIsValid,
    hasError: message3InputIsInvalid,
    valueInputChangedHandler: message3InputChangedHandler,
    valueInputBlurHandler: message3InputBlurHandler,
  } = useInput((value) => value.trim() !== "");

  let formIsValid = false;
  if (message1InputIsValid && message2InputIsValid && message3InputIsValid) {
    formIsValid = true;
  }

  const uploadHandler = (e) => {};

  const message1InputClasses = message1InputIsInvalid
    ? `${classes.group} ${classes.invalid}`
    : classes.group;

  const message2InputClasses = message2InputIsInvalid
    ? `${classes.group} ${classes.invalid}`
    : classes.group;

  const message3InputClasses = message3InputIsInvalid
    ? `${classes.group} ${classes.invalid}`
    : classes.group;
  return (
    <form className={classes.form} onSubmit={uploadHandler}>
      <h2>Enter your different messages</h2>
      <div className={message1InputClasses}>
        <label>message1</label>
        <textarea
          value={message1Input}
          onChange={message1InputChangedHandler}
          onBlur={message1InputBlurHandler}
        />
      </div>
      <div className={message2InputClasses}>
        <label>message2</label>
        <textarea
          value={message2Input}
          onChange={message2InputChangedHandler}
          onBlur={message2InputBlurHandler}
        />
      </div>
      <div className={message3InputClasses}>
        <label>message3</label>
        <textarea
          value={message3Input}
          onChange={message3InputChangedHandler}
          onBlur={message3InputBlurHandler}
        />
      </div>
      <div className={classes.action}>
        <button type="submit" disabled={!formIsValid}>
          Uplaod
        </button>
      </div>
    </form>
  );
};

export default Messages;
