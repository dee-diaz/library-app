import "./app.css";
import ui from "./components/ui.js";
import { initAddBookButtons, Modal } from "./components/Modal.js";
import BookForm from "./components/BookForm.js";
import { toggleContextMenu, initContextMenuHandlers } from "./components/contextMenuUtils.js";


export const appComponents = (function() {
  const modal = new Modal("dialog");
  const form = new BookForm("form", modal);

  return { modal, form }
})();


function initApp() {
  ui.showCards();
  initAddBookButtons(appComponents.modal);
  window.addEventListener("click", toggleContextMenu);
  initContextMenuHandlers();
}

document.addEventListener("DOMContentLoaded", () => {
  initApp();
});