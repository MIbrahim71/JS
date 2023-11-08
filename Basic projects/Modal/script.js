const modalBtn = document.querySelector(".btn");
const modal = document.querySelector(".modal-overlay");
const closeBtn = document.querySelector(".close");

modalBtn.addEventListener("click", function () {
  modal.classList.add("open-modal");
  console.log("e");
});

closeBtn.addEventListener("click", function () {
  modal.classList.remove("open-modal");
});
