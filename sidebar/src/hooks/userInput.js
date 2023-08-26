import { useState } from "react";

const useInput = (validateValue) => {
  const [enteredValue, setEnteredValue] = useState("");
  const [isTouched, setIsTouched] = useState(false);

  const enteredValueIsValid = validateValue(enteredValue);
  const enteredValueIsInvalid = !enteredValueIsValid && isTouched;

  const valueInputChangedHandler = (event) => {
    setEnteredValue(event.target.value);
  };

  const valueInputBlurHandler = () => {
    setIsTouched(true);
  };

  const reset = () => {
    setEnteredValue("");
    setIsTouched(false);
  };

  return {
    value: enteredValue,
    hasError: enteredValueIsInvalid,
    enteredValueIsValid,
    valueInputChangedHandler,
    valueInputBlurHandler,
    reset,
  };
};

export default useInput;
