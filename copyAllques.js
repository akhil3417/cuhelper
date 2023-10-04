javascript: (function () {
  var questions = document.querySelectorAll("div.que.multichoice");
  var questionText = "";
  for (var i = 0; i < questions.length; i++) {
    var questionNumber = questions[i].querySelector(".qno").textContent.trim();
    var questionContent = questions[i]
      .querySelector(".qtext")
      .textContent.trim();
    var options = questions[i].querySelectorAll(".radio-custom input");
    questionText +=
      "Question " + questionNumber + ": " + questionContent + "\n";
    for (var j = 0; j < options.length; j++) {
      var optionContent = options[j].nextElementSibling.textContent.trim();
      questionText += optionContent + "\n";
    }
    questionText += "\n";
  }
  if (questionText !== "") {
    var textarea = document.createElement("textarea");
    textarea.value = questionText.trim();
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand("copy");
    document.body.removeChild(textarea);
    var notification = document.createElement("div");
    notification.innerText = "Questions copied to clipboard!";
    notification.style.cssText =
      "position: fixed; top: 10px; left: 10px; background-color: #FFF; color: #000; padding: 10px; border: 1px solid #000; z-index: 9999; font-family: Arial, sans-serif;";
    document.body.appendChild(notification);
    setTimeout(function () {
      document.body.removeChild(notification);
    }, 3000);
  } else {
    console.log("No questions found!");
  }
})();
