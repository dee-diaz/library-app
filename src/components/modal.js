import FormValidator from "./FormValidator";
import BookForm from "./BookForm";

class Modal {
  constructor(selector) {
    this.dialog = document.querySelector(selector);
    this.closeBtn = this.dialog.querySelector("[data-btn-close]");
    this.#bindEvents();
  }

  showModal() {
    FormValidator.removeAllErrors();
    this.dialog.showModal();
  }

  closeModal() {
    this.dialog.close();
  }

  #closeOnOutsideClick(e) {
    const dialogDimensions = this.dialog.getBoundingClientRect();
    if (
      e.clientX < dialogDimensions.left ||
      e.clientX > dialogDimensions.right ||
      e.clientY < dialogDimensions.top ||
      e.clientY > dialogDimensions.bottom
    ) {
      this.closeModal();
    }
  }

  #bindEvents() {
    this.dialog.addEventListener("click", (e) => this.#closeOnOutsideClick(e));
    this.closeBtn.addEventListener("click", () => this.closeModal());
  }
}

function initAddBookButtons(modal) {
    const addButtons = document.querySelectorAll("[data-btn-add]");
    addButtons.forEach((button) => {
      button.addEventListener("click", () => modal.showModal());
    });
  }


function initModal() {
  const modal = new Modal("dialog");
  const bookForm = new BookForm("form", modal);

  initAddBookButtons(modal);
}

export default initModal;