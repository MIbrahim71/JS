use: "strict";

const reviews = [
  {
    id: 1,
    name: "Samin Hoque",
    job: "Apple CEO",
    img: "9C1A4ED0-9778-4D6E-9DBA-F29317B36A9D_1_105_c.jpeg",
    text: "I'm baby meggings twee health goth +1. Bicycle rights tumeric chartreuse before they sold out chambray pop-up. Shaman humblebrag pickled coloring book salvia hoodie, cold-pressed four dollar toast everyday carry",
  },
  {
    id: 2,
    name: "Hafizur Rahman",
    job: "Cybersecurity Consultant",
    img: "https://www.course-api.com/images/people/person-2.jpeg",
    text: "Helvetica artisan kinfolk thundercats lumbersexual blue bottle. Disrupt glossier gastropub deep v vice franzen hell of brooklyn twee enamel pin fashion axe.photo booth jean shorts artisan narwhal.",
  },
  {
    id: 3,
    name: "Mahfuz Khan",
    job: "Founder of Los Santos Customs",
    img: "https://www.course-api.com/images/people/person-4.jpeg",
    text: "Sriracha literally flexitarian irony, vape marfa unicorn. Glossier tattooed 8-bit, fixie waistcoat offal activated charcoal slow-carb marfa hell of pabst raclette post-ironic jianbing swag.",
  },
  {
    id: 4,
    name: "Akifur Rahman",
    job: "HMP Feltham resident",
    img: "https://www.course-api.com/images/people/person-3.jpeg",
    text: "Edison bulb put a bird on it humblebrag, marfa pok pok heirloom fashion axe cray stumptown venmo actually seitan. VHS farm-to-table schlitz, edison bulb pop-up 3 wolf moon tote bag street art shabby chic. ",
  },
];

// Selectors
const img = document.getElementById("person-img");
const author = document.getElementById("author");
const job = document.getElementById("job");
const info = document.getElementById("info");
const prev = document.querySelector(".prev-btn");
const next = document.querySelector(".next-btn");

// Set starting item
let currentItem = 0;

// Load initial review
window.addEventListener("DOMContentLoaded", function () {
  const item = reviews[currentItem];
  img.src = item.src;
  author.textContent = item.name;
  job.textContent = item.job;
  info.textContent = item.text;
});

// Update UI with new person

const showPerson = (person) => {
  const item = reviews[person];
  img.src = item.src;
  author.textContent = item.name;
  job.textContent = item.job;
  info.textContent = item.text;
};

// Next
next.addEventListener("click", function (e) {
  e.preventDefault();

  currentItem++;
  if (currentItem > reviews.length - 1) currentItem = 0;

  showPerson(currentItem);
});

// Prev
prev.addEventListener("click", function (e) {
  e.preventDefault();

  currentItem--;

  if (currentItem < 0) currentItem = reviews.length - 1;
  showPerson(currentItem);
});

// Random
