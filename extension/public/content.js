window.addEventListener("start", async (event) => {
  console.log("Recieved message to start");

  chrome.runtime.sendMessage({ action: "start" }, (response) => {});
});

window.addEventListener("pause", async (event) => {
  chrome.runtime.sendMessage({ action: "pause" }, (response) => {});
});

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "time") {
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

window.addEventListener("saveUidsEvent", function (event) {
  chrome.storage.local.set(
    {
      uids: event.detail.uids,
      uidsCounter: event.detail.uidsCounter,
      uidsLength: event.detail.uidsLength,
    },
    () => {
      console.log("uids data saved");
      console.log(event.detail.uids);
    }
  );
});

window.addEventListener("saveMessagesEvent", function (event) {
  chrome.storage.local.set(
    {
      messages: event.detail.messages,
      messagesCounter: event.detail.msgsCounter,
    },
    () => {
      console.log("Messages data saved");
    }
  );
});

let sidebar = document.createElement("div");
sidebar.id = "sidebar-root";
document.body.appendChild(sidebar);

// Load your React app's built main.js into the page
let script = document.createElement("script");
script.src = chrome.runtime.getURL("ui/static/js/main.47e52c8a.js");
document.body.appendChild(script);

// Optionally, if you want to inject the built CSS
let link = document.createElement("link");
link.rel = "stylesheet";
link.href = chrome.runtime.getURL("ui/static/css/main.0803d0bb.css");
document.head.appendChild(link);
