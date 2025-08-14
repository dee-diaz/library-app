import "./app.css";
import Swal from "sweetalert2";
import Book from "./components/Book.js";
import Storage from "./components/Storage.js";
import initModal from "./components/modal.js";
import { renderEmptyStateCard, renderBook } from "./components/render.js";

const myLibrary = new Storage();
const books = myLibrary.getBooks();
const form = document.querySelector("#add-form");
const inputTitle = document.querySelector("#title");
const inputAuthor = document.querySelector("#author");
form.setAttribute("novalidate", "");
const ratingContainer = document.querySelector("[data-rating]");
const cards = document.querySelectorAll(".card");
const deleteBtn = document.querySelector("[data-btn-delete]");
const editBtn = document.querySelector("[data-btn-edit]");
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
  const bookCard = renderBook(book.id, book.title, book.author, book.status, book.rating);
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

  return section;
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
  if (books.length === 0) renderEmptyStateCard();
}

function deleteBookFromLibrary(e) {
  const closestCard = e.target.closest(".card");
  const bookId = closestCard.getAttribute("data-id");

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

      Swal.fire({
        theme: "dark",
        text: "Book has been deleted",
        icon: "success",
      });
    }
  });
}

function toggleContextMenu(e) {
  const currentCard = e.currentTarget;
  const contextMenu = currentCard.querySelector("[data-context-menu]");
  const menuDimensions = contextMenu.getBoundingClientRect();
  let isVisible = contextMenu.classList.contains("flex");

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
  }
}

window.addEventListener("DOMContentLoaded", () => {
  showCards();
  initModal();
  form.addEventListener("submit", handleUserInput);
  inputTitle.addEventListener("input", () => validateField(inputTitle));
  inputAuthor.addEventListener("input", () => validateField(inputAuthor));
  // deleteBtn.addEventListener("click", deleteBookFromLibrary);
  cards.forEach((card) => card.addEventListener("click", toggleContextMenu));
});

myLibrary.getBooks();
