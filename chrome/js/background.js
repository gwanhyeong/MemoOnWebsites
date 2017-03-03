chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message == 'icon-reload') {
    var tab = sender.tab;
    setIconByMemoStatus(tab);
  }
});

chrome.tabs.onActivated.addListener((activeInfo) => {
  chrome.tabs.get(activeInfo.tabId, (tab) => {
    setIconByMemoStatus(tab);
  });
});