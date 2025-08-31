class Modal {
  constructor(selector) {
    this.dialog = document.querySelector(selector);
    this.closeBtn = this.dialog.querySelector("[data-btn-close]");
    this.#bindEvents();
  }

  showModal() {
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

  #bindEvents(){
    this.dialog.addEventListener("click", (e) => this.#closeOnOutsideClick(e));
    this.closeBtn.addEventListener("click", () => this.closeModal());
  };
}

class BookForm {
  constructor(formSelector, modalInstance) {
    this.form = document.querySelector(formSelector);
    this.modal = modalInstance;
    this.statusInput = this.form.querySelector("#status");
    this.ratingInput = this.form.querySelector("#rating");
    this.ratingContainer = this.form.querySelector("[data-rating]");
    this.#bindEvents();
  }

  #bindEvents() {
    this.statusInput.addEventListener("change", () =>
      this.#toggleRatingField(),
    );
  }

  #toggleRatingField() {
    const value = this.statusInput.value;
    if (value === "read") {
      this.ratingContainer.classList.remove("hidden");
      this.ratingContainer.classList.add("flex");
      this.ratingInput.disabled = false;
    } else {
      this.ratingContainer.classList.remove("flex");
      this.ratingContainer.classList.add("hidden");
      this.ratingInput.disabled = true;
    }
  }

}

function initAddBookButtons(modal) {
  const addButtons = document.querySelectorAll("[data-btn-add]");
  addButtons.forEach((button) => {
    button.addEventListener("click", () => modal.showModal());
  });
}

function initBookModal() {
  const modal = new Modal("dialog");
  const bookForm = new BookForm("form", modal);

  initAddBookButtons(modal);
}

export default initBookModal;
