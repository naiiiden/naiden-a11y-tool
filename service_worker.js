let panelState = {};

function toggleSidePanel(tab) {
  const tabId = tab.id;

  if (panelState[tabId]) {
    chrome.sidePanel.setOptions({
      tabId: tabId,
      enabled: false
    });
    panelState[tabId] = false; 
  } else {
    chrome.sidePanel.setOptions({
      tabId: tabId,
      path: "index.html",
      enabled: true
    });
    chrome.sidePanel.open({ tabId: tabId });
    panelState[tabId] = true; 
  }
}

chrome.action.onClicked.addListener((tab) => {
  toggleSidePanel(tab);
});

chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: "toggle_naiden_a11y_tool",
    title: "naiden's a11y tool",
    contexts: ["all"]
  });
});

chrome.contextMenus.onClicked.addListener((info, tab) => {
  if (info.menuItemId === "toggle_naiden_a11y_tool") {
    toggleSidePanel(tab);
  }
});

chrome.commands.onCommand.addListener((command, tab) => {
  if (command === 'toggle_naiden_a11y_tool') {
    toggleSidePanel(tab);
  }
});

chrome.sidePanel.setPanelBehavior({ openPanelOnActionClick: true });

chrome.tabs.onRemoved.addListener((tabId) => {
  delete panelState[tabId];
});