use: "strict";

const counter = document.querySelector(".counter");
const decrease = document.querySelector(".btn-dec");
const reset = document.querySelector(".btn-reset");
const increase = document.querySelector(".btn-inc");

// Decrease

decrease.addEventListener("click", function (e) {
  e.preventDefault();
  console.log("Decrease");

  counter.textContent--;

  if (counter.textContent < 0) {
    counter.style.color = "red";
  }
});

// Reset

reset.addEventListener("click", function (e) {
  e.preventDefault();

  counter.textContent = 0;
  counter.style.color = "black";
});

// Increase

increase.addEventListener("click", function (e) {
  e.preventDefault();

  counter.textContent++;

  if (counter.textContent > 0) {
    counter.style.color = "green";
  }
});
