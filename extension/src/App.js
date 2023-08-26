import "./App.css";

import React, { useState } from "react";

function App() {
  const [message, setMessage] = useState("");

  const prepareMessage = () => {
    // const encodedMessage = encodeURIComponent(message);

    // Update the current tab's URL to Messenger with the intended recipient
    // eslint-disable-next-line no-undef
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      const currentTab = tabs[0];
      // eslint-disable-next-line no-undef
      chrome.tabs.update(
        currentTab.id,
        { url: `https://www.facebook.com/messages/t/100002462770453` },
        () => {
          // After a delay to let the Messenger page load, send the message to the content script
          setTimeout(() => {
            // eslint-disable-next-line no-undef
            chrome.tabs.sendMessage(currentTab.id, {
              action: "setMessengerText",
              message: message,
            });
          }, 8000); // Adjust the delay as needed
        }
      );
    });
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Type your message"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <button onClick={prepareMessage}>Prepare Message</button>
    </div>
  );
}

export default App;
