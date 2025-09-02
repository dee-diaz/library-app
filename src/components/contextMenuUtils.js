import BookManager from "./BookManager";


export function toggleContextMenu(e) {
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