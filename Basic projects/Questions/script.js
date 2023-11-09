const questions = document.querySelectorAll(".question");

// Loop through each question
questions.forEach((question) => {
  // Select that specific button
  const btn = question.querySelector(".question-btn");

  btn.addEventListener("click", function () {
    // When btn is clicked, if there are any items (other questions) not equal to the specific question, then hide items
    questions.forEach(function (item) {
      if (item !== question) {
        item.classList.remove("show-text");
      }
    });
    // If not, show item
    question.classList.toggle("show-text");
    console.log("Close");
  });
});
