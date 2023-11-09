const questions = document.querySelectorAll(".question");

questions.forEach((question) => {
  const btn = document.querySelector(".question-btn");

  btn.addEventListener("click", function () {
    console.log("Hi");
    if (btn.contains(".")) question.classList.toggle("show-text");
  });
});
