setInterval(async () => {
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
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    console.log(tabs[0]);
    const currentTab = tabs[0];
    chrome.tabs.update(currentTab.id, { url: url });
    console.log("ran fist");
  });

  // Send message to content script to forward to friend
  setTimeout(() => {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      console.log(tabs[0].id, "tabs Id");
      const activeTab = tabs[0];
      chrome.tabs.sendMessage(activeTab.id, { action: "time", message, url });
      console.log("ran from messeage sender");
    });
  }, 10000);

  // Update storage for next message
  if (messagesCounter.messagesCounter === messages.messages.length - 1) {
    await chrome.storage.local.set({ messagesCounter: 0 });
  } else {
    await chrome.storage.local.set({
      messagesCounter: messagesCounter.messagesCounter + 1,
    });
  }
  await chrome.storage.local.set({ uidsCounter: uidsCounter.uidsCounter + 1 });
}, 30000);
