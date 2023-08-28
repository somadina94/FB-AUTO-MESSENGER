let interval;

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
  // Get data
  const uidsData = await chrome.storage.local.get("uids");
  if (!uidsData.uids) {
    return;
  }
  const uidsCounter = await chrome.storage.local.get("uidsCounter");
  const uidsLength = await chrome.storage.local.get("uidsLength");
  const messages = await chrome.storage.local.get("messages");
  if (!messages.messages) {
    return;
  }
  const messagesCounter = await chrome.storage.local.get("messagesCounter");

  const message = messages.messages[messagesCounter.messagesCounter];
  const uid = uidsData.uids[uidsCounter.uidsCounter];
  const limit = uidsLength.uidsLength;
  const url = `https://www.facebook.com/messages/t/${uid}`;

  if (uidsCounter.uidsCounter >= limit) {
    return;
  }

  // Load url for next message to page url bar
  try {
    const tabs = await fetchTabs({ active: true, currentWindow: true });

    if (tabs.length === 0) {
      console.log("No active tabs found");
      return;
    }
    const activeTab = tabs[0];
    const tabId = activeTab.id;
    chrome.tabs.update(tabId, { url: url });
    setTimeout(() => {
      chrome.tabs.sendMessage(tabId, { action: "time", message, url });
      console.log("Message sent to content");
    }, 10000);
  } catch (error) {
    console.error("Error fetching active tab", error.message);
  }

  // Update storage for next message
  if (messagesCounter.messagesCounter === messages.messages.length - 1) {
    await chrome.storage.local.set({ messagesCounter: 0 });
  } else {
    await chrome.storage.local.set({
      messagesCounter: messagesCounter.messagesCounter + 1,
    });
  }
  await chrome.storage.local.set({ uidsCounter: uidsCounter.uidsCounter + 1 });
};

chrome.runtime.onMessage.addListener(async (request, sender, sendResponse) => {
  if (request.action === "start") {
    console.log("message received in backgound");
    await prepareMessage();

    chrome.alarms.create("interval", { periodInMinutes: 1 });
  }

  if (request.action === "pause") {
    chrome.alarms.clear("interval");
  }
});

chrome.alarms.onAlarm.addListener(async (alarm) => {
  if (alarm.name === "interval") {
    await prepareMessage();
  }
});
