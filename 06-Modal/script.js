"use strict";

const modal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");
const btnCloseModal = document.querySelector(".close-modal");
const btnsOpenModal = document.querySelectorAll(".show-modal");

const openModal = function () {
  modal.classList.remove("hidden");
  overlay.classList.remove("hidden");
};

const closeModal = function () {
  modal.classList.add("hidden");
  overlay.classList.add("hidden");
};

for (let i = 0; i < btnsOpenModal.length; i++)
  btnsOpenModal[i].addEventListener("click", openModal);

btnCloseModal.addEventListener("click", closeModal); //Ne moze closeModal() jer bi odmah pozvalo funkciju, a ne na click
overlay.addEventListener("click", closeModal);
document.addEventListener("keydown", function (event) {
  console.log(event);
  if (event.key === "Escape" && !modal.classList.contains("hidden"))
    closeModal();
}); // Keydown se uvijek odvija na globalnom scopeu, zato je document.
