function insAndExec(tab) {
  chrome.scripting.executeScript({
    target: {tabId: tab.id},
    files: ['scripts/content.js']
  });
}

chrome.action.onClicked.addListener((tab) => {
  insAndExec(tab);
});

chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: 'run_naiden_a11y_tool',
    title: 'run naiden a11y tool',
    contexts: ['all']
  });
});

chrome.contextMenus.onClicked.addListener((info, tab) => {
  if (info.menuItemId === 'run_naiden_a11y_tool') {
    insAndExec(tab);
  }
});

chrome.commands.onCommand.addListener((command, tab) => {
  if (command === 'toggle_naiden_a11y_tool') {
    insAndExec(tab);
  }
});