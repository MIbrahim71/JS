const questions = document.querySelectorAll(".question");

// Run through each question
questions.forEach((question) => {
  const btn = question.querySelector(".question-btn");

  btn.addEventListener("click", function () {
    // When btn is clicked, if item (that question) is not equal to question, then hide item
    questions.forEach(function (item) {
      if (item !== question) {
        console.log("Open");
        item.classList.remove("show-text");
      }
    });
    // If not, show item
    question.classList.toggle("show-text");
    console.log("Close");
  });
});
