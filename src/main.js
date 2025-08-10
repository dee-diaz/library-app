import "./app.css";
// import { setupCounter } from './counter.js'

const addButtons = document.querySelectorAll(".btn-add");
const dialog = document.querySelector("dialog");
const closeButtons = document.querySelectorAll("[data-btn-close]");

addButtons.forEach((button) => button.addEventListener("click", showModal));
closeButtons.forEach((button) => button.addEventListener("click", closeModal));

function showModal() {
  dialog.showModal();
}

function closeModal() {
  dialog.close();
}
