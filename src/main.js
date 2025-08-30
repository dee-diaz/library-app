import "./app.css";
import Swal from "sweetalert2";
import { Book, BOOK_STATUS, BOOK_RATING } from "./components/Book.js";
import Storage from "./components/Storage.js";
import initModal from "./components/modal.js";
import { renderEmptyStateCard, renderBook } from "./components/render.js";

const book = new Book("Nausea", "Jean-Paul Sartre");
book.rating = "in-progress";
console.log(book);

const myLibrary = new Storage();
const dialog = document.querySelector("dialog");
const form = document.querySelector("#add-form");
form.setAttribute("novalidate", "");
const inputTitle = document.querySelector("#title");
const inputAuthor = document.querySelector("#author");
const ratingContainer = document.querySelector("[data-rating]");
const sections = {
  reading: document.querySelector("#reading"),
  toRead: document.querySelector("#to-read"),
  completed: document.querySelector("#completed"),
};

function addBookToLibrary(title, author, readingStatus, rating) {
  const book = new Book(title, author);
  if (readingStatus) book.setStatus(readingStatus);
  if (rating) book.setRating(rating);
  myLibrary.saveBook(book);
  displayBookCard(book);
}

function displayBookCard(book) {
  const bookCard = renderBook(
    book.id,
    book.title,
    book.author,
    book.status,
    book.rating,
  );
  const sectionToAppendTo = defineSection(book.status);
  const gridContainer = sectionToAppendTo.querySelector(".grid");
  gridContainer.appendChild(bookCard);
  removeEmptyCard();
}

function defineSection(readingStatus) {
  const status = {
    read: "read",
    notRead: "not-read",
    reading: "reading",
  };

  let section;

  if (!readingStatus) section = sections.toRead;

  switch (readingStatus) {
    case status.read:
      section = sections.completed;
      break;
    case status.notRead:
      section = sections.toRead;
      break;
    case status.reading:
      section = sections.reading;
      break;
  }
  showSectionAndTitle(section);
  return section;
}

function showSectionAndTitle(section) {
  const title = section.querySelector("[data-section-title]");
  if (
    title.classList.contains("hidden") &&
    section.classList.contains("hidden")
  ) {
    title.classList.remove("hidden");
    section.classList.remove("hidden");
  } else {
    return;
  }
}

function hideSectionAndTitle(section) {
  if (!section.querySelector(".card")) {
    const title = section.querySelector("[data-section-title]");
    title.classList.add("hidden");
    section.classList.add("hidden");
  }
}

function removeEmptyCard() {
  const emptyCard = document.querySelector("#card-empty");
  if (emptyCard) {
    emptyCard.remove();
  } else {
    return;
  }
}

function showCards() {
  const books = myLibrary.getBooks();
  if (books.length === 0) {
    renderEmptyStateCard();
    console.log("No books in local storage");
  } else {
    books.forEach((book) => displayBookCard(book));
  }
}

function deleteBookFromLibrary(e) {
  const closestCard = e.target.closest(".card");
  const bookId = closestCard.getAttribute("data-id");
  const closestSection = e.target.closest("section");

  Swal.fire({
    theme: "dark",
    title: "Are you sure?",
    text: "You won't be able to revert this",
    showCancelButton: true,
    confirmButtonColor: "#d33",
    cancelButtonColor: "#242426",
    confirmButtonText: "Yes, delete it",
  }).then((result) => {
    if (result.isConfirmed) {
      myLibrary.deleteBook(bookId);
      closestCard.remove();
      hideSectionAndTitle(closestSection);
      const books = myLibrary.getBooks();
      if (books.length === 0) {
        renderEmptyStateCard();
        initModal();
      }
    }
  });
}

function getBookInfo(e) {
  const closestCard = e.target.closest(".card");
  const bookId = closestCard.getAttribute("data-id");
  const bookInfo = myLibrary.getBookInfo(bookId);
  return bookInfo;
}

