(function () {
  var questions = document.querySelectorAll("div.que.multichoice");
  var selectedSearchEngine = "google"; // Default search engine (can be changed in the dropdown)

  function performSearch(searchText) {
    var searchUrl;

    switch (selectedSearchEngine) {
      case "duckduckgo":
        searchUrl =
          "https://duckduckgo.com/?q=" + encodeURIComponent(searchText);
        break;
      case "bravesearch":
        searchUrl =
          "https://search.brave.com/search?q=" + encodeURIComponent(searchText);
        break;
      default:
        searchUrl =
          "https://www.google.com/search?q=" + encodeURIComponent(searchText);
        break;
    }

    window.open(searchUrl, "_blank");
  }

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
    var container = document.createElement("div");
    container.style.marginBottom = "10px";

    var dropdown = document.createElement("select");
    dropdown.innerHTML = `
      <option value="google">Google</option>
      <option value="duckduckgo">DuckDuckGo</option>
      <option value="bravesearch">Brave Search</option>
    `;
    dropdown.style.marginRight = "10px";

    dropdown.addEventListener("change", function () {
      selectedSearchEngine = this.value;
    });

    container.appendChild(dropdown);

    var searchButton = document.createElement("button");
    searchButton.innerText = "Search";
    searchButton.style.padding = "5px 10px";
    searchButton.style.backgroundColor = "#007bff";
    searchButton.style.color = "#fff";
    searchButton.style.border = "none";
    searchButton.style.borderRadius = "4px";
    searchButton.style.cursor = "pointer";

    searchButton.addEventListener("click", function (event) {
      event.preventDefault();
      var questionText = this.parentNode.parentNode
        .querySelector(".qtext")
        .textContent.trim();
      var options = this.parentNode.parentNode.querySelectorAll(
        ".radio-custom input"
      );
      var searchText = questionText + "\n";

      for (var j = 0; j < options.length; j++) {
        var optionContent = options[j].nextElementSibling.textContent.trim();
        searchText += optionContent + "\n";
      }

      performSearch(searchText);
    });

    container.appendChild(searchButton);

    var copyButton = document.createElement("button");
    copyButton.innerText = "Copy Question";
    copyButton.style.marginLeft = "10px";
    copyButton.style.padding = "5px 10px";
    copyButton.style.backgroundColor = "#007bff";
    copyButton.style.color = "#fff";
    copyButton.style.border = "none";
    copyButton.style.borderRadius = "4px";
    copyButton.style.cursor = "pointer";

    copyButton.addEventListener("click", function () {
      var textarea = document.createElement("textarea");
      textarea.value = questionText.trim();
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand("copy");
      document.body.removeChild(textarea);
      var notification = document.createElement("div");
      notification.innerText = "Question copied to clipboard!";
      notification.style.cssText =
        "position: fixed; top: 10px; left: 10px; background-color: #FFF; color: #000; padding: 10px; border: 1px solid #000; z-index: 9999; font-family: Arial, sans-serif;";
      document.body.appendChild(notification);
      setTimeout(function () {
        document.body.removeChild(notification);
      }, 3000);
    });

    container.appendChild(copyButton);

    questions[i].appendChild(container);
  }

  var searchAllButton = document.createElement("button");
  searchAllButton.innerText = "Search All Questions";
  searchAllButton.style.marginTop = "10px";
  searchAllButton.style.padding = "5px 10px";
  searchAllButton.style.backgroundColor = "#007bff";
  searchAllButton.style.color = "#fff";
  searchAllButton.style.border = "none";
  searchAllButton.style.borderRadius = "4px";
  searchAllButton.style.cursor = "pointer";

  var dropdown = document.createElement("select");
  dropdown.innerHTML = `
    <option value="google">Google</option>
    <option value="duckduckgo">DuckDuckGo</option>
    <option value="bravesearch">Brave Search</option>
  `;
  dropdown.style.marginRight = "10px";

  dropdown.addEventListener("change", function () {
    selectedSearchEngine = this.value;
    // Update the default search engine for individual question search buttons
    var individualSearchButtons = document.querySelectorAll(
      "div.que.multichoice div select"
    );
    for (var i = 0; i < individualSearchButtons.length; i++) {
      individualSearchButtons[i].value = selectedSearchEngine;
    }
  });

  var container = document.createElement("div");
  container.style.display = "flex";
  container.appendChild(dropdown);
  container.appendChild(searchAllButton);

  searchAllButton.addEventListener("click", function () {
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
      performSearch(questionText);
    }
  });

  var copyAllButton = document.createElement("button");
  copyAllButton.innerText = "Copy All Questions";
  copyAllButton.style.marginTop = "10px";
  copyAllButton.style.marginLeft = "10px";
  copyAllButton.style.padding = "5px 10px";
  copyAllButton.style.backgroundColor = "#007bff";
  copyAllButton.style.color = "#fff";
  copyAllButton.style.border = "none";
  copyAllButton.style.borderRadius = "4px";
  copyAllButton.style.cursor = "pointer";

  copyAllButton.addEventListener("click", function () {
    event.preventDefault(); // Prevent page refresh
    var allQuestionsText = "";
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
      allQuestionsText += questionText;
    }

    if (allQuestionsText !== "") {
      var textarea = document.createElement("textarea");
      textarea.value = allQuestionsText.trim();
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand("copy");
      document.body.removeChild(textarea);
      var notification = document.createElement("div");
      notification.innerText = "All questions copied to clipboard!";
      notification.style.cssText =
        "position: fixed; top: 10px; left: 10px; background-color: #FFF; color: #000; padding: 10px; border: 1px solid #000; z-index: 9999; font-family: Arial, sans-serif;";
      document.body.appendChild(notification);
      setTimeout(function () {
        document.body.removeChild(notification);
      }, 3000);
    } else {
      console.log("No questions found!");
    }
  });

  container.appendChild(copyAllButton);

  var heading = document.createElement("h3");
  heading.appendChild(container);

  var desiredLocation = document.querySelector(
    ".navbar-nav.h-100.wdm-custom-menus.links"
  );

  if (desiredLocation) {
    desiredLocation.parentNode.insertBefore(
      heading,
      desiredLocation.nextSibling
    );
  }
})();
