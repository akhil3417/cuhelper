document
  .getElementById("searchQuestionsButton")
  .addEventListener("click", function () {
    chrome.tabs.executeScript({ file: "searchallques.js" });
  });

document
  .getElementById("searchsingleQuestionsButton")
  .addEventListener("click", function () {
    chrome.tabs.executeScript({ file: "mcqsearchui.js" });
  });
document
  .getElementById("copyQuestionsButton")
  .addEventListener("click", function () {
    chrome.tabs.executeScript({ file: "copyAllques.js" });
  });
