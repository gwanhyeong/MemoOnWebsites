const urlPattern = /https?:\/\//;
const currentTabQueryInfo = {
  active: true,
  currentWindow: true
};

function isEmpty(value) {
  if (value === '' || value == null || value === undefined || (value != null && typeof value === 'object' && !Object.keys(value).length)) {
    return true;
  }

  return false;
}

function getCurrentTab(callback) {
  chrome.tabs.query(currentTabQueryInfo, (tabs) => {
    let tab = tabs[0];
    callback(tab);
  });
}

function getCurrentTabUrl(callback) {
  chrome.tabs.query(currentTabQueryInfo, (tabs) => {
    let tab = tabs[0];
    let url = tab.url;
    callback(url);
  });
}

function getDomain(url) {
  let pattern = /^https?:\/\/(.*?)\//i;
  let domain = url.match(pattern);
  domain = domain[0];
  domain = domain.slice(0, -1);
  domain = domain.replace(/^https?:\/\/(?:www\.)?/i, '');
  return domain;
}

function getMemoOnDomain(domain, callback) {
  chrome.storage.local.get(domain, (result) => {
    var memo = isEmpty(result[domain]) ? '' : result[domain];
    callback(memo);
  });
}

function setMemoOnDomain(domain, memo, callback) {
  chrome.storage.local.set({[domain]: memo}, callback);
}

function setIconByMemoStatus(tab) {
  var tabId = tab.tabId;
  var tabUrl = tab.url;
  if (tabUrl.match(urlPattern)) {
    var domain = getDomain(tabUrl);
    getMemoOnDomain(domain, (memo) => {
      if (memo == '')
        chrome.browserAction.setIcon({tabId: tabId, path: 'img/empty_icon_128.png'});
      else
        chrome.browserAction.setIcon({tabId: tabId, path: 'img/icon_128.png'});
      }
    );
  } else {
    chrome.browserAction.setIcon({tabId: tabId, path: 'img/disable_icon_128.png'});
  }
}