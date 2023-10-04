(function () {
  var questions = document.querySelectorAll("div.que.multichoice");
  var searchQuery = "";
  for (var i = 0; i < questions.length; i++) {
    var questionContent = questions[i]
      .querySelector(".qtext")
      .textContent.trim();
    var options = questions[i].querySelectorAll(".radio-custom input");
    var questionText = questionContent + "\n";
    for (var j = 0; j < options.length; j++) {
      var optionContent = options[j].nextElementSibling.textContent.trim();
      questionText += optionContent + "\n";
    }
    questionText += "\n";
    searchQuery += encodeURIComponent(questionText) + "|";
    window.open(
      "https://www.google.com/search?q=" + encodeURIComponent(questionText)
    );
  }
  if (searchQuery !== "") {
    // Show a notification
    var notification = document.createElement("div");
    notification.textContent = "Search opened in new tabs!";
    notification.style.position = "fixed";
    notification.style.bottom = "20px";
    notification.style.right = "20px";
    notification.style.padding = "10px";
    notification.style.backgroundColor = "#f0f0f0";
    notification.style.border = "1px solid #ccc";
    notification.style.borderRadius = "4px";
    notification.style.zIndex = "9999";
    document.body.appendChild(notification);

    // Remove the notification after a short delay
    setTimeout(function () {
      document.body.removeChild(notification);
    }, 3000);
  } else {
    console.log("No questions found!");
  }
})();
