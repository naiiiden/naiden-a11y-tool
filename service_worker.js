let panelState = {};

function toggleSidePanel(tab) {
  const tabId = tab.id;

  if (panelState[tabId]?.panelOpen) {
    chrome.sidePanel.setOptions({
      tabId: tabId,
      enabled: false,
    });
    chrome.tabs.sendMessage(tabId, { toggleStylesheets: false }); // Re-enable stylesheets
    panelState[tabId].panelOpen = false;
  } else {
    chrome.sidePanel.setOptions({
      tabId: tabId,
      path: "index.html",
      enabled: true,
    });
    chrome.sidePanel.open({ tabId: tabId });

    chrome.scripting.executeScript({
      target: { tabId: tabId },
      files: ["scripts/content.js"],
    });

    panelState[tabId] = { panelOpen: true, toggleStylesheets: false };
  }
}

chrome.action.onClicked.addListener((tab) => {
  toggleSidePanel(tab);
});

chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: "toggle_naiden_a11y_tool",
    title: "naiden's a11y tool",
    contexts: ["all"],
  });
});

chrome.contextMenus.onClicked.addListener((info, tab) => {
  if (info.menuItemId === "toggle_naiden_a11y_tool") {
    toggleSidePanel(tab);
  }
});

chrome.commands.onCommand.addListener((command, tab) => {
  if (command === "toggle_naiden_a11y_tool") {
    toggleSidePanel(tab);
  }
});

chrome.tabs.onRemoved.addListener((tabId) => {
  delete panelState[tabId];
});

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.status === "loading" && panelState[tabId]?.panelOpen) {
    chrome.sidePanel.setOptions({
      tabId: tabId,
      enabled: false,
    });

    chrome.tabs.sendMessage(tabId, { toggleStylesheets: false });

    panelState[tabId].panelOpen = false;
  }
});
