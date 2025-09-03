import Book from "./Book";
import Storage from "./Storage";
import ui from "./ui";
import Swal from "sweetalert2";
import { initAddBookButtons } from "./Modal";

class BookManager {
  #bookToEdit;
  #cardEl;
  #sectionEl;

  static addBookToLibrary(title, author, readingStatus, rating) {
    const book = new Book(title, author);
    if (readingStatus) book.status = readingStatus;
    if (rating) book.rating = rating;
    Storage.saveBook(book);
    ui.displayBookCard(book);
  }

  static deleteBookFromLibrary(e) {
    const closestCard = e.target.closest(".card");
    const bookId = closestCard.getAttribute("data-id");
    const closestSection = e.target.closest("section");
    const modal = document.querySelector("dialog");
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
        Storage.deleteBook(bookId);
        closestCard.remove();
        ui.hideSectionAndTitle(closestSection);
        const books = Storage.getBooks();
        if (books.length === 0) {
          ui.renderEmptyStateCard();
          initAddBookButtons(modal);
        }
      }
    });
  }

  static getBookInfo(e) {
    const closestCard = e.target.closest(".card");
    const bookId = closestCard.getAttribute("data-id");
    const bookInfo = Storage.getBookInfo(bookId);
    return bookInfo;
  }
}

export default BookManager;
