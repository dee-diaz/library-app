import { clearAllErrors } from "../main";

function initModal() {
  const addButtons = document.querySelectorAll("[data-btn-add]");
  const dialog = document.querySelector("dialog");
  const closeBtn = document.querySelector("[data-btn-close]");
  const ratingContainer = document.querySelector("[data-rating]");
  const statusInput = document.querySelector("#status");
  const ratingInput = document.querySelector("#rating");

  function showModal() {
    clearAllErrors();
    dialog.showModal();
  }

  function closeModal() {
    dialog.close();
  }

  // When user marks a book as "read", the rating input field appears
  function showRatingInputField() {
    const value = statusInput.value;
    if (value === "read") {
      ratingContainer.classList.remove("hidden");
      ratingContainer.classList.add("flex");
      ratingInput.disabled = false;
    } else {
      ratingContainer.classList.remove("flex");
      ratingContainer.classList.add("hidden");
      ratingInput.disabled = true;
    }
  }

  // The modal closes when user clicks outside of it
  function closeOnOutsideClick(e) {
    const dialogDimensions = dialog.getBoundingClientRect();
    if (
      e.clientX < dialogDimensions.left ||
      e.clientX > dialogDimensions.right ||
      e.clientY < dialogDimensions.top ||
      e.clientY > dialogDimensions.bottom
    ) {
      dialog.close();
    }
  }

  addButtons.forEach((button) => button.addEventListener("click", showModal));
  closeBtn.addEventListener("click", closeModal);
  dialog.addEventListener("click", closeOnOutsideClick);
  statusInput.addEventListener("change", showRatingInputField);
}

export default initModal;