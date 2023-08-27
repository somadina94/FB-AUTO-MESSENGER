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

let sidebar = document.createElement("div");
sidebar.id = "my-extension-sidebar";
document.body.appendChild(sidebar);

// Load your React app's built main.js into the page
let script = document.createElement("script");
script.src = chrome.runtime.getURL("ui/static/js/main.fa22f550.js");
document.body.appendChild(script);

// Optionally, if you want to inject the built CSS
let link = document.createElement("link");
link.rel = "stylesheet";
link.href = chrome.runtime.getURL("ui/static/css/main.57a7264a.css");
document.head.appendChild(link);
