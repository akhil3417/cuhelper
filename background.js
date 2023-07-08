chrome.browserAction.onClicked.addListener(function (tab) {
  chrome.tabs.executeScript(tab.id, {
    code: `
      // Bookmarklet code goes here
    `,
  });
});
// Background listener to inject search buttons when the URL matches the pattern
chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
  if (changeInfo.status === "complete" && tab.url) {
    if (tab.url.includes("http://culms.cuidol.in/mod/quiz/attempt.php?")) {
      chrome.tabs.executeScript(tabId, {
        file: "mcqsearchui.js",
      });
    }
  }
});
