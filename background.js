chrome.action.onClicked.addListener((tab) => {
  if (tab.id && tab.url && tab.url.startsWith("https://www.crunchyroll.com/")) {
    chrome.tabs.sendMessage(tab.id, "crtc-alternar").catch(() => {});
  }
});
