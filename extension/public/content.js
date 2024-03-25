async function patchData(url, data) {
  try {
    const response = await fetch(url, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        // Add any other headers if required
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const responseData = await response.json();
    return responseData;
  } catch (error) {
    console.error("Error:", error);
  }
}
async function getMember(url) {
  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        // Add any other headers if required
      },
    });

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const responseData = await response.json();
    return responseData;
  } catch (error) {
    console.log(error);
    return error;
  }
}

window.addEventListener("start", async (event) => {
  // console.log("Recieved message to start");
  const keyData = await chrome.storage.local.get("key");
  if (!keyData.key) {
    const event = new CustomEvent("error", {
      detail: `Please upload your KEY!`,
    });
    window.dispatchEvent(event);
    return;
  }
  const url = `https://api.socialwarlock.com/api/v1/messenger/get-member/${keyData.key}`;
  const res = await getMember(url);

  if (res.status === "success" && res.data.member.credit >= 1) {
    chrome.runtime.sendMessage({ action: "start" }, (response) => {});
  } else {
    //Give error feedback
    const event = new CustomEvent("credit", { detail: `Insufficient credit` });
    window.dispatchEvent(event);
  }
});

window.addEventListener("pause", async (event) => {
  chrome.runtime.sendMessage({ action: "pause" }, (response) => {});
});

window.addEventListener("sendUidsEvent", async (event) => {
  const uidsData = await chrome.storage.local.get("uids");

  const uids = !uidsData.uids ? [] : uidsData.uids;

  const newEvent = new CustomEvent("uploadedUids", { detail: uids });
  window.dispatchEvent(newEvent);
});

window.addEventListener("sendMessagesEvent", async (event) => {
  const messagesData = await chrome.storage.local.get("messages");

  const messages = !messagesData.messages ? [] : messagesData.messages;

  const newEvent = new CustomEvent("uploadedMessages", {
    detail: messages,
  });
  window.dispatchEvent(newEvent);
});

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "warning") {
    const event = new CustomEvent("warning");
    window.dispatchEvent(event);
  }
  if (request.action === "error") {
    const event = new CustomEvent("error", { detail: request.message });
    window.dispatchEvent(event);
  }
  if (request.action === "ended") {
    const event = new CustomEvent("count", { detail: request.count });
    window.dispatchEvent(event);
  }
  if (request.action === "checkInput") {
    const inputBox = document.querySelector('[contenteditable="true"]');
    if (inputBox) {
      sendResponse({ status: "found" });
    }
  }
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
      const url = `https://api.socialwarlock.com/api/v1/messenger/debit-member`;

      // Delay the Enter key simulation by a short period
      setTimeout(async () => {
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
        const keyData = await chrome.storage.local.get("key");
        const res = await patchData(url, { key: keyData.key });

        // Update Ui based on response
        if (res.status === "success") {
          const event = new CustomEvent("credit", {
            detail: res.data.member.credit,
          });
          window.dispatchEvent(event);
        }
      }, 2000); // Adjust the delay as needed

      // Send update to sidebar ui
      const event = new CustomEvent("count", { detail: request.count });
      window.dispatchEvent(event);
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

window.addEventListener("saveKey", function (event) {
  chrome.storage.local.set(
    {
      key: event.detail.key,
    },
    () => {
      console.log("Key saved");
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
script.src = chrome.runtime.getURL("ui/static/js/main.ac6f0859.js");
document.body.appendChild(script);

// Optionally, if you want to inject the built CSS
let link = document.createElement("link");
link.rel = "stylesheet";
link.href = chrome.runtime.getURL("ui/static/css/main.a2fe89e6.css");
document.head.appendChild(link);
