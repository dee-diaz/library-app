import "./app.css";
import Book from "./components/Book.js";
import Storage from "./components/Storage.js";
import initModal from "./components/modal.js";
import renderEmptyStateCard from "./components/emptyStateCard.js";
import { createBookCard, renderLayout } from "./components/render.js";


const myLibrary = new Storage();
const form = document.querySelector("#add-form");
const ratingContainer = document.querySelector("[data-rating]");
const hasBookCards = document.querySelector("#book-cards");



function addBookToLibrary(title, author, readingStatus, rating) {
  const book = new Book(title, author);
  if (readingStatus) book.setStatus(readingStatus);
  if (rating) book.setRating(rating);
  myLibrary.saveBook(book);
}

function deleteBookFromLibrary(bookId) {
  myLibrary.deleteBook(bookId);
}

function handleUserInput(e) {
  e.preventDefault();
  const formData = new FormData(e.target);
  const item = Object.fromEntries(formData.entries());
  addBookToLibrary(item.title, item.author, item.status, item.rating);
  form.reset();
  ratingContainer.classList.add("hidden");
}


window.addEventListener("DOMContentLoaded", () => {
  if (!hasBookCards) renderEmptyStateCard();
  initModal();
  form.addEventListener("submit", handleUserInput);
})


myLibrary.getBooks();