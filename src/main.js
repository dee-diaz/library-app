import "./app.css";
// import { setupCounter } from './counter.js'

const addButtons = document.querySelectorAll(".btn-add");
const dialog = document.querySelector("dialog");
const closeButtons = document.querySelectorAll("[data-btn-close]");
const selectStatus = document.querySelector("select#status");
const ratingContainer = document.querySelector("[data-rating]");
const selectRating = document.querySelector("#rating");
const addForm = document.querySelector("#add-form");

addButtons.forEach((button) => button.addEventListener("click", showModal));
closeButtons.forEach((button) => button.addEventListener("click", closeModal));

function showModal() {
  dialog.showModal();
}

function closeModal() {
  dialog.close();
}

selectStatus.addEventListener("change", () => {
  const value = selectStatus.value;
  if (value === "read") {
    ratingContainer.classList.remove("hidden");
    ratingContainer.classList.add("flex");
    selectRating.classList.remove("hidden");
    selectRating.classList.add("flex");
  } else {
    ratingContainer.classList.remove("flex");
    ratingContainer.classList.add("hidden");
    selectRating.classList.remove("flex");
    selectRating.classList.add("hidden");
  }

  // Remove later
  selectRating.addEventListener("change", () => {
    console.log(selectRating.value);
  });
});

addForm.addEventListener("submit", (e) => {
  e.preventDefault();
});
