use: "strict";

// const decrease = document.querySelector(".btn-dec");
// const reset = document.querySelector(".btn-reset");
// const increase = document.querySelector(".btn-inc");

// Decrease

// decrease.addEventListener("click", function (e) {
//   e.preventDefault();

//   counter.textContent--;

//   if (counter.textContent < 0) counter.style.color = "red";
// });

// // Reset

// reset.addEventListener("click", function (e) {
//   e.preventDefault();

//   counter.textContent = 0;
//   counter.style.color = "black";
// });

// // Increase

// increase.addEventListener("click", function (e) {
//   e.preventDefault();

//   counter.textContent++;

//   if (counter.textContent > 0) counter.style.color = "green";
// });

// REFACTOR

let count = 0;

const btns = document.querySelectorAll(".btn");
const counter = document.querySelector(".counter");

// Select all btns
btns.forEach(function (btn) {
  btn.addEventListener("click", function (e) {
    console.log("e");

    // Look at clicked btn's classList
    const currentStyle = e.currentTarget.classList;

    if (currentStyle.contains("dec")) {
      count--;
      console.log("dec");
    }

    if (currentStyle.contains("inc")) {
      count++;
      console.log("inc");
    }

    if (currentStyle.contains("reset")) count = 0;

    if (count < 0) counter.style.color = "red";
    if (count > 0) counter.style.color = "green";
    if (count == 0) counter.style.color = "black";

    counter.textContent = count;
  });
});