function handleEdit(e) {
  form.removeEventListener("submit", handleUserInput);
  const closestCard = e.target.closest(".card");
  const closestSection = e.target.closest("section");
  const book = getBookInfo(e);
  const dialogTitle = dialog.querySelector("h2");
  dialogTitle.textContent = "Edit book";
  inputAuthor.value = book.author;
  inputTitle.value = book.title;
  dialog.showModal();

  form.addEventListener("submit", editBook);

  function editBook(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const values = Object.fromEntries(formData.entries());

    const editedBook = {
      id: values.id,
      title: values.title,
      author: values.author,
      status: values.status,
      rating: values.rating,
    };

    myLibrary.deleteBook(book.id);
    closestCard.remove();
    hideSectionAndTitle(closestSection);

    addBookToLibrary(
      editedBook.title,
      editedBook.author,
      editedBook.status,
      editedBook.rating,
    );

    form.reset();
    ratingContainer.classList.add("hidden");
    dialog.close();
    clearAllErrors();
    form.removeEventListener("submit", editBook);
    form.addEventListener("submit", handleUserInput);
    dialogTitle.textContent = "Add new book";
  }
}

function toggleContextMenu(e) {
  const currentCard = e.target.closest(".card");

  if (currentCard) {
    const contextMenu = currentCard.querySelector("[data-context-menu]");
    const deleteBtn = currentCard.querySelector("[data-btn-delete]");
    const editBtn = currentCard.querySelector("[data-btn-edit]");
    const menuDimensions = contextMenu.getBoundingClientRect();
    let isVisible = contextMenu.classList.contains("flex");
    closeContextMenus();
    contextMenu.classList.remove("hidden");
    contextMenu.classList.add("flex");

    if (
      (e.clientX < menuDimensions.left && isVisible) ||
      (e.clientX > menuDimensions.right && isVisible) ||
      (e.clientY < menuDimensions.top && isVisible) ||
      (e.clientY > menuDimensions.bottom && isVisible)
    ) {
      contextMenu.classList.remove("flex");
      contextMenu.classList.add("hidden");
    }
    editBtn.addEventListener("click", handleEdit);
    deleteBtn.addEventListener("click", deleteBookFromLibrary);
  } else {
    closeContextMenus();
  }
}

function closeContextMenus() {
  const cms = document.querySelectorAll("[data-context-menu]");
  const actionBtns = document.querySelectorAll(
    "[data-btn-delete], [data-btn-edit]",
  );
  cms.forEach((cm) => {
    if (cm.classList.contains("flex")) {
      cm.classList.remove("flex");
      cm.classList.add("hidden");
    }
  });

  actionBtns.forEach((btn) =>
    btn.removeEventListener("click", deleteBookFromLibrary),
  );
}

function showError(input, message) {
  input.classList.add("border-red-400");
  input.nextElementSibling.classList.add("opacity-100");
  input.nextElementSibling.textContent = message;
}

function removeError(input) {
  input.classList.remove("border-red-400");
  input.nextElementSibling.classList.remove("opacity-100");
  input.nextElementSibling.textContent = "";
}

function validateField(input) {
  const minLength = 2;
  const errorMessages = {
    title: "Please enter the book title",
    author: "Please enter the author's name",
  };

  if (input.value.trim().length < minLength) {
    showError(input, errorMessages[input.id]);
    return false;
  } else {
    removeError(input);
    return true;
  }
}

export function clearAllErrors() {
  removeError(inputTitle);
  removeError(inputAuthor);
}

function handleUserInput(e) {
  e.preventDefault();

  const titleValid = validateField(inputTitle);
  const authorValid = validateField(inputAuthor);

  if (titleValid && authorValid) {
    const formData = new FormData(e.target);
    const values = Object.fromEntries(formData.entries());

    addBookToLibrary(values.title, values.author, values.status, values.rating);
    form.reset();
    ratingContainer.classList.add("hidden");
    dialog.close();
  }
}

window.addEventListener("DOMContentLoaded", () => {
  showCards();
  initModal();
  form.addEventListener("submit", handleUserInput);
  inputTitle.addEventListener("input", () => validateField(inputTitle));
  inputAuthor.addEventListener("input", () => validateField(inputAuthor));
  window.addEventListener("click", toggleContextMenu);
});
