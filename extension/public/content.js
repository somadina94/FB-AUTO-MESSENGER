chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "setMessengerText" && request.message) {
    let inputBox = document.querySelector('[contenteditable="true"]');
    if (inputBox) {
      inputBox.focus();

      // Use the InputEvent constructor to set the message
      let inputEvent = new InputEvent("input", {
        data: request.message,
        inputType: "insertText",
        bubbles: true,
        cancelable: true,
        composed: true,
      });

      inputBox.dispatchEvent(inputEvent);

      // Delay the Enter key simulation by a short period
      setTimeout(() => {
        let enterKeyEvent = new KeyboardEvent("keydown", {
          key: "Enter",
          code: "Enter",
          keyCode: 13,
          which: 13,
          bubbles: true,
          cancelable: true,
          composed: true,
        });
        inputBox.dispatchEvent(enterKeyEvent);
      }, 2000); // Adjust the delay as needed
    } else {
      console.log("Messenger input box not found");
    }
  }
});
