import "./app.css";
import Storage from "./components/Storage.js";
import initModal from "./components/Modal.js";
import BookManager from "./components/BookManager.js";
import BookForm from "./components/BookForm.js";
import ui from "./components/ui.js";
import FormValidator from "./components/FormValidator.js";



// function displayBookCard(book) {
//   const bookCard = renderBookCard(
//     book.id,
//     book.title,
//     book.author,
//     book.status,
//     book.rating,
//   );

//   removeEmptyCard();
// }

// function removeEmptyCard() {
//   const emptyCard = document.querySelector("#card-empty");
//   if (emptyCard) {
//     emptyCard.remove();
//   }
// }

// function showCards() {
//   const books = Storage.getBooks();
//   if (books.length === 0) {
//     renderEmptyStateCard();
//     console.log("No books in local storage");
//   } else {
//     books.forEach((book) => displayBookCard(book));
//   }
// }

// function getBookInfo(e) {
//   const closestCard = e.target.closest(".card");
//   const bookId = closestCard.getAttribute("data-id");
//   const bookInfo = Storage.getBookInfo(bookId);
//   return bookInfo;
// }

// function handleUserInput(e) {
//   e.preventDefault();
//   const inputTitle = document.querySelector("#title");
//   const inputAuthor = document.querySelector("#author");

//   const titleValid = FormValidator.validateInput(inputTitle);
//   const authorValid = FormValidator.validateInput(inputAuthor);

//   if (titleValid && authorValid) {
//     const dialog = document.querySelector("dialog");
//     const formData = new FormData(e.target);
//     const values = Object.fromEntries(formData.entries());

//     addBookToLibrary(values.title, values.author, values.status, values.rating);
//     FormValidator.resetForm();
//     // ratingContainer.classList.add("hidden");
//     bookForm.toggleRatingField();
//     dialog.close();
//   }
// }

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

    Storage.deleteBook(book.id);
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
    deleteBtn.addEventListener("click", BookManager.deleteBookFromLibrary);
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
    btn.removeEventListener("click", BookManager.deleteBookFromLibrary),
  );
}

function initApp() {
  initModal();
  const dialog = document.querySelector("dialog");
  const form = document.querySelector("form");
  ui.showCards();
}

document.addEventListener("DOMContentLoaded", () => {
  initApp();
  window.addEventListener("click", toggleContextMenu);
});
