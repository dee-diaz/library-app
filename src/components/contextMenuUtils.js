import BookManager from "./BookManager";
import ui from "./ui";
import { modal, form } from "./Modal";

export function toggleContextMenu(e) {
  const currentCard = e.target.closest(".card");

  if (currentCard) {
    const contextMenu = currentCard.querySelector("[data-context-menu]");
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
  } else {
    closeContextMenus();
  }
}

function closeContextMenus() {
  const cms = document.querySelectorAll("[data-context-menu]");
  cms.forEach((cm) => {
    if (cm.classList.contains("flex")) {
      cm.classList.remove("flex");
      cm.classList.add("hidden");
    }
  });
}

function handleEdit(e) {
  const closestCard = e.target.closest(".card");
  const closestSection = e.target.closest("section");
  const bookToEdit = BookManager.getBookInfo(e);
  ui.renderEditForm(e);
  form.prepareForEdit(bookToEdit, closestCard, closestSection);
  modal.showModal();
}

function handleDocumentClick(e) {
  if (e.target.closest("[data-btn-delete]")) {
    BookManager.deleteBookFromLibrary(e);
  }
  if (e.target.closest("[data-btn-edit]")) {
    handleEdit(e);
  }
}

export function initContextMenuHandlers() {
  document.addEventListener("click", handleDocumentClick);
}
