const questions = document.querySelectorAll(".question");

// Loop through each question
questions.forEach((question) => {
  // Select that specific button
  const btn = question.querySelector(".question-btn");

  btn.addEventListener("click", function () {
    questions.forEach(function (item) {
      if (item !== question) {
        // If item is not the clicked question, remove show-text (hide)
        item.classList.remove("show-text");
      }
    });
    // Else (clicked question) -> toggle visibility based on current state
    question.classList.toggle("show-text");
    console.log("Close");
  });
});
