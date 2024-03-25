import useInput from "../../hooks/userInput";
import { useState, useEffect, useRef } from "react";

import classes from "./Messages.module.css";

const Messages = () => {
  const [sent, setSent] = useState(false);
  const [title, setTitle] = useState("Enter your different messages");
  const [_, forceUpdate] = useState();
  const uploadedMsg1 = useRef("");
  const uploadedMsg2 = useRef("");
  const uploadedMsg3 = useRef("");
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

  useEffect(() => {
    const handleCustomEvent = (e) => {
      uploadedMsg1.current = e.detail && e.detail.length > 0 ? e.detail[0] : "";

      uploadedMsg2.current = e.detail && e.detail.length > 0 ? e.detail[1] : "";

      uploadedMsg3.current = e.detail && e.detail.length > 0 ? e.detail[2] : "";

      forceUpdate(Math.random());
    };

    window.addEventListener("uploadedMessages", handleCustomEvent);

    const event = new CustomEvent("sendMessagesEvent");
    window.dispatchEvent(event);

    return () => {
      window.removeEventListener("uploadedMessages", handleCustomEvent);
    };
  }, []);

  const uploadHandler = (e) => {
    e.preventDefault();

    if ((message1Input === message2Input) === message3Input) {
      setTitle("Please upload messages that differ in words!");
      return;
    }

    const msgsArray = [message1Input, message2Input, message3Input];

    const msgsCounter = 0;
    const data = {
      messages: msgsArray,
      msgsCounter,
    };
    const event = new CustomEvent("saveMessagesEvent", { detail: data });
    window.dispatchEvent(event);

    setSent(true);
  };

  const upload = sent ? "Uploaded" : "Upload";

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
      <h2>{title}</h2>
      <div className={message1InputClasses}>
        <label>message1</label>
        <textarea
          placeholder={
            uploadedMsg1.current === "" ? "Message1 has not been uploaded" : ""
          }
          value={message1Input || uploadedMsg1.current}
          onChange={message1InputChangedHandler}
          onBlur={message1InputBlurHandler}
        />
      </div>
      <div className={message2InputClasses}>
        <label>message2</label>
        <textarea
          placeholder={
            uploadedMsg2.current === "" ? "Message2 has not been uploaded" : ""
          }
          value={message2Input || uploadedMsg2.current}
          onChange={message2InputChangedHandler}
          onBlur={message2InputBlurHandler}
        />
      </div>
      <div className={message3InputClasses}>
        <label>message3</label>
        <textarea
          placeholder={
            uploadedMsg3.current === "" ? "Message3 has not been uploaded" : ""
          }
          value={message3Input || uploadedMsg3.current}
          onChange={message3InputChangedHandler}
          onBlur={message3InputBlurHandler}
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

export default Messages;
