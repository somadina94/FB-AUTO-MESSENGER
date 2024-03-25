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
    return error;
  }
}

function fetchTabs(queryInfo) {
  return new Promise((resolve, reject) => {
    chrome.tabs.query(queryInfo, (result) => {
      if (chrome.runtime.lastError) {
        reject(new Error(chrome.runtime.lastError));
      } else {
        resolve(result);
      }
    });
  });
}

const prepareMessage = async () => {
  try {
    //Fetch tabs
    const tabs = await fetchTabs({ url: "https://*.facebook.com/*" });
    if (tabs.length === 0) {
      console.log("No active tabs found");
      return;
    }
    const activeTab = tabs[0];
    const tabId = activeTab.id;
    // Get data
    const uidsData = await chrome.storage.local.get("uids");
    if (!uidsData.uids) {
      chrome.tabs.sendMessage(tabId, {
        action: "error",
        message: `Please upload list of uids!`,
      });
      chrome.alarms.clear("interval");
      return;
    }
    const uidsCounter = await chrome.storage.local.get("uidsCounter");
    const uidsLength = await chrome.storage.local.get("uidsLength");
    const messages = await chrome.storage.local.get("messages");
    if (!messages.messages) {
      chrome.tabs.sendMessage(tabId, {
        action: "error",
        message: `Please upload messages!`,
      });
      chrome.alarms.clear("interval");
      return;
    }
    const messagesCounter = await chrome.storage.local.get("messagesCounter");

    const message = messages.messages[messagesCounter.messagesCounter];
    const uid = uidsData.uids[uidsCounter.uidsCounter];
    const limit = uidsLength.uidsLength;
    const url = `https://www.facebook.com/messages/t/${uid}`;

    if (uidsCounter.uidsCounter >= limit) {
      chrome.alarms.clear("interval");
      chrome.tabs.sendMessage(tabId, {
        action: "error",
        message: `Please upload new list of uids!`,
      });
      return;
    }

    // Load url for next message to page url bar
    // try {
    // const tabs = await fetchTabs({ url: "https://*.facebook.com/*" });

    //  if (tabs.length === 0) {
    //    console.log("No active tabs found");
    //    return;
    //  }
    //  const activeTab = tabs[0];
    //  const tabId = activeTab.id;

    //create tabs updated by api object
    let tabsUpdatedByAPI = {};

    // Function to check for input field and act accordingly.
    function checkInput(tabId) {
      // Clear any existing alarm with the name checkInputAlarm
      chrome.alarms.clear("checkInputAlarm", () => {
        // Create an alarms that fires every 5 seconds
        chrome.alarms.create("checkInputAlarm", { periodInMinutes: 0.083 });
      });

      // Listen for the alarm
      chrome.alarms.onAlarm.addListener((alarm) => {
        if (alarm.name === "checkInputAlarm") {
          chrome.tabs.sendMessage(
            tabId,
            { action: "checkInput" },
            async (response) => {
              if (response && response.status === "found") {
                // Stop alarm
                chrome.alarms.clear("checkInputAlarm");

                chrome.tabs.sendMessage(tabId, {
                  action: "time",
                  message,
                  count: uidsCounter.uidsCounter + 1,
                });

                // Check if its the last uid and clear interval
                if (uidsCounter.uidsCounter >= limit - 1) {
                  chrome.alarms.clear("interval");
                  chrome.tabs.sendMessage(tabId, {
                    action: "ended",
                    count: `Finished @${uidsCounter.uidsCounter + 1}`,
                  });
                }

                // Update storage for next message
                if (
                  messagesCounter.messagesCounter ===
                  messages.messages.length - 1
                ) {
                  await chrome.storage.local.set({ messagesCounter: 0 });
                } else {
                  await chrome.storage.local.set({
                    messagesCounter: messagesCounter.messagesCounter + 1,
                  });
                }
                await chrome.storage.local.set({
                  uidsCounter: uidsCounter.uidsCounter + 1,
                });
              }
            }
          );
        }
      });
    }

    // Listen for tab update
    chrome.tabs.onUpdated.addListener(async (tabId, changeInfo, tab) => {
      if (changeInfo.status === "complete") {
        if (tabsUpdatedByAPI[tabId]) {
          checkInput(tabId);

          delete tabsUpdatedByAPI[tabId];
        }
        const tabs = await fetchTabs({ url: "https://*.facebook.com/*" });
        if (tabs.length > 1) {
          tabs.slice(1).forEach((tab) => {
            chrome.tabs.sendMessage(tab.id, { action: "warning" });
          });
        }
      }
    });

    function updateTabsViaAPI(tabId, url) {
      tabsUpdatedByAPI[tabId] = true;
      chrome.tabs.update(tabId, { url: url });
    }

    updateTabsViaAPI(tabId, url);
    // setTimeout(() => {
    //   chrome.tabs.sendMessage(tabId, {
    //     action: "time",
    //     message,
    //     count: uidsCounter.uidsCounter + 1,
    //   });
    // }, 30000);
  } catch (error) {
    console.error("Error fetching active tab", error.message);
  }

  // // Update storage for next message
  // if (messagesCounter.messagesCounter === messages.messages.length - 1) {
  //   await chrome.storage.local.set({ messagesCounter: 0 });
  // } else {
  //   await chrome.storage.local.set({
  //     messagesCounter: messagesCounter.messagesCounter + 1,
  //   });
  // }
  // await chrome.storage.local.set({ uidsCounter: uidsCounter.uidsCounter + 1 });
};

chrome.runtime.onMessage.addListener(async (request, sender, sendResponse) => {
  if (request.action === "start") {
    chrome.alarms.clear("interval");
    await prepareMessage();

    chrome.alarms.create("interval", { periodInMinutes: 20 });
  }

  if (request.action === "pause") {
    chrome.alarms.clear("interval");
  }
});

chrome.alarms.onAlarm.addListener(async (alarm) => {
  if (alarm.name === "interval") {
    const keyData = await chrome.storage.local.get("key");
    const url = `https://api.socialwarlock.com/api/v1/messenger/get-member/${keyData.key}`;
    const res = await getMember(url);
    if (res.status === "success" && res.data.member.credit >= 1) {
      await prepareMessage();
    } else {
      chrome.alarms.clear("interval");
    }
  }
});
