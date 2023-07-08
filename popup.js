document
  .getElementById("searchQuestionsButton")
  .addEventListener("click", function () {
    chrome.tabs.executeScript({ file: "searchallques.js" });
  });
