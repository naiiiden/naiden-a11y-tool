chrome.action.onClicked.addListener( ( tab ) => {

  chrome.sidePanel.setOptions({ 
    tabId: tab.id,
    path: "index.html",
    enabled: true 
  });
  
  chrome.sidePanel.open({ tabId: tab.id });
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
    chrome.sidePanel.setOptions({ 
      tabId: tab.id,
      path: "index.html",
      enabled: true 
    });

    chrome.sidePanel.open({ tabId: tab.id });
  }
});

chrome.commands.onCommand.addListener((command, tab) => {
  if (command === 'toggle_naiden_a11y_tool') {
    chrome.sidePanel.setOptions({ 
      tabId: tab.id,
      path: "index.html",
      enabled: true 
    });

    chrome.sidePanel.open({ tabId: tab.id });
  }
});

chrome.sidePanel.setPanelBehavior({ openPanelOnActionClick: true });