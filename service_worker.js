chrome.action.onClicked.addListener((tab) => {
    chrome.sidePanel.open({ tabId: tab.id });
});

chrome.runtime.onInstalled.addListener(() => {
    chrome.contextMenus.create({
      id: "openNaidensA11yTool",
      title: "naiden's a11y tool",
      contexts: ["all"]
    });
  });
  
  chrome.contextMenus.onClicked.addListener((info, tab) => {
    if (info.menuItemId === "openNaidensA11yTool") {
      chrome.sidePanel.open({ tabId: tab.id });
    }
  });
  
  chrome.sidePanel.setPanelBehavior({ openPanelOnActionClick: true });