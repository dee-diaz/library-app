import BookManager from "./BookManager";
import FormValidator from "./FormValidator";
import Storage from "./Storage";
import ui from "./ui";

class BookForm {
  #isEdit = false;
  #bookToEdit;
  #cardEl;
  #sectionEl;

  constructor(formSelector, modalInstance) {
    this.form = document.querySelector(formSelector);
    this.modal = modalInstance;
    this.inputTitle = this.form.querySelector("#title");
    this.inputAuthor = this.form.querySelector("#author");
    this.statusInput = this.form.querySelector("#status");
    this.ratingInput = this.form.querySelector("#rating");
    this.ratingContainer = this.form.querySelector("[data-rating]");
    this.handleSubmit = (e) => this.#handleUserInput(e);
    this.handleStatusChange = () => this.#toggleRatingField();
    this.#bindEvents();
  }

  #bindEvents() {
    this.statusInput.addEventListener("change", this.handleStatusChange);
    this.form.addEventListener("submit", this.handleSubmit);
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

  prepareForEdit(bookObj, cardEl, sectionEl) {
    this.#isEdit = true;
    this.#bookToEdit = bookObj;
    this.#cardEl = cardEl;
    this.#sectionEl = sectionEl;
  }



  #handleUserInput(e) {
    e.preventDefault();

    const titleValid = FormValidator.validateInput(this.inputTitle);
    const authorValid = FormValidator.validateInput(this.inputAuthor);

    if (titleValid && authorValid) {
      const formData = new FormData(e.target);
      const values = Object.fromEntries(formData.entries());
      if (!values.title || !values.author)
        throw new Error("No title and/or author data received");

      if (this.#isEdit) {
        Storage.deleteBook(this.#bookToEdit.id);
        ui.removeCard(this.#cardEl);
        ui.hideSectionAndTitle(this.#sectionEl)
      }

      BookManager.addBookToLibrary(
        values.title,
        values.author,
        values.status,
        values.rating,
      );
      FormValidator.resetForm();
      ui.resetForm();
      this.modal.closeModal();
      this.#isEdit = false;
      this.#bookToEdit = undefined;
      this.#cardEl = undefined;
      this.#sectionEl = undefined;
    }
  }
}

export default BookForm;
