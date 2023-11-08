const navToggle = document.querySelector(".nav-toggle");
const links = document.querySelector(".links");

navToggle.addEventListener("click", function (e) {
  e.preventDefault();
  console.log("e");
  links.classList.toggle("show-links");
});
