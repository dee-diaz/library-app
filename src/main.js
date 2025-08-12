import "./app.css";
import Book from "./components/Book.js";
import initModal from "./components/modal.js";
import renderEmptyStateCard from "./components/emptyStateCard.js";

const hasBookCards = document.querySelector("#book-cards");

const STATUS = {
  READ: "read",
  READING: "reading",
  NOTREAD: "not-read",
};

const RATING = {
  FIVE: "5/5",
  FOUR: "4/5",
  THREE: "3/5",
  TWO: "2/5",
  ONE: "1/5",
};

const newBook = new Book("Nausea", "Jan-Paul Sartre");
newBook.setStatus(STATUS.READ);
newBook.setRating(RATING.FOUR);

window.addEventListener("DOMContentLoaded", () => {
  if (!hasBookCards) renderEmptyStateCard();
  initModal();
})


